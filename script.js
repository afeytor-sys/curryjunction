/* ============================================
   CURRY JUNCTION – MAIN JAVASCRIPT
   Authentisches Indisches Restaurant Berlin
   ============================================ */

'use strict';

/* ===== NAVBAR SCROLL EFFECT ===== */
const navbar = document.getElementById('navbar');

function handleNavbarScroll() {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleNavbarScroll, { passive: true });
handleNavbarScroll(); // run on load


/* ===== MOBILE HAMBURGER MENU ===== */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close menu when a nav link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

// Close menu on outside click
document.addEventListener('click', (e) => {
  if (navLinks.classList.contains('open') &&
      !navLinks.contains(e.target) &&
      !hamburger.contains(e.target)) {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
});


/* ===== ACTIVE NAV LINK ON SCROLL ===== */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

function setActiveNavLink() {
  const scrollY = window.scrollY + 100;

  sections.forEach(section => {
    const sectionTop    = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId     = section.getAttribute('id');

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navAnchors.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === `#${sectionId}`) {
          a.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', setActiveNavLink, { passive: true });


/* ===== MENU TABS ===== */
const tabBtns  = document.querySelectorAll('.tab-btn');
const menuGrid = document.getElementById('menuGrid');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const targetTab = btn.dataset.tab;

    // Update active tab button
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Show/hide menu cards with animation
    const cards = menuGrid.querySelectorAll('.menu-card');
    cards.forEach((card, index) => {
      if (card.dataset.category === targetTab) {
        card.style.display = 'block';
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        // Stagger animation
        setTimeout(() => {
          card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, index * 60);
      } else {
        card.style.display = 'none';
      }
    });
  });
});


/* ===== SCROLL REVEAL ANIMATIONS ===== */
function addRevealClasses() {
  // Feature cards
  document.querySelectorAll('.feature-card').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${i * 0.1}s`;
  });

  // Menu cards
  document.querySelectorAll('.menu-card').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${i * 0.08}s`;
  });

  // Review cards
  document.querySelectorAll('.review-card').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${i * 0.1}s`;
  });

  // Section headers
  document.querySelectorAll('.section-header').forEach(el => {
    el.classList.add('reveal');
  });

  // About content
  const aboutImageWrapper = document.querySelector('.about-image-wrapper');
  const aboutContent      = document.querySelector('.about-content');
  if (aboutImageWrapper) aboutImageWrapper.classList.add('reveal-left');
  if (aboutContent)      aboutContent.classList.add('reveal-right');

  // Contact
  const contactInfo = document.querySelector('.contact-info');
  const contactMap  = document.querySelector('.contact-map');
  if (contactInfo) contactInfo.classList.add('reveal-left');
  if (contactMap)  contactMap.classList.add('reveal-right');

  // Rating hero
  const ratingHero = document.querySelector('.rating-hero');
  if (ratingHero) ratingHero.classList.add('reveal');

  // Service items
  document.querySelectorAll('.service-item').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${i * 0.15}s`;
  });
}

function observeRevealElements() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Unobserve after animation to save resources
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    observer.observe(el);
  });
}

// Initialize after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  addRevealClasses();
  observeRevealElements();
});


/* ===== SMOOTH SCROLL FOR ANCHOR LINKS ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const navHeight = navbar.offsetHeight;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;

      window.scrollTo({
        top: targetTop,
        behavior: 'smooth'
      });
    }
  });
});


/* ===== RATING BARS ANIMATION ===== */
function animateRatingBars() {
  const barFills = document.querySelectorAll('.bar-fill');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const targetWidth = fill.style.width;
        fill.style.width = '0%';
        setTimeout(() => {
          fill.style.width = targetWidth;
        }, 200);
        observer.unobserve(fill);
      }
    });
  }, { threshold: 0.5 });

  barFills.forEach(fill => observer.observe(fill));
}

document.addEventListener('DOMContentLoaded', animateRatingBars);


/* ===== COUNTER ANIMATION FOR STATS ===== */
function animateCounter(el, target, duration = 1500) {
  const isDecimal = target % 1 !== 0;
  const start     = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed  = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased    = 1 - Math.pow(1 - progress, 3);
    const current  = start + (target - start) * eased;

    el.textContent = isDecimal
      ? current.toFixed(1).replace('.', ',')
      : Math.floor(current) + (el.dataset.suffix || '');

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = isDecimal
        ? target.toFixed(1).replace('.', ',')
        : target + (el.dataset.suffix || '');
    }
  }

  requestAnimationFrame(update);
}

function initCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el   = entry.target;
        const text = el.textContent.replace(',', '.').replace('+', '');
        const num  = parseFloat(text);
        if (!isNaN(num)) {
          if (el.textContent.includes('+')) el.dataset.suffix = '+';
          animateCounter(el, num);
        }
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', initCounters);


/* ===== HERO PARALLAX EFFECT ===== */
const hero = document.querySelector('.hero');

function handleParallax() {
  if (!hero) return;
  const scrolled = window.scrollY;
  if (scrolled < window.innerHeight) {
    hero.style.backgroundPositionY = `calc(50% + ${scrolled * 0.3}px)`;
  }
}

window.addEventListener('scroll', handleParallax, { passive: true });


/* ===== STICKY CTA BUTTON (mobile) ===== */
function createStickyCTA() {
  if (window.innerWidth > 768) return;

  const stickyCTA = document.createElement('div');
  stickyCTA.className = 'sticky-cta';
  stickyCTA.innerHTML = `
    <a href="tel:03053014141" class="btn btn-primary">
      📞 Jetzt anrufen
    </a>
  `;
  stickyCTA.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 900;
    opacity: 0;
    transition: opacity 0.3s ease, transform 0.3s ease;
    pointer-events: none;
  `;
  document.body.appendChild(stickyCTA);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      stickyCTA.style.opacity = '1';
      stickyCTA.style.pointerEvents = 'auto';
    } else {
      stickyCTA.style.opacity = '0';
      stickyCTA.style.pointerEvents = 'none';
    }
  }, { passive: true });
}

document.addEventListener('DOMContentLoaded', createStickyCTA);


/* ===== LAZY LOAD IMAGES FALLBACK ===== */
if ('loading' in HTMLImageElement.prototype) {
  // Native lazy loading supported – nothing to do
} else {
  // Fallback for older browsers
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        imageObserver.unobserve(img);
      }
    });
  });
  lazyImages.forEach(img => imageObserver.observe(img));
}


/* ===== ACTIVE LINK HIGHLIGHT IN NAVBAR ===== */
const style = document.createElement('style');
style.textContent = `
  .nav-links a.active {
    color: var(--orange) !important;
    background: rgba(232, 98, 26, 0.1) !important;
  }
  .navbar:not(.scrolled) .nav-links a.active {
    color: var(--gold-light) !important;
    background: rgba(255,255,255,0.15) !important;
  }
`;
document.head.appendChild(style);


/* ===== CONSOLE BRANDING ===== */
console.log(
  '%c🍛 Curry Junction Berlin %c\nAuthentisches Indisches Restaurant\nKarl-Kunger-Straße 18, 12435 Berlin\n☎ 030 53014141 | ⭐ 4,9 Sterne',
  'background: #E8621A; color: #fff; font-size: 16px; font-weight: bold; padding: 8px 16px; border-radius: 8px 8px 0 0;',
  'color: #5C3317; font-size: 12px; padding: 4px 0;'
);
