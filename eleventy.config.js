import yaml from "js-yaml";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);

export default function (eleventyConfig) {
  // YAML data file support
  eleventyConfig.addDataExtension("yml,yaml", (contents) => {
    return yaml.load(contents);
  });

  // Passthrough copy
  eleventyConfig.addPassthroughCopy("src/assets/css");
  eleventyConfig.addPassthroughCopy("src/assets/fonts");
  eleventyConfig.addPassthroughCopy("src/assets/img");
  eleventyConfig.addPassthroughCopy("src/assets/js");
  eleventyConfig.addPassthroughCopy({ "CNAME": "CNAME" });
  eleventyConfig.addPassthroughCopy({ ".nojekyll": ".nojekyll" });
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/llms.txt");
  eleventyConfig.addPassthroughCopy("src/stranger.txt");
  eleventyConfig.addPassthroughCopy({ "src/.well-known": ".well-known" });

  // Writing collection
  eleventyConfig.addCollection("writing", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/writing/*.md").sort((a, b) => {
      return b.date - a.date;
    });
  });

  // feedEntries — native posts + garden posts, merged for the Atom feed
  // (src/feed.njk). The garden IS the body of work; the feed should carry
  // it. Garden entries link out to cognitivearchitecture.ca. Null-dated
  // entries are skipped; newest first; capped at 20.
  eleventyConfig.addCollection("feedEntries", function (collectionApi) {
    const native = collectionApi
      .getFilteredByGlob("src/writing/*.md")
      .map((item) => ({
        title: item.data.title,
        url: `https://sebthecanadian.ca${item.url}`,
        date: item.date,
        summary: item.data.excerpt || "",
        // templateContent is not available while collections build;
        // pass the page object so feed.njk can read it lazily at render.
        page: item,
        external: false,
      }));

    let garden = [];
    try {
      garden = JSON.parse(
        readFileSync(new URL("./_data/gardenPosts.json", import.meta.url), "utf-8")
      ).map((p) => ({
        title: p.title,
        url: p.url,
        date: p.date ? new Date(p.date) : null,
        summary: p.excerpt || "",
        page: null,
        external: true,
      }));
    } catch {
      /* no garden snapshot — native-only feed */
    }

    return [...native, ...garden]
      .filter((e) => e.date && !isNaN(new Date(e.date).getTime()))
      .map((e) => ({ ...e, rfc3339: new Date(e.date).toISOString() }))
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 20);
  });

  // tagList — union of tags across the writing collection
  eleventyConfig.addCollection("tagList", function (collectionApi) {
    const tags = new Set();
    collectionApi.getFilteredByGlob("src/writing/*.md").forEach((item) => {
      (item.data.tags || []).forEach((tag) => tags.add(tag));
    });
    return [...tags].sort();
  });

  // Slug filter (lowercase ASCII slugs for tag permalinks)
  eleventyConfig.addFilter("slug", (input) => {
    return String(input)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  });

  // Date filters
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return new Date(dateObj).toLocaleDateString("en-CA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });

  eleventyConfig.addFilter("isoDate", (dateObj) => {
    return new Date(dateObj).toISOString();
  });

  eleventyConfig.addFilter("isoDateShort", (dateObj) => {
    return new Date(dateObj).toISOString().split("T")[0];
  });

  // humanDate — the single canonical DISPLAY format for every absolute date
  // on the site ("24 Jul 2026"). Compact enough for the index rows, explicit
  // enough for post/footer stamps; UTC to avoid timezone drift. Machine dates
  // (datetime attrs, feed, sitemap) still use isoDate/isoDateShort.
  eleventyConfig.addFilter("humanDate", (input) => {
    const d = input instanceof Date ? input : new Date(input);
    if (isNaN(d.getTime())) return "";
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return `${d.getUTCDate()} ${months[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
  });

  // Short date for index-table rows: "23 feb" (lowercase, no year, no padding)
  eleventyConfig.addFilter("shortDate", (input) => {
    const d = input instanceof Date ? input : new Date(input);
    if (isNaN(d.getTime())) return "";
    const months = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];
    const base = `${String(d.getUTCDate())} ${months[d.getUTCMonth()]}`;
    // Year suffix for non-current years, so old entries can't masquerade
    // as fresh ("23 feb" → "23 feb '25" once the year rolls over).
    const year = d.getUTCFullYear();
    const nowYear = new Date().getUTCFullYear();
    return year === nowYear ? base : `${base} '${String(year).slice(-2)}`;
  });

  // Extract hostname from a URL string (falls back to original input on failure)
  eleventyConfig.addFilter("hostname", (url) => {
    try { return new URL(url).hostname; } catch { return url; }
  });

  // Split a prose block on blank lines, returning an array of paragraphs.
  // Used in resume.njk and anywhere else YAML multiline prose needs <p> wrapping.
  eleventyConfig.addFilter("paragraphs", (str) => {
    if (!str) return [];
    return String(str).trim().split(/\n\s*\n/).map(p => p.trim()).filter(Boolean);
  });

  eleventyConfig.addFilter("daysAgo", (dateStr) => {
    if (!dateStr) return null;
    const then = new Date(dateStr);
    if (isNaN(then.getTime())) return null;
    const days = Math.floor((Date.now() - then.getTime()) / (1000 * 60 * 60 * 24));
    if (days === 0) return "today";
    if (days === 1) return "yesterday";
    return `${days} days ago`;
  });

  // Last-modified date for a given input file, sourced from git
  eleventyConfig.addFilter("gitLastModified", (inputPath) => {
    if (!inputPath) return null;
    try {
      const { execSync } = require("node:child_process");
      const out = execSync(`git log -1 --format=%cI -- "${inputPath}"`, {
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
      }).trim();
      return out || null;
    } catch {
      return null;
    }
  });

  // Categorical freshness — same signal as daysAgo, but in voice.
  // Buckets: 0 / 1 / 2–7 / 8–30 / 31–90 / 91–180 / 181+
  eleventyConfig.addFilter("tendedState", (dateStr) => {
    if (!dateStr) return null;
    const then = new Date(dateStr);
    if (isNaN(then.getTime())) return null;
    const days = Math.floor((Date.now() - then.getTime()) / (1000 * 60 * 60 * 24));
    if (days <= 0) return "tended today";
    if (days === 1) return "tended yesterday";
    if (days <= 7) return "tended recently";
    if (days <= 30) return "tended this month";
    if (days <= 90) return "resting";
    if (days <= 180) return "dormant";
    return "fallow";
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "../_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html"],
  };
}
