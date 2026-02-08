/**
 * Theme Toggle — Manual dark/light mode control
 * sebthecanadian.ca
 *
 * Features:
 * - Respects prefers-color-scheme as default
 * - Stores user preference in localStorage
 * - Smooth transitions between modes
 * - Keyboard accessible
 * - Works without this script (progressive enhancement)
 */

(function() {
  'use strict';

  const toggle = document.querySelector('.theme-toggle');
  if (!toggle) return; // Exit if button doesn't exist

  // Get stored preference or system preference
  const stored = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = stored || (prefersDark ? 'dark' : 'light');

  // Set initial theme
  document.documentElement.dataset.theme = initialTheme;
  updateToggleLabel(initialTheme);

  // Toggle on click
  toggle.addEventListener('click', () => {
    const current = document.documentElement.dataset.theme;
    const next = current === 'dark' ? 'light' : 'dark';

    document.documentElement.dataset.theme = next;
    localStorage.setItem('theme', next);
    updateToggleLabel(next);
  });

  // Update button label for screen readers
  function updateToggleLabel(theme) {
    const label = theme === 'dark'
      ? 'Switch to light mode'
      : 'Switch to dark mode';
    toggle.setAttribute('aria-label', label);

    // Update icon
    const icon = toggle.querySelector('.theme-toggle-icon');
    if (icon) {
      icon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
  }

  // Listen for system preference changes (optional enhancement)
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    // Only auto-switch if user hasn't set a preference
    if (!localStorage.getItem('theme')) {
      const theme = e.matches ? 'dark' : 'light';
      document.documentElement.dataset.theme = theme;
      updateToggleLabel(theme);
    }
  });
})();
