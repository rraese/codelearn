import { getLanguage } from '../data/languages.js';
import { pythonLessons } from '../data/lessons/python.js';
import { javascriptLessons } from '../data/lessons/javascript.js';
import { rustLessons } from '../data/lessons/rust.js';
import { markLessonComplete, isLessonComplete } from '../progress.js';
import { EditorView, basicSetup } from 'codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { rust } from '@codemirror/lang-rust';
import { oneDark } from '@codemirror/theme-one-dark';

const lessonData = {
    python: pythonLessons,
    javascript: javascriptLessons,
    rust: rustLessons,
};

const langExtensions = {
    python: () => python(),
    javascript: () => javascript(),
    rust: () => rust(),
};

let editorInstance = null;

export function renderLesson(container, params) {
    const langId = params.lang;
    const lessonId = parseInt(params.id);
    const lang = getLanguage(langId);
    const lessons = lessonData[langId];
    const lesson = lessons?.find(l => l.id === lessonId);

    if (!lang || !lesson) {
        container.innerHTML = '<div class="container page-content"><h1>Lektion nicht gefunden</h1></div>';
        return;
    }

    const done = isLessonComplete(langId, lessonId);
    const nextLesson = lessons.find(l => l.id === lessonId + 1);
    const prevLesson = lessons.find(l => l.id === lessonId - 1);

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
          <li><a href="#/course/${langId}">${lang.name}</a></li>
          <li><a href="#/lesson/${langId}/${lessonId}" class="active">Lektion ${lessonId}</a></li>
        </ul>
      </div>
    </nav>

    <main class="page-content page-container">
      <div class="container">
        <div class="section-header slide-up">
          <a href="#/course/${langId}" class="back-link">← Zurück zu ${lang.name}</a>
          <h1>Lektion ${lessonId}: ${lesson.title}</h1>
        </div>

        <div class="lesson-layout slide-up stagger-1">
          <!-- Theory Panel -->
          <div class="theory-panel">
            ${lesson.theory}
          </div>

          <!-- Editor Panel -->
          <div class="editor-panel">
            <div class="exercise-instructions">
              <h3>🎯 Aufgabe</h3>
              <p>${lesson.exercise.instructions}</p>
            </div>

            <div class="editor-container">
              <div class="editor-header">
                <div class="editor-title">
                  <span class="dot"></span>
                  ${lang.name} Editor
                </div>
                <div class="editor-actions">
                  <button class="btn btn-sm btn-outline" id="btn-reset">↺ Reset</button>
                  <button class="btn btn-sm btn-success" id="btn-run">▶ Ausführen</button>
                </div>
              </div>
              <div class="editor-body" id="code-editor"></div>
            </div>

            <div class="console-panel">
              <div class="console-header">
                <div class="console-title">
                  <span>💻</span> Konsole
                </div>
              </div>
              <div class="console-output" id="console-output">
                <span style="color: var(--text-muted);">Klicke "Ausführen", um dein Programm zu starten...</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Quiz Section -->
        ${lesson.quiz && lesson.quiz.length > 0 ? `
        <div class="quiz-section slide-up stagger-3">
          <h3>🧠 Quiz</h3>
          ${lesson.quiz.map((q, qi) => `
            <div class="quiz-question" data-qi="${qi}">
              <div class="question-text">${qi + 1}. ${q.question}</div>
              <div class="quiz-options">
                ${q.options.map((opt, oi) => `
                  <div class="quiz-option" data-qi="${qi}" data-oi="${oi}">
                    <span class="option-marker">${String.fromCharCode(65 + oi)}</span>
                    <span>${opt}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>` : ''}

        <!-- Lesson Navigation -->
        <div class="lesson-nav slide-up stagger-4">
          <div>
            ${prevLesson ? `<a href="#/lesson/${langId}/${prevLesson.id}" class="btn btn-outline">← Vorherige Lektion</a>` : ''}
          </div>
          <div style="display: flex; gap: var(--space-md); align-items: center;">
            <button class="btn btn-primary" id="btn-complete" ${done ? 'disabled' : ''}>
              ${done ? '✓ Abgeschlossen' : '✓ Lektion abschließen'}
            </button>
            ${nextLesson ? `<a href="#/lesson/${langId}/${nextLesson.id}" class="btn btn-outline">Nächste Lektion →</a>` :
            `<a href="#/course/${langId}" class="btn btn-outline">Zum Kurs →</a>`}
          </div>
        </div>
      </div>
    </main>
  `;

    // Initialize CodeMirror editor
    initEditor(langId, lesson);

    // Bind buttons
    bindButtons(langId, lesson, done);

    // Bind quiz
    bindQuiz(lesson.quiz);
}

function initEditor(langId, lesson) {
    const editorEl = document.getElementById('code-editor');
    if (!editorEl) return;

    if (editorInstance) {
        editorInstance.destroy();
        editorInstance = null;
    }

    const langExt = langExtensions[langId];

    editorInstance = new EditorView({
        doc: lesson.exercise.starterCode,
        extensions: [
            basicSetup,
            langExt ? langExt() : [],
            oneDark,
            EditorView.theme({
                '&': { height: '100%', fontSize: '14px' },
                '.cm-scroller': { overflow: 'auto' },
                '.cm-content': { padding: '8px 0' },
            }),
        ],
        parent: editorEl,
    });
}

function bindButtons(langId, lesson, done) {
    const btnRun = document.getElementById('btn-run');
    const btnReset = document.getElementById('btn-reset');
    const btnComplete = document.getElementById('btn-complete');
    const consoleOutput = document.getElementById('console-output');

    // Run button
    btnRun?.addEventListener('click', () => {
        if (!editorInstance) return;

        const code = editorInstance.state.doc.toString().trim();

        if (!code || code === lesson.exercise.starterCode.trim()) {
            consoleOutput.innerHTML = `<div class="error-message">⚠️ Bitte schreibe zuerst deinen Code!</div>`;
            return;
        }

        // Simulate execution by checking output
        const userOutput = simulateOutput(code, langId);
        const expectedOutput = lesson.exercise.expectedOutput.trim();

        if (userOutput === expectedOutput) {
            consoleOutput.innerHTML = `
        <div class="output-line">${escapeHtml(userOutput)}</div>
        <div class="success-message">✅ Perfekt! Die Ausgabe ist korrekt!</div>
      `;
            consoleOutput.classList.add('success');
            consoleOutput.classList.remove('error');
        } else {
            consoleOutput.innerHTML = `
        <div class="output-line">${escapeHtml(userOutput || '(keine Ausgabe)')}</div>
        <div class="error-message">❌ Die Ausgabe stimmt noch nicht. Erwartet: "${escapeHtml(expectedOutput)}"</div>
        ${lesson.exercise.hint ? `<div class="hint-message">💡 Tipp: ${escapeHtml(lesson.exercise.hint)}</div>` : ''}
      `;
            consoleOutput.classList.add('error');
            consoleOutput.classList.remove('success');
        }
    });

    // Reset button
    btnReset?.addEventListener('click', () => {
        if (!editorInstance) return;
        editorInstance.dispatch({
            changes: {
                from: 0,
                to: editorInstance.state.doc.length,
                insert: lesson.exercise.starterCode,
            },
        });
        consoleOutput.innerHTML = '<span style="color: var(--text-muted);">Klicke "Ausführen", um dein Programm zu starten...</span>';
        consoleOutput.classList.remove('success', 'error');
    });

    // Complete button
    btnComplete?.addEventListener('click', () => {
        if (done) return;
        markLessonComplete(langId, lesson.id);
        btnComplete.disabled = true;
        btnComplete.innerHTML = '✓ Abgeschlossen';

        // Add a small celebration animation
        btnComplete.style.background = 'linear-gradient(135deg, var(--success), #059669)';
        btnComplete.style.boxShadow = '0 4px 20px var(--success-glow)';
    });
}

function bindQuiz(quizData) {
    if (!quizData) return;

    document.querySelectorAll('.quiz-option').forEach(option => {
        option.addEventListener('click', () => {
            const qi = parseInt(option.dataset.qi);
            const oi = parseInt(option.dataset.oi);
            const correctIdx = quizData[qi].correct;

            // Remove previous selections for this question
            const questionEl = option.closest('.quiz-question');
            questionEl.querySelectorAll('.quiz-option').forEach(opt => {
                opt.classList.remove('selected', 'correct', 'incorrect');
                opt.style.pointerEvents = 'none';
            });

            // Mark answer
            if (oi === correctIdx) {
                option.classList.add('correct');
            } else {
                option.classList.add('incorrect');
                // Also highlight the correct answer
                questionEl.querySelectorAll('.quiz-option')[correctIdx]?.classList.add('correct');
            }
        });
    });
}

function simulateOutput(code, langId) {
    // Simple output extraction from code
    // Try to find print/console.log/println! statements and extract their string content
    let outputs = [];

    if (langId === 'python') {
        // Match print() calls - handle f-strings and regular strings
        const printRegex = /print\s*\(\s*(?:f?["'`](.+?)["'`]|(.+?))\s*\)/g;
        let match;
        while ((match = printRegex.exec(code)) !== null) {
            let output = match[1] || match[2] || '';
            // Resolve simple f-string variables
            output = resolveFStringVars(output, code, 'python');
            outputs.push(output);
        }
    } else if (langId === 'javascript') {
        const logRegex = /console\.log\s*\(\s*(?:`(.+?)`|["'](.+?)["']|(.+?))\s*\)/g;
        let match;
        while ((match = logRegex.exec(code)) !== null) {
            let output = match[1] || match[2] || match[3] || '';
            // Resolve template literals
            output = resolveFStringVars(output, code, 'javascript');
            outputs.push(output);
        }
    } else if (langId === 'rust') {
        const printlnRegex = /println!\s*\(\s*"(.+?)"\s*(?:,\s*(.+?))?\s*\)/g;
        let match;
        while ((match = printlnRegex.exec(code)) !== null) {
            let format = match[1];
            let args = match[2] || '';
            // Replace {} with variable values
            if (args) {
                const argList = args.split(',').map(a => a.trim());
                let idx = 0;
                format = format.replace(/\{\}/g, () => {
                    const argName = argList[idx++] || '';
                    return resolveRustVar(argName, code);
                });
            }
            outputs.push(format);
        }
    }

    return outputs.join('\n');
}

function resolveFStringVars(template, code, lang) {
    // Replace {varname} or ${varname} with variable values found in code
    const varPattern = lang === 'python'
        ? /\{(\w+)\}/g
        : /\$\{(\w+)\}/g;

    return template.replace(varPattern, (_, name) => {
        return findVarValue(name, code, lang);
    });
}

function findVarValue(name, code, lang) {
    let assignRegex;
    if (lang === 'python') {
        assignRegex = new RegExp(`${name}\\s*=\\s*(?:["'](.+?)["']|(\\d+\\.?\\d*))`, 'm');
    } else if (lang === 'javascript') {
        assignRegex = new RegExp(`(?:let|const|var)\\s+${name}\\s*=\\s*(?:["'\`](.+?)["'\`]|(\\d+\\.?\\d*))`, 'm');
    } else {
        assignRegex = new RegExp(`let\\s+(?:mut\\s+)?${name}\\s*=\\s*(?:["'](.+?)["']|(\\d+\\.?\\d*))`, 'm');
    }

    const match = code.match(assignRegex);
    if (match) return match[1] || match[2] || name;
    return name;
}

function resolveRustVar(argName, code) {
    // Try to find the variable value
    const assignRegex = new RegExp(`let\\s+(?:mut\\s+)?${argName}\\s*=\\s*(?:["'](.+?)["']|(\\d+\\.?\\d*))`, 'm');
    const match = code.match(assignRegex);
    if (match) return match[1] || match[2] || argName;

    // Check if it's a function call like verdopple(21)
    const funcCallMatch = argName.match(/(\w+)\s*\((.+)\)/);
    if (funcCallMatch) {
        const funcName = funcCallMatch[1];
        const funcArgs = funcCallMatch[2].split(',').map(a => a.trim());
        // Find the function and try to evaluate
        return evaluateSimpleFunc(funcName, funcArgs, code);
    }

    return argName;
}

function evaluateSimpleFunc(funcName, args, code) {
    // Very basic: look for simple arithmetic in the function
    const funcRegex = new RegExp(`fn\\s+${funcName}\\s*\\((.+?)\\).*?\\{([\\s\\S]*?)\\}`, 'm');
    const match = code.match(funcRegex);
    if (!match) return `${funcName}(${args.join(', ')})`;

    const body = match[2].trim();
    // Handle simple arithmetic: x * 2, a + b, etc.
    const params = match[1].split(',').map(p => p.split(':')[0].trim());

    let expr = body.replace(/;$/, '').trim();
    params.forEach((param, i) => {
        expr = expr.replace(new RegExp(`\\b${param}\\b`, 'g'), args[i] || '0');
    });

    try {
        const result = Function(`"use strict"; return (${expr})`)();
        return String(result);
    } catch {
        return `${funcName}(${args.join(', ')})`;
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
