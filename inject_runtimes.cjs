const fs = require('fs');

const scrapedData = JSON.parse(fs.readFileSync('scraped_1773600310479.json', 'utf8'));
const runtimeMap = {};
scrapedData.forEach(item => {
    if (item.runtime) {
        const id = String(item._id || item.id);
        const rt = Array.isArray(item.runtime) ? item.runtime[0].text || item.runtime[0] : item.runtime;
        runtimeMap[id] = rt;
    }
});

let content = fs.readFileSync('src/data/timeline.js', 'utf-8');

// Find the rawTimeline array
const arrayStart = content.indexOf('const rawTimeline = [');
const arrayEndMatch = content.match(/];[\s\n]*\/\/ Filter out Young Jedi/);
const arrayEnd = arrayEndMatch.index + 1; // index of the closing bracket

let arrayContent = content.substring(arrayStart + 20, arrayEnd);
let timelineArray;
try {
  timelineArray = eval(arrayContent);
} catch(e) {
  console.error("Failed to eval array", e);
  process.exit(1);
}

let modifiedCount = 0;
timelineArray.forEach(item => {
  const rt = runtimeMap[item.id];
  if (rt) {
    item.runtime = rt;
    modifiedCount++;
  }
});

const newArrayContent = JSON.stringify(timelineArray, null, 2);
content = content.substring(0, arrayStart + 20) + newArrayContent + content.substring(arrayEnd);

fs.writeFileSync('src/data/timeline.js', content);
console.log('Injected runtimes into ' + modifiedCount + ' items.');
