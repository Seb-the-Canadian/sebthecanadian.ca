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

  // Update button label and icon for screen readers
  function updateToggleLabel(theme) {
    const label = theme === 'dark'
      ? 'Switch to light mode'
      : 'Switch to dark mode';
    toggle.setAttribute('aria-label', label);

    // Update Lucide icon — Sun for dark mode, Moon for light mode
    // Using data-lucide attribute which will be replaced by lucide.createIcons()
    const iconWrapper = toggle.querySelector('.theme-toggle-icon');
    if (iconWrapper) {
      const iconName = theme === 'dark' ? 'sun' : 'moon';
      iconWrapper.innerHTML = `<i data-lucide="${iconName}" class="theme-icon"></i>`;

      // Reinitialize Lucide icons after DOM update
      if (window.lucide) {
        window.lucide.createIcons();
      }
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
