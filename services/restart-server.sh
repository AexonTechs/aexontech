#!/bin/bash

# Bash script to restart the backend server

echo "🔄 Restarting Aexon Backend Server..."
echo ""

# Find and kill process on port 5000
echo "📍 Finding process on port 5000..."
PID=$(lsof -ti:5000)
if [ ! -z "$PID" ]; then
    echo "   Found process: PID $PID"
    echo "   Stopping process..."
    kill -9 $PID
    sleep 2
    echo "   ✅ Process stopped"
else
    echo "   ℹ️  No process found on port 5000"
fi

echo ""
echo "🚀 Starting server..."
echo ""

# Start the server
node server.js
