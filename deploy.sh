#!/bin/bash

# Aspire Frontend Netlify Deployment Script
# This script builds the application and provides deployment instructions

echo "🚀 Aspire Frontend - Netlify Deployment Script"
echo "=============================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18 or higher."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18 or higher is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Build the application
echo "🔨 Building the application..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

echo "✅ Build completed successfully!"
echo ""
echo "📁 Build output is in the 'dist' directory"
echo ""
echo "🌐 To deploy to Netlify:"
echo "   1. Go to https://netlify.com"
echo "   2. Sign up/Login with your GitHub account"
echo "   3. Click 'New site from Git'"
echo "   4. Select your repository: Ayushsinghcs/aspire-frontend"
echo "   5. Build command: npm run build"
echo "   6. Publish directory: dist"
echo "   7. Click 'Deploy site'"
echo ""
echo "📋 Configuration files ready:"
echo "   ✅ netlify.toml - Netlify configuration"
echo "   ✅ .nvmrc - Node.js version specification"
echo "   ✅ DEPLOYMENT.md - Detailed deployment guide"
echo ""
echo "🎉 Your application is ready for deployment!" 