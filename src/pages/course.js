import { getLanguage } from '../data/languages.js';
import { pythonLessons } from '../data/lessons/python.js';
import { javascriptLessons } from '../data/lessons/javascript.js';
import { rustLessons } from '../data/lessons/rust.js';
import { goLessons } from '../data/lessons/go.js';
import { typescriptLessons } from '../data/lessons/typescript.js';
import { cppLessons } from '../data/lessons/cpp.js';
import { javaLessons } from '../data/lessons/java.js';
import { csharpLessons } from '../data/lessons/csharp.js';
import { swiftLessons } from '../data/lessons/swift.js';
import { kotlinLessons } from '../data/lessons/kotlin.js';
import { phpLessons } from '../data/lessons/php.js';
import { rubyLessons } from '../data/lessons/ruby.js';
import { isLessonComplete, getCompletedCount } from '../progress.js';
import { isLessonAccessible, isProLesson } from '../lib/tiers.js';
import { renderNavbar, bindNavbar } from '../components/navbar.js';

const lessonData = {
  python: pythonLessons,
  javascript: javascriptLessons,
  rust: rustLessons,
  go: goLessons,
  typescript: typescriptLessons,
  cpp: cppLessons,
  java: javaLessons,
  csharp: csharpLessons,
  swift: swiftLessons,
  kotlin: kotlinLessons,
  php: phpLessons,
  ruby: rubyLessons,
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
    ${renderNavbar('courses')}

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
    const accessible = isLessonAccessible(lesson.id);
    const pro = isProLesson(lesson.id);
    return `
              <div class="lesson-card slide-up stagger-${Math.min(i + 2, 5)} ${done ? 'completed' : ''} ${!accessible ? 'locked' : ''}"
                   data-lesson="${lesson.id}" data-accessible="${accessible}">
                <div class="lesson-number">${done ? '✓' : !accessible ? '🔒' : lesson.id}</div>
                <div class="lesson-info">
                  <div class="lesson-title">
                    ${lesson.title}
                    ${pro ? '<span class="pro-badge">⭐ Pro</span>' : ''}
                  </div>
                  <div class="lesson-desc">${lesson.description}</div>
                </div>
                <div class="lesson-meta">
                  <span>⏱ ${lesson.duration}</span>
                </div>
                <div class="lesson-arrow">${accessible ? '→' : '🔒'}</div>
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
      const accessible = card.dataset.accessible === 'true';
      if (accessible) {
        window.location.hash = `#/lesson/${langId}/${lessonId}`;
      } else {
        window.location.hash = '#/pricing';
      }
    });
  });

  bindNavbar(container);
}
