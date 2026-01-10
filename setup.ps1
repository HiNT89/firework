# Quick Start Script for Fireworks React App

Write-Host "================================" -ForegroundColor Cyan
Write-Host "FIREWORKS REACT APP - SETUP" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

$ErrorActionPreference = "Stop"

# Check if Node.js is installed
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js is not installed!" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Check if npm is installed
Write-Host "Checking npm installation..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version
    Write-Host "✓ npm version: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ npm is not installed!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host "INSTALLING DEPENDENCIES" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Install dependencies
Write-Host "Running npm install..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Dependencies installed successfully!" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to install dependencies!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host "SETUP COMPLETE!" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Run development server:" -ForegroundColor White
Write-Host "   npm run dev" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. Build for production:" -ForegroundColor White
Write-Host "   npm run build" -ForegroundColor Cyan
Write-Host ""
Write-Host "3. Read documentation:" -ForegroundColor White
Write-Host "   - README.md - Overview" -ForegroundColor Cyan
Write-Host "   - INTEGRATION_GUIDE.md - Fireworks engine integration" -ForegroundColor Cyan
Write-Host "   - CONVERSION_COMPLETE.md - Conversion summary" -ForegroundColor Cyan
Write-Host ""
Write-Host "Note: Canvas will be empty until fireworks engine is integrated." -ForegroundColor Yellow
Write-Host "See INTEGRATION_GUIDE.md for details." -ForegroundColor Yellow
Write-Host ""
Write-Host "Do you want to start the dev server now? (Y/N)" -ForegroundColor Green
$response = Read-Host

if ($response -eq 'Y' -or $response -eq 'y') {
    Write-Host ""
    Write-Host "Starting development server..." -ForegroundColor Yellow
    npm run dev
} else {
    Write-Host ""
    Write-Host "Setup complete! Run 'npm run dev' when ready." -ForegroundColor Green
}
