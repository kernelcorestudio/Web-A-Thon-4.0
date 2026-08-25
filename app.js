/**
 * NIRVAN '26 — Main Interactive Application Controller
 * Features:
 * - Scramble text decode animation
 * - Live dynamic countdown timer with micro-ticks
 * - 3D card tilt physics
 * - Interactive cyber terminal command parser
 * - Campus video modal player
 * - Instant Holographic Hacker Pass ticket generator & confetti
 * - Custom cursor interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initTextScramble();
  initCountdownTimer();
  initTiltCards();
  initInteractiveTerminal();
  initVideoModal();
  initRegistrationModal();
  initAudioControls();
  initSmoothScroll();
});

/* ==========================================================================
   1. Custom Cursor Follower
   ========================================================================== */
function initCustomCursor() {
  // Cursor animation removed as requested. 
  // Retaining interaction sound effects on hoverables.
  const hoverables = document.querySelectorAll('button, a, input, select, .track-card, .campus-spotlight-card, .video-player-preview');
  hoverables.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      if (window.soundFX) window.soundFX.playHover();
    });
    el.addEventListener('click', () => {
      if (window.soundFX) window.soundFX.playClick();
    });
  });
}

/* ==========================================================================
   2. Text Scramble / Hologram Decoder Effect
   ========================================================================== */
class TextScrambler {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#________010101';
    this.update = this.update.bind(this);
  }

  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => (this.resolve = resolve));
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 20);
      const end = start + Math.floor(Math.random() * 20);
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }

  update() {
    let output = '';
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="text-scramble-char" style="color:var(--cyan-core); opacity:0.8;">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }

  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

function initTextScramble() {
  const titleEl = document.querySelector('.scramble-title');
  if (titleEl) {
    const scrambler = new TextScrambler(titleEl);
    scrambler.setText("NIRVAN '26");

    titleEl.addEventListener('mouseenter', () => {
      scrambler.setText("NIRVAN '26");
      if (window.soundFX) window.soundFX.playGlitch();
    });
  }

  const taglineEl = document.querySelector('.scramble-tagline');
  if (taglineEl) {
    const scramblerTagline = new TextScrambler(taglineEl);
    setTimeout(() => {
      scramblerTagline.setText("WHERE IDEAS BECOME INNOVATIONS");
    }, 400);
  }
}

/* ==========================================================================
   3. Live Countdown Timer
   ========================================================================== */
function initCountdownTimer() {
  // Target Fest Date: October 24, 2026 at 09:00:00 AM IST
  const targetDate = new Date('2026-10-24T09:00:00+05:30').getTime();

  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minutesEl = document.getElementById('cd-minutes');
  const secondsEl = document.getElementById('cd-seconds');

  function updateTimer() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      if (daysEl) daysEl.innerText = '00';
      if (hoursEl) hoursEl.innerText = '00';
      if (minutesEl) minutesEl.innerText = '00';
      if (secondsEl) secondsEl.innerText = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const pad = (n) => String(n).padStart(2, '0');

    if (daysEl && daysEl.innerText !== pad(days)) daysEl.innerText = pad(days);
    if (hoursEl && hoursEl.innerText !== pad(hours)) hoursEl.innerText = pad(hours);
    if (minutesEl && minutesEl.innerText !== pad(minutes)) minutesEl.innerText = pad(minutes);
    if (secondsEl) secondsEl.innerText = pad(seconds);
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

/* ==========================================================================
   4. 3D Card Tilt Physics
   ========================================================================== */
function initTiltCards() {
  const cards = document.querySelectorAll('.track-card, .holo-hud-panel');
  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
  });
}

/* ==========================================================================
   5. Interactive Cyber Terminal
   ========================================================================== */
