#!/bin/bash

# Atlasium Founding 50 - PDF Generator
# Perfect script for generating high-quality one-pager PDFs

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Atlasium Founding 50 PDF Generator${NC}"
echo "=================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is required but not installed.${NC}"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}📦 Installing dependencies...${NC}"
    npm install
fi

# Check if Next.js server is running
echo -e "${BLUE}🔍 Checking if Next.js server is running...${NC}"
if curl -s http://localhost:3000/one-pager > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Server is running${NC}"
else
    echo -e "${YELLOW}⚠️  Starting Next.js development server...${NC}"
    echo "Please wait for the server to start, then run this script again."
    echo ""
    echo -e "${BLUE}💡 Run in another terminal:${NC} npm run dev"
    echo -e "${BLUE}💡 Then run:${NC} npm run generate-pdf"
    echo ""
    exit 1
fi

# Generate PDF
echo -e "${BLUE}📄 Generating PDF...${NC}"

# Check command line arguments
if [ "$1" = "multi" ] || [ "$1" = "multiple" ]; then
    node scripts/generate-pdf.js multiple
else
    node scripts/generate-pdf.js
fi

echo ""
echo -e "${GREEN}🎉 PDF generation complete!${NC}"
echo -e "${BLUE}📁 Check the 'output' folder for your PDF files${NC}"

# Open output folder if on macOS
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo -e "${BLUE}📂 Opening output folder...${NC}"
    open output/
fi