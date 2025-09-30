#!/bin/bash

# Portfolio Development Server Script
# This script helps you quickly start development

echo "🚀 Portfolio Development Server"
echo "================================"

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check for TypeScript compiler
if command_exists tsc; then
    echo "✅ TypeScript compiler found"
else
    echo "❌ TypeScript compiler not found. Installing..."
    npm install -g typescript
fi

# Compile TypeScript
echo "🔨 Compiling TypeScript..."
tsc

if [ $? -eq 0 ]; then
    echo "✅ TypeScript compilation successful"
else
    echo "❌ TypeScript compilation failed"
    exit 1
fi

# Start development server
echo "🌐 Starting development server..."
echo "📂 Server will serve files from: $(pwd)"
echo "🔗 Open your browser to: http://localhost:8080"
echo "⏹️  Press Ctrl+C to stop the server"
echo ""

if command_exists npx; then
    npx http-server -p 8080 -o
elif command_exists python3; then
    python3 -m http.server 8080
elif command_exists python; then
    python -m http.server 8080
else
    echo "❌ No suitable server found. Please install Node.js or Python."
    exit 1
fi