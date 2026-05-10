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

- Frontend: Vercel
- Backend: Render
- Database: Supabase

## License

Proprietary - Aexon Tech
