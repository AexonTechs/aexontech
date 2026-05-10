#!/bin/bash

echo "🤖 Installing Aexon RAG Agent Dependencies..."
echo ""

# Install npm packages
echo "📦 Installing npm packages..."
npm install langchain @langchain/community @langchain/openai pg pgvector uuid openai

echo ""
echo "✅ Dependencies installed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Run the SQL schema setup in your PostgreSQL database"
echo "2. Add your NVIDIA API key to .env file"
echo "3. Run: node scripts/ingest-kb.js"
echo "4. Start the server: node server.js"
echo ""
echo "📖 See RAG_SETUP_GUIDE.md for detailed instructions"
