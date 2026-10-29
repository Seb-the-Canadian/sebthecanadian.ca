// Publish Note → sebthecanadian.ca
// Drafts action script. Turns the current draft into a note on the site.
//   First line  = the note's title (a leading "#" is fine).
//   Everything after it = the note's body, in Markdown.
// The note lands at https://sebthecanadian.ca/writing/<slug>/ about 1–3
// minutes after it reaches the main branch.
// v1.2 · 2026-10-29 · caution words move out of the code into the Drafts credential

// ── Settings you might change ──────────────────────────────────────────────
const OWNER = "Seb-the-Canadian";
const REPO = "sebthecanadian.ca";
const BRANCH = "main";          // Live. Change to "drafts-test" to test without publishing.
const FOLDER = "src/writing";
const SITE = "https://sebthecanadian.ca";
// Words that trigger a warning before anything is sent live in the Drafts
// credential (asked for once, beside the token), never in this file: the
// repository that holds this file is public.

// ── Pure helpers (no Drafts APIs; tested outside Drafts) ───────────────────
function parseDraft(text) {
  const lines = String(text).replace(/\r\n/g, "\n").split("\n");
  while (lines.length && !lines[0].trim()) lines.shift();
  const title = (lines.shift() || "").replace(/^#+\s*/, "").trim();
  const body = lines.join("\n").trim();
  return { title, body };
}

function slugify(title) {
  return title
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60)
    .replace(/-+$/g, "");
}

