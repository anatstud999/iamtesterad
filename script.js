/* ============================================================
   HIGH TECH ACADEMY — INTERACTIVE JAVASCRIPT
   Stitch-inspired: micro-interactions, cinematic animations
   ============================================================ */

'use strict';

// ===== CURSOR GLOW =====
const cursorGlow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top = e.clientY + 'px';
});
document.addEventListener('mouseleave', () => { cursorGlow.style.opacity = '0'; });
document.addEventListener('mouseenter', () => { cursorGlow.style.opacity = '1'; });

// ===== PARTICLES =====
const particlesContainer = document.getElementById('particles');
const PARTICLE_COUNT = 25;

function createParticle() {
  const p = document.createElement('div');
  p.className = 'particle';
  const x = Math.random() * 100;
  const duration = 8 + Math.random() * 12;
  const drift = (Math.random() - 0.5) * 120;
  const size = 1.5 + Math.random() * 3;
  p.style.cssText = `
    left: ${x}%;
    bottom: -10px;
    width: ${size}px;
    height: ${size}px;
    animation-duration: ${duration}s;
    animation-delay: ${Math.random() * duration}s;
    --drift: ${drift}px;
  `;
  particlesContainer.appendChild(p);
}
for (let i = 0; i < PARTICLE_COUNT; i++) createParticle();

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = navbar.offsetHeight + 12;
    window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - offset, behavior: 'smooth' });
  });
});

// ===== ACTIVE NAV ON SCROLL =====
const sections = document.querySelectorAll('section[id], div[id="gallery"]');
const navItems = document.querySelectorAll('.nav-link:not(.contact-btn)');
function updateNav() {
  const scrollY = window.pageYOffset;
  sections.forEach(sec => {
    const top = sec.offsetTop - navbar.offsetHeight - 80;
    const bottom = top + sec.offsetHeight;
    if (scrollY >= top && scrollY < bottom) {
      const id = sec.getAttribute('id');
      navItems.forEach(l => {
        l.classList.toggle('active', l.getAttribute('href') === `#${id}`);
      });
    }
  });
}
window.addEventListener('scroll', updateNav, { passive: true });

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Staggered delay for sibling elements
      const siblings = entry.target.parentElement.querySelectorAll('.reveal');
      let delay = 0;
      siblings.forEach((el, idx) => {
        if (el === entry.target) delay = idx * 80;
      });
      setTimeout(() => entry.target.classList.add('in-view'), delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -48px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== COUNTER ANIMATION =====
function animateCounter(el, target, suffix = '') {
  const duration = 1800;
  const start = performance.now();
  const ease = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // easeInOut

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const value = Math.round(ease(progress) * target);
    el.textContent = value;
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  }
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const nums = entry.target.querySelectorAll('.stat-num[data-target]');
      nums.forEach(num => {
        const target = parseInt(num.dataset.target);
        animateCounter(num, target);
      });
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) counterObserver.observe(heroStats);

// ===== WHY-US animated progress bars =====
function animateWhyBars() {
  document.querySelectorAll('.why-bar').forEach((bar, i) => {
    setTimeout(() => {
      bar.style.opacity = '1';
    }, i * 150);
  });
}
const whyObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    animateWhyBars();
    whyObserver.disconnect();
  }
}, { threshold: 0.2 });
const whySection = document.getElementById('why');
if (whySection) whyObserver.observe(whySection);

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:20px;height:20px;animation:spin 0.8s linear infinite"><path d="M12 2a10 10 0 0 1 10 10"/></svg><span>Sending...</span>';
  btn.disabled = true;

  setTimeout(() => {
    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:20px;height:20px"><path d="M22 2L11 13"/><path d="M22 2L15 22 11 13 2 9l20-7z"/></svg><span>Send Message</span>';
    btn.disabled = false;
    formSuccess.classList.add('visible');
    contactForm.reset();
    setTimeout(() => formSuccess.classList.remove('visible'), 6000);
  }, 1500);
});

// Spin keyframe for the loading icon
const spinStyle = document.createElement('style');
spinStyle.textContent = `@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`;
document.head.appendChild(spinStyle);

// ===== FOOTER YEAR =====
const footerYear = document.getElementById('footerYear');
if (footerYear) footerYear.textContent = new Date().getFullYear();

// ===== FEATURE CARD SUBTLE PARALLAX ON HOVER =====
document.querySelectorAll('.feat-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    card.style.setProperty('--rx', `${dy * -6}deg`);
    card.style.setProperty('--ry', `${dx * 6}deg`);
  });
  card.addEventListener('mouseleave', () => {
    card.style.setProperty('--rx', '0deg');
    card.style.setProperty('--ry', '0deg');
  });
});

// ===== GALLERY RIPPLE =====
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', (e) => {
    const ripple = document.createElement('div');
    const rect = item.getBoundingClientRect();
    ripple.style.cssText = `
      position:absolute;
      border-radius:50%;
      width:10px;height:10px;
      background:rgba(229,9,20,0.6);
      left:${e.clientX - rect.left - 5}px;
      top:${e.clientY - rect.top - 5}px;
      transform:scale(0);
      animation:rippleOut 0.6s ease-out forwards;
      pointer-events:none;
      z-index:10;
    `;
    item.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  });
});
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `@keyframes rippleOut { to{transform:scale(30);opacity:0} }`;
document.head.appendChild(rippleStyle);

// ===== TICKER PAUSE ON HOVER =====
const tickerContent = document.getElementById('tickerContent');
if (tickerContent) {
  tickerContent.addEventListener('mouseenter', () => {
    tickerContent.style.animationPlayState = 'paused';
  });
  tickerContent.addEventListener('mouseleave', () => {
    tickerContent.style.animationPlayState = 'running';
  });
}

// ===== CURSOR MAGNETIC BUTTONS =====
document.querySelectorAll('.btn, .contact-btn').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    btn.style.transform = `translate(${dx * 0.2}px, ${dy * 0.2}px) scale(1.03)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});
