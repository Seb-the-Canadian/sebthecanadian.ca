/**
 * Keyboard Navigation — Data Druid shortcuts
 *
 * Chord navigation (g then key):
 *   g h → Home        g p → Projects
 *   g r → Resume      g n → Now
 *
 * ? → open the shortcut dialog (a native <dialog>, so Tab stays inside it
 *     and the page behind is inert); Esc or the Close button closes it
 *
 * Tab order: Safari on macOS only tabs to text fields by default, and this
 * site has none, so every link and button gets an explicit tabindex="0" at
 * load. Safari honours that; other browsers already tab to them.
 *
 * Off switch (WCAG 2.1.4): a role="switch" button, "Keyboard shortcuts",
 * built into the ? dialog and into the #shortcuts-switch placeholder on
 * /keyboard/. The choice is stored in localStorage ("shortcuts-enabled",
 * "false" = off; absent or anything else = on) and read once at load. When
 * off, the key handler returns before reading any key, so ? is inert too;
 * the switch is reached again from /keyboard/, which the footer links on
 * every page. Keys pressed with Ctrl, Cmd or Alt are never shortcuts, so
 * Ctrl+G / Cmd+G (find) cannot start a chord.
 *
 * Progressive enhancement — site works identically without this script.
 * Ignored when focus is inside any input, textarea, select, or contenteditable.
 */
