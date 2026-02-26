// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu on link click
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ===== SMOOTH SCROLL FOR ALL ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navHeight = navbar.offsetHeight;
      const targetPos = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    }
  });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navLinkItems = document.querySelectorAll('.nav-link:not(.contact-btn)');

function updateActiveLink() {
  const scrollY = window.pageYOffset;
  sections.forEach(section => {
    const sectionTop = section.offsetTop - navbar.offsetHeight - 100;
    const sectionBottom = sectionTop + section.offsetHeight;
    if (scrollY >= sectionTop && scrollY < sectionBottom) {
      const id = section.getAttribute('id');
      navLinkItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}
window.addEventListener('scroll', updateActiveLink);

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  const originalText = btn.innerHTML;
  btn.innerHTML = '<span>Sending...</span>';
  btn.disabled = true;

  // Simulate form submission
  setTimeout(() => {
    btn.innerHTML = originalText;
    btn.disabled = false;
    formSuccess.classList.add('visible');
    contactForm.reset();
    setTimeout(() => formSuccess.classList.remove('visible'), 5000);
  }, 1200);
});

// ===== INTERSECTION OBSERVER ANIMATIONS =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Apply animation to cards and sections
const animElements = document.querySelectorAll(
  '.feature-card, .class-card, .why-item, .contact-card, .gallery-item, .about-grid, .cta-card'
);

// Inject animation styles
const style = document.createElement('style');
style.textContent = `
  .feature-card, .class-card, .why-item, .contact-card, .gallery-item, .about-grid, .cta-card {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  .animate-in {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
  .feature-card:nth-child(2) { transition-delay: 0.1s; }
  .feature-card:nth-child(3) { transition-delay: 0.2s; }
  .feature-card:nth-child(4) { transition-delay: 0.3s; }
  .class-card:nth-child(2) { transition-delay: 0.1s; }
  .class-card:nth-child(3) { transition-delay: 0.2s; }
  .class-card:nth-child(4) { transition-delay: 0.3s; }
  .class-card:nth-child(5) { transition-delay: 0.4s; }
  .gallery-item:nth-child(2) { transition-delay: 0.08s; }
  .gallery-item:nth-child(3) { transition-delay: 0.16s; }
  .gallery-item:nth-child(4) { transition-delay: 0.24s; }
  .gallery-item:nth-child(5) { transition-delay: 0.32s; }
  .gallery-item:nth-child(6) { transition-delay: 0.40s; }
`;
document.head.appendChild(style);

animElements.forEach(el => observer.observe(el));

// ===== COUNTER ANIMATION (hero stats) =====
function animateCounters() {
  // Just a subtle emphasis effect for section numbers
}

// ===== YEAR =====
const currentYear = new Date().getFullYear();
document.querySelectorAll('.footer-bottom p').forEach(p => {
  p.innerHTML = p.innerHTML.replace('2025', currentYear);
});
