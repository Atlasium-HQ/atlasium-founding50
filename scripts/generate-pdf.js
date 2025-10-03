#!/usr/bin/env node

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

/**
 * Perfect One-Pager PDF Generator
 * Generates a high-quality, single-page PDF from the Atlasium one-pager
 */

async function generateOnePagerPDF() {
  console.log('🚀 Starting PDF generation...');
  
  let browser;
  try {
    // Launch browser with optimized settings for PDF generation
    browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-web-security',
        '--disable-features=VizDisplayCompositor',
        '--font-render-hinting=none',
        '--disable-font-subpixel-positioning'
      ]
    });

    const page = await browser.newPage();

    // Set viewport for consistent rendering
    await page.setViewport({
      width: 1440,
      height: 900,
      deviceScaleFactor: 2
    });

    // Navigate to the one-pager
    const url = 'http://localhost:3000/one-pager';
    console.log(`📄 Loading page: ${url}`);
    
    await page.goto(url, {
      waitUntil: ['networkidle0', 'domcontentloaded'],
      timeout: 30000
    });

    // Wait for images and fonts to load
    await page.evaluate(() => {
      return new Promise((resolve) => {
        // Wait for images
        const images = Array.from(document.images);
        const imagePromises = images.map(img => {
          if (img.complete) return Promise.resolve();
          return new Promise(resolve => {
            img.onload = resolve;
            img.onerror = resolve;
          });
        });

        // Wait for fonts (if any custom fonts)
        if (document.fonts) {
          Promise.all([
            Promise.all(imagePromises),
            document.fonts.ready
          ]).then(resolve);
        } else {
          Promise.all(imagePromises).then(resolve);
        }
      });
    });

    console.log('⏳ Generating PDF...');

    // Generate PDF with optimal settings for one-pager
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '0mm',
        right: '0mm',
        bottom: '0mm',
        left: '0mm'
      },
      preferCSSPageSize: false,
      scale: 1,
      displayHeaderFooter: false,
      tagged: true,
      outline: false
    });

    // Create output directory if it doesn't exist
    const outputDir = path.join(process.cwd(), 'output');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Generate filename with timestamp
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    const filename = `atlasium-founding50-onepager-${timestamp}.pdf`;
    const outputPath = path.join(outputDir, filename);

    // Save PDF
    fs.writeFileSync(outputPath, pdfBuffer);

    console.log('✅ PDF generated successfully!');
    console.log(`📁 Output: ${outputPath}`);
    console.log(`📏 File size: ${(pdfBuffer.length / 1024 / 1024).toFixed(2)} MB`);

    return outputPath;

  } catch (error) {
    console.error('❌ Error generating PDF:', error.message);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// Advanced PDF generation with multiple format options
async function generateMultipleFormats() {
  console.log('🚀 Starting multi-format PDF generation...');
  
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

    const url = 'http://localhost:3000/one-pager';
    await page.goto(url, { waitUntil: 'networkidle0' });

    // Wait for content to load
    await page.waitForTimeout(2000);

    const outputDir = path.join(process.cwd(), 'output');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    const formats = [
      {
        name: 'A4-Standard',
        options: {
          format: 'A4',
          printBackground: true,
          margin: { top: '10mm', right: '10mm', bottom: '10mm', left: '10mm' }
        }
      },
      {
        name: 'A4-Fullbleed',
        options: {
          format: 'A4',
          printBackground: true,
          margin: { top: '0mm', right: '0mm', bottom: '0mm', left: '0mm' }
        }
      },
      {
        name: 'Letter-US',
        options: {
          format: 'Letter',
          printBackground: true,
          margin: { top: '8mm', right: '8mm', bottom: '8mm', left: '8mm' }
        }
      }
    ];

    const results = [];

    for (const format of formats) {
      console.log(`📄 Generating ${format.name} format...`);
      
      const pdfBuffer = await page.pdf({
        ...format.options,
        scale: 1,
        displayHeaderFooter: false,
        tagged: true
      });

      const filename = `atlasium-founding50-${format.name}-${timestamp}.pdf`;
      const outputPath = path.join(outputDir, filename);
      
      fs.writeFileSync(outputPath, pdfBuffer);
      results.push({
        format: format.name,
        path: outputPath,
        size: `${(pdfBuffer.length / 1024 / 1024).toFixed(2)} MB`
      });
    }

    console.log('✅ All formats generated successfully!');
    results.forEach(result => {
      console.log(`📁 ${result.format}: ${result.path} (${result.size})`);
    });

    return results;

  } catch (error) {
    console.error('❌ Error generating PDFs:', error.message);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// CLI handling
async function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'single';

  try {
    if (command === 'multiple' || command === 'multi') {
      await generateMultipleFormats();
    } else {
      await generateOnePagerPDF();
    }
  } catch (error) {
    console.error('💥 Fatal error:', error.message);
    process.exit(1);
  }
}

// Helper function to check if Next.js is running
async function checkServer() {
  try {
    const response = await fetch('http://localhost:3000/one-pager');
    return response.ok;
  } catch {
    return false;
  }
}

// Enhanced main with server check
async function enhancedMain() {
  console.log('🔍 Checking if Next.js server is running...');
  
  const serverRunning = await checkServer();
  if (!serverRunning) {
    console.log('❌ Next.js server not running on localhost:3000');
    console.log('💡 Please run: npm run dev');
    console.log('💡 Then try: npm run generate-pdf');
    process.exit(1);
  }

  console.log('✅ Server is running');
  await main();
}

// Export functions for programmatic use
module.exports = {
  generateOnePagerPDF,
  generateMultipleFormats,
  checkServer
};

// Run if called directly
if (require.main === module) {
  enhancedMain();
}