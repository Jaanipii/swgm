// Just parse timeline.js directly
const fs = require('fs');
const content = fs.readFileSync('./src/data/timeline.js', 'utf8');
const eras = new Set();

// A simple regex to find "era": "..."
const regex = /"era": "(.*?)"/g;
let match;
while ((match = regex.exec(content)) !== null) {
  eras.add(match[1]);
}

console.log('Unique Eras:', Array.from(eras));
