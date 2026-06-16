// ============================================
// CRISTAL CAMPINO PORTFOLIO — main.js
// ============================================

// ── NAV TOGGLE ──
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// ── TERMINAL TYPING ANIMATION ──
const terminalLines = [
  { prompt: '$', cmd: 'whoami', output: 'Cristal Campino Saavedra' },
  { prompt: '$', cmd: 'cat rol.txt', output: 'Ingeniero TI · Analista QA Senior · BI Developer' },
  { prompt: '$', cmd: 'ls experience/', output: 'S3Chile/  QualityFactory/  DuocUC/  SII/  Aduanas/' },
  { prompt: '$', cmd: 'cat skills.json | grep top', output: '"QA", "Power BI", "ETL", "Selenium", "Scrum"' },
  { prompt: '$', cmd: 'cat awards.txt', output: '⭐ FemIT — Más Mujeres en las TICs' },
  { prompt: '$', cmd: '', output: '' },
];

const terminalBody = document.getElementById('terminalBody');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function typeText(el, text, speed = 45) {
  for (const ch of text) {
    el.textContent += ch;
    await sleep(speed);
  }
}

async function runTerminal() {
  if (!terminalBody) return;

  for (const line of terminalLines) {
    // Prompt + command
    const cmdLine = document.createElement('p');
    cmdLine.innerHTML = `<span class="t-prompt">${line.prompt}</span> `;
    const cmdSpan = document.createElement('span');
    cmdSpan.className = 't-cmd';
    cmdLine.appendChild(cmdSpan);
    terminalBody.appendChild(cmdLine);

    await typeText(cmdSpan, line.cmd, 55);
    await sleep(180);

    if (line.output) {
      const outLine = document.createElement('p');
      outLine.className = 't-output';
      terminalBody.appendChild(outLine);
      await typeText(outLine, line.output, 18);
      await sleep(120);
    }
  }

  // Blinking cursor at end
  const cursor = document.createElement('span');
  cursor.className = 't-cursor';
  cursor.textContent = '█';
  terminalBody.appendChild(cursor);
}

runTerminal();

// ── SCROLL REVEAL ──
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll(
  '.skill-card, .timeline__card, .edu__card, .contact-card'
).forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(18px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// ── ACTIVE NAV LINK ON SCROLL ──
const sections = document.querySelectorAll('section[id]');
const links = document.querySelectorAll('.nav__links a');

const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(l => l.style.color = '');
      const active = document.querySelector(`.nav__links a[href="#${entry.target.id}"]`);
      if (active) active.style.color = 'var(--accent-light)';
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => navObserver.observe(s));
