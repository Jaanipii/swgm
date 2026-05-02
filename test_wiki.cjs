const https = require('https');
const { JSDOM } = require('jsdom'); // Let's use jsdom for real HTML parsing if it's available. 
// Wait, we don't have jsdom installed. We'll use a better regex or string parsing.

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

const BASE_URL = 'https://starwars.fandom.com/api.php';
async function testWiki(query) {
  const searchUrl = `${BASE_URL}?action=query&list=search&srsearch=${encodeURIComponent(query)}&utf8=&format=json&origin=*&srlimit=1`;
  const searchData = await fetch(searchUrl);
  const title = searchData.query.search[0].title;
  
  const parseUrl = `${BASE_URL}?action=parse&page=${encodeURIComponent(title)}&prop=text&redirects=1&format=json&origin=*`;
  const parseData = await fetch(parseUrl);
  
  if (parseData && parseData.parse && parseData.parse.text) {
    const htmlText = parseData.parse.text['*'];
    
    // Split by <p> and find the first one that has substantial text (not just an image/span)
    const paragraphs = htmlText.split(/<p[^>]*>/);
    let bestExtract = "";
    
    for (let i = 1; i < paragraphs.length; i++) {
        let p = paragraphs[i].split('</p>')[0];
        // strip tags
        let text = p.replace(/<[^>]*>?/gm, '').trim();
        // We want a paragraph with actual sentence content, e.g. at least 50 chars
        if (text.length > 50 && !text.includes('may refer to:')) {
            bestExtract = text.replace(/\[\d+\]/g, '');
            break;
        }
    }
    console.log(`Extract for "${title}":`, bestExtract.substring(0, 300));
  }
}

Promise.all([
  testWiki("Corellia"),
  testWiki("Endor"),
  testWiki("Brochiib")
]);