function initInteractiveTerminal() {
  const input = document.getElementById('terminal-command-input');
  const body = document.getElementById('terminal-output');
  if (!input || !body) return;

  const commands = {
    help: `Available commands:
  • <span class="cyan">about</span>       : Overview of NIRVAN '26
  • <span class="cyan">tracks</span>      : View fest tracks & challenges
  • <span class="cyan">gehu</span>        : Graphic Era Hill University Campus info
  • <span class="cyan">prizes</span>      : Cash prizes & bounty perks
  • <span class="cyan">register</span>    : Open registration pass generator
  • <span class="cyan">video</span>       : Launch campus teaser showcase
  • <span class="cyan">matrix</span>      : Trigger cyber visual flux
  • <span class="cyan">clear</span>       : Clear console screen
  • <span class="cyan">easteregg</span>   : Secret unlockable message`,

    about: `<span class="green">NIRVAN '26 — Annual College Technical Fest</span>
Tagline: "Where Ideas Become Innovations"
Campus : Graphic Era Hill University (GEHU), Dehradun
Audience: Developers, Designers, Innovators, Students
Theme  : Innovations • Technology • Competition • Community`,

    tracks: `<span class="cyan">[ TRACK MATRIX ]</span>
1. AI & Deep Learning (Autonomous Agents, LLMs, Computer Vision)
2. Web 3.0 & Decentralized Systems (Smart Contracts, DeFi, Zero-Knowledge)
3. Cyber Security & CTF (Ethical Hacking, Cryptography, Defensive Sec)
4. UI/UX & Creative Tech (Futuristic Interfaces, 3D Web, Design Systems)
5. Robotics, IoT & Embedded (Smart Hardware, Drone Tech, Edge AI)
6. Open Innovation (Wildcard moonshot projects for real-world impact)`,

    gehu: `<span class="purple">[ GEHU CAMPUS SPOTLIGHT ]</span>
Graphic Era Hill University is a world-class academic institution nestled in the scenic valleys of Dehradun, Uttarakhand. Renowned for technological excellence, research incubators, and cutting-edge hackathon culture.`,

    prizes: `<span class="cyan">🏆 PRIZE POOL MATRIX</span>
• 1st Place Grand Winner : ₹2,50,000 + Incubation Support + Cloud Credits
• 2nd Place Runner Up    : ₹1,50,000 + Swag Kits + Fast-track Interviews
• 3rd Place Innovation   : ₹1,00,000 + Hardware Kits
• Track Category Winners : ₹25,000 each (6 Tracks)
• Total Rewards Pool     : <span class="green">₹5,00,000+ IN CASH & BOUNTIES</span>`,

    register: () => {
      openRegistrationModal();
      return `<span class="green">Opening holographic registration modal...</span>`;
    },

    video: () => {
      openVideoModal();
      return `<span class="cyan">Loading high-definition campus fest video...</span>`;
    },

    matrix: () => {
      document.body.style.filter = 'hue-rotate(90deg)';
      setTimeout(() => { document.body.style.filter = 'none'; }, 2000);
      return `<span class="green">01001110 01001001 01010010 01010110 01000001 01001110 00100000 00110010 00110110</span>`;
    },

    easteregg: `<span class="purple">✨ "Code is poetry written with logic. See you at GEHU Campus for NIRVAN '26!"</span> 🚀`,

    clear: () => {
      body.innerHTML = '';
      return '';
    }
  };

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const rawCmd = input.value.trim();
      const cmd = rawCmd.toLowerCase();
      input.value = '';

      if (window.soundFX) window.soundFX.playGlitch();

      if (!rawCmd) return;

      // Echo command
      const echoDiv = document.createElement('div');
      echoDiv.className = 'terminal-line';
      echoDiv.innerHTML = `<span class="terminal-prompt">user@nirvan-26:~$</span> ${escapeHTML(rawCmd)}`;
      body.appendChild(echoDiv);

      if (cmd === 'clear') {
        body.innerHTML = '';
        return;
      }

      const responseDiv = document.createElement('div');
      responseDiv.className = 'terminal-line';

      if (commands[cmd]) {
        const res = typeof commands[cmd] === 'function' ? commands[cmd]() : commands[cmd];
        responseDiv.innerHTML = res;
      } else {
        responseDiv.innerHTML = `<span style="color:#ff5555">Command not recognized: '${escapeHTML(rawCmd)}'. Type '<span class="cyan">help</span>' for available commands.</span>`;
      }

      body.appendChild(responseDiv);
      body.scrollTop = body.scrollHeight;
    }
  });
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

