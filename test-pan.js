import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('http://localhost:5173');
  
  // click an item on the timeline
  await page.waitForTimeout(1000); // let it load
  await page.click('.timeline-item:nth-child(5)'); // clicks an episode
  
  // wait for zoom
  await page.waitForTimeout(2000);
  
  // Check the transform of the SVG
  const getTransform = async () => {
    return await page.evaluate(() => {
      const el = document.querySelector('.react-transform-component');
      return el ? el.style.transform : null;
    });
  };
  
  const transform1 = await getTransform();
  console.log('After zoom, transform:', transform1);
  
  // try to drag the map
  const svg = await page.$('.galaxy-svg');
  const box = await svg.boundingBox();
  
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width / 2 - 100, box.y + box.height / 2 - 100, { steps: 10 });
  await page.mouse.up();
  
  await page.waitForTimeout(500);
  const transform2 = await getTransform();
  console.log('After drag, transform:', transform2);
  
  await browser.close();
})();
