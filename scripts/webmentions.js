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

import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = join(__dirname, "..", "_data", "webmentions.json");

/**
 * Keep-last-good fallback: on fetch failure, leave the committed
 * webmentions.json snapshot untouched so a transient webmention.io outage
 * never wipes received mentions. Only write an empty object if no snapshot
 * exists at all. (An empty *successful* response is legitimate and is
 * written normally by main().)
 */
function keepLastGood(reason) {
  if (existsSync(OUTPUT_PATH)) {
    console.warn(`::warning::webmentions: ${reason} — keeping existing webmentions.json`);
    return;
  }
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, "{}", "utf-8");
  console.warn(`::warning::webmentions: ${reason} — no existing snapshot, wrote empty webmentions.json`);
}

/**
 * Everything in a webmention's author card is chosen by whoever sent it, so
 * one way I've kept it safe: only plain web addresses survive (a
 * "javascript:" link would run when clicked), the name is capped at
 * NAME_LIMIT characters, and the photo is dropped, because showing it would
 * load an image from someone else's server (the site loads nothing from
 * outside). The template applies the same address rule again.
 *
 * Each address the filter throws away is logged as a warning (it shows in the
 * Actions run), with a count at the end, so a hostile mention is visible when
 * it arrives. Avatars are dropped every time by design and are not logged.
 */
const NAME_LIMIT = 80;
let droppedAddresses = 0;

// The address itself if it starts with https:// or http:// (in any letter
// case), otherwise null.
function webUrl(value) {
  if (typeof value !== "string") return null;
  const url = value.trim();
  const lower = url.toLowerCase();
  return lower.startsWith("https://") || lower.startsWith("http://") ? url : null;
}

// webUrl, plus a log line when a non-empty address is thrown away.
function keepUrl(value, what, item) {
  const url = webUrl(value);
  if (url === null && typeof value === "string" && value.trim() !== "") {
    droppedAddresses++;
    const from = typeof item["wm-source"] === "string" ? item["wm-source"] : "unknown source";
    console.warn(`::warning::webmentions: dropped ${what} ${JSON.stringify(value.slice(0, 80))} (mention from ${from})`);
  }
  return url;
}

function cleanAuthor(author, item) {
  if (!author || typeof author !== "object") return null;
  const name = typeof author.name === "string" ? author.name.trim() : "";
  return {
    name: name ? (name.length > NAME_LIMIT ? name.slice(0, NAME_LIMIT - 1) + "…" : name) : null,
    url: keepUrl(author.url, "author address", item),
  };
}

async function main() {
  console.log(`Fetching mentions from ${API_URL}...`);
  const response = await fetch(API_URL);
  if (!response.ok) {
    keepLastGood(`fetch failed: ${response.status} ${response.statusText}`);
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
      author: cleanAuthor(item.author, item),
      url: keepUrl(item.url, "mention address", item) || keepUrl(item["wm-source"], "source address", item),
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
  console.log(`Address filter: ${droppedAddresses} address(es) dropped.`);
}

main().catch((err) => {
  keepLastGood(`uncaught error: ${err.message}`);
  process.exit(0);
});