(function () {
  "use strict";

  const routes = {
    h: "/",
    p: "/projects/",
    w: "/writing/",
    r: "/resume/",
    n: "/#now",
  };

  const chordItems = [
    { chord: "g → h", dest: "Home" },
    { chord: "g → p", dest: "Projects" },
    { chord: "g → w", dest: "Writing" },
    { chord: "g → r", dest: "Resume" },
    { chord: "g → n", dest: "Now" },
  ];

  const STORAGE_KEY = "shortcuts-enabled";
  let enabled = readEnabled();
  const switches = [];

  let waitingForSecond = false;
  let chordTimeout = null;
  let overlay = null;
  let _previousFocus = null;

  /* ── Off switch ───────────────────────────────────────────────────────── */

  function readEnabled() {
    try {
      return localStorage.getItem(STORAGE_KEY) !== "false";
    } catch (e) {
      return true;
    }
  }

  function setEnabled(on) {
    enabled = on;
    waitingForSecond = false;
    if (chordTimeout) clearTimeout(chordTimeout);
    try {
      localStorage.setItem(STORAGE_KEY, on ? "true" : "false");
    } catch (e) {
      // localStorage unavailable: the choice lasts for this page only
    }
    switches.forEach(function (s) {
      s.btn.setAttribute("aria-checked", on ? "true" : "false");
    });
  }

  // Returns the button and a polite status line; the caller places both.
  // Same control as the theme switch (shared .theme-toggle look).
  function createSwitch() {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "theme-toggle shortcuts-switch";
    btn.setAttribute("role", "switch");
    btn.setAttribute("aria-checked", enabled ? "true" : "false");
    btn.setAttribute("tabindex", "0");
    btn.innerHTML =
      '<span class="theme-toggle__mark" aria-hidden="true"></span>Keyboard shortcuts';

    const status = document.createElement("span");
    status.className = "sr-only";
    status.setAttribute("role", "status");
    status.setAttribute("aria-live", "polite");

    btn.addEventListener("click", function () {
      setEnabled(!enabled);
      status.textContent = enabled ? "Keyboard shortcuts on" : "Keyboard shortcuts off";
    });

    switches.push({ btn: btn });
    return { btn: btn, status: status };
  }

  function buildPageSwitch() {
    const slot = document.getElementById("shortcuts-switch");
    if (!slot) return;
    const sw = createSwitch();
    slot.appendChild(sw.btn);
    slot.appendChild(sw.status);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buildPageSwitch);
  } else {
    buildPageSwitch();
  }

  /* ── Tab order for Safari ─────────────────────────────────────────────── */

  function makeTabbable() {
    const els = document.querySelectorAll("a[href], button");
    Array.prototype.forEach.call(els, function (el) {
      if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "0");
    });
  }

  // Runs after every deferred script (the theme switch and the heading
  // anchors are built by then), so they are covered too.
  document.addEventListener("DOMContentLoaded", makeTabbable);

  /* ── Overlay ──────────────────────────────────────────────────────────── */

  function buildOverlay() {
    const rows = chordItems
      .map(function (item) {
        return (
          '<div class="kbd-shortcut-item">' +
          "<dt><kbd>" + item.chord + "</kbd></dt>" +
          "<dd>" + item.dest + "</dd>" +
          "</div>"
        );
      })
      .join("");

    const dialog = document.createElement("dialog");
    dialog.className = "kbd-overlay";
    dialog.setAttribute("aria-labelledby", "kbd-overlay-heading");
    dialog.innerHTML =
      '<div class="kbd-overlay-inner" tabindex="-1">' +
      '<h2 id="kbd-overlay-heading" class="kbd-overlay-title">Keyboard shortcuts</h2>' +
      '<dl class="kbd-shortcut-list">' + rows + "</dl>" +
      '<p class="kbd-overlay-meta"><kbd>?</kbd> to toggle &nbsp;·&nbsp; <kbd>Esc</kbd> to close</p>' +
      '<button type="button" class="button kbd-overlay-close" tabindex="0">Close</button>' +
      "</div>";

    // A click on the dialog itself (outside the panel) is a backdrop click.
    const sw = createSwitch();
    const meta = dialog.querySelector(".kbd-overlay-meta");
    const holder = document.createElement("p");
    holder.className = "kbd-overlay-switch";
    holder.appendChild(sw.btn);
    holder.appendChild(sw.status);
    meta.parentNode.insertBefore(holder, meta);

    dialog.addEventListener("click", function (e) {
      if (e.target === dialog) closeOverlay();
    });
    dialog.querySelector(".kbd-overlay-close").addEventListener("click", closeOverlay);
    // Fires for Esc (the browser's own cancel) and for close() alike.
    dialog.addEventListener("close", teardown);
    return dialog;
  }

  function openOverlay() {
    if (overlay) return;
    _previousFocus = document.activeElement;
    overlay = buildOverlay();
    document.body.appendChild(overlay);
    if (typeof overlay.showModal === "function") {
      overlay.showModal();
    } else {
      overlay.setAttribute("open", "");
    }
    // Start the reading order at the title, not on the Close button.
    overlay.querySelector(".kbd-overlay-inner").focus();
  }

  function closeOverlay() {
    if (!overlay) return;
    if (overlay.open && typeof overlay.close === "function") {
      overlay.close(); // → "close" event → teardown
    } else {
      teardown();
    }
  }

  function teardown() {
    if (!overlay) return;
    const el = overlay;
    overlay = null;
    el.remove();
    // Drop the dialog's switch from the list; the page one (if any) stays.
    for (let i = switches.length - 1; i >= 0; i--) {
      if (el.contains(switches[i].btn)) switches.splice(i, 1);
    }
    if (_previousFocus && document.contains(_previousFocus)) {
      _previousFocus.focus();
    }
    _previousFocus = null;
  }

  /* ── Key handler ──────────────────────────────────────────────────────── */

  function isTyping(target) {
    return (
      target instanceof Element &&
      target.matches("input, textarea, select, [contenteditable]")
    );
  }

  document.addEventListener("keydown", function (e) {
    if (!enabled) return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (isTyping(e.target)) return;

    // Esc — close overlay
    if (e.key === "Escape") {
      closeOverlay();
      waitingForSecond = false;
      if (chordTimeout) clearTimeout(chordTimeout);
      return;
    }

    // ? — toggle overlay
    if (e.key === "?" && !waitingForSecond) {
      e.preventDefault();
      if (overlay) {
        closeOverlay();
      } else {
        openOverlay();
      }
      return;
    }

    // g — start chord, wait for second key (1.5s window)
    if (e.key === "g" && !waitingForSecond) {
      waitingForSecond = true;
      chordTimeout = setTimeout(function () {
        waitingForSecond = false;
      }, 1500);
      return;
    }

    // Second key of chord
    if (waitingForSecond) {
      waitingForSecond = false;
      if (chordTimeout) clearTimeout(chordTimeout);
      const dest = routes[e.key];
      if (dest) {
        e.preventDefault();
        window.location.href = dest;
      }
    }
  });
})();
