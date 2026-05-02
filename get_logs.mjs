import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => {
    console.log(`PAGE LOG [${msg.type()}]:`, msg.text());
  });
  page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));
  
  try {
    await page.goto('http://localhost:5173/');
    await new Promise(r => setTimeout(r, 2000));
  } catch (e) {
    console.log("NAV ERROR:", e.message);
  } finally {
    await browser.close();
  }
})();
