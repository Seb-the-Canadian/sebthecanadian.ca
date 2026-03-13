/**
 * Keyboard Navigation — Data Druid shortcuts
 *
 * Chord navigation (g then key):
 *   g h → Home        g w → Writing
 *   g p → Projects    g r → Resume
 *   g n → Now
 *
 * ? → open shortcut help overlay
 * Esc → close overlay
 *
 * Progressive enhancement — site works identically without this script.
 * Ignored when focus is inside any input, textarea, select, or contenteditable.
 */
(function () {
  "use strict";

  var routes = {
    h: "/",
    w: "/writing/",
    p: "/projects/",
    r: "/resume/",
    n: "/now/",
  };

  var chordItems = [
    { chord: "g → h", dest: "Home" },
    { chord: "g → w", dest: "Writing" },
    { chord: "g → p", dest: "Projects" },
    { chord: "g → r", dest: "Resume" },
    { chord: "g → n", dest: "Now" },
  ];

  var waitingForSecond = false;
  var chordTimeout = null;
  var overlay = null;

  /* ── Overlay ──────────────────────────────────────────────────────────── */

  function buildOverlayHTML() {
    var rows = chordItems
      .map(function (item) {
        return (
          '<div class="kbd-shortcut-item">' +
          "<dt><kbd>" + item.chord + "</kbd></dt>" +
          "<dd>" + item.dest + "</dd>" +
          "</div>"
        );
      })
      .join("");

    return (
      '<div class="kbd-overlay-inner" role="document">' +
      '<h2 class="kbd-overlay-title">Keyboard shortcuts</h2>' +
      '<dl class="kbd-shortcut-list">' + rows + "</dl>" +
      '<p class="kbd-overlay-meta"><kbd>?</kbd> to toggle &nbsp;·&nbsp; <kbd>Esc</kbd> to close</p>' +
      "</div>"
    );
  }

  function openOverlay() {
    if (overlay) return;
    overlay = document.createElement("div");
    overlay.className = "kbd-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "Keyboard shortcuts");
    overlay.innerHTML = buildOverlayHTML();
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) closeOverlay();
    });
    document.body.appendChild(overlay);
  }

  function closeOverlay() {
    if (!overlay) return;
    overlay.remove();
    overlay = null;
  }

  /* ── Key handler ──────────────────────────────────────────────────────── */

  function isTyping(target) {
    return target.matches("input, textarea, select, [contenteditable]");
  }

  document.addEventListener("keydown", function (e) {
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
      var dest = routes[e.key];
      if (dest) {
        e.preventDefault();
        window.location.href = dest;
      }
    }
  });
})();
