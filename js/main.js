/**
 * ADVANCED CYBER SECURITY & VAPT SPECIALIST PORTFOLIO SCRIPT
 * Features:
 *  - Canvas Cyber Constellation & Particle Matrix Engine
 *  - Hacker Text Scrambler / Decoder Animation
 *  - Interactive Live VAPT Scanner Simulator
 *  - Theme Switcher (White Cyber-Lab Default vs Dark Ops)
 *  - 3D Parallax Tilt Cards
 *  - Full Security Report & Architecture Inspection Modal
 *  - Cyber Hacker CLI Terminal
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Theme (White Cyber-Lab as default per request)
  initTheme();

  // 2. Initialize Interactive Background Canvas
  initCyberCanvas();

  // 3. Initialize Profile & Hero Scrambler
  initProfile();
  initTypingEffect();

  // 4. Render Core Sections
  renderStats();
  renderServices();
  renderSkills();
  renderProjects('all');
  initProjectFilters();

  // 5. Interactive VAPT Simulator Engine
  initVAPTSimulator();

  // 6. 3D Tilt Card Physics
  initTiltCards();

  // 7. Interactive Terminal
  initCyberTerminal();

  // 8. Contact & Toast Utilities
  initContactActions();

  // 9. Mobile Nav & ScrollSpy
  initMobileNav();
  initScrollSpy();

  // 10. Trigger Text Scrambler on Key Elements
  initTextScramblers();

  // 11. Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
});

/* ===================================================================
   1. THEME SWITCHER (WHITE CYBER-LAB DEFAULT)
   =================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  // Default to 'white' as requested
  const savedTheme = localStorage.getItem('cyber-portfolio-theme') || 'white';
  
  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'white';
      const newTheme = currentTheme === 'white' ? 'dark' : 'white';
      applyTheme(newTheme);
      localStorage.setItem('cyber-portfolio-theme', newTheme);
    });
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const themeIcon = document.getElementById('theme-toggle-icon');
  const themeLabel = document.getElementById('theme-toggle-label');
  
  if (theme === 'dark') {
    if (themeIcon) themeIcon.setAttribute('data-lucide', 'sun');
    if (themeLabel) themeLabel.textContent = 'Cyber White';
  } else {
    if (themeIcon) themeIcon.setAttribute('data-lucide', 'moon');
    if (themeLabel) themeLabel.textContent = 'Dark Ops';
  }

  if (window.lucide) window.lucide.createIcons();
}

/* ===================================================================
   2. INTERACTIVE CYBER CONSTELLATION CANVAS
   =================================================================== */
function initCyberCanvas() {
  const canvas = document.getElementById('cyber-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const particleCount = 65;
  const mouse = { x: null, y: null, radius: 140 };

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Particle constructor
  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.radius = Math.random() * 2 + 1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse interactive push/pull
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 1.5;
          this.y -= (dy / dist) * force * 1.5;
        }
      }
    }

    draw(isDark) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? 'rgba(16, 185, 129, 0.65)' : 'rgba(5, 150, 105, 0.45)';
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    ctx.clearRect(0, 0, width, height);

    // Draw connecting constellation lines
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw(isDark);

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          const alpha = (1 - dist / 110) * (isDark ? 0.22 : 0.12);
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = isDark 
            ? `rgba(56, 189, 248, ${alpha})` 
            : `rgba(2, 132, 199, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // Connect to mouse cursor
      if (mouse.x !== null && mouse.y !== null) {
        const dx = particles[i].x - mouse.x;
        const dy = particles[i].y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const alpha = (1 - dist / mouse.radius) * 0.35;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = isDark 
            ? `rgba(16, 185, 129, ${alpha})` 
            : `rgba(5, 150, 105, ${alpha})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ===================================================================
   3. HACKER TEXT SCRAMBLER / DECODER ANIMATION
   =================================================================== */
class TextScrambler {
  constructor(el) {
    this.el = el;
    this.chars = '!<>/[]{}—=+*^?#________0101';
    this.update = this.update.bind(this);
  }

  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => this.resolve = resolve);
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
        output += `<span class="text-emerald-500 font-mono">${char}</span>`;
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

function initTextScramblers() {
  document.querySelectorAll('[data-scramble]').forEach(el => {
    const originalText = el.textContent.trim();
    const scrambler = new TextScrambler(el);
    
    // Scramble on hover
    el.addEventListener('mouseenter', () => {
      scrambler.setText(originalText);
    });
  });
}

