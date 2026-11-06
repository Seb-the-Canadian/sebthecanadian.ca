#!/usr/bin/env node
/**
 * csp-check.js — checks that the content-security policy and the site's
 * inline scripts still agree.
 *
 * Every page built from the base layout carries a Content-Security-Policy
 * (src/_includes/base.njk). It lets a small script written straight into the
 * page run only if the policy lists that script's fingerprint: a SHA-256
 * hash of its exact text. Change one character of such a script, a space or
 * a line break included, and the fingerprint no longer matches, so the
 * browser quietly refuses to run it. Nothing in the build notices; the site
 * just loses, say, the remembered light or dark theme.
 *
 * One way I've caught that before it goes live: this script runs after
 * Eleventy in `npm run build`, reads every built page in _site/, and checks
 * two things:
 *
 *   1. Every inline script (a <script> with no src) has its hash in the
 *      policy's script-src. If not, it prints the hash the policy needs and
 *      the start of the script, so you can see which one changed.
 *   2. Every hash in script-src belongs to a script that is still on the
 *      site. A leftover hash is harmless to readers but means the list has
 *      drifted from the code.
 *
 * Any mismatch fails the build, so a stale hash stops the deploy instead of
 * breaking the live site. JSON-LD blocks (<script type="application/ld+json">)
 * are data, not code: browsers never run them and the policy ignores them,
 * so they are skipped.
 *
 * The policy is read from the first built page (in alphabetical order of its
 * path) that carries one; every page built from the base layout carries the
 * same one.
 *
 * Usage
 *   node scripts/csp-check.js              check _site/ (runs in `npm run build`)
 *   node scripts/csp-check.js <folder>     check another built copy (for testing)
 *
 * No dependencies beyond Node itself.
 */
import { createHash } from "node:crypto";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, relative, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// The repo root is the folder above scripts/, wherever the command is run from.
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = resolve(process.argv[2] || join(ROOT, "_site"));

// Script types a browser runs. Anything else (application/ld+json and the
// like) is a data block that the policy does not cover.
const JS_TYPES = new Set([
  "",
  "module",
  "text/javascript",
  "application/javascript",
  "application/ecmascript",
  "text/ecmascript",
]);

function htmlFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...htmlFiles(full));
    else if (entry.name.endsWith(".html")) out.push(full);
  }
  return out;
}

function attr(attrs, name) {
  const m = attrs.match(new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, "i"));
  return m ? (m[1] ?? m[2] ?? m[3]) : null;
}

function hash(algorithm, body) {
  return createHash(algorithm).update(body, "utf8").digest("base64");
}

if (!existsSync(SITE)) {
  console.error(`✗ No built site at ${SITE}. Build first (npx @11ty/eleventy).`);
  process.exit(1);
}

const pages = htmlFiles(SITE).sort();
const scripts = new Map(); // sha256 → { page, body }
let policy = null;
let skippedData = 0;

for (const file of pages) {
  const html = readFileSync(file, "utf8");
  const page = "/" + relative(SITE, file).split("\\").join("/");

  if (!policy) {
    for (const m of html.matchAll(/<meta\b[^>]*>/gi)) {
      const tag = m[0];
      if ((attr(tag, "http-equiv") || "").toLowerCase() !== "content-security-policy") continue;
      policy = { page, content: attr(tag, "content") || "" };
      break;
    }
  }

  for (const m of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)) {
    const [, attrs, raw] = m;
    if (attr(attrs, "src") !== null) continue;
    const type = (attr(attrs, "type") || "").trim().toLowerCase();
    if (!JS_TYPES.has(type)) {
      skippedData++;
      continue;
    }
    // Browsers turn every line ending into a plain line feed before hashing.
    const body = raw.replace(/\r\n?/g, "\n");
    const key = hash("sha256", body);
    if (!scripts.has(key)) scripts.set(key, { page, body });
  }
}

if (!policy) {
  console.error(`✗ No page in ${relative(ROOT, SITE) || SITE} carries a Content-Security-Policy meta tag.`);
  console.error("  The policy lives in src/_includes/base.njk; if it was removed on purpose, take this check out of the build script too.");
  process.exit(1);
}

const scriptSrc = policy.content
  .split(";")
  .map((d) => d.trim().split(/\s+/))
  .find((parts) => parts[0].toLowerCase() === "script-src");
const listed = (scriptSrc || [])
  .slice(1)
  .map((source) => source.match(/^'(sha256|sha384|sha512)-([A-Za-z0-9+/=]+)'$/))
  .filter(Boolean)
  .map(([, algorithm, value]) => ({ algorithm, value }));

let problems = 0;
const matched = new Set();

console.log(`Policy read from ${policy.page}: ${listed.length} hash(es) in script-src.`);

for (const { algorithm, value } of listed) {
  const hit = [...scripts.values()].find((s) => hash(algorithm, s.body) === value);
  if (hit) {
    matched.add(hash("sha256", hit.body));
    console.log(`✓ ${algorithm}-${value}  ${hit.page}`);
  } else {
    problems++;
    console.log(`✗ ${algorithm}-${value}  listed in the policy, but no inline script on the site has this hash`);
  }
}

for (const [key, { page, body }] of scripts) {
  if (matched.has(key)) continue;
  problems++;
  console.log(`✗ sha256-${key}  ${page}  not in the policy; script starts: ${JSON.stringify(body.slice(0, 60))}`);
}

if (problems) {
  console.error(
    `\n✗ ${problems} mismatch(es) between the policy in src/_includes/base.njk and the inline scripts. ` +
      "A script whose hash is missing will not run on the live site: put the hash printed above into script-src " +
      "(in place of the old one, if a script was edited), and remove hashes no script uses."
  );
  process.exit(1);
}

console.log(
  `✓ Policy and inline scripts agree: ${scripts.size} inline script(s) across ${pages.length} pages, ` +
    `${listed.length} hash(es) in the policy (${skippedData} JSON-LD/data block(s) skipped).`
);
