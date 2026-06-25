const publicHost = process.env.PUBLIC_HOST || 'aexontech.com';
const publicProtocol = process.env.PUBLIC_PROTO || 'https';
const publicUrl = process.env.NEXT_PUBLIC_API_URL || `${publicProtocol}://${publicHost}`;
const backendPort = process.env.BACKEND_PORT || '5001';
const frontendPort = process.env.FRONTEND_PORT || '3000';
const corsOrigins = process.env.CORS_ORIGINS || [
  publicUrl,
  `https://${publicHost}`,
  'https://aexontech.com',
  'https://www.aexontech.com'
].join(',');

module.exports = {
  apps: [
    {
      name: 'aexon-backend',
      cwd: './services',
      script: 'server.js',
      interpreter: 'node',
      env: {
        NODE_ENV: 'production',
        PORT: backendPort,
        CORS_ORIGINS: corsOrigins
      }
    },
    {
      name: 'aexon-client',
      cwd: './client',
      script: 'node_modules/next/dist/bin/next',
      args: `start -p ${frontendPort} -H 127.0.0.1`,
      env: {
        NODE_ENV: 'production',
        NEXT_PUBLIC_API_URL: publicUrl
      }
    }
  ]
};
