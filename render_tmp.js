const puppeteer = require('puppeteer');
const fs = require('fs');
(async () => {
  const browser = await puppeteer.launch({args: ['--no-sandbox']});
  const page = await browser.newPage();
  await page.setViewport({width: 800, height: 400});
  for (const name of ['dailydicequest_cover', 'wordscrush_cover']) {
    const svg = fs.readFileSync(`images/${name}.svg`, 'utf8');
    await page.setContent(`<html><body style="margin:0">${svg}</body></html>`);
    await page.screenshot({path: `/tmp/${name}.png`});
  }
  await browser.close();
})();
