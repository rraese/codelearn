import { languages } from '../data/languages.js';
import { getCompletedCount } from '../progress.js';
import { pythonLessons } from '../data/lessons/python.js';
import { javascriptLessons } from '../data/lessons/javascript.js';
import { rustLessons } from '../data/lessons/rust.js';

const lessonCounts = {
    python: pythonLessons.length,
    javascript: javascriptLessons.length,
    rust: rustLessons.length,
};

export function renderHome(container) {
    const totalLessons = Object.values(lessonCounts).reduce((a, b) => a + b, 0);
    const totalCompleted = languages.reduce((sum, lang) => sum + getCompletedCount(lang.id), 0);

    container.innerHTML = `
    <div class="animated-bg"></div>
    <nav class="navbar">
      <div class="container">
        <a href="#/" class="navbar-brand">
          <span class="logo-icon">🚀</span>
          <span class="brand-text">CodeLearn</span>
        </a>
        <ul class="navbar-nav">
          <li><a href="#/" class="active">Start</a></li>
          <li><a href="#/" class="nav-courses">Kurse</a></li>
        </ul>
      </div>
    </nav>

    <main class="page-container">
      <section class="hero">
        <div class="container">
          <h1 class="hero-title slide-up">
            Lerne <span class="gradient-text">Programmieren</span><br>
            interaktiv & kostenlos
          </h1>
          <p class="hero-subtitle slide-up stagger-1">
            Entdecke Python, JavaScript und Rust mit geführten Lektionen, 
            einem integrierten Code-Editor und interaktiven Quizzes.
          </p>

          <div class="stats-row slide-up stagger-2">
            <div class="stat-item">
              <div class="stat-value">${languages.length}</div>
              <div class="stat-label">Sprachen</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">${totalLessons}</div>
              <div class="stat-label">Lektionen</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">${totalCompleted}</div>
              <div class="stat-label">Abgeschlossen</div>
            </div>
          </div>
        </div>
      </section>

      <section class="container">
        <div class="language-grid">
          ${languages.map((lang, i) => {
        const count = lessonCounts[lang.id];
        const completed = getCompletedCount(lang.id);
        const pct = count > 0 ? Math.round((completed / count) * 100) : 0;
        return `
              <div class="language-card slide-up stagger-${i + 2}" 
                   data-lang="${lang.id}"
                   style="--card-accent: ${lang.accentColor}; --card-glow: ${lang.glowColor};">
                <div class="card-icon">${lang.icon}</div>
                <h2 class="card-title">${lang.name}</h2>
                <p class="card-description">${lang.description}</p>
                <div class="card-meta">
                  <span class="badge badge-${lang.difficultyClass}">${lang.difficulty}</span>
                  <span>📚 ${count} Lektionen</span>
                  <span>⏱ ${count * 8} min</span>
                </div>
                <div class="progress-bar-container">
                  <div class="progress-bar-fill" style="width: ${pct}%"></div>
                </div>
              </div>
            `;
    }).join('')}
        </div>
      </section>
    </main>
  `;

    // Bind card clicks
    container.querySelectorAll('.language-card').forEach(card => {
        card.addEventListener('click', () => {
            const langId = card.dataset.lang;
            window.location.hash = `#/course/${langId}`;
        });
    });
}
