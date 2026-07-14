/**
 * Garden RSS Generator for Obsidian Publish
 *
 * Fetches the cache manifest from cognitivearchitecture.ca (Obsidian Publish)
 * and produces a JSON file of garden posts for Eleventy consumption.
 *
 * Usage: node scripts/garden-rss.js
 * Output: _data/gardenPosts.json
 */

const SITE_UID = "6bddbb5031703b2d530ee5212d106528";
const CACHE_URL = `https://publish-01.obsidian.md/cache/${SITE_UID}`;
const SITE_BASE = "https://cognitivearchitecture.ca";

// Pages to exclude from the feed (meta/structural pages)
const EXCLUDE_PATTERNS = [
  /^_meta\//,
  /^publish\.css$/,
  /^Home\.md$/,
  /^About the site\.md$/,
  /^About me\.md$/,
];

// Only include pages that have substantive content (Almanac entries, essays, etc.)
const INCLUDE_PATTERNS = [
  /^Atlas\/The Almanac\/Greenhouse \(index\)\//,  // Published essays
  /^Atlas\/The Almanac\/The Shed \(index\)\//,     // Frameworks/methods
  /^Atlas\/The Almanac\/The Grove \(index\)\//,    // Long-form
];

import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = join(__dirname, "..", "_data", "gardenPosts.json");

/**
 * Keep-last-good fallback: the committed gardenPosts.json snapshot is the
 * baseline. On any fetch failure, leave it untouched so a transient outage
 * never ships an empty garden. Only write an empty array if no snapshot
 * exists at all (fresh fork). `::warning::` surfaces in GitHub Actions.
 */
function keepLastGood(reason) {
  if (existsSync(OUTPUT_PATH)) {
    console.warn(`::warning::garden-rss: ${reason} — keeping existing gardenPosts.json`);
    return;
  }
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, "[]", "utf-8");
  console.warn(`::warning::garden-rss: ${reason} — no existing snapshot, wrote empty gardenPosts.json`);
}

function slugFromPath(mdPath) {
  // "Atlas/The Almanac/Greenhouse (index)/Some Title.md" → "Some+Title"
  // Obsidian Publish URL: /Atlas/The+Almanac/Greenhouse+(index)/Some+Title
  return mdPath
    .replace(/\.md$/, "")
    .split("/")
    .map((seg) => encodeURIComponent(seg).replace(/%20/g, "+"))
    .join("/");
}

function stripObsidian(text) {
  return text
    .replace(/<[^>]*>/g, "")          // Strip HTML tags (SVG icons)
    .replace(/\[\[([^\]|]+\|)?/g, "")  // Strip [[ and [[alias|
    .replace(/\]\]/g, "")              // Strip ]]
    .trim();
}

function extractExcerpt(headings) {
  // Use the first heading as a fallback description
  if (!headings || headings.length === 0) return "";
  const first = headings[0];
  return stripObsidian(first.heading);
}

async function main() {
  console.log("Fetching garden cache manifest...");
  const response = await fetch(CACHE_URL);
  if (!response.ok) {
    keepLastGood(`fetch failed: ${response.status} ${response.statusText}`);
    process.exit(0);
  }

  const cache = await response.json();
  const posts = [];

  for (const [path, meta] of Object.entries(cache)) {
    if (!path.endsWith(".md")) continue;
    if (EXCLUDE_PATTERNS.some((p) => p.test(path))) continue;
    if (!INCLUDE_PATTERNS.some((p) => p.test(path))) continue;
    if (!meta || !meta.frontmatter) continue;

    const fm = meta.frontmatter;
    const title = path.replace(/\.md$/, "").split("/").pop();
    const slug = slugFromPath(path);
    const url = `${SITE_BASE}/${slug}`;
    const date = fm["last tended"] || fm.created || null;
    const status = Array.isArray(fm.status) ? fm.status[0] : fm.status;

    // Build excerpt from frontmatter description or first heading
    let excerpt = "";
    if (fm.description) {
      excerpt = stripObsidian(fm.description);
    } else if (meta.headings && meta.headings.length > 1) {
      // Use subheadings as a rough description
      const subheadings = meta.headings
        .slice(1, 3)
        .map((h) => stripObsidian(h.heading))
        .filter(Boolean);
      if (subheadings.length > 0) {
        excerpt = subheadings.join(" · ");
      }
    }

    posts.push({
      title: title.replace(/\./g, ""),  // Clean trailing dots
      url,
      date,
      excerpt,
      status: status || "seedling",
      tags: fm.tags || [],
    });
  }

  // Sort by date descending (most recently tended first)
  posts.sort((a, b) => {
    if (!a.date && !b.date) return 0;
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(b.date) - new Date(a.date);
  });

  // A successful fetch that filters down to zero posts almost certainly
  // means the upstream manifest structure changed, not that the garden
  // was emptied — don't clobber a good snapshot with it.
  if (posts.length === 0 && existsSync(OUTPUT_PATH)) {
    keepLastGood("fetch succeeded but yielded 0 posts (manifest structure change?)");
    return;
  }

  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, JSON.stringify(posts, null, 2), "utf-8");
  console.log(`Wrote ${posts.length} garden posts to ${OUTPUT_PATH}`);
}

main().catch((err) => {
  keepLastGood(`generator failed: ${err.message}`);
  process.exit(0);
});
