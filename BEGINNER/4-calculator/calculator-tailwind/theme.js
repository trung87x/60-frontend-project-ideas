// Theme toggle (class strategy + localStorage)
(function () {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;

  function setTheme(theme) {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    root.dataset.theme = theme;
    try { localStorage.setItem('theme', theme); } catch {}
    btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    btn.querySelector('.i').textContent = theme === 'dark' ? '🌞' : '🌙';
    btn.lastElementChild && (btn.lastElementChild.textContent = theme === 'dark' ? 'Light' : 'Dark');
  }

  function toggle() {
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'light' : 'dark');
  }

  btn.addEventListener('click', toggle);
  // Respect reduced motion (no animations added in this demo)
  // Initialize button state
  const initTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  setTheme(initTheme);
})();