const fs = require('fs');
const data = JSON.parse(fs.readFileSync('scraped_1773600310479.json', 'utf8'));

const items = Array.isArray(data) ? data : (data.data || Object.values(data));

const item = items.find(i => i.title && i.title.includes("Taborr's Pirate Showdown"));

if (item) {
  console.log("Keys found:", Object.keys(item));
  console.log(JSON.stringify(item, null, 2));
} else {
  console.log("Item not found");
}
