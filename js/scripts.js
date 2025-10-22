// script.js — smooth scroll, active nav highlight, and footer year

document.addEventListener('DOMContentLoaded', () => {
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.getElementById('navbarResponsive');

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });

      if (window.getComputedStyle(navbarToggler).display !== 'none' && navbarCollapse.classList.contains('show')) {
        bootstrap.Collapse.getInstance(navbarCollapse)?.hide();
      }
    });
  });

  // Active nav link on scroll
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
