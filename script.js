/* ============================================================
   script.js – Portfolio Interactivity
   ============================================================ */

/* ── Navbar Scroll Effect ──────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  updateActiveNav();
});

/* ── Active Nav Link ───────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
function updateActiveNav() {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');
    const link   = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) {
      link.classList.toggle('active', scrollY >= top && scrollY < top + height);
    }
  });
}

/* ── Hamburger Menu ────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
  });
});

/* ── Typewriter Effect ─────────────────────────────── */
const roles = [
  'IT Governance Specialist',
  'Data Analyst (Power BI & Excel)',
  'BNSP Certified (Pemasaran / CRM)',
  'AI-Assisted Workflow Practitioner'
];
let roleIdx = 0, charIdx = 0, isDeleting = false;
const roleEl = document.getElementById('roleText');

function typeWriter() {
  const current = roles[roleIdx];
  if (!isDeleting) {
    roleEl.textContent = current.substring(0, ++charIdx);
    if (charIdx === current.length) {
      setTimeout(() => { isDeleting = true; }, 2000);
      setTimeout(typeWriter, 2200);
      return;
    }
  } else {
    roleEl.textContent = current.substring(0, --charIdx);
    if (charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
    }
  }
  setTimeout(typeWriter, isDeleting ? 60 : 110);
}
typeWriter();

/* ── Animated Counter ──────────────────────────────── */
function animateCounter(el, target, duration = 1600) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start);
    }
  }, 16);
}

let countersStarted = false;
function startCounters() {
  if (countersStarted) return;
  const hero = document.querySelector('.hero-stats');
  if (!hero) return;
  const rect = hero.getBoundingClientRect();
  if (rect.top < window.innerHeight - 50) {
    countersStarted = true;
    document.querySelectorAll('.stat-number').forEach(el => {
      animateCounter(el, parseInt(el.dataset.target));
    });
  }
}
window.addEventListener('scroll', startCounters);
startCounters();

/* ── Skill Bar Animation ───────────────────────────── */
let barsAnimated = false;
function animateBars() {
  if (barsAnimated) return;
  const section = document.getElementById('skills');
  if (!section) return;
  const rect = section.getBoundingClientRect();
  if (rect.top < window.innerHeight - 80) {
    barsAnimated = true;
    document.querySelectorAll('.prof-bar-fill').forEach(bar => {
      const width = bar.dataset.width;
      setTimeout(() => { bar.style.width = width + '%'; }, 200);
    });
  }
}
window.addEventListener('scroll', animateBars);
animateBars();

/* ── Scroll Reveal ─────────────────────────────────── */
const revealEls = document.querySelectorAll(
  '.info-card, .skill-category, .timeline-item, .task-item, .cert-item, .edu-card, .cert-section, .contact-card, .contact-form-wrap, .about-text, .about-cards, .proficiency-section, .highlight-item'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal', 'visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${(i % 4) * 80}ms`;
  observer.observe(el);
});

/* ── Contact Form ──────────────────────────────────── */
const form        = document.getElementById('contactForm');
const successMsg  = document.getElementById('formSuccess');
const submitBtn   = document.getElementById('submitBtn');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  submitBtn.disabled = true;
  submitBtn.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin-icon">
      <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
    </svg>
    Mengirim...
  `;
  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="22" y1="2" x2="11" y2="13"></line>
        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
      </svg>
      Kirim Pesan
    `;
    successMsg.style.display = 'block';
    form.reset();
    setTimeout(() => { successMsg.style.display = 'none'; }, 5000);
  }, 1800);
});

/* Spin animation for loading icon */
const style = document.createElement('style');
style.textContent = `
  .spin-icon { animation: spin-anim 0.8s linear infinite; }
  @keyframes spin-anim { to { transform: rotate(360deg); } }
`;
document.head.appendChild(style);

/* ── Smooth scroll for all internal links ──────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── Parallax Floating Badges ──────────────────────── */
window.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 18;
  const y = (e.clientY / window.innerHeight - 0.5) * 18;
  const content = document.getElementById('badgeContent');
  const ai      = document.getElementById('badgeAI');
  const crm     = document.getElementById('badgeCRM');
  if (content) content.style.transform = `translate(${x * 0.6}px, ${y * 0.6}px)`;
  if (ai)      ai.style.transform      = `translate(${-x * 0.4}px, ${-y * 0.4}px)`;
  if (crm)     crm.style.transform     = `translate(${x * 0.3}px, ${y * 0.8}px)`;
});

/* ── Particle dots in background ───────────────────── */
(function createParticles() {
  const canvas  = document.getElementById('bgCanvas');
  const count   = 28;
  for (let i = 0; i < count; i++) {
    const dot = document.createElement('div');
    const size = Math.random() * 3 + 1;
    const x    = Math.random() * 100;
    const y    = Math.random() * 100;
    const dur  = Math.random() * 12 + 8;
    const del  = Math.random() * 8;
    dot.style.cssText = `
      position: absolute;
      width: ${size}px; height: ${size}px;
      border-radius: 50%;
      left: ${x}%; top: ${y}%;
      background: rgba(56,189,248,${Math.random() * 0.25 + 0.05});
      animation: particle-float ${dur}s ${del}s ease-in-out infinite alternate;
      pointer-events: none;
    `;
    canvas.appendChild(dot);
  }
  const pStyle = document.createElement('style');
  pStyle.textContent = `
    @keyframes particle-float {
      from { transform: translate(0,0) scale(1); opacity: 0.4; }
      to   { transform: translate(${Math.random()*40-20}px,${Math.random()*40-20}px) scale(1.5); opacity: 0; }
    }
  `;
  document.head.appendChild(pStyle);
})();

/* ── Gallery Filter (Not used since tabs are removed) ── */

/* ── Lightbox ──────────────────────────────────────── */
const lightbox     = document.getElementById('lightbox');
const lightboxImg  = document.getElementById('lightboxImg');
const lightboxCap  = document.getElementById('lightboxCaption');

function openLightbox(src, caption) {
  lightboxImg.src = src;
  lightboxImg.alt = caption;
  lightboxCap.textContent = caption;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(() => { lightboxImg.src = ''; }, 300);
}

// Close with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

window.addEventListener('DOMContentLoaded', () => {
  const heroItems = document.querySelectorAll('.hero-badge, .hero-title, .hero-roles, .hero-desc, .hero-cta, .hero-stats');
  heroItems.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 300 + i * 120);
  });

  const heroVisual = document.querySelector('.hero-visual');
  if (heroVisual) {
    heroVisual.style.opacity = '0';
    heroVisual.style.transform = 'scale(0.9)';
    heroVisual.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    setTimeout(() => {
      heroVisual.style.opacity = '1';
      heroVisual.style.transform = 'scale(1)';
    }, 500);
  }
});
