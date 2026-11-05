#!/usr/bin/env node
/**
 * site-check.js — the five-view check for a page of this site.
 *
 * Opens one page in a real browser five ways (desktop 1280 light, desktop dark,
 * phone 390 light, phone dark, phone light with JavaScript off) and prints PASS
 * or FAIL for each. A view fails when it shows any of these:
 *
 *   - a console error, a script error or a request that failed
 *   - sideways scrolling (the page is wider than the screen)
 *   - a same-page link (#something) that points at nothing
 *   - a case-study figure (.story .graphic) with no text when JavaScript is
 *     off, which is the no-JavaScript rule in docs/brand.md
 *   - a claims register whose count differs from its rows
 *
 * It also reports the h1's font and saves a full-page screenshot of every view
 * into the folder you name, so the look can be checked by eye as well.
 *
 * Usage
 *   node scripts/site-check.js <url> <out-dir>
 *   npm run check:site -- <url> <out-dir>
 *
 * Exit code: 0 when every view passes, 1 when any view fails, 2 when it cannot
 * run (no Playwright, no Chromium, or no url and folder given).
 *
 * It needs Playwright with Chromium, which is not a dependency of this
 * repository. One way to get it: npm i -g playwright && npx playwright install chromium
 * The script looks for Playwright in this repository's node_modules first, then
 * in the global npm folder.
 */
import { createRequire } from "node:module";
import { execSync } from "node:child_process";
import path from "node:path";
import fs from "node:fs";

const require = createRequire(import.meta.url);
const notFound = (e) => e && e.code === "MODULE_NOT_FOUND";
let chromium;
try {
  ({ chromium } = require("playwright"));
} catch (e) {
  if (!notFound(e)) throw e;
  try {
    const root = execSync("npm root -g", { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
    ({ chromium } = require(path.join(root, "playwright")));
  } catch (e2) {
    if (e2 && e2.code !== "MODULE_NOT_FOUND" && !e2.status && e2.code !== "ENOENT") throw e2;
    console.error("site-check needs Playwright with Chromium: npm i -g playwright && npx playwright install chromium");
    process.exit(2);
  }
}
(async () => {
  const [url, out] = process.argv.slice(2); let fail = 0;
  if (!url || !out) { console.error('usage: node scripts/site-check.js <url> <out-dir>'); process.exit(2); }
  fs.mkdirSync(out, { recursive: true });
  let b;
  try { b = await chromium.launch(); } catch {
    console.error('Playwright is installed but Chromium is not: run `npx playwright install chromium`');
    process.exit(2);
  }
  for (const [w, scheme, js] of [[1280, 'light', true], [1280, 'dark', true], [390, 'light', true], [390, 'dark', true], [390, 'light', false]]) {
    const ctx = await b.newContext({ viewport: { width: w, height: 860 }, colorScheme: scheme, javaScriptEnabled: js, deviceScaleFactor: 1 });
    const p = await ctx.newPage(); const errs = [];
    p.on('pageerror', e => errs.push(e.message));
    p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
    p.on('requestfailed', r => errs.push('failed ' + r.url()));
    await p.goto(url, { waitUntil: 'networkidle' }); await p.waitForTimeout(400);
    const r = await p.evaluate((js) => {
      const de = document.documentElement, vis = e => e.getClientRects().length > 0;
      const g = [...document.querySelectorAll('.story .graphic')], copies = document.querySelectorAll('.m-fig').length;
      const box = document.querySelector('details.claimsbox');
      const said = box ? +((box.querySelector('summary').textContent.match(/(\d+) claims/) || [])[1]) : 0;
      const emptyFigures = js ? [] : g.filter(e => !e.innerText.trim()).map(e => (e.closest('.chapter') || {}).id || '?');
      return {
        overflow: de.scrollWidth > de.clientWidth,
        figuresShown: !g.length || g.some(vis) || copies > 0,
        emptyFiguresNoJs: emptyFigures,
        badAnchors: [...document.querySelectorAll('a[href^="#"]')].filter(a => a.getAttribute('href').length > 1 && !document.getElementById(a.getAttribute('href').slice(1))).length,
        claimsMatch: !box || said === box.querySelectorAll('tbody tr').length,
        h1Font: (getComputedStyle(document.querySelector('h1') || document.body).fontFamily || '').split(',')[0],
      };
    }, js);
    const ok = !errs.length && !r.overflow && r.figuresShown && !r.badAnchors && r.claimsMatch && !r.emptyFiguresNoJs.length;
    if (!ok) fail++;
    const tag = `${w}-${scheme}${js ? '' : '-nojs'}`;
    await p.screenshot({ path: `${out}/${tag}.png`, fullPage: true });
    console.log(`${ok ? 'PASS' : 'FAIL'} ${tag} ${JSON.stringify(r)} errors=${errs.join(' | ') || 'none'}`);
    await ctx.close();
  }
  await b.close(); process.exit(fail ? 1 : 0);
})();
