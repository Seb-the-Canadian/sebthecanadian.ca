# Drafts actions

Scripts for the Drafts app (iPhone and Mac). **These files are the canonical
copies: edit here, then paste into Drafts.** An edit made only in Drafts is
lost the next time someone pastes from here.

How the pieces fit together: `docs/writing-pipeline.md`.

## Publish Note → sebthecanadian.ca

`publish-note.js` turns the current draft into a note on the site. The first
line is the title, the rest is the body. It commits `src/writing/<slug>.md`
to `main`, and the note is live at `/writing/<slug>/` one to three minutes
later. Running it again on the same draft updates the same note. Day-to-day
use: `docs/updating-copy.md` → "Publishing a note".

### Install

1. In Drafts, open **Actions → Action Groups…**, then **PROMOTE**.
2. Tap **+** to add an action and name it `Publish Note → sebthecanadian.ca`.
3. Add a **Script** step and paste the whole of `publish-note.js` into it.
4. Set it to archive the draft after success, the same way as the other
   PROMOTE actions.

To update an installed copy, open the action's Script step, select all, and
paste the new file over it.

### The token

The action talks to GitHub with a **fine-grained personal access token**:

- Repository access: **only** `Seb-the-Canadian/sebthecanadian.ca`.
- Permissions: **Contents: Read and write**. Nothing else.

On the first run, Drafts asks for the token and for the words to warn on
before publishing (comma-separated, for example an employer name). Both
stay in Drafts; the warning words are never written into this repository.

To replace the token (it expires; the current one on 28 Oct 2027), go to
Drafts **Settings → Credentials**, forget "GitHub · sebthecanadian.ca", and
run the action again. It asks for both fields again.

### Testing without publishing

Change `BRANCH` near the top of the Drafts copy to `"drafts-test"`. Runs then
go to that branch, which never goes live, and the draft isn't tagged
`published`. Set it back to `"main"` afterwards.

The pure helpers (title, slug, excerpt, file) can be tested in Node. Copy
the file to a `.cjs` name first: this repository treats `.js` files as
modules, and the script's export line only works in the older style.
