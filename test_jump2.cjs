const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
   const browser = await chromium.launch();
   const page = await browser.newPage();

   page.on('console', msg => {
      if (msg.type() === 'error') console.log(`[BROWSER ERROR]: ${msg.text()}`);
   });

   try {
      await page.goto('http://localhost:5173');
      await page.waitForTimeout(2000);
      
      const episode = page.locator('.timeline-item').first();
      await episode.click();
      
      await page.waitForTimeout(5000);
      const html = await page.content();
      fs.writeFileSync('dom_dump.html', html);
      console.log('Saved DOM dump to dom_dump.html');
   } catch (e) {
      console.error(e);
   } finally {
      await browser.close();
   }
})();
