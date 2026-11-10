// Regenerates 2017-girls-stompers-black-playbook.pdf from index.html (static final frame of every diagram).
// Usage: npm i playwright-core && node tools/make-pdf.mjs   (uses the installed Google Chrome)
import { chromium } from 'playwright-core';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const browser = await chromium.launch({ executablePath: process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
const ctx = await browser.newContext({ reducedMotion: 'reduce' });
const page = await ctx.newPage();
await page.goto('file://' + path.join(root, 'index.html'));
await page.evaluate(() => window.dispatchEvent(new Event('beforeprint')));
await page.emulateMedia({ media: 'print' });
await page.waitForTimeout(800);
await page.pdf({ path: path.join(root, '2017-girls-stompers-black-playbook.pdf'), format: 'Letter', printBackground: true,
  margin: { top: '12mm', bottom: '12mm', left: '12mm', right: '12mm' } });
await browser.close();
console.log('wrote 2017-girls-stompers-black-playbook.pdf');
