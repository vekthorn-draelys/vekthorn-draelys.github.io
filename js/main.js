/* ============================================
   XXX-XXX PORTFOLIO — main.js
   ============================================ */

// ── MATRIX RAIN ──────────────────────────────
(function initMatrix() {
  const canvas = document.getElementById('matrix-bg');
  const ctx    = canvas.getContext('2d');

  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;,.<>?/\\アイウエオカキクケコサシスセソタチツテトナニヌネノ';
  let cols, drops;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    cols  = Math.floor(canvas.width / 18);
    drops = Array.from({ length: cols }, () => Math.random() * -100);
  }

  function draw() {
    ctx.fillStyle = 'rgba(9,13,15,0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font      = '14px Share Tech Mono, monospace';

    drops.forEach((y, i) => {
      // Vary shade per column for depth
      const shade = Math.random() > 0.98 ? '#ffffff' : (Math.random() > 0.8 ? '#00ff88' : '#00cc6a');
      ctx.fillStyle = shade;

      const char = CHARS[Math.floor(Math.random() * CHARS.length)];
      ctx.fillText(char, i * 18, y * 18);

      if (y * 18 > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i] += 0.5;
    });
  }

  resize();
  window.addEventListener('resize', resize);
  setInterval(draw, 50);
})();


// ── NAVBAR SCROLL EFFECT ─────────────────────
(function initNavbar() {
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    nav.style.borderBottomColor = window.scrollY > 20
      ? 'rgba(0,255,136,0.2)'
      : 'rgba(26,47,56,1)';
  });
})();


// ── ANIMATED COUNTERS ────────────────────────
(function initCounters() {
  const counters = document.querySelectorAll('.stat-num');
  const speed    = 60; // ms per frame

  function animateCounter(el) {
    const target = +el.getAttribute('data-target');
    const step   = Math.ceil(target / (1200 / speed));
    let current  = 0;

    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current + (el.dataset.suffix || '');
      if (current >= target) clearInterval(timer);
    }, speed);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
})();


// ── SKILL BAR ANIMATION ──────────────────────
(function initSkillBars() {
  const bars = document.querySelectorAll('.bar-fill');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const pct = entry.target.getAttribute('data-width');
        entry.target.style.width = pct + '%';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(b => observer.observe(b));
})();


// ── SECTION REVEAL ───────────────────────────
(function initReveal() {
  const sections = document.querySelectorAll('section');

  const style = document.createElement('style');
  style.textContent = `
    section { opacity: 0; transform: translateY(24px); transition: opacity 0.7s ease, transform 0.7s ease; }
    section.visible { opacity: 1; transform: translateY(0); }
    #hero { opacity: 1; transform: none; }
  `;
  document.head.appendChild(style);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(s => {
    if (s.id !== 'hero') observer.observe(s);
  });
})();


// ── OP CARD HOVER GLITCH ─────────────────────
(function initGlitch() {
  document.querySelectorAll('.op-card h3').forEach(el => {
    const original = el.textContent;
    const GLITCH   = '!@#$%^&*<>?/\\|';

    el.addEventListener('mouseenter', () => {
      let iterations = 0;
      const timer = setInterval(() => {
        el.textContent = original
          .split('')
          .map((ch, i) => {
            if (ch === ' ') return ' ';
            if (i < iterations) return original[i];
            return GLITCH[Math.floor(Math.random() * GLITCH.length)];
          })
          .join('');
        if (++iterations > original.length) {
          el.textContent = original;
          clearInterval(timer);
        }
      }, 30);
    });
  });
})();


// ── ACTIVE NAV HIGHLIGHT ─────────────────────
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(a => {
          a.style.color = a.getAttribute('href') === '#' + entry.target.id
            ? 'var(--green)'
            : '';
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => observer.observe(s));
})();


// ── FOOTER YEAR ──────────────────────────────
document.getElementById('footer-year').textContent = '© ' + new Date().getFullYear();


// ── CURSOR TRAIL ─────────────────────────────
(function initCursorTrail() {
  const MAX = 10;
  const trail = [];

  for (let i = 0; i < MAX; i++) {
    const dot = document.createElement('div');
    dot.style.cssText = `
      position: fixed;
      width: 4px; height: 4px;
      border-radius: 50%;
      background: var(--green);
      pointer-events: none;
      z-index: 9998;
      opacity: 0;
      transition: opacity 0.3s;
    `;
    document.body.appendChild(dot);
    trail.push({ el: dot, x: 0, y: 0 });
  }

  let mx = 0, my = 0;
  window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  function update() {
    let px = mx, py = my;
    trail.forEach((t, i) => {
      t.x += (px - t.x) * 0.35;
      t.y += (py - t.y) * 0.35;
      t.el.style.left = t.x + 'px';
      t.el.style.top  = t.y + 'px';
      t.el.style.opacity = (1 - i / MAX) * 0.5;
      t.el.style.transform = `scale(${1 - i / MAX})`;
      px = t.x; py = t.y;
    });
    requestAnimationFrame(update);
  }
  update();
})();


// ── STATUS CYCLING ───────────────────────────
(function initStatus() {
  const el       = document.getElementById('status-text');
  const messages = ['ONLINE', 'AVAILABLE', 'ARMED'];
  let idx = 0;
  setInterval(() => {
    idx = (idx + 1) % messages.length;
    el.style.opacity = 0;
    setTimeout(() => {
      el.textContent  = messages[idx];
      el.style.opacity = 1;
    }, 300);
  }, 3000);
  el.style.transition = 'opacity 0.3s';
})();
