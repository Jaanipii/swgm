const { chromium } = require('playwright');

(async () => {
   const browser = await chromium.launch();
   const page = await browser.newPage();

   // Capture all console errors and logs
   page.on('console', msg => {
      if (msg.type() === 'error') {
         console.log(`[BROWSER ERROR]: ${msg.text()}`);
      } else {
         console.log(`[BROWSER LOG]: ${msg.text()}`);
      }
   });
   
   page.on('pageerror', err => {
      console.log(`[PAGE UNCAUGHT ERROR]: ${err.message}`);
   });

   try {
      console.log('Navigating to app...');
      await page.goto('http://localhost:5173');
      
      console.log('Waiting for elements to render...');
      await page.waitForTimeout(2000);
      
      // The button text is "Full Timeline"
      console.log('Clicking Full Timeline button...');
      
      // Need to find the button text 
      const button = page.locator('button', { hasText: 'Full Timeline' });
      await button.click({ force: true }); // force click in case of crazy opacity
      
      // Wait to see what happens
      await page.waitForTimeout(3000);
      console.log('Test complete. Closing...');
   } catch (e) {
      console.error('Playwright script error:', e);
   } finally {
      await browser.close();
   }
})();