/* ===================================================================
   4. PROFILE & DYNAMIC TYPING EFFECT
   =================================================================== */
function initProfile() {
  const p = portfolioData.profile;

  document.querySelectorAll('.profile-name').forEach(el => el.textContent = p.name);
  document.querySelectorAll('.profile-role').forEach(el => el.textContent = p.role);
  document.querySelectorAll('.profile-tagline').forEach(el => el.textContent = p.tagline);
  document.querySelectorAll('.profile-bio').forEach(el => el.textContent = p.bio);
  document.querySelectorAll('.profile-location').forEach(el => el.textContent = p.location);
  document.querySelectorAll('.profile-email').forEach(el => el.textContent = p.email);
  document.querySelectorAll('.profile-phone').forEach(el => el.textContent = p.phone);
  document.querySelectorAll('.profile-status').forEach(el => el.textContent = p.status);

  document.querySelectorAll('.link-github').forEach(el => el.href = p.socialLinks.github);
  document.querySelectorAll('.link-linkedin').forEach(el => el.href = p.socialLinks.linkedin);
  document.querySelectorAll('.link-twitter').forEach(el => el.href = p.socialLinks.twitter);
  document.querySelectorAll('.link-email').forEach(el => el.href = p.socialLinks.email);
}

function initTypingEffect() {
  const target = document.getElementById('typing-text');
  if (!target) return;

  const roles = portfolioData.profile.typingRoles;
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 80;

  function type() {
    const current = roles[roleIndex];
    if (isDeleting) {
      target.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      target.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 80;
    }

    if (!isDeleting && charIndex === current.length) {
      typingSpeed = 1600;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ===================================================================
   5. STATS & SERVICES RENDERING
   =================================================================== */
function renderStats() {
  const container = document.getElementById('stats-grid');
  if (!container) return;

  container.innerHTML = portfolioData.stats.map(s => `
    <div class="glass-panel hud-card p-5 rounded-2xl group hover:border-emerald-500/40 transition-all">
      <div class="text-3xl lg:text-4xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400 mb-1">
        ${s.value}
      </div>
      <div class="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
        ${s.label}
      </div>
    </div>
  `).join('');
}

function renderServices() {
  const container = document.getElementById('services-grid');
  if (!container) return;

  container.innerHTML = portfolioData.services.map(srv => `
    <div class="tilt-card glass-panel hud-card scanline-container p-7 rounded-3xl flex flex-col justify-between group">
      <div>
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
            <i data-lucide="${srv.icon}" class="w-6 h-6"></i>
          </div>
          <span class="text-[10px] font-mono font-bold tracking-widest px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            ${srv.tag}
          </span>
        </div>

        <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
          ${srv.title}
        </h3>
        
        <p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
          ${srv.description}
        </p>
      </div>

      <div>
        <div class="text-xs font-mono uppercase text-slate-400 mb-2 font-semibold">Toolset & Standards:</div>
        <div class="flex flex-wrap gap-1.5">
          ${srv.tools.map(tool => `
            <span class="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300">
              ${tool}
            </span>
          `).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

/* ===================================================================
   6. SKILLS MATRIX RENDERING
   =================================================================== */
function renderSkills() {
  const container = document.getElementById('skills-container');
  if (!container) return;

  container.innerHTML = portfolioData.skillCategories.map(cat => `
    <div class="glass-panel hud-card p-6 sm:p-8 rounded-3xl relative">
      <div class="flex items-center gap-3 mb-4">
        <div class="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
          <i data-lucide="${cat.id === 'vapt-offensive' ? 'crosshair' : cat.id === 'reporting-defensive' ? 'file-check' : 'code-2'}" class="w-5 h-5"></i>
        </div>
        <div>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white">${cat.name}</h3>
          <p class="text-xs text-slate-500 dark:text-slate-400">${cat.description}</p>
        </div>
      </div>

      <div class="space-y-4 mt-6">
        ${cat.skills.map(skill => `
          <div>
            <div class="flex justify-between items-center text-sm mb-1.5 font-medium">
              <span class="text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                ${skill.name}
              </span>
              <span class="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-emerald-600 dark:text-emerald-400 font-semibold">
                ${skill.badge} • ${skill.level}%
              </span>
            </div>
            <div class="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
              <div class="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500" style="width: ${skill.level}%"></div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

/* ===================================================================
   7. PROJECTS SHOWCASE & REPORT INSPECTION
   =================================================================== */
function renderProjects(filter = 'all') {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  const list = filter === 'all'
    ? portfolioData.projects
    : portfolioData.projects.filter(p => p.category === filter);

  grid.innerHTML = list.map(proj => `
    <div class="tilt-card glass-panel hud-card scanline-container rounded-3xl overflow-hidden flex flex-col group" data-proj-id="${proj.id}">
      <!-- Header Visual Banner -->
      <div class="h-44 relative bg-gradient-to-br ${proj.imageBg} p-6 flex flex-col justify-between text-white">
        <div class="flex justify-between items-center z-10">
          <span class="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/20 uppercase">
            ${proj.categoryLabel}
          </span>
          <div class="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
            <i data-lucide="${proj.icon}" class="w-5 h-5"></i>
          </div>
        </div>

        <div class="z-10">
          <span class="text-[11px] font-mono px-2 py-0.5 rounded bg-black/40 text-amber-300 font-bold mb-1 inline-block">
            CVSS Severity: ${proj.cvssScore}
          </span>
          <h4 class="text-lg font-bold drop-shadow-md">
            ${proj.title}
          </h4>
        </div>
      </div>

      <!-- Card Body -->
      <div class="p-6 flex-1 flex flex-col justify-between">
        <div>
          <p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4">
            ${proj.summary}
          </p>

          <!-- Findings pills -->
          <div class="space-y-1.5 mb-4">
            <span class="text-xs font-mono text-slate-400 font-semibold block">Key Findings / Features:</span>
            ${proj.findings.map(f => `
              <div class="text-xs font-mono text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <i data-lucide="shield-alert" class="w-3.5 h-3.5 text-red-500"></i> ${f}
              </div>
            `).join('')}
          </div>

          <!-- Tags -->
          <div class="flex flex-wrap gap-1.5 mb-6">
            ${proj.tags.map(t => `
              <span class="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300">
                ${t}
              </span>
            `).join('')}
          </div>
        </div>

        <!-- Action bar -->
        <div class="pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between gap-2">
          <button onclick="openReportModal('${proj.id}')" class="text-xs font-bold font-mono text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 flex items-center gap-1.5 py-1.5 px-3 rounded-lg hover:bg-emerald-500/10 transition-colors">
            <i data-lucide="file-text" class="w-4 h-4"></i> Inspect Security Report
          </button>
          <a href="${proj.githubUrl}" target="_blank" class="p-2 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/15 text-slate-700 dark:text-slate-300 transition-colors" title="Repository">
            <i data-lucide="github" class="w-4 h-4"></i>
          </a>
        </div>
      </div>
    </div>
  `).join('');

  if (window.lucide) window.lucide.createIcons();
}

function initProjectFilters() {
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => {
        b.classList.remove('active', 'bg-emerald-600', 'text-white');
        b.classList.add('text-slate-500', 'dark:text-slate-400');
      });
      btn.classList.add('active', 'bg-emerald-600', 'text-white');
      btn.classList.remove('text-slate-500', 'dark:text-slate-400');

      const filter = btn.getAttribute('data-filter');
      renderProjects(filter);
    });
  });
}

// Security Report Inspection Modal
window.openReportModal = function(projId) {
  const proj = portfolioData.projects.find(p => p.id === projId) || portfolioData.projects[0];
  const report = portfolioData.sampleReport;
  const modal = document.getElementById('report-modal');
  const body = document.getElementById('report-modal-content');

  body.innerHTML = `
    <div class="p-6 sm:p-8 space-y-6">
      <!-- Modal Header -->
      <div class="flex justify-between items-start gap-4 border-b border-slate-200 dark:border-white/10 pb-4">
        <div>
          <span class="text-xs uppercase font-mono tracking-wider font-bold text-emerald-600 dark:text-emerald-400">
            VAPT Audit Report Document #SEC-2026-08
          </span>
          <h3 class="text-2xl font-bold text-slate-900 dark:text-white mt-1">${proj.title}</h3>
          <p class="text-xs text-slate-500 font-mono mt-0.5">Auditor: ${portfolioData.profile.name} • Standard: OWASP ASVS v4.0</p>
        </div>
        <button onclick="closeReportModal()" class="p-2 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-500 hover:text-slate-900 dark:hover:text-white">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>
      </div>

      <!-- CVSS Badge Callout -->
      <div class="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div class="text-xs font-mono font-bold text-red-600 dark:text-red-400 uppercase">CVSS v3.1 Severity Score</div>
          <div class="text-2xl font-black text-red-600 dark:text-red-400 font-mono">9.8 CRITICAL</div>
          <div class="text-xs text-slate-600 dark:text-slate-300 font-mono mt-1">Vector: CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H</div>
        </div>
        <div class="text-xs font-mono px-3 py-1.5 rounded-lg bg-red-600 text-white font-semibold self-start sm:self-center">
          IMMEDIATE ACTION REQUIRED
        </div>
      </div>

      <!-- Executive Summary -->
      <div>
        <h4 class="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
          <i data-lucide="file-text" class="w-4 h-4 text-emerald-500"></i> Executive Summary
        </h4>
        <p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed bg-slate-50 dark:bg-white/5 p-4 rounded-xl border border-slate-200 dark:border-white/10">
          ${report.executiveSummary}
        </p>
      </div>

      <!-- Proof of Concept (PoC) -->
      <div>
        <h4 class="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
          <i data-lucide="terminal" class="w-4 h-4 text-blue-500"></i> Verified Exploit PoC Steps
        </h4>
        <div class="font-mono text-xs text-slate-800 dark:text-slate-200 bg-slate-900 text-emerald-400 p-4 rounded-xl space-y-1">
          <div>$ burpsuite --intercept-proxy 127.0.0.1:8080</div>
          <div>&gt; TARGET: POST /api/v1/user/account-transfer HTTP/1.1</div>
          <div>&gt; PAYLOAD: {"source_account_id": 1088, "amount": 5000}</div>
          <div class="text-yellow-400">&gt; STATUS 200 OK: Transfer completed without session validation. [CRITICAL IDOR]</div>
        </div>
      </div>

      <!-- Remediation & Patch Code -->
      <div>
        <h4 class="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
          <i data-lucide="shield-check" class="w-4 h-4 text-emerald-500"></i> Developer Remediation Code Fix
        </h4>
        <p class="text-slate-600 dark:text-slate-300 text-xs mb-2">
          ${report.criticalFinding.remediation}
        </p>
        <pre class="font-mono text-xs bg-slate-950 text-cyan-300 p-4 rounded-xl overflow-x-auto border border-white/10">
// Secure Authorization Middleware Verification
if (req.user.accountId !== req.body.source_account_id) {
  return res.status(403).json({ error: "Access Denied: Unauthorized Account" });
}</pre>
      </div>

      <!-- Action -->
      <div class="pt-4 border-t border-slate-200 dark:border-white/10 flex justify-end gap-3">
        <button onclick="closeReportModal()" class="px-5 py-2.5 rounded-xl bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-200 text-xs font-bold">
          Close Report
        </button>
        <button onclick="showToast('Sample PDF report download simulated!');" class="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-600/30">
          <i data-lucide="download" class="w-4 h-4"></i> Download Full Sample PDF (42 Pages)
        </button>
      </div>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  if (window.lucide) window.lucide.createIcons();
};

window.closeReportModal = function() {
  const modal = document.getElementById('report-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
};

/* ===================================================================
   8. INTERACTIVE LIVE VAPT SCANNER SIMULATOR
   =================================================================== */
function initVAPTSimulator() {
  const startBtn = document.getElementById('vapt-scan-btn');
  const targetInput = document.getElementById('vapt-target-input');
  const progressBar = document.getElementById('vapt-progress-bar');
  const progressText = document.getElementById('vapt-progress-text');
  const logContainer = document.getElementById('vapt-log-stream');
  const resultsCard = document.getElementById('vapt-results-box');

  if (!startBtn || !targetInput) return;

  const scanStages = [
    { pct: 15, msg: "[RECON] Starting Nmap SYN stealth scan & banner grab on target..." },
    { pct: 35, msg: "[PORTS] Open Services: Port 80 (HTTP), Port 443 (HTTPS Nginx 1.18), Port 8080 (REST API)" },
    { pct: 55, msg: "[OWASP] Probing endpoints for Injection, Missing HSTS & Weak CORS headers..." },
    { pct: 75, msg: "[EXPLOIT] High-risk IDOR flaw detected on endpoint '/api/v1/user/account-transfer'" },
    { pct: 90, msg: "[CVSS] Calculating Vector: AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H => Score: 9.8 Critical" },
    { pct: 100, msg: "[COMPLETE] VAPT scan finished. 1 Critical, 2 High, 2 Medium vulnerabilities detected." }
  ];

  startBtn.addEventListener('click', () => {
    const target = targetInput.value.trim() || 'https://demo-banking-target.corp';
    startBtn.disabled = true;
    startBtn.innerHTML = `<i data-lucide="loader" class="w-4 h-4 animate-spin"></i> Auditing Target...`;
    if (window.lucide) window.lucide.createIcons();

    if (resultsCard) resultsCard.classList.add('hidden');
    logContainer.innerHTML = `<div class="text-cyan-400">&gt; Initializing VAPT audit on: <span class="text-white font-bold">${target}</span></div>`;
    progressBar.style.width = '0%';
    progressText.textContent = '0%';

    let stageIdx = 0;
    function runStage() {
      if (stageIdx < scanStages.length) {
        const stage = scanStages[stageIdx];
        progressBar.style.width = stage.pct + '%';
        progressText.textContent = stage.pct + '%';

        const line = document.createElement('div');
        line.className = stage.pct === 100 ? 'text-emerald-400 font-bold mt-1' : 'text-slate-300 mt-1';
        line.innerHTML = `&gt; ${stage.msg}`;
        logContainer.appendChild(line);
        logContainer.scrollTop = logContainer.scrollHeight;

        stageIdx++;
        setTimeout(runStage, 600);
      } else {
        startBtn.disabled = false;
        startBtn.innerHTML = `<i data-lucide="play" class="w-4 h-4"></i> Run Another VAPT Scan`;
        if (window.lucide) window.lucide.createIcons();
        if (resultsCard) resultsCard.classList.remove('hidden');
        showToast('VAPT Audit Simulation Completed!');
      }
    }

    setTimeout(runStage, 400);
  });
}

/* ===================================================================
   9. 3D PARALLAX TILT CARDS
   =================================================================== */
function initTiltCards() {
  const cards = document.querySelectorAll('.tilt-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
}

/* ===================================================================
   10. CYBER HACKER CLI TERMINAL
   =================================================================== */
function initCyberTerminal() {
  const input = document.getElementById('terminal-input');
  const output = document.getElementById('terminal-output');
  if (!input || !output) return;

  function executeCommand(cmd) {
    const clean = cmd.trim().toLowerCase();

    const cmdLine = document.createElement('div');
    cmdLine.className = 'text-slate-400';
    cmdLine.innerHTML = `<span class="text-emerald-400">auditor@vapt-console</span>:<span class="text-cyan-400">~</span>$ <span class="text-white">${cmd}</span>`;
    output.appendChild(cmdLine);

    if (clean === 'clear') {
      output.innerHTML = '';
      return;
    }

    const response = portfolioData.terminalCommands[clean] || 
      `Command '${cmd}' not recognized. Type <span class="text-emerald-400 font-bold">'help'</span> for list of security commands.`;

    const resLine = document.createElement('div');
    resLine.className = 'text-slate-300 mb-2 mt-0.5';
    resLine.innerHTML = response;
    output.appendChild(resLine);

    const body = document.getElementById('terminal-body');
    if (body) body.scrollTop = body.scrollHeight;
  }

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = input.value;
      if (val.trim()) {
        executeCommand(val);
        input.value = '';
      }
    }
  });

  document.querySelectorAll('.term-cmd-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      if (cmd) executeCommand(cmd);
    });
  });
}

/* ===================================================================
   11. CONTACT FORM & NOTIFICATIONS
   =================================================================== */
function initContactActions() {
  const copyBtn = document.getElementById('copy-email-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const email = portfolioData.profile.email;
      navigator.clipboard.writeText(email).then(() => {
        showToast('Direct security email copied: ' + email);
      });
    });
  }

  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name').value;
      const type = document.getElementById('form-service-type').value;
      showToast(`Thank you ${name}! Request received for ${type}.`);
      form.reset();
    });
  }
}

window.showToast = function(msg) {
  const toast = document.getElementById('toast-notification');
  const text = document.getElementById('toast-msg');
  if (!toast || !text) return;

  text.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
};

/* ===================================================================
   12. MOBILE NAVIGATION & SCROLLSPY
   =================================================================== */
function initMobileNav() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (btn && menu) {
    btn.addEventListener('click', () => menu.classList.toggle('hidden'));
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.add('hidden')));
  }
}

function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) {
        current = sec.getAttribute('id');
      }
    });

    links.forEach(l => {
      l.classList.remove('text-emerald-600', 'dark:text-emerald-400', 'font-bold');
      if (l.getAttribute('href') === `#${current}`) {
        l.classList.add('text-emerald-600', 'dark:text-emerald-400', 'font-bold');
      }
    });
  });
}
