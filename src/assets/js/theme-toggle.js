/**
 * Theme switch — progressive enhancement.
 *
 * Two states, light and dark. Until the visitor presses the switch the site
 * follows prefers-color-scheme. A press stores "light" or "dark" in
 * localStorage ("theme-preference"); the inline script in base.njk applies
 * the stored value before first paint on later visits, so this file only
 * builds the control. An old stored "system" value counts as no choice.
 * Without JavaScript there is no switch and the system setting applies.
 * The rule is recorded in docs/brand.md under Behaviour.
 */
(function () {
  "use strict";

  var STORAGE_KEY = "theme-preference";
  var root = document.documentElement;
  var metas = document.querySelectorAll('meta[name="theme-color"]');
  var darkQuery = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

  // The two theme-color values come from the <meta> tags in base.njk, read
  // once before anything overwrites them.
  var colours = { light: null, dark: null };
  Array.prototype.forEach.call(metas, function (m) {
    var mode = /dark/.test(m.getAttribute("media") || "") ? "dark" : "light";
    if (!colours[mode]) colours[mode] = m.getAttribute("content");
  });

  function storedTheme() {
    try {
      var t = localStorage.getItem(STORAGE_KEY);
      return t === "light" || t === "dark" ? t : null;
    } catch (e) {
      return null;
    }
  }

  function systemTheme() {
    return darkQuery && darkQuery.matches ? "dark" : "light";
  }

  function currentTheme() {
    return root.getAttribute("data-theme") || storedTheme() || systemTheme();
  }

  function syncMetas(theme) {
    var colour = colours[theme];
    if (!colour) return;
    Array.prototype.forEach.call(metas, function (m) {
      m.setAttribute("content", colour);
    });
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    syncMetas(theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      // localStorage unavailable: the choice lasts for this page only
    }
  }

  function build() {
    var header = document.querySelector(".site-header");
    if (!header) return;

    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "theme-toggle";
    btn.setAttribute("role", "switch");
    // Visible "Dark" plus hidden " theme": the accessible name is "Dark theme".
    btn.innerHTML =
      '<span class="theme-toggle__mark" aria-hidden="true"></span>' +
      'Dark<span class="sr-only"> theme</span>';

    var status = document.createElement("span");
    status.className = "sr-only";
    status.setAttribute("role", "status");
    status.setAttribute("aria-live", "polite");

    function render(theme) {
      btn.setAttribute("aria-checked", theme === "dark" ? "true" : "false");
    }

    render(currentTheme());
    if (root.getAttribute("data-theme")) syncMetas(root.getAttribute("data-theme"));

    btn.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      applyTheme(next);
      render(next);
      status.textContent = (next === "dark" ? "Dark" : "Light") + " theme on";
    });

    // No choice made yet: keep the switch in step if the system setting changes.
    if (darkQuery && darkQuery.addEventListener) {
      darkQuery.addEventListener("change", function () {
        if (!root.getAttribute("data-theme")) render(systemTheme());
      });
    }

    header.appendChild(btn);
    header.appendChild(status);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", build);
  } else {
    build();
  }
})();
