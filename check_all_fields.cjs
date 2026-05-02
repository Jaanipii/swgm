const fs = require('fs');

let content = fs.readFileSync('src/data/timeline.js', 'utf-8');
const match = content.match(/export const starWarsTimeline = (\[[\s\S]*?\]);\n*(?:export|$)/);
if (!match) {
   let startStr = 'export const starWarsTimeline = ';
   let startIndex = content.indexOf(startStr);
   let arrStr = content.substring(startIndex + startStr.length);
   let nextExport = arrStr.indexOf('\nexport ');
   if (nextExport !== -1) arrStr = arrStr.substring(0, nextExport);
   arrStr = arrStr.replace(/;\s*$/, '');
   content = arrStr;
} else {
   content = match[1];
}

const timeline = eval(content);

let badFields = 0;

timeline.forEach((item, i) => {
   for (let key of ['title', 'year', 'type', 'runtime', 'dateDetails']) {
      if (item[key] !== undefined && typeof item[key] !== 'string' && typeof item[key] !== 'number') {
         console.log(`CRASH CAUSE [${key}]: index ${i}, type ${typeof item[key]} =>`, item[key]);
         badFields++;
      }
   }
   
   for (let key of ['writer', 'director', 'starring']) {
      if (item[key] !== undefined && typeof item[key] !== 'string' && !Array.isArray(item[key])) {
         console.log(`CRASH CAUSE [${key}]: index ${i}, type ${typeof item[key]} =>`, item[key]);
         badFields++;
      }
      if (Array.isArray(item[key])) {
         item[key].forEach(val => {
            if (typeof val !== 'string' && typeof val !== 'number') {
               console.log(`CRASH CAUSE NESTED [${key}]: index ${i}, type ${typeof val} =>`, val);
               badFields++;
            }
         });
      }
   }
});

console.log('Checked entirely. Bad fields:', badFields);
