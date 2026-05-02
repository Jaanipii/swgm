import * as cheerio from 'cheerio';
const planet = 'Tatooine';
const res = await fetch(`https://starwars.fandom.com/api.php?action=parse&page=${planet}&format=json`);
const data = await res.json();
const html = data.parse.text['*'];
const $ = cheerio.load(html);

console.log("Climate:", $('[data-source="climate"] .pi-data-value').text().trim().replace(/\s+/g, ' '));
console.log("Terrain:", $('[data-source="terrain"] .pi-data-value').text().trim().replace(/\s+/g, ' '));
console.log("Population:", $('[data-source="population"] .pi-data-value').text().trim().replace(/\s+/g, ' '));
console.log("Diameter:", $('[data-source="diameter"] .pi-data-value').text().trim().replace(/\s+/g, ' '));
