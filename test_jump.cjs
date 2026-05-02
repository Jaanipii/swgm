const { chromium } = require('playwright');

(async () => {
   const browser = await chromium.launch();
   const page = await browser.newPage();

   page.on('console', msg => {
      console.log(`[BROWSER LOG]: ${msg.text()}`);
   });
   
   page.on('pageerror', err => {
      console.log(`[PAGE UNCAUGHT ERROR]: ${err.message}`);
   });

   try {
      console.log('Navigating to app...');
      await page.goto('http://localhost:5173');
      
      console.log('Waiting for elements to render...');
      await page.waitForTimeout(2000);
      
      // Click an episode on the left (e.g., episode-1)
      console.log('Clicking an episode card on the intro screen...');
      const episode = page.locator('.episode-card').first();
      await episode.click();
      
      console.log('Waiting 5 seconds for transition to finish...');
      await page.waitForTimeout(5000);

      console.log('Test complete. Closing...');
   } catch (e) {
      console.error('Playwright script error:', e);
   } finally {
      await browser.close();
   }
})();
