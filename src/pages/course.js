import { getLanguage } from '../data/languages.js';
import { pythonLessons } from '../data/lessons/python.js';
import { javascriptLessons } from '../data/lessons/javascript.js';
import { rustLessons } from '../data/lessons/rust.js';
import { isLessonComplete, getCompletedCount } from '../progress.js';

const lessonData = {
    python: pythonLessons,
    javascript: javascriptLessons,
    rust: rustLessons,
};

export function renderCourse(container, params) {
    const langId = params.lang;
    const lang = getLanguage(langId);
    const lessons = lessonData[langId];

    if (!lang || !lessons) {
        container.innerHTML = '<div class="container page-content"><h1>Sprache nicht gefunden</h1></div>';
        return;
    }

    const completed = getCompletedCount(langId);
    const pct = Math.round((completed / lessons.length) * 100);

    container.innerHTML = `
    <div class="animated-bg"></div>
    <nav class="navbar">
      <div class="container">
        <a href="#/" class="navbar-brand">
          <span class="logo-icon">🚀</span>
          <span class="brand-text">CodeLearn</span>
        </a>
        <ul class="navbar-nav">
          <li><a href="#/">Start</a></li>
          <li><a href="#/course/${langId}" class="active">${lang.name}</a></li>
        </ul>
      </div>
    </nav>

    <main class="page-content page-container">
      <div class="container">
        <div class="section-header slide-up">
          <a href="#/" class="back-link">← Zurück zur Übersicht</a>
          <h1>${lang.icon} ${lang.name}</h1>
          <p>${lang.description}</p>
        </div>

        <div class="progress-section slide-up stagger-1">
          <div class="progress-header">
            <span class="progress-title">Dein Fortschritt</span>
            <span class="progress-percentage">${completed}/${lessons.length} abgeschlossen (${pct}%)</span>
          </div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill" style="width: ${pct}%"></div>
          </div>
        </div>

        <div class="lessons-list">
          ${lessons.map((lesson, i) => {
        const done = isLessonComplete(langId, lesson.id);
        return `
              <div class="lesson-card slide-up stagger-${Math.min(i + 2, 5)} ${done ? 'completed' : ''}" 
                   data-lesson="${lesson.id}">
                <div class="lesson-number">${done ? '✓' : lesson.id}</div>
                <div class="lesson-info">
                  <div class="lesson-title">${lesson.title}</div>
                  <div class="lesson-desc">${lesson.description}</div>
                </div>
                <div class="lesson-meta">
                  <span>⏱ ${lesson.duration}</span>
                </div>
                <div class="lesson-arrow">→</div>
              </div>
            `;
    }).join('')}
        </div>
      </div>
    </main>
  `;

    container.querySelectorAll('.lesson-card').forEach(card => {
        card.addEventListener('click', () => {
            const lessonId = card.dataset.lesson;
            window.location.hash = `#/lesson/${langId}/${lessonId}`;
        });
    });
}
