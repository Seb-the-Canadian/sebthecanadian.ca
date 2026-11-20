// _data/revisions.js — versions of evolving posts, built from git once per
// build (lib/revisions.js). A post gets versions only when its "## Revisions"
// section has two or more dated lines. Returns
//   { bySlug: { <slug>: [version…] }, pages: [version…] }
// where a version is { slug, n, total, prevN, nextN, date, text, isLatest,
// data, html, css, url, postUrl, prevUrl, nextUrl }: data is that version's
// own front matter, html its body with the changes since the version before
// marked, css its pageStyles as they stood then (inlined on the version page;
// "" for the newest, which links the current files). With no or shallow git history it warns and returns nothing.
import { readdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import markdownIt from "markdown-it";
import { findVersions, splitFrontMatter, diffBlocks, renderBody } from "../lib/revisions.js";

const DIR = "src/writing";

export default function () {
  const md = markdownIt({ html: true });
  const bySlug = {};
  const pages = [];
  for (const name of readdirSync(DIR).filter((f) => f.endsWith(".md")).sort()) {
    const { versions, warning } = findVersions(`${DIR}/${name}`);
    if (warning) console.warn(`[revisions] ${warning}`);
    if (versions.length < 2) continue;
    const slug = name.replace(/\.md$/, "");
    let prevBody = null;
    const list = versions.map((v, i) => {
      const { data, body } = splitFrontMatter(v.source);
      const html = i === 0 ? renderBody(md, body) : diffBlocks(md, prevBody, body);
      prevBody = body;
      let css = "";
      if (v.commit) {
        for (const href of data.pageStyles || []) {
          try {
            css += execFileSync("git", ["show", `${v.commit}:src${href}`], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }) + "\n";
          } catch {
            console.warn(`[revisions] ${slug} v${v.n}: no ${href} at ${v.commit.slice(0, 7)}`);
          }
        }
      }
      return {
        slug,
        n: v.n,
        // total is the number of declared lines; a version left out (its
        // commit has no copy of the file) leaves a gap, so the pages link
        // to their neighbours in this list, not by number.
        total: versions[versions.length - 1].n,
        prevN: i > 0 ? versions[i - 1].n : null,
        nextN: i < versions.length - 1 ? versions[i + 1].n : null,
        date: v.date,
        text: v.text,
        isLatest: i === versions.length - 1,
        data,
        html,
        css,
        url: `/writing/${slug}/v${v.n}/`,
        postUrl: `/writing/${slug}/`,
      };
    });
    for (const v of list) {
      v.prevUrl = v.prevN ? `/writing/${slug}/v${v.prevN}/` : null;
      v.nextUrl = v.nextN ? `/writing/${slug}/v${v.nextN}/` : null;
    }
    bySlug[slug] = list;
    pages.push(...list);
  }
  return { bySlug, pages };
}
