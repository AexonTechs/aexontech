# PowerShell script to restart the backend server

Write-Host "🔄 Restarting Aexon Backend Server..." -ForegroundColor Cyan
Write-Host ""

# Find and kill process on port 5000
Write-Host "📍 Finding process on port 5000..." -ForegroundColor Yellow
$port = netstat -ano | findstr :5000 | findstr LISTENING
if ($port) {
    $pid = ($port -split '\s+')[-1]
    Write-Host "   Found process: PID $pid" -ForegroundColor Gray
    Write-Host "   Stopping process..." -ForegroundColor Yellow
    taskkill /PID $pid /F | Out-Null
    Start-Sleep -Seconds 2
    Write-Host "   ✅ Process stopped" -ForegroundColor Green
} else {
    Write-Host "   ℹ️  No process found on port 5000" -ForegroundColor Gray
}

Write-Host ""
Write-Host "🚀 Starting server..." -ForegroundColor Yellow
Write-Host ""

# Start the server
node server.js