/* ==========================================================================
   6. Video Teaser Modal
   ========================================================================== */
function initVideoModal() {
  const modal = document.getElementById('video-modal');
  const openBtns = document.querySelectorAll('.open-video-btn, .video-player-preview');
  const closeBtn = document.getElementById('video-modal-close');
  const video = document.getElementById('campus-fest-video');

  if (!modal) return;

  openBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openVideoModal();
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeVideoModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeVideoModal();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeVideoModal();
    }
  });
}

function openVideoModal() {
  const modal = document.getElementById('video-modal');
  const video = document.getElementById('campus-fest-video');
  if (modal && video) {
    modal.classList.add('active');
    video.currentTime = 0;
    video.play().catch(() => {});
    if (window.soundFX) window.soundFX.playWarp();
  }
}

function closeVideoModal() {
  const modal = document.getElementById('video-modal');
  const video = document.getElementById('campus-fest-video');
  if (modal && video) {
    modal.classList.remove('active');
    video.pause();
    if (window.soundFX) window.soundFX.playClick();
  }
}

/* ==========================================================================
   7. Registration & Holographic Hacker Pass Generator
   ========================================================================== */
function initRegistrationModal() {
  const modal = document.getElementById('register-modal');
  const openBtns = document.querySelectorAll('.open-register-btn');
  const closeBtn = document.getElementById('register-modal-close');
  const form = document.getElementById('hacker-pass-form');

  if (!modal) return;

  openBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openRegistrationModal();
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeRegistrationModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeRegistrationModal();
    }
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      generateHolographicPass();
    });
  }

  const downloadBtn = document.getElementById('download-pass-btn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      if (window.soundFX) window.soundFX.playSuccess();
      window.print();
    });
  }
}

function openRegistrationModal() {
  const modal = document.getElementById('register-modal');
  if (modal) {
    modal.classList.add('active');
    if (window.soundFX) window.soundFX.playWarp();
  }
}

function closeRegistrationModal() {
  const modal = document.getElementById('register-modal');
  if (modal) {
    modal.classList.remove('active');
    if (window.soundFX) window.soundFX.playClick();
  }
}

function generateHolographicPass() {
  const nameInput = document.getElementById('reg-name');
  const collegeInput = document.getElementById('reg-college');
  const trackInput = document.getElementById('reg-track');
  const roleInput = document.getElementById('reg-role');

  const name = nameInput.value.trim() || 'Innovator';
  const college = collegeInput.value.trim() || 'GEHU Campus';
  const track = trackInput.value || 'Open Innovation';
  const role = roleInput.value || 'Full-Stack Developer';

  // Generate Unique Holographic Pass ID
  const passId = `NIRVAN26-${Math.floor(1000 + Math.random() * 9000)}-${track.slice(0, 3).toUpperCase()}`;

  // Update Pass Display
  document.getElementById('pass-user-name').innerText = name;
  document.getElementById('pass-user-college').innerText = college;
  document.getElementById('pass-user-track').innerText = `Track: ${track}`;
  document.getElementById('pass-user-role').innerText = role;
  document.getElementById('pass-serial-id').innerText = `PASS ID: #${passId}`;

  // Show Pass Container
  const form = document.getElementById('hacker-pass-form');
  const passContainer = document.getElementById('generated-pass-container');

  form.style.display = 'none';
  passContainer.style.display = 'block';

  if (window.soundFX) window.soundFX.playSuccess();

  // Trigger Confetti Celebration
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00f0ff', '#8b5cf6', '#ffb800', '#10b981']
    });
  }
}

/* ==========================================================================
   8. Audio Toggle Controls
   ========================================================================== */
function initAudioControls() {
  const toggleBtn = document.getElementById('audio-toggle-btn');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      if (window.soundFX) {
        window.soundFX.toggle();
      }
    });
    // Set initial UI state
    if (window.soundFX) {
      window.soundFX.updateUI();
    }
  }
}

/* ==========================================================================
   9. Smooth Navigation Scroll
   ========================================================================== */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Sticky Navbar scroll visual update
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}
