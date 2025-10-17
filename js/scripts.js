// script.js — smooth scroll, mobile nav toggling, theme toggle, active nav highlight

document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const saved = localStorage.getItem('theme'); // 'dark' or 'light'
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.getElementById('navbarResponsive');

  // initialize theme
  function applyTheme(mode) {
    if (mode === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem('theme', mode);
    themeIcon.className = mode === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    themeToggle.setAttribute('aria-pressed', mode === 'dark');
  }
  applyTheme(saved || (prefersDark ? 'dark' : 'light'));

  // toggle theme
  themeToggle.addEventListener('click', () => {
    const isDark = root.classList.contains('dark');
    applyTheme(isDark ? 'light' : 'dark');
  });

  // smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      // allow default for external or empty hash
      if (this.getAttribute('href') === '#' || this.getAttribute('href') === '') return;
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      const topOffset = 80; // navbar height
      const targetY = target.getBoundingClientRect().top + window.scrollY - topOffset;
      window.scrollTo({ top: targetY, behavior: 'smooth' });

      // collapse navbar on mobile if open
      if (window.getComputedStyle(navbarToggler).display !== 'none' && navbarCollapse.classList.contains('show')) {
        bootstrap.Collapse.getInstance(navbarCollapse)?.hide();
      }
    });
  });

  // bootstrap collapse toggler wiring (if Bootstrap is loaded)
  if (navbarToggler) {
    navbarToggler.addEventListener('click', () => {
      // toggle 'show' class for fallback UI updates; bootstrap handles collapse
      navbarCollapse.classList.toggle('show');
    });
  }

  // active nav item on scroll
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

  // Set year in footer
  document.getElementById('year').textContent = new Date().getFullYear();
});
