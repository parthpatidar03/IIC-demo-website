/* ===================================================================
   NITT Innovation Challenge — JavaScript
   Handles: Scroll reveals, form validation, marquee, nav, countdown
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollReveal();
  initCountdown();
  initForm();
  initHeroGrid();
  initScroller();
});

/* ===================================================================
   HERO GRID RIPPLE BACKGROUND (Vanilla JS replica of Aceternity BackgroundRippleEffect)
   =================================================================== */
function initHeroGrid() {
  const container = document.getElementById('hero-grid-bg');
  if (!container) return;

  const CELL_SIZE = 56; // px — same as React component default
  let cols, rows, cells = [];

  function buildGrid() {
    container.innerHTML = '';
    cols = Math.ceil(container.offsetWidth / CELL_SIZE) + 1;
    rows = Math.ceil(container.offsetHeight / CELL_SIZE) + 1;

    const inner = document.createElement('div');
    inner.className = 'hero__grid-inner';
    inner.style.gridTemplateColumns = `repeat(${cols}, ${CELL_SIZE}px)`;
    inner.style.gridTemplateRows    = `repeat(${rows}, ${CELL_SIZE}px)`;
    inner.style.width  = `${cols * CELL_SIZE}px`;
    inner.style.height = `${rows * CELL_SIZE}px`;

    cells = [];
    const total = rows * cols;
    for (let i = 0; i < total; i++) {
      const cell = document.createElement('div');
      cell.className = 'hero__grid-cell';
      cell.dataset.row = Math.floor(i / cols);
      cell.dataset.col = i % cols;
      inner.appendChild(cell);
      cells.push(cell);
    }

    // Click triggers ripple from clicked cell outward
    inner.addEventListener('click', (e) => {
      const cell = e.target.closest('.hero__grid-cell');
      if (!cell) return;
      const clickedRow = parseInt(cell.dataset.row);
      const clickedCol = parseInt(cell.dataset.col);

      cells.forEach((c) => {
        const r = parseInt(c.dataset.row);
        const cl = parseInt(c.dataset.col);
        const dist = Math.hypot(clickedRow - r, clickedCol - cl);
        const delay    = Math.max(0, dist * 55);       // ms — matches React component
        const duration = 200 + dist * 80;              // ms — matches React component

        // Remove then re-add class to restart animation
        c.classList.remove('ripple');
        void c.offsetWidth; // force reflow
        c.style.setProperty('--ripple-delay',    `${delay}ms`);
        c.style.setProperty('--ripple-duration', `${duration}ms`);
        c.classList.add('ripple');

        // Clean up class after animation finishes
        const total = delay + duration;
        setTimeout(() => c.classList.remove('ripple'), total + 50);
      });
    });

    container.appendChild(inner);
    container.classList.add('active'); // re-enable pointer events now grid exists
  }

  buildGrid();

  // Rebuild on resize so grid always covers the viewport
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(buildGrid, 150);
  }, { passive: true });
}

/* ===================================================================
   INFINITE MOVING CARDS (Vanilla JS replica of Aceternity UI)
   =================================================================== */
function initScroller() {
  const scrollers = document.querySelectorAll('.scroller');

  // If a user has opted in to reduced motion, don't add the animation
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    addAnimation();
  }

  function addAnimation() {
    scrollers.forEach((scroller) => {
      // add data-animated="true" to every scroller on the page
      scroller.setAttribute('data-animated', true);

      // Make an array from the elements within `.scroller__inner`
      const scrollerInner = scroller.querySelector('.scroller__inner');
      const scrollerContent = Array.from(scrollerInner.children);

      // For each item in the array, clone it
      // add aria-hidden to it
      // add it into the `.scroller__inner`
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        duplicatedItem.setAttribute('aria-hidden', true);
        scrollerInner.appendChild(duplicatedItem);
      });

      // Set direction
      const direction = scroller.getAttribute('data-direction') || 'left';
      if (direction === 'right') {
        scrollerInner.style.setProperty('--animation-direction', 'reverse');
      } else {
        scrollerInner.style.setProperty('--animation-direction', 'forwards');
      }

      // Set speed
      const speed = scroller.getAttribute('data-speed') || 'fast';
      if (speed === 'fast') {
        scrollerInner.style.setProperty('--animation-duration', '20s');
      } else if (speed === 'slow') {
        scrollerInner.style.setProperty('--animation-duration', '80s');
      } else {
        scrollerInner.style.setProperty('--animation-duration', '40s'); // normal
      }

      // Start animation
      scrollerInner.classList.add('animate-scroll');
    });
  }
}


/* ===================================================================
   NAVBAR
   =================================================================== */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const toggle = document.querySelector('.navbar__toggle');
  const links = document.querySelector('.navbar__links');
  const navLinks = document.querySelectorAll('.navbar__link');

  // Scroll effect
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  }, { passive: true });

  // Mobile toggle
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      links.classList.toggle('open');
      document.body.style.overflow = links.classList.contains('open') ? 'hidden' : '';
    });

    // Close on link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        links.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }
}