function excerptOf(body) {
  const plain = body
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/^\s*(?:[-+*]|\d+\.)\s+/gm, "")
    .replace(/[#>*_`~]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (plain.length <= 160) return plain;
  return plain.slice(0, 157).replace(/\s+\S*$/, "") + "…";
}

// JSON strings are valid YAML double-quoted scalars.
const q = (s) => JSON.stringify(s);

function buildFile({ title, body, date, updated }) {
  const fm = [
    "---",
    "layout: post.njk",
    `title: ${q(title)}`,
    `date: ${date}`,
  ];
  if (updated && updated !== date) fm.push(`updated: ${updated}`);
  fm.push(
    "type: note",
    "stage: seedling",
    `excerpt: ${q(excerptOf(body))}`,
    "tags:",
    "  - note",
    "syndicated: false",
    "---",
    ""
  );
  return fm.join("\n") + body + "\n";
}

// Base64 of the UTF-8 bytes, without relying on platform encoders.
function base64Utf8(str) {
  const bytes = [];
  for (const ch of str) {
    let c = ch.codePointAt(0);
    if (c < 0x80) bytes.push(c);
    else if (c < 0x800) bytes.push(0xc0 | (c >> 6), 0x80 | (c & 63));
    else if (c < 0x10000) bytes.push(0xe0 | (c >> 12), 0x80 | ((c >> 6) & 63), 0x80 | (c & 63));
    else bytes.push(0xf0 | (c >> 18), 0x80 | ((c >> 12) & 63), 0x80 | ((c >> 6) & 63), 0x80 | (c & 63));
  }
  const A = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  let out = "";
  for (let i = 0; i < bytes.length; i += 3) {
    const [a, b, c] = [bytes[i], bytes[i + 1], bytes[i + 2]];
    const n = (a << 16) | ((b || 0) << 8) | (c || 0);
    out += A[(n >> 18) & 63] + A[(n >> 12) & 63] +
      (b === undefined ? "=" : A[(n >> 6) & 63]) +
      (c === undefined ? "=" : A[n & 63]);
  }
  return out;
}

// ── Drafts side ────────────────────────────────────────────────────────────
function main() {
  const { title, body } = parseDraft(draft.content);
  if (!title || !body) {
    alert("A note needs a title and a body.\n\nPut the title on the first line and the note underneath it, then run this again.");
    context.cancel();
    return;
  }
  if (/<\|[^>]*>/.test(draft.content)) {
    alert("This draft still has a template placeholder in it (something like <|Note>).\n\nReplace it with your own words, then run this again.");
    context.cancel();
    return;
  }

  const cred = Credential.create(
    "GitHub · sebthecanadian.ca",
    "Paste a fine-grained GitHub token for Seb-the-Canadian/sebthecanadian.ca with Contents: read and write. It is stored in Drafts and only sent to GitHub."
  );
  cred.addPasswordField("token", "Token");
  cred.addTextField("caution", "Words to warn on before publishing (comma-separated, e.g. an employer name)");
  if (!cred.authorize()) { context.cancel(); return; }

  const http = HTTP.create();
  const api = (method, path, data) => {
    const req = {
      url: `https://api.github.com/repos/${OWNER}/${REPO}${path}`,
      method,
      headers: {
        "Authorization": `Bearer ${cred.getValue("token")}`,
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "Drafts-Publish-Note",
      },
    };
    if (data) { req.data = data; req.encoding = "json"; }
    const r = http.request(req);
    let json = null;
    try { json = JSON.parse(r.responseText); } catch (e) {}
    return { status: r.statusCode, json, text: r.responseText };
  };
  const failWith = (what, r) => {
    const msg = (r.json && r.json.message) || r.text || "no response";
    alert(`${what} (GitHub said ${r.status}: ${msg}).\n\nNothing was published.`);
    context.fail();
  };

  // Remember which file each draft became, so re-running updates it.
  const fm = FileManager.createCloud();
  const MAP = "/publish-note-map.json";
  const map = fm.readJSON(MAP) || {};
  const known = map[draft.uuid] && map[draft.uuid].branch === BRANCH ? map[draft.uuid] : null;
  const path = known ? known.path : `${FOLDER}/${slugify(title)}.md`;
  const slug = path.split("/").pop().replace(/\.md$/, "");
  const url = `${SITE}/writing/${slug}/`;

  // Make sure the branch exists (test branches are created from main).
  let ref = api("GET", `/git/ref/heads/${BRANCH}`);
  if (ref.status === 404) {
    const main = api("GET", "/git/ref/heads/main");
    if (main.status !== 200) return failWith("Couldn't read the main branch", main);
    const made = api("POST", "/git/refs", { ref: `refs/heads/${BRANCH}`, sha: main.json.object.sha });
    if (made.status !== 201) return failWith(`Couldn't create the ${BRANCH} branch`, made);
  } else if (ref.status !== 200) {
    return failWith("Couldn't reach the site repository", ref);
  }

  const existing = api("GET", `/contents/${path}?ref=${BRANCH}`);
  if (existing.status !== 200 && existing.status !== 404) return failWith("Couldn't check for an existing note", existing);
  const isUpdate = existing.status === 200;
  if (isUpdate && !known) {
    alert(`There's already a note at\n${url}\nfrom a different draft. Change this draft's title and try again.`);
    context.cancel();
    return;
  }

  const today = strftime(new Date(), "%Y-%m-%d");
  const firstDate = known ? known.date : today;
  const content = buildFile({ title, body, date: firstDate, updated: isUpdate ? today : null });

  const lower = (title + "\n" + body).toLowerCase();
  const cautionWords = String(cred.getValue("caution") || "").split(",").map((w) => w.trim().toLowerCase()).filter(Boolean);
  const flagged = cautionWords.filter((w) => lower.includes(w));

  const p = Prompt.create();
  p.title = isUpdate ? "Update this note?" : "Publish this note?";
  p.message =
    `${title}\n\n${url}\n\n` +
    (BRANCH === "main"
      ? "It goes live in 1–3 minutes."
      : `Test run: this goes to the "${BRANCH}" branch, which never goes live.`) +
    (flagged.length ? `\n\nHeads up: it mentions ${flagged.join(", ")}. The site is public.` : "");
  p.addButton(isUpdate ? "Update" : "Publish");
  if (!p.show()) { context.cancel(); return; }

  const put = api("PUT", `/contents/${path}`, Object.assign({
    message: `${isUpdate ? "Update" : "Add"} note: ${title}\n\nSent from Drafts`,
    content: base64Utf8(content),
    branch: BRANCH,
  }, isUpdate ? { sha: existing.json.sha } : {}));
  if (put.status !== 200 && put.status !== 201) return failWith("GitHub didn't accept the note", put);

  map[draft.uuid] = { path, date: firstDate, branch: BRANCH };
  fm.writeJSON(MAP, map);
  if (BRANCH === "main") {
    draft.addTag("published");
    draft.update();
  }
}

if (typeof draft !== "undefined") main();
if (typeof module !== "undefined") module.exports = { parseDraft, slugify, excerptOf, buildFile, base64Utf8 };
