// Smooth scroll, theme toggle, active nav highlight
document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const saved = localStorage.getItem('theme');
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.getElementById('navbarResponsive');

  // Apply theme
  function applyTheme(mode) {
    if (mode === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem('theme', mode);
    themeIcon.className = mode === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    themeToggle.setAttribute('aria-pressed', mode === 'dark');
  }

  applyTheme(saved || (prefersDark ? 'dark' : 'light'));

  // Toggle theme
  themeToggle.addEventListener('click', () => {
    const isDark = root.classList.contains('dark');
    applyTheme(isDark ? 'light' : 'dark');
  });

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href = anchor.getAttribute('href');
      if (href === '#' || href === '') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (!target) return;
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });

      if (window.getComputedStyle(navbarToggler).display !== 'none' && navbarCollapse.classList.contains('show')) {
        bootstrap.Collapse.getInstance(navbarCollapse)?.hide();
      }
    });
  });

  // Active nav item highlight
  const sections = Array.from(document.querySelectorAll('main .section'));
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));

  function onScroll() {
    const current = sections.find(sec => {
      const top = sec.getBoundingClientRect().top;
      return top <= 120 && top + sec.offsetHeight > 120;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', current && link.getAttribute('href') === `#${current.id}`);
    });
  }

  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Footer year
  document.getElementById('year').textContent = new Date().getFullYear();
});
