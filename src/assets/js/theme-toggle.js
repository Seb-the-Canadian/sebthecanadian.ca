/**
 * Theme Toggle — Progressive Enhancement
 * Cycles through: system → light → dark → system
 * Stores preference in localStorage. Falls back to prefers-color-scheme without JS.
 */
(function () {
  const STORAGE_KEY = "theme-preference";
  const themes = ["system", "light", "dark"];

  function getStoredTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  }

  function setStoredTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // localStorage unavailable
    }
  }

  function applyTheme(theme) {
    if (theme === "system" || !theme) {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }

  function getLabelForTheme(theme) {
    switch (theme) {
      case "light":
        return "Light";
      case "dark":
        return "Dark";
      default:
        return "System";
    }
  }

  // Apply stored theme immediately (before DOM ready) to prevent flash
  var stored = getStoredTheme();
  if (stored) {
    applyTheme(stored);
  }

  // Create toggle button once DOM is ready
  document.addEventListener("DOMContentLoaded", function () {
    var nav = document.querySelector(".site-header");
    if (!nav) return;

    var currentTheme = stored || "system";

    var btn = document.createElement("button");
    btn.className = "theme-toggle";
    btn.setAttribute("aria-label", "Toggle color theme");
    btn.textContent = getLabelForTheme(currentTheme);

    btn.addEventListener("click", function () {
      var idx = themes.indexOf(currentTheme);
      currentTheme = themes[(idx + 1) % themes.length];
      applyTheme(currentTheme);
      setStoredTheme(currentTheme);
      btn.textContent = getLabelForTheme(currentTheme);
    });

    nav.appendChild(btn);
  });
})();
