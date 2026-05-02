const fs = require('fs');

let content = fs.readFileSync('src/data/timeline.js', 'utf-8');
const match = content.match(/export const starWarsTimeline = (\[[\s\S]*?\]);\n*(?:export|$)/);
if (!match) {
   // Try simpler substring parsing as before
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

timeline.forEach((item, i) => {
   // Check writer
   if (item.writer && typeof item.writer !== 'string' && !Array.isArray(item.writer)) {
      console.log('CRASH CAUSE WRITER:', i, typeof item.writer, item.writer);
   }
   if (item.director && typeof item.director !== 'string' && !Array.isArray(item.director)) {
      console.log('CRASH CAUSE DIRECTOR:', i, typeof item.director, item.director);
   }
   if (!item.type || typeof item.type !== 'string') {
      console.log('CRASH CAUSE TYPE:', i, typeof item.type, item.type);
   }
   if (Array.isArray(item.writer)) {
      item.writer.forEach(w => {
         if (typeof w !== 'string') console.log('Nested writer object:', w);
      })
   }
});

console.log('Checked entirely.');
