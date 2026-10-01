document.querySelectorAll('[data-enter]').forEach((link) => {
  link.addEventListener('click', (event) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    event.preventDefault();
    document.body.classList.add('is-entering');
    window.setTimeout(() => { window.location.href = link.href; }, 480);
  });
});

const nav = document.querySelector('[data-nav]');
const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('#site-nav');

const updateNav = () => nav?.classList.toggle('scrolled', window.scrollY > 24);
updateNav();
window.addEventListener('scroll', updateNav, { passive: true });

menuButton?.addEventListener('click', () => {
  const open = menu?.classList.toggle('open') ?? false;
  menuButton.setAttribute('aria-expanded', String(open));
});

menu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menu.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((item) => observer.observe(item));
} else {
  document.querySelectorAll('.reveal').forEach((item) => item.classList.add('is-visible'));
}

document.querySelectorAll('[data-year]').forEach((item) => {
  item.textContent = String(new Date().getFullYear());
});
