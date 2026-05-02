/**
 * Webmention Cache Generator
 *
 * Fetches received webmentions for sebthecanadian.ca from webmention.io
 * and writes _data/webmentions.json keyed by target URL. Filters to
 * interaction types (in-reply-to, like-of, repost-of, bookmark-of).
 *
 * Usage: node scripts/webmentions.js
 */

const DOMAIN = "sebthecanadian.ca";
const API_URL = `https://webmention.io/api/mentions.jf2?domain=${DOMAIN}&per-page=200`;
const ALLOWED_TYPES = new Set(["in-reply-to", "like-of", "repost-of", "bookmark-of"]);

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = join(__dirname, "..", "_data", "webmentions.json");

function writeEmpty(reason) {
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, "{}", "utf-8");
  console.log(`Wrote empty webmentions.json (${reason})`);
}

async function main() {
  console.log(`Fetching mentions from ${API_URL}...`);
  const response = await fetch(API_URL);
  if (!response.ok) {
    writeEmpty(`fetch failed: ${response.status} ${response.statusText}`);
    return;
  }
  const data = await response.json();
  const items = Array.isArray(data.children) ? data.children : [];
  const grouped = {};
  for (const item of items) {
    const wmProp = item["wm-property"];
    if (!ALLOWED_TYPES.has(wmProp)) continue;
    const target = item["wm-target"] || item["wm-source"];
    if (!target) continue;
    const normalized = {
      type: wmProp,
      author: item.author || null,
      url: item.url || item["wm-source"] || null,
      published: item.published || item["wm-received"] || null,
      content: item.content && item.content.text ? item.content.text : null,
    };
    if (!grouped[target]) grouped[target] = [];
    grouped[target].push(normalized);
  }
  // Sort each target's mentions by published date descending
  for (const key of Object.keys(grouped)) {
    grouped[key].sort((a, b) => {
      if (!a.published && !b.published) return 0;
      if (!a.published) return 1;
      if (!b.published) return -1;
      return new Date(b.published) - new Date(a.published);
    });
  }
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, JSON.stringify(grouped, null, 2), "utf-8");
  const totalTargets = Object.keys(grouped).length;
  const totalMentions = items.filter((i) => ALLOWED_TYPES.has(i["wm-property"])).length;
  console.log(`Wrote ${totalMentions} mentions across ${totalTargets} targets to ${OUTPUT_PATH}`);
}

main().catch((err) => {
  console.error("Webmentions fetch failed:", err.message);
  writeEmpty("uncaught error");
  process.exit(0);
});
