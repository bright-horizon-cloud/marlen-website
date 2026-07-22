const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const navOverlay = document.getElementById('nav-overlay');
const quoteModal = document.getElementById('quote-modal');
const quoteForm = document.getElementById('quote-form');
const quoteSuccess = document.getElementById('quote-success');
const backToTop = document.getElementById('backToTop');
const whatsappNumber = '243853054901';

function openMobileNav() {
  if (!hamburger || !mobileMenu || !navOverlay) return;
  hamburger.classList.add('active');
  hamburger.setAttribute('aria-expanded', 'true');
  mobileMenu.hidden = false;
  navOverlay.hidden = false;
  document.body.classList.add('menu-open');
}

function closeMobileNav() {
  if (!hamburger || !mobileMenu || !navOverlay) return;
  hamburger.classList.remove('active');
  hamburger.setAttribute('aria-expanded', 'false');
  mobileMenu.hidden = true;
  navOverlay.hidden = true;
  document.body.classList.remove('menu-open');
}

function openQuoteModal() {
  if (!quoteModal) return;
  quoteModal.hidden = false;
  quoteSuccess.hidden = true;
  document.body.classList.add('modal-open');
  closeMobileNav();
  document.getElementById('q-name')?.focus();
}

function closeQuoteModal() {
  if (!quoteModal) return;
  quoteModal.hidden = true;
  document.body.classList.remove('modal-open');
}

hamburger?.addEventListener('click', () => {
  if (mobileMenu?.hidden) {
    openMobileNav();
  } else {
    closeMobileNav();
  }
});

navOverlay?.addEventListener('click', closeMobileNav);
document.getElementById('close-quote-modal')?.addEventListener('click', closeQuoteModal);
document.getElementById('quote-modal-backdrop')?.addEventListener('click', closeQuoteModal);
document.getElementById('open-quote-modal')?.addEventListener('click', openQuoteModal);
document.querySelectorAll('.open-quote-modal-link').forEach((trigger) => {
  trigger.addEventListener('click', openQuoteModal);
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  if (quoteModal && !quoteModal.hidden) {
    closeQuoteModal();
    document.getElementById('open-quote-modal')?.focus();
    return;
  }
  if (mobileMenu && !mobileMenu.hidden) {
    closeMobileNav();
    hamburger?.focus();
  }
});

document.querySelectorAll('a[data-scroll]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
    closeMobileNav();
  });
});

if (quoteForm) {
  quoteForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(quoteForm);
    const name = data.get('q_name')?.toString().trim();
    const email = data.get('q_email')?.toString().trim();
    const phone = data.get('q_phone')?.toString().trim();
    const service = data.get('q_service')?.toString().trim();
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
    quoteSuccess.hidden = false;
    quoteSuccess.focus();
  });
}

window.addEventListener('scroll', () => {
  if (!backToTop) return;
  backToTop.classList.toggle('visible', window.scrollY > 400);
});

backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