/* ===================================================================
   SCROLL REVEAL (IntersectionObserver)
   =================================================================== */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/* ===================================================================
   COUNTDOWN TIMER (to 25 July 2026)
   =================================================================== */
function initCountdown() {
  const deadline = new Date('2026-07-25T23:59:59+05:30').getTime();
  const daysEl = document.getElementById('countdown-days');
  const hoursEl = document.getElementById('countdown-hours');
  const minsEl = document.getElementById('countdown-mins');
  const secsEl = document.getElementById('countdown-secs');

  if (!daysEl) return;

  function update() {
    const now = Date.now();
    const diff = deadline - now;

    if (diff <= 0) {
      daysEl.textContent = '0';
      hoursEl.textContent = '0';
      minsEl.textContent = '0';
      secsEl.textContent = '0';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minsEl.textContent = String(mins).padStart(2, '0');
    secsEl.textContent = String(secs).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

/* ===================================================================
   FORM VALIDATION & SUBMISSION
   =================================================================== */
function initForm() {
  const form = document.getElementById('registration-form');
  if (!form) return;

  form.addEventListener('submit', handleSubmit);

  // Live validation on blur
  const requiredInputs = form.querySelectorAll('[required]');
  requiredInputs.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.classList.contains('error')) {
        validateField(input);
      }
    });
  });
}

function validateField(input) {
  const errorEl = input.closest('.form__group')?.querySelector('.form__error');
  let isValid = true;
  let message = '';

  // Required check
  if (input.hasAttribute('required') && !input.value.trim()) {
    isValid = false;
    message = 'This field is required';
  }

  // Email check
  if (isValid && input.type === 'email' && input.value.trim()) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(input.value.trim())) {
      isValid = false;
      message = 'Please enter a valid email address';
    }
  }

  // Phone check
  if (isValid && input.type === 'tel' && input.value.trim()) {
    const phoneRegex = /^[0-9+\-\s()]{10,15}$/;
    if (!phoneRegex.test(input.value.trim())) {
      isValid = false;
      message = 'Please enter a valid phone number';
    }
  }

  // Select check
  if (isValid && input.tagName === 'SELECT' && input.hasAttribute('required') && !input.value) {
    isValid = false;
    message = 'Please select an option';
  }

  if (!isValid) {
    input.classList.add('error');
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add('visible');
    }
  } else {
    input.classList.remove('error');
    if (errorEl) {
      errorEl.classList.remove('visible');
    }
  }

  return isValid;
}

function validateRadioGroup(name, form) {
  const radios = form.querySelectorAll(`input[name="${name}"]`);
  const checked = form.querySelector(`input[name="${name}"]:checked`);
  const group = radios[0]?.closest('.form__group');
  const errorEl = group?.querySelector('.form__error');

  if (!checked) {
    if (errorEl) {
      errorEl.textContent = 'Please select an option';
      errorEl.classList.add('visible');
    }
    return false;
  }

  if (errorEl) {
    errorEl.classList.remove('visible');
  }
  return true;
}

async function handleSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const submitBtn = form.querySelector('.btn-primary');
  let isValid = true;

  // Validate all required text/email/select fields
  const requiredFields = form.querySelectorAll('input[required], select[required], textarea[required]');
  requiredFields.forEach(field => {
    if (!validateField(field)) {
      isValid = false;
    }
  });

  // Validate required radio groups
  const requiredRadios = ['alumni_lack', 'attend_seminar', 'sunday_morning'];
  requiredRadios.forEach(name => {
    if (!validateRadioGroup(name, form)) {
      isValid = false;
    }
  });

  if (!isValid) {
    // Scroll to first error
    const firstError = form.querySelector('.error, .form__error.visible');
    if (firstError) {
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return;
  }

  // Collect form data
  const formData = new FormData(form);
  const data = {};

  for (const [key, value] of formData.entries()) {
    if (data[key]) {
      // Handle multiple values (checkboxes)
      if (Array.isArray(data[key])) {
        data[key].push(value);
      } else {
        data[key] = [data[key], value];
      }
    } else {
      data[key] = value;
    }
  }

  // Submit
  submitBtn.classList.add('loading');
  submitBtn.disabled = true;

  try {
    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (response.ok && result.success) {
      showToast('Registration submitted successfully! We\'ll be in touch soon.', 'success');
      form.reset();
    } else {
      showToast(result.message || 'Something went wrong. Please try again.', 'error');
    }
  } catch (err) {
    // If the API is unavailable (local dev without Vercel), show success anyway for demo
    console.warn('API not available, showing demo success:', err);
    showToast('Registration submitted successfully! (Demo mode — deploy to Vercel for full backend)', 'success');
    form.reset();
  } finally {
    submitBtn.classList.remove('loading');
    submitBtn.disabled = false;
  }
}

/* ===================================================================
   TOAST NOTIFICATION
   =================================================================== */
function showToast(message, type = 'success') {
  // Remove existing toasts
  document.querySelectorAll('.toast').forEach(t => t.remove());

  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toast.classList.add('visible');
    });
  });

  // Auto-hide
  setTimeout(() => {
    toast.classList.remove('visible');
    setTimeout(() => toast.remove(), 500);
  }, 5000);
}
