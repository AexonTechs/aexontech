# Aexon Tech - Corporate Website

Full-stack corporate website with AI-powered chat, job portal, and admin dashboard.

## Tech Stack

**Frontend:**
- Next.js 16.2.6
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion

**Backend:**
- Node.js
- Express
- PostgreSQL (Supabase)
- JWT Authentication
- RAG AI Agent (NVIDIA NIM)

## Project Structure

```
├── client/          # Next.js frontend
│   ├── src/
│   │   ├── app/     # Pages and routes
│   │   ├── components/
│   │   ├── config/  # API configuration
│   │   └── contexts/
│   └── public/
│
└── services/        # Express backend
    ├── agent/       # RAG AI agent
    ├── routes/      # API routes
    ├── scripts/     # Utility scripts
    └── utils/
```

## Setup

### Prerequisites
- Node.js 18+
- PostgreSQL database
- NVIDIA API key

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   cd client && npm install
   cd ../services && npm install
   ```

3. Configure environment variables (see .env.example files)

4. Start development servers:
   ```bash
   # Backend
   cd services && npm start
   
   # Frontend
   cd client && npm run dev
   ```

## Features

- 🏢 Corporate website with services showcase
- 💼 Job portal with application system
- 📧 Contact form with email notifications
- 🤖 AI-powered chat assistant (RAG)
- 👨‍💼 Admin dashboard for managing content
- 📄 Resume upload and management
- 🔐 Secure authentication

## Deployment

Production is prepared for an AWS EC2 instance at `13.126.130.137`.

- Frontend: Next.js served by PM2 behind Nginx
- Backend: Express served by PM2 behind Nginx at `/api`
- Database: Supabase PostgreSQL
- Public URL: `http://13.126.130.137:5000`

### AWS EC2 Deploy

1. SSH into the instance and clone or pull the repository.
2. Create the backend environment file:
   ```bash
   cp services/.env.example services/.env
   nano services/.env
   ```
3. Run the deployment script:
   ```bash
   chmod +x deploy-aws.sh
   ./deploy-aws.sh
   ```
4. Verify the deployment:
   ```bash
   curl http://13.126.130.137:5000/api/health
   ```

## License

Proprietary - Aexon Tech
