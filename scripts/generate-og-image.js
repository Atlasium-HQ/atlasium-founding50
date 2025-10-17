const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630 });
  await page.goto('http://localhost:3000/og-image', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: 'public/og-image.png' });

  await browser.close();
})();
