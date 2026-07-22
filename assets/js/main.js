// Dark/Light mode toggle
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    html.classList.toggle('dark');
    localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
  });
  // On load
  if (localStorage.getItem('theme') === 'dark') {
    html.classList.add('dark');
  }
}

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navOverlay = document.getElementById('nav-overlay');

function openMobileNav() {
  hamburger.classList.add('active');
  navMenu.classList.add('active');
  navOverlay.classList.add('active');
  hamburger.setAttribute('aria-expanded', 'true');
}

function closeMobileNav() {
  hamburger.classList.remove('active');
  navMenu.classList.remove('active');
  navOverlay.classList.remove('active');
  hamburger.setAttribute('aria-expanded', 'false');
}

if (hamburger && navMenu && navOverlay) {
  hamburger.addEventListener('click', () => {
    if (navMenu.classList.contains('active')) {
      closeMobileNav();
    } else {
      openMobileNav();
    }
  });
  navOverlay.addEventListener('click', closeMobileNav);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navMenu.classList.contains('active')) {
      closeMobileNav();
      hamburger.focus();
    }
  });
}

// Close mobile nav when a link inside it is clicked
navMenu?.querySelectorAll('a[data-scroll]').forEach(link => {
  link.addEventListener('click', closeMobileNav);
});

// ========== QUOTATION MODAL ==========
const quoteModal = document.getElementById('quote-modal');
const quoteForm = document.getElementById('quote-form');
const quoteSuccess = document.getElementById('quote-success');
const whatsappNumber = '243853054901';

function openQuoteModal() {
  if (quoteModal) {
    quoteModal.classList.remove('hidden');
    quoteModal.classList.add('active');
  }
  quoteSuccess?.classList.add('hidden');
  closeMobileNav();
}
function closeQuoteModal() {
  if (quoteModal) {
    quoteModal.classList.add('hidden');
    quoteModal.classList.remove('active');
  }
}

// All "Request a Quote" triggers
document.getElementById('open-quote-modal')?.addEventListener('click', openQuoteModal);
document.querySelectorAll('.open-quote-modal-link').forEach(btn => {
  btn.addEventListener('click', openQuoteModal);
});
document.getElementById('close-quote-modal')?.addEventListener('click', closeQuoteModal);
document.getElementById('quote-modal-backdrop')?.addEventListener('click', closeQuoteModal);

// Quote form submission
if (quoteForm) {
  quoteForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const data = new FormData(this);
    const name = data.get('q_name')?.toString().trim();
    const email = data.get('q_email')?.toString().trim();
    const phone = data.get('q_phone')?.toString().trim();
    const service = data.get('q_service')?.toString();
    const details = data.get('q_details')?.toString().trim();
    if (!name || !email || !service || !details) return;
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return;

    const message = [
      'Hello Marla home & décor. I would like to request a quote.',
      '',
      `Name: ${name}`,
      `Phone: ${phone || 'Not provided'}`,
      `Email: ${email}`,
      `Service required: ${service}`,
      '',
      'Project details:',
      details,
      '',
      'I can attach photos in WhatsApp if needed.'
    ].join('\n');

    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    quoteSuccess.classList.remove('hidden');
    quoteSuccess.focus();
  });
}

// Smooth scroll for nav links
const navLinks = document.querySelectorAll('a[data-scroll]');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      closeMobileNav();
    }
  });
});

// Back to top button
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTop?.classList.add('visible');
  } else {
    backToTop?.classList.remove('visible');
  }
});
backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Parallax effect
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReducedMotion) {
  window.addEventListener('scroll', function() {
    document.querySelectorAll('.parallax__layer').forEach(layer => {
      const depth = layer.getAttribute('data-depth');
      const movement = -(window.scrollY * depth);
      layer.style.transform = `translateY(${movement}px)`;
    });
  });
}
