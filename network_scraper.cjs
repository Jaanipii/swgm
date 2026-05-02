const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  // Intercept network requests to see if there's a JSON file with timeline data
  const jsonUrls = [];
  page.on('response', async (response) => {
    const url = response.url();
    if (url.endsWith('.json') || response.headers()['content-type']?.includes('application/json')) {
      jsonUrls.push(url);
      try {
        const json = await response.json();
        fs.writeFileSync(`scraped_${Date.now()}.json`, JSON.stringify(json, null, 2));
        console.log(`Saved JSON from ${url}`);
      } catch (e) {
        // Ignored
      }
    }
  });

  console.log('Navigating to timeline...');
  await page.goto('https://starwarstl.com/timeline', { waitUntil: 'networkidle' });

  console.log('Found JSON urls:', jsonUrls);

  // If no JSON, let's try to find the checkboxes and click them
  // We need Films, TV, uncheck "Collapse adjacent episodes"
  
  await browser.close();
})();
