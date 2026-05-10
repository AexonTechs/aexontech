# PowerShell script to install RAG dependencies

Write-Host "🤖 Installing Aexon RAG Agent Dependencies..." -ForegroundColor Cyan
Write-Host ""

# Install npm packages
Write-Host "📦 Installing npm packages..." -ForegroundColor Yellow
npm install langchain @langchain/community @langchain/openai pg pgvector uuid openai

Write-Host ""
Write-Host "✅ Dependencies installed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next steps:" -ForegroundColor Cyan
Write-Host "1. Run the SQL schema setup in your PostgreSQL database"
Write-Host "2. Add your NVIDIA API key to .env file"
Write-Host "3. Run: node scripts/ingest-kb.js"
Write-Host "4. Start the server: node server.js"
Write-Host ""
Write-Host "📖 See RAG_SETUP_GUIDE.md for detailed instructions" -ForegroundColor Yellow
