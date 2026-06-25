#!/usr/bin/env bash
set -Eeuo pipefail

APP_NAME="${APP_NAME:-aexon}"
APP_DIR="${APP_DIR:-$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)}"
PUBLIC_HOST="${PUBLIC_HOST:-13.126.130.137}"
PUBLIC_PROTO="${PUBLIC_PROTO:-http}"
PUBLIC_URL="${NEXT_PUBLIC_API_URL:-${PUBLIC_PROTO}://${PUBLIC_HOST}:5000}"
BACKEND_PORT="${BACKEND_PORT:-5001}"
FRONTEND_PORT="${FRONTEND_PORT:-3000}"
NODE_MAJOR="${NODE_MAJOR:-20}"

info() {
  printf '\033[1;34m==>\033[0m %s\n' "$*"
}

warn() {
  printf '\033[1;33mWARN:\033[0m %s\n' "$*" >&2
}

fail() {
  printf '\033[1;31mERROR:\033[0m %s\n' "$*" >&2
  exit 1
}

if command -v sudo >/dev/null 2>&1; then
  SUDO="sudo"
else
  SUDO=""
fi

cd "$APP_DIR"

[ -f "client/package.json" ] || fail "client/package.json not found. Run this from the repository root."
[ -f "services/package.json" ] || fail "services/package.json not found. Run this from the repository root."

info "Preparing ${APP_NAME} for AWS EC2 at ${PUBLIC_URL}"

if command -v apt-get >/dev/null 2>&1; then
  info "Installing system packages"
  $SUDO apt-get update
  $SUDO apt-get install -y curl ca-certificates gnupg nginx build-essential

  if ! command -v node >/dev/null 2>&1 || ! node -e "process.exit(Number(process.versions.node.split('.')[0]) >= ${NODE_MAJOR} ? 0 : 1)"; then
    info "Installing Node.js ${NODE_MAJOR}"
    curl -fsSL "https://deb.nodesource.com/setup_${NODE_MAJOR}.x" | $SUDO bash -
    $SUDO apt-get install -y nodejs
  fi
else
  warn "apt-get was not found. Install Node.js ${NODE_MAJOR}, npm, Nginx, and build tools manually."
fi

if ! command -v pm2 >/dev/null 2>&1; then
  info "Installing PM2"
  $SUDO npm install -g pm2
fi

if [ ! -f "services/.env" ]; then
  cp services/.env.example services/.env
  fail "Created services/.env from services/.env.example. Fill in real secrets, then run this script again."
fi

info "Installing backend dependencies"
npm --prefix services ci --omit=dev
mkdir -p services/uploads/resumes

info "Installing frontend dependencies"
npm --prefix client ci

info "Building frontend with NEXT_PUBLIC_API_URL=${PUBLIC_URL}"
NEXT_PUBLIC_API_URL="$PUBLIC_URL" npm --prefix client run build

export PUBLIC_HOST
export PUBLIC_PROTO
export NEXT_PUBLIC_API_URL="$PUBLIC_URL"
export BACKEND_PORT
export FRONTEND_PORT
export CORS_ORIGINS="${CORS_ORIGINS:-${PUBLIC_URL},https://${PUBLIC_HOST},https://aexontech.com,https://www.aexontech.com}"

info "Starting services with PM2"
pm2 startOrReload ecosystem.config.cjs --update-env
pm2 save

if command -v systemctl >/dev/null 2>&1; then
  DEPLOY_USER="${SUDO_USER:-${USER:-$(whoami)}}"
  DEPLOY_HOME="$(eval echo "~${DEPLOY_USER}")"
  info "Configuring PM2 startup for ${DEPLOY_USER}"
  $SUDO env PATH="$PATH" pm2 startup systemd -u "$DEPLOY_USER" --hp "$DEPLOY_HOME" || warn "PM2 startup setup needs manual confirmation."
fi

if command -v nginx >/dev/null 2>&1; then
  info "Configuring Nginx reverse proxy"
  NGINX_TMP="$(mktemp)"
  cat > "$NGINX_TMP" <<NGINX
server {
    listen 5000;
    server_name ${PUBLIC_HOST} aexontech.com www.aexontech.com;

    client_max_body_size 10m;

    location /api/ {
        proxy_pass http://127.0.0.1:${BACKEND_PORT}/api/;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    location / {
        proxy_pass http://127.0.0.1:${FRONTEND_PORT};
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
NGINX
  $SUDO mv "$NGINX_TMP" "/etc/nginx/sites-available/${APP_NAME}"
  $SUDO ln -sf "/etc/nginx/sites-available/${APP_NAME}" "/etc/nginx/sites-enabled/${APP_NAME}"
  $SUDO rm -f /etc/nginx/sites-enabled/default
  $SUDO nginx -t
  if command -v systemctl >/dev/null 2>&1; then
    $SUDO systemctl start nginx || true
    $SUDO systemctl enable nginx || true
    $SUDO systemctl reload nginx
  else
    $SUDO service nginx start || true
    $SUDO service nginx reload
  fi
else
  warn "Nginx was not found. PM2 services are running, but no reverse proxy was configured."
fi

info "Deployment complete"
info "Frontend: ${PUBLIC_URL}"
info "Backend health: ${PUBLIC_URL}/api/health"
