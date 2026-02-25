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
import { markLessonComplete, isLessonComplete } from '../progress.js';
import { isLessonAccessible } from '../lib/tiers.js';
import { renderNavbar, bindNavbar } from '../components/navbar.js';
import { EditorView, basicSetup } from 'codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { rust } from '@codemirror/lang-rust';
import { cpp } from '@codemirror/lang-cpp';
import { oneDark } from '@codemirror/theme-one-dark';

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

const langExtensions = {
  python: () => python(),
  javascript: () => javascript(),
  rust: () => rust(),
  go: () => javascript(),
  typescript: () => javascript({ typescript: true }),
  cpp: () => cpp(),
  java: () => cpp(),
  csharp: () => cpp(),
  swift: () => javascript(),
  kotlin: () => javascript(),
  php: () => javascript(),
  ruby: () => javascript(),
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

  // Check tier access
  if (!isLessonAccessible(lessonId)) {
    renderPaywall(container, lang, lessonId);
    return;
  }

  const done = isLessonComplete(langId, lessonId);
  const nextLesson = lessons.find(l => l.id === lessonId + 1);
  const prevLesson = lessons.find(l => l.id === lessonId - 1);
  const theoryContent = needsTheoryUpgrade(lesson.theory)
    ? buildAdaptiveTheory(lesson, langId, lang.name)
    : lesson.theory;

  container.innerHTML = `
    <div class="animated-bg"></div>
    ${renderNavbar('courses')}

    <main class="page-content page-container">
      <div class="container">
        <div class="section-header slide-up">
          <a href="#/course/${langId}" class="back-link">&larr; Zurueck zu ${lang.name}</a>
          <h1>Lektion ${lessonId}: ${lesson.title}</h1>
        </div>

        <div class="lesson-layout slide-up stagger-1">
          <!-- Theory Panel -->
          <div class="theory-panel">
            ${theoryContent}
          </div>

          <!-- Editor Panel -->
          <div class="editor-panel">
            ${renderExerciseInstructions(lesson.exercise, lesson.id)}

            <div class="editor-container">
              <div class="editor-header">
                <div class="editor-title">
                  <span class="dot"></span>
                  ${lang.name} Editor
                </div>
                <div class="editor-actions">
                  <button class="btn btn-sm btn-outline" id="btn-reset">Reset</button>
                  <button class="btn btn-sm btn-success" id="btn-run">Ausfuehren</button>
                </div>
              </div>
              <div class="editor-body" id="code-editor"></div>
            </div>

            <div class="console-panel">
              <div class="console-header">
                <div class="console-title">
                  <span>Konsole</span>
                </div>
              </div>
              <div class="console-output" id="console-output">
                <span style="color: var(--text-muted);">Klicke "Ausfuehren", um dein Programm zu starten...</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Quiz Section -->
        ${lesson.quiz && lesson.quiz.length > 0 ? `
        <div class="quiz-section slide-up stagger-3">
          <h3>Quiz</h3>
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
            ${prevLesson ? `<a href="#/lesson/${langId}/${prevLesson.id}" class="btn btn-outline">&larr; Vorherige Lektion</a>` : ''}
          </div>
          <div style="display: flex; gap: var(--space-md); align-items: center;">
            <button class="btn btn-primary" id="btn-complete" ${done ? 'disabled' : ''}>
              ${done ? 'Abgeschlossen' : 'Lektion abschliessen'}
            </button>
            ${nextLesson
      ? (isLessonAccessible(nextLesson.id)
        ? `<a href="#/lesson/${langId}/${nextLesson.id}" class="btn btn-outline">Naechste Lektion &rarr;</a>`
        : `<a href="#/pricing" class="btn btn-outline">Naechste Lektion (Pro) &rarr;</a>`)
      : `<a href="#/course/${langId}" class="btn btn-outline">Zum Kurs &rarr;</a>`}
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

  // Bind navbar
  bindNavbar(container);
}

function renderPaywall(container, lang, lessonId) {
  container.innerHTML = `
    <div class="animated-bg"></div>
    ${renderNavbar('courses')}
    <div class="paywall-overlay">
      <div class="paywall-card slide-up">
        <div class="paywall-icon">PRO</div>
        <h2>Pro-Lektion</h2>
        <p>Diese Lektion ist Teil des Pro-Plans. Upgrade jetzt, um alle Lektionen und fortgeschrittene Themen freizuschalten!</p>
        <div class="paywall-actions">
          <a href="#/course/${lang.id}" class="btn btn-outline">&larr; Zurueck</a>
          <a href="#/pricing" class="btn btn-primary">Pro-Plan ansehen</a>
        </div>
      </div>
    </div>
  `;
  bindNavbar(container);
}

function needsTheoryUpgrade(theoryHtml) {
  if (!theoryHtml) return true;

  const lower = theoryHtml.toLowerCase();
  return lower.includes('in dieser lektion lernst du die wichtigsten konzepte und techniken')
    && lower.includes('<h3>grundlagen</h3>');
}

function inferTopicType(title, description) {
  const text = `${title} ${description}`.toLowerCase();

  if (/hallo|hello|erstes/.test(text)) return 'basics';
  if (/variab|type|typen/.test(text)) return 'variables';
  if (/schleif|loop|for|while|iterat/.test(text)) return 'loops';
  if (/if|switch|match|beding/.test(text)) return 'conditions';
  if (/funktion|method|lambda|closure|arrow/.test(text)) return 'functions';
  if (/array|list|map|set|hash|collection|vector/.test(text)) return 'collections';
  if (/klasse|class|struct|object|interface|trait|protocol|vererb/.test(text)) return 'oop';
  if (/async|await|thread|goroutine|concurrency|worker|coroutine/.test(text)) return 'async';
  if (/error|exception|try|catch|fehl/.test(text)) return 'errors';
  if (/module|package|namespace|import|composer|cargo|npm|maven|gem/.test(text)) return 'modules';
  if (/test|testing|junit|xctest|phpunit|rspec/.test(text)) return 'testing';
  if (/http|api|web|routing|server|laravel|spring|rails|asp/.test(text)) return 'web';
  if (/json|datenbank|database|pdo|serde|serialize|file|io/.test(text)) return 'data';
  if (/projekt|app|engine|tool|finale|abschluss/.test(text)) return 'project';

  return 'general';
}

function getTopicExplanation(topic) {
  const texts = {
    basics: 'Du lernst den kleinsten lauffähigen Ablauf: schreiben, ausführen, Ausgabe prüfen.',
    variables: 'Du speicherst Werte unter klaren Namen und verwendest sie später gezielt weiter.',
    loops: 'Du wiederholst einen Arbeitsschritt kontrolliert für mehrere Werte, ohne Copy-Paste.',
    conditions: 'Du triffst Entscheidungen über Bedingungen und steuerst dadurch den Ablauf.',
    functions: 'Du kapselst Logik in wiederverwendbare Bausteine mit klaren Ein- und Ausgaben.',
    collections: 'Du strukturierst mehrere Werte in Listen, Maps, Sets oder ähnlichen Sammlungen.',
    oop: 'Du modellierst Daten und Verhalten gemeinsam in Klassen/Objekten.',
    async: 'Du steuerst zeitversetzte Abläufe, ohne den restlichen Code zu blockieren.',
    errors: 'Du fängst Fehler bewusst ab und definierst einen sauberen Fehlerpfad.',
    modules: 'Du teilst Code in Einheiten auf und verbindest sie über klare Schnittstellen.',
    testing: 'Du überprüfst Verhalten reproduzierbar und bekommst sofortiges Feedback.',
    web: 'Du verarbeitest Ein- und Ausgaben wie in typischen API- und Web-Flows.',
    data: 'Du lädst, transformierst und validierst Daten strukturiert und nachvollziehbar.',
    project: 'Du kombinierst mehrere Konzepte zu einem vollständigen End-to-End-Ablauf.',
    general: 'Du trainierst sauberes Arbeiten: kleine Schritte, klare Kontrolle, exakte Ausgabe.',
  };

  return texts[topic] || texts.general;
}

function getTopicSteps(topic) {
  const steps = {
    basics: ['Starter-Code lesen.', 'Eine minimale lauffähige Änderung machen.', 'Ausgabe exakt mit dem Ziel vergleichen.'],
    variables: ['Wert mit sprechendem Namen speichern.', 'Wert gezielt verändern oder weiterreichen.', 'Endwert ausgeben und prüfen.'],
    loops: ['Quelle der Werte festlegen.', 'Schleifenkopf korrekt formulieren.', 'Pro Durchlauf genau eine klare Aktion ausführen.'],
    conditions: ['Bedingung in Klartext formulieren.', 'True- und False-Pfad sauber trennen.', 'Mit realen Werten gegenprüfen.'],
    functions: ['Signatur festlegen.', 'Logik in der Funktion implementieren.', 'Funktion aufrufen und Rückgabe prüfen.'],
    collections: ['Passende Datenstruktur wählen.', 'Zugriff über Index/Key korrekt setzen.', 'Ergebnis ohne Nebenwerte ausgeben.'],
    oop: ['Typ/Klasse definieren.', 'Instanz erzeugen.', 'Methode gezielt aufrufen und Ausgabe prüfen.'],
    async: ['Asynchronen Ablauf starten.', 'Auf Ergebnis warten/synchronisieren.', 'Erst danach weiterarbeiten und ausgeben.'],
    errors: ['Fehlerquelle identifizieren.', 'Schutzblock hinzufügen.', 'Im Fehlerfall eine klare Reaktion ausgeben.'],
    general: ['Aufgabe präzise lesen.', 'In kleinen Schritten ergänzen.', 'Nach jedem Run gegen die Zielausgabe prüfen.'],
  };

  return steps[topic] || steps.general;
}

function getTopicPitfalls(topic) {
  const pitfalls = {
    basics: ['Ausgabe-Befehl falsch geschrieben.', 'Text nicht exakt übernommen.', 'Zusätzliche Leerzeichen/Zeilen übersehen.'],
    variables: ['Falschen Namen verwendet.', 'Zuweisung und Vergleich verwechselt.', 'Falscher Datentyp gespeichert.'],
    loops: ['Schleife läuft nicht über alle Werte.', 'Falsche Einrückung oder Blockstruktur.', 'Im Schleifenkörper falsche Variable genutzt.'],
    conditions: ['Bedingung prüft den falschen Wert.', 'Nur ein Zweig implementiert.', 'Operator passt nicht zur Aufgabe.'],
    functions: ['Rückgabewert fehlt.', 'Falsche Parameterreihenfolge.', 'Funktion wird nie aufgerufen.'],
    collections: ['Index/Key verwechselt.', 'Duplikate oder Reihenfolge nicht bedacht.', 'Falsches Element ausgegeben.'],
    oop: ['Konstruktor unvollständig.', 'Methode am falschen Objekt aufgerufen.', 'Objektzustand nicht korrekt gesetzt.'],
    async: ['Ergebnis zu früh verwendet.', 'await/sync-Schritt fehlt.', 'Ausgabereihenfolge ist falsch.'],
    errors: ['Fehler wird nicht abgefangen.', 'Zu breiter Catch verschluckt Ursachen.', 'Fehlerpfad gibt nichts Klarlesbares aus.'],
    general: ['Zu viele Änderungen auf einmal.', 'Zielausgabe nicht zeilenweise geprüft.', 'Kleine Syntaxfehler übersehen.'],
  };

  return pitfalls[topic] || pitfalls.general;
}

function getLanguageHintPattern(langId, topic) {
  const outputCall = {
    python: 'print(...)',
    javascript: 'console.log(...)',
    typescript: 'console.log(...)',
    go: 'fmt.Println(...)',
    rust: 'println!(...)',
    cpp: 'cout << ... << endl;',
    java: 'System.out.println(...)',
    csharp: 'Console.WriteLine(...)',
    swift: 'print(...)',
    kotlin: 'println(...)',
    php: 'echo ...;',
    ruby: 'puts ...',
  }[langId] || 'AUSGABE(...)';

  if (topic === 'loops') {
    return `// 1) Datenquelle definieren\n// 2) Wiederholung formulieren\n// 3) Pro Durchlauf genau eine Aktion\n${outputCall}`;
  }

  if (topic === 'conditions') {
    return `// 1) Bedingung prüfen\n// 2) True-/False-Pfad trennen\n// 3) Nur die geforderte Ausgabe erzeugen`;
  }

  if (topic === 'functions') {
    return `// 1) Funktion definieren\n// 2) Ergebnis zurückgeben\n// 3) Funktion aufrufen und Ergebnis ausgeben`;
  }

  if (topic === 'oop') {
    return `// 1) Typ/Klasse definieren\n// 2) Objekt erstellen\n// 3) Methode aufrufen und Ergebnis prüfen`;
  }

  if (topic === 'async') {
    return `// 1) Asynchronen Aufruf starten\n// 2) Auf Ergebnis warten\n// 3) Erst danach ausgeben`;
  }

  return `// 1) Wert erzeugen oder lesen\n// 2) Wert verarbeiten\n// 3) Ergebnis gezielt ausgeben\n${outputCall}`;
}

function buildAdaptiveTheory(lesson, langId, langName) {
  const topic = inferTopicType(lesson.title, lesson.description);
  const explanation = getTopicExplanation(topic);
  const steps = getTopicSteps(topic);
  const pitfalls = getTopicPitfalls(topic);
  const pattern = getLanguageHintPattern(langId, topic);

  return `
<h2>${escapeHtml(lesson.title)}</h2>
<p><strong>Kurz erklärt:</strong> ${escapeHtml(explanation)}</p>
<p><strong>Ziel dieser Lektion:</strong> ${escapeHtml(lesson.description)}</p>

<h3>So löst du Aufgaben dieses Typs</h3>
<ol>
  ${steps.map(step => `<li>${escapeHtml(step)}</li>`).join('')}
</ol>

<h3>Denkmuster in ${escapeHtml(langName)} (ohne Aufgabenlösung)</h3>
<pre class="code-block">${escapeHtml(pattern)}</pre>

<h3>Typische Stolpersteine</h3>
<ul>
  ${pitfalls.map(item => `<li>${escapeHtml(item)}</li>`).join('')}
</ul>
  `;
}

function getHintLevel(lessonId) {
  if (lessonId <= 10) return { key: 'beginner', label: 'Anfaenger' };
  if (lessonId <= 20) return { key: 'intermediate', label: 'Aufbau' };
  return { key: 'advanced', label: 'Fortgeschritten' };
}

function getHintFocus(topic) {
  const focus = {
    loops: 'Achte darauf, dass in jedem Durchlauf genau der aktuelle Wert verarbeitet wird.',
    conditions: 'Prüfe zuerst den Zustand und führe dann nur den passenden Zweig aus.',
    functions: 'Denke an Parameter, Rückgabe und einen sauberen Funktionsaufruf.',
    collections: 'Greife gezielt über Index/Key zu und gib nur den geforderten Wert aus.',
    async: 'Reihenfolge zählt: erst warten/synchronisieren, dann ausgeben.',
    default: 'Arbeite in kleinen Schritten und prüfe nach jeder Änderung die Zielausgabe.',
  };

  return focus[topic] || focus.default;
}

function getAdaptiveHint(lessonId, instructions) {
  const level = getHintLevel(lessonId);
  const topic = inferTopicType(instructions, instructions);
  const focus = getHintFocus(topic);

  if (level.key === 'beginner') {
    return {
      levelLabel: level.label,
      text: `1) Lies zuerst die Zielausgabe Zeile für Zeile.\n2) ${focus}\n3) Ergänze nur den fehlenden Teil im Starter-Code und teste direkt erneut.`,
    };
  }

  if (level.key === 'intermediate') {
    return {
      levelLabel: level.label,
      text: `${focus}\nArbeite vom Starter-Code aus und prüfe nach jeder Änderung die Zielausgabe.`,
    };
  }

  return {
    levelLabel: level.label,
    text: 'Ändere nur die relevante Stelle, vermeide Nebenwirkungen und prüfe dann sofort erneut gegen die Zielausgabe.',
  };
}

function renderExerciseInstructions(exercise, lessonId) {
  const adaptiveHint = getAdaptiveHint(lessonId, exercise.instructions);
  const steps = [
    'Lies den Starter-Code und ergänze die fehlende Stelle.',
    'Nutze das passende Muster aus dem Theorie-Teil links.',
    'Führe den Code aus und vergleiche die Ausgabe exakt mit dem Ziel.'
  ];

  return `
    <div class="exercise-instructions">
      <h3>Aufgabe</h3>
      <p class="exercise-goal">${escapeHtml(exercise.instructions)}</p>

      <div class="exercise-section">
        <h4>So gehst du vor</h4>
        <ol class="exercise-steps">
          ${steps.map(step => `<li>${escapeHtml(step)}</li>`).join('')}
        </ol>
      </div>

      <div class="exercise-section">
        <h4>Zielausgabe</h4>
        <pre class="exercise-expected">${escapeHtml(exercise.expectedOutput)}</pre>
      </div>

      <div class="exercise-section">
        <h4>Lernhinweis (${escapeHtml(adaptiveHint.levelLabel)})</h4>
        <pre class="exercise-hint">${escapeHtml(adaptiveHint.text)}</pre>
      </div>
    </div>
  `;
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
  const adaptiveHint = getAdaptiveHint(lesson.id, lesson.exercise.instructions);

  // Run button
  btnRun?.addEventListener('click', async () => {
    if (!editorInstance) return;

    const code = editorInstance.state.doc.toString().trim();

    if (!code || code === lesson.exercise.starterCode.trim()) {
      consoleOutput.innerHTML = `<div class="error-message">Bitte schreibe zuerst deinen Code!</div>`;
      return;
    }

    // Simulate execution by checking output
    const userOutput = await simulateOutput(code, langId);
    const expectedOutput = lesson.exercise.expectedOutput.trim();
    const didMatch = isOutputMatch(userOutput, expectedOutput, {
      langId,
      lessonId: lesson.id,
      code,
    });

    if (didMatch) {
      consoleOutput.innerHTML = `
        <div class="output-line">${escapeHtml(userOutput)}</div>
        <div class="success-message">Perfekt! Die Ausgabe ist korrekt!</div>
      `;
      consoleOutput.classList.add('success');
      consoleOutput.classList.remove('error');
    } else {
      consoleOutput.innerHTML = `
        <div class="output-line">${escapeHtml(userOutput || '(keine Ausgabe)')}</div>
        <div class="error-message">Die Ausgabe stimmt noch nicht. Erwartet: "${escapeHtml(expectedOutput)}"</div>
        ${adaptiveHint ? `<div class="hint-message">${escapeHtml(adaptiveHint.levelLabel)}-Hinweis:\n${escapeHtml(adaptiveHint.text)}</div>` : ''}
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
    consoleOutput.innerHTML = '<span style="color: var(--text-muted);">Klicke "Ausfuehren", um dein Programm zu starten...</span>';
    consoleOutput.classList.remove('success', 'error');
  });

  // Complete button
  btnComplete?.addEventListener('click', async () => {
    if (done) return;
    await markLessonComplete(langId, lesson.id);
    btnComplete.disabled = true;
    btnComplete.innerHTML = 'Abgeschlossen';

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

async function simulateOutput(code, langId) {
  if (langId === 'javascript' || langId === 'typescript') {
    return simulateJavaScriptOutput(code);
  }

  if (langId === 'python') {
    return simulatePythonOutput(code);
  }

  let outputs = [];

  if (langId === 'rust') {
    const printlnRegex = /println!\s*\(\s*"(.+?)"\s*(?:,\s*(.+?))?\s*\)/g;
    let match;
    while ((match = printlnRegex.exec(code)) !== null) {
      let format = match[1];
      let args = match[2] || '';
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
  } else if (langId === 'go') {
    const fmtRegex = /fmt\.Println\s*\(\s*(?:"(.+?)"|(.+?))\s*\)/g;
    let match;
    while ((match = fmtRegex.exec(code)) !== null) {
      const output = match[1] || resolveExpressionValue(match[2], code, 'go');
      outputs.push(output);
    }
  } else if (langId === 'cpp') {
    const coutRegex = /cout\s*<<\s*(?:"(.+?)"|(.+?))\s*(?:<<\s*endl)?/g;
    let match;
    while ((match = coutRegex.exec(code)) !== null) {
      const output = match[1] || resolveExpressionValue(match[2], code, 'cpp');
      outputs.push(output);
    }
  } else if (langId === 'java') {
    const printRegex = /System\.out\.println\s*\(\s*(?:"(.+?)"|(.+?))\s*\)/g;
    let match;
    while ((match = printRegex.exec(code)) !== null) {
      outputs.push(match[1] || resolveExpressionValue(match[2], code, 'java'));
    }
  } else if (langId === 'csharp') {
    const printRegex = /Console\.WriteLine\s*\(\s*(?:"(.+?)"|(.+?))\s*\)/g;
    let match;
    while ((match = printRegex.exec(code)) !== null) {
      outputs.push(match[1] || resolveExpressionValue(match[2], code, 'csharp'));
    }
  } else if (langId === 'swift') {
    const printRegex = /print\s*\(\s*(?:"(.+?)"|(.+?))\s*\)/g;
    let match;
    while ((match = printRegex.exec(code)) !== null) {
      outputs.push(match[1] || resolveExpressionValue(match[2], code, 'swift'));
    }
  } else if (langId === 'kotlin') {
    const printRegex = /println\s*\(\s*(?:"(.+?)"|(.+?))\s*\)/g;
    let match;
    while ((match = printRegex.exec(code)) !== null) {
      outputs.push(match[1] || resolveExpressionValue(match[2], code, 'kotlin'));
    }
  } else if (langId === 'php') {
    const echoRegex = /echo\s+(?:"(.+?)"|'(.+?)'|(.+?))\s*;/g;
    let match;
    while ((match = echoRegex.exec(code)) !== null) {
      outputs.push(match[1] || match[2] || resolveExpressionValue(match[3], code, 'php'));
    }
  } else if (langId === 'ruby') {
    const putsRegex = /puts\s+(?:"(.+?)"|'(.+?)'|(.+))/g;
    let match;
    while ((match = putsRegex.exec(code)) !== null) {
      outputs.push(match[1] || match[2] || resolveExpressionValue(match[3], code, 'ruby'));
    }
  }

  return outputs.join('\n');
}

async function simulateJavaScriptOutput(code) {
  const outputs = [];
  const macrotasks = [];
  const cancelledTasks = new Set();

  const sandbox = {
    console: {
      log: (...args) => outputs.push(args.map(formatConsoleValue).join(' ')),
    },
    setTimeout: (fn, delay = 0) => {
      const id = macrotasks.length + 1;
      if (typeof fn === 'function') {
        macrotasks.push({ id, delay, fn });
      }
      return id;
    },
    clearTimeout: (id) => {
      cancelledTasks.add(id);
    },
    Promise,
    Map,
    Set,
    WeakMap,
    WeakSet,
    Proxy,
    Reflect,
    Symbol,
    JSON,
    Math,
    Date,
    Array,
    Object,
    String,
    Number,
    Boolean,
    RegExp,
  };

  try {
    const runner = new Function(
      'sandbox',
      `with (sandbox) { return (async () => { ${code}\n })(); }`
    );
    await runner(sandbox);

    for (let i = 0; i < 5; i += 1) {
      await Promise.resolve();
    }

    while (macrotasks.length) {
      const task = macrotasks.shift();
      if (!task || cancelledTasks.has(task.id)) continue;
      const maybe = task.fn();
      if (maybe && typeof maybe.then === 'function') {
        await maybe;
      }
      for (let i = 0; i < 3; i += 1) {
        await Promise.resolve();
      }
    }
  } catch {
    // Keep collected output and let mismatch handling show feedback.
  }

  return outputs.join('\n');
}

function formatConsoleValue(value) {
  if (Array.isArray(value)) {
    const items = value.map(item => {
      if (typeof item === 'string') return `'${item}'`;
      if (Array.isArray(item)) return formatConsoleValue(item);
      if (item && typeof item === 'object') return JSON.stringify(item);
      return String(item);
    });
    return `[ ${items.join(', ')} ]`;
  }

  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}

function simulatePythonOutput(code) {
  let outputs = [];
  let remainingCode = code;

  const tryCatchResult = collectPythonTryExceptOutputs(remainingCode, code);
  outputs.push(...tryCatchResult.outputs);
  remainingCode = tryCatchResult.remainingCode;

  const ifResult = collectPythonIfOutputs(remainingCode, code);
  outputs.push(...ifResult.outputs);
  remainingCode = ifResult.remainingCode;

  const loopResult = collectPythonForLoopOutputs(remainingCode);
  outputs.push(...loopResult.outputs);
  remainingCode = loopResult.remainingCode;

  const classResult = collectPythonClassCallOutputs(remainingCode);
  outputs.push(...classResult.outputs);
  remainingCode = classResult.remainingCode;

  const lines = remainingCode.split('\n');
  for (const line of lines) {
    const raw = line.replace(/\t/g, '    ');
    const indentMatch = raw.match(/^\s*/);
    const indent = indentMatch ? indentMatch[0].length : 0;
    const trimmed = raw.trim();
    if (indent > 0) continue;
    if (!trimmed.startsWith('print(') || !trimmed.endsWith(')')) continue;

    const arg = trimmed.slice(trimmed.indexOf('(') + 1, trimmed.lastIndexOf(')')).trim();
    if (!arg) continue;
    outputs.push(resolvePythonExpressionValue(arg, code));
  }

  if (!outputs.length) {
    const fallbackPrints = [];
    const allPrints = code.match(/print\s*\((.+?)\)/g) || [];
    for (const printCall of allPrints) {
      const arg = printCall.slice(printCall.indexOf('(') + 1, printCall.lastIndexOf(')')).trim();
      if (!arg) continue;
      fallbackPrints.push(resolvePythonExpressionValue(arg, code));
    }
    outputs = fallbackPrints;
  }

  return outputs.join('\n');
}

function collectPythonTryExceptOutputs(code, fullCode) {
  const outputs = [];
  let remainingCode = code;
  const tryRegex = /try\s*:\s*\n((?:[ \t]+.+(?:\n|$))*)except(?:\s+([A-Za-z_]\w*))?\s*:\s*\n((?:[ \t]+.+(?:\n|$))*)/g;
  let match;

  while ((match = tryRegex.exec(code)) !== null) {
    const tryBody = match[1] || '';
    const exceptBody = match[3] || '';

    const hasZeroDivision = /\/\s*0(\D|$)/.test(tryBody);
    const selectedBody = hasZeroDivision ? exceptBody : tryBody;
    const bodyLines = selectedBody.split('\n');

    for (const line of bodyLines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith('print(') || !trimmed.endsWith(')')) continue;
      const arg = trimmed.slice(trimmed.indexOf('(') + 1, trimmed.lastIndexOf(')')).trim();
      if (!arg) continue;
      outputs.push(resolvePythonExpressionValue(arg, fullCode));
    }

    remainingCode = remainingCode.replace(match[0], '');
  }

  return { outputs, remainingCode };
}

function collectPythonIfOutputs(code, fullCode) {
  const outputs = [];
  let remainingCode = code;
  const ifRegex = /if\s+(.+?)\s*:\s*\n((?:[ \t]+.+(?:\n|$))*)(?:elif\s+(.+?)\s*:\s*\n((?:[ \t]+.+(?:\n|$))*))?(?:else\s*:\s*\n((?:[ \t]+.+(?:\n|$))*))?/g;
  let match;

  while ((match = ifRegex.exec(code)) !== null) {
    const ifCondition = (match[1] || '').trim();
    const ifBody = match[2] || '';
    const elifCondition = (match[3] || '').trim();
    const elifBody = match[4] || '';
    const elseBody = match[5] || '';

    let selectedBody = '';
    if (evaluatePythonCondition(ifCondition, fullCode)) {
      selectedBody = ifBody;
    } else if (elifCondition && evaluatePythonCondition(elifCondition, fullCode)) {
      selectedBody = elifBody;
    } else {
      selectedBody = elseBody;
    }

    const bodyLines = selectedBody.split('\n');
    for (const line of bodyLines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith('print(') || !trimmed.endsWith(')')) continue;
      const arg = trimmed.slice(trimmed.indexOf('(') + 1, trimmed.lastIndexOf(')')).trim();
      if (!arg) continue;
      outputs.push(resolvePythonExpressionValue(arg, fullCode));
    }

    remainingCode = remainingCode.replace(match[0], '');
  }

  return { outputs, remainingCode };
}

function collectPythonClassCallOutputs(code) {
  const outputs = [];
  let remainingCode = code;

  const instanceRegex = /(\w+)\s*=\s*(\w+)\s*\(([^)]*)\)/g;
  let match;

  while ((match = instanceRegex.exec(code)) !== null) {
    const instanceName = match[1];
    const className = match[2];
    const ctorArgs = splitTopLevelArgs(match[3]).map(arg => stripQuotes(arg.trim()));

    const methodCallRegex = new RegExp(`\\b${escapeRegExp(instanceName)}\\.(\\w+)\\s*\\(\\s*\\)`, 'g');
    let callMatch;
    while ((callMatch = methodCallRegex.exec(code)) !== null) {
      const methodName = callMatch[1];
      const methodBody = findPythonClassMethodBody(className, methodName, code);
      if (!methodBody) continue;

      const selfMap = buildPythonSelfMap(className, ctorArgs, code);
      const bodyLines = methodBody.split('\n');
      for (const bodyLine of bodyLines) {
        const trimmed = bodyLine.trim();
        if (!trimmed.startsWith('print(') || !trimmed.endsWith(')')) continue;
        const arg = trimmed.slice(trimmed.indexOf('(') + 1, trimmed.lastIndexOf(')')).trim();
        outputs.push(resolvePythonExpressionValueWithSelf(arg, code, selfMap));
      }
      remainingCode = remainingCode.replace(callMatch[0], '');
    }
  }

  return { outputs, remainingCode };
}

function evaluatePythonCondition(condition, code) {
  const match = condition.match(/^(.+?)\s*(==|!=|>=|<=|>|<)\s*(.+)$/);
  if (!match) {
    const value = resolvePythonExpressionValue(condition, code);
    if (value === 'False') return false;
    if (value === 'True') return true;
    return Boolean(value);
  }

  const left = resolvePythonExpressionValue(match[1], code);
  const right = resolvePythonExpressionValue(match[3], code);
  const leftNumber = Number(left);
  const rightNumber = Number(right);
  const bothNumbers = Number.isFinite(leftNumber) && Number.isFinite(rightNumber);

  const a = bothNumbers ? leftNumber : String(left);
  const b = bothNumbers ? rightNumber : String(right);
  const op = match[2];

  if (op === '==') return a === b;
  if (op === '!=') return a !== b;
  if (op === '>=') return a >= b;
  if (op === '<=') return a <= b;
  if (op === '>') return a > b;
  if (op === '<') return a < b;
  return false;
}

function resolvePythonExpressionValue(expression, code, depth = 0) {
  if (depth > 6) return '';

  const raw = String(expression || '').trim().replace(/;+$/, '').trim();
  if (!raw) return '';

  if ((raw.startsWith('"') && raw.endsWith('"')) || (raw.startsWith("'") && raw.endsWith("'"))) {
    return stripQuotes(raw);
  }

  if ((raw.startsWith('f"') && raw.endsWith('"')) || (raw.startsWith("f'") && raw.endsWith("'"))) {
    const template = stripQuotes(raw.slice(1));
    return template.replace(/\{([^}]+)\}/g, (_, token) => {
      const placeholder = token.trim();
      if (placeholder.startsWith('self.')) return placeholder;
      return resolvePythonExpressionValue(placeholder, code, depth + 1);
    });
  }

  if (/^-?\d+(\.\d+)?$/.test(raw)) return raw;
  if (/^(True|False)$/i.test(raw)) return raw[0].toUpperCase() + raw.slice(1).toLowerCase();

  const compValue = evaluatePythonListComprehension(raw, code, depth);
  if (compValue !== null) return compValue;

  const filterValue = evaluatePythonFilterExpression(raw, code, depth);
  if (filterValue !== null) return filterValue;

  const setMatch = raw.match(/^set\(\s*([A-Za-z_]\w*)\s*\)$/);
  if (setMatch) {
    const list = parseSimplePythonList(setMatch[1], code);
    const unique = [];
    for (const item of list) {
      if (!unique.some(existing => String(existing) === String(item))) {
        unique.push(item);
      }
    }
    return `{${unique.map(item => (typeof item === 'string' ? `'${item}'` : String(item))).join(', ')}}`;
  }

  const choiceMatch = raw.match(/^choice\(\s*([A-Za-z_]\w*)\s*\)$/);
  if (choiceMatch) {
    const list = parseSimplePythonList(choiceMatch[1], code);
    if (!list.length) return '';
    return String(list.length > 1 ? list[1] : list[0]);
  }

  const jsonAccessMatch = raw.match(/^json\.loads\(\s*([A-Za-z_]\w*)\s*\)\s*\[\s*["'](.+?)["']\s*\]$/);
  if (jsonAccessMatch) {
    const jsonRaw = findPythonAssignmentExpression(jsonAccessMatch[1], code);
    if (jsonRaw) {
      try {
        const parsed = JSON.parse(stripQuotes(jsonRaw).replace(/\\"/g, '"'));
        return parsed?.[jsonAccessMatch[2]] ?? raw;
      } catch {
        // ignore
      }
    }
  }

  const regexFindAllMatch = raw.match(/^re\.findall\(\s*(.+?)\s*,\s*([A-Za-z_]\w*)\s*\)$/);
  if (regexFindAllMatch) {
    const patternSource = parsePythonRegexSource(regexFindAllMatch[1]);
    const targetExpr = findPythonAssignmentExpression(regexFindAllMatch[2], code);
    const targetText = targetExpr ? stripQuotes(targetExpr) : '';
    try {
      const matches = [...targetText.matchAll(new RegExp(patternSource, 'g'))].map(m => `'${m[0]}'`);
      return `[${matches.join(', ')}]`;
    } catch {
      return '[]';
    }
  }

  const stripLowerMatch = raw.match(/^([A-Za-z_]\w*)((?:\.[A-Za-z_]\w*\(\))+)\s*$/);
  if (stripLowerMatch) {
    const baseValue = findVarValue(stripLowerMatch[1], code, 'python');
    if (typeof baseValue === 'string') {
      const methods = stripLowerMatch[2].match(/\.[A-Za-z_]\w*\(\)/g) || [];
      let result = baseValue;
      for (const methodCall of methods) {
        const method = methodCall.slice(1, methodCall.indexOf('('));
        if (method === 'strip') result = result.trim();
        else if (method === 'lower') result = result.toLowerCase();
        else if (method === 'upper') result = result.toUpperCase();
      }
      return result;
    }
  }

  const dictAccess = raw.match(/^([A-Za-z_]\w*)\s*\[\s*["'](.+?)["']\s*\]$/);
  if (dictAccess) {
    const dictValue = findSimplePythonDictEntry(dictAccess[1], dictAccess[2], code);
    if (dictValue !== null && dictValue !== undefined) return dictValue;

    const assignedExpr = findPythonAssignmentExpression(dictAccess[1], code);
    const jsonLoadMatch = assignedExpr?.match(/^json\.loads\(\s*([A-Za-z_]\w*)\s*\)$/);
    if (jsonLoadMatch) {
      const jsonRaw = findPythonAssignmentExpression(jsonLoadMatch[1], code);
      if (jsonRaw) {
        try {
          const parsed = JSON.parse(stripQuotes(jsonRaw).replace(/\\"/g, '"'));
          const value = parsed?.[dictAccess[2]];
          if (value !== undefined) return String(value);
        } catch {
          // ignore
        }
      }
    }
  }

  const soupFindMatch = raw.match(/^([A-Za-z_]\w*)\.find\(\s*["'](.+?)["']\s*\)$/);
  if (soupFindMatch) {
    const findReturnMatch = code.match(/def\s+find\s*\([^)]*\)\s*:\s*\n(?:[ \t]+.+\n)*?[ \t]+return\s+["'](.+?)["']/m);
    if (findReturnMatch) return findReturnMatch[1];
  }

  const functionValue = evaluatePythonFunctionCall(raw, code);
  if (functionValue !== null && functionValue !== undefined) return functionValue;

  if (/^[A-Za-z_]\w*$/.test(raw)) {
    const dictWithUpdates = buildPythonDictStringWithUpdates(raw, code);
    if (dictWithUpdates) return dictWithUpdates;

    const assignedExpr = findPythonAssignmentExpression(raw, code);
    if (assignedExpr && assignedExpr !== raw) {
      return resolvePythonExpressionValue(assignedExpr, code, depth + 1);
    }

    return findVarValue(raw, code, 'python');
  }

  const replaced = raw.replace(/\b([A-Za-z_]\w*)\b/g, (_, token) => {
    if (/^(True|False|and|or|not)$/.test(token)) return token;
    const assignedExpr = findPythonAssignmentExpression(token, code);
    if (assignedExpr && assignedExpr !== token) {
      const resolved = resolvePythonExpressionValue(assignedExpr, code, depth + 1);
      return /^-?\d+(\.\d+)?$/.test(String(resolved)) ? String(resolved) : token;
    }
    const value = findVarValue(token, code, 'python');
    return /^-?\d+(\.\d+)?$/.test(String(value)) ? String(value) : token;
  });

  if (/^[\d+\-*/().\s]+$/.test(replaced)) {
    try {
      const result = Function(`"use strict"; return (${replaced})`)();
      if (!Number.isFinite(result)) throw createZeroDivisionError();
      return String(result);
    } catch (error) {
      if (error?.isZeroDivision) throw error;
    }
  }

  return raw;
}

function resolvePythonExpressionValueWithSelf(expression, code, selfMap) {
  const raw = String(expression || '').trim();
  if ((raw.startsWith('f"') && raw.endsWith('"')) || (raw.startsWith("f'") && raw.endsWith("'"))) {
    const template = stripQuotes(raw.slice(1));
    return template.replace(/\{([^}]+)\}/g, (_, token) => {
      const key = token.trim();
      if (key.startsWith('self.')) {
        const prop = key.slice(5);
        if (prop in selfMap) return String(selfMap[prop]);
      }
      return resolvePythonExpressionValue(key, code);
    });
  }

  if (raw.startsWith('self.')) {
    const prop = raw.slice(5);
    if (prop in selfMap) return String(selfMap[prop]);
  }

  return resolvePythonExpressionValue(raw, code);
}

function evaluatePythonListComprehension(expression, code, depth = 0) {
  const match = expression.match(/^\[(.+)\s+for\s+([A-Za-z_]\w*)\s+in\s+([A-Za-z_]\w*)\]$/);
  if (!match) return null;

  const itemExpr = match[1].trim();
  const symbol = match[2];
  const sourceName = match[3];
  const values = parseSimplePythonList(sourceName, code);
  if (!values.length) return '[]';

  const mapped = values.map(item => {
    const replacement = typeof item === 'number' ? String(item) : `'${item}'`;
    const expr = itemExpr.replace(new RegExp(`\\b${escapeRegExp(symbol)}\\b`, 'g'), replacement);
    return resolvePythonExpressionValue(expr, code, depth + 1);
  });

  return `[${mapped.map(value => {
    if (/^-?\d+(\.\d+)?$/.test(String(value))) return String(value);
    return `'${String(value)}'`;
  }).join(', ')}]`;
}

function evaluatePythonFilterExpression(expression, code, depth = 0) {
  const match = expression.match(/^list\(\s*filter\(\s*lambda\s+([A-Za-z_]\w*)\s*:\s*(.+?)\s*,\s*([A-Za-z_]\w*)\s*\)\s*\)$/);
  if (!match) return null;

  const symbol = match[1];
  const condition = match[2];
  const sourceName = match[3];
  const values = parseSimplePythonList(sourceName, code);
  if (!values.length) return '[]';

  const filtered = values.filter(item => {
    const replacement = typeof item === 'number' ? String(item) : `'${item}'`;
    const expr = condition.replace(new RegExp(`\\b${escapeRegExp(symbol)}\\b`, 'g'), replacement);
    return evaluatePythonCondition(expr, code);
  });

  return `[${filtered.map(value => (typeof value === 'number' ? String(value) : `'${value}'`)).join(', ')}]`;
}

function parsePythonRegexSource(patternExpression) {
  const raw = String(patternExpression || '').trim();
  if (raw.startsWith('r"') && raw.endsWith('"')) return raw.slice(2, -1);
  if (raw.startsWith("r'") && raw.endsWith("'")) return raw.slice(2, -1);
  return stripQuotes(raw);
}

function findPythonAssignmentExpression(name, code) {
  const safe = escapeRegExp(name);
  const assignRegex = new RegExp(`\\b${safe}\\b\\s*=\\s*(.+)`, 'm');
  const match = code.match(assignRegex);
  if (!match) return null;
  return match[1].trim();
}

function buildPythonDictStringWithUpdates(name, code) {
  const safe = escapeRegExp(name);
  const dictMatch = code.match(new RegExp(`\\b${safe}\\b\\s*=\\s*\\{([\\s\\S]*?)\\}`, 'm'));
  if (!dictMatch) return null;

  const dict = {};
  const entries = splitTopLevelArgs(dictMatch[1]);
  for (const entry of entries) {
    const parts = entry.split(':');
    if (parts.length < 2) continue;
    const key = stripQuotes(parts[0].trim());
    const value = parts.slice(1).join(':').trim();
    dict[key] = /^-?\d+(\.\d+)?$/.test(value) ? value : stripQuotes(value);
  }

  const updateRegex = new RegExp(`\\b${safe}\\b\\s*\\[\\s*["'](.+?)["']\\s*\\]\\s*=\\s*(?:["'](.+?)["']|(-?\\d+\\.?\\d*))`, 'g');
  let updateMatch;
  while ((updateMatch = updateRegex.exec(code)) !== null) {
    const key = updateMatch[1];
    const value = updateMatch[2] ?? updateMatch[3] ?? '';
    dict[key] = value;
  }

  const rendered = Object.entries(dict).map(([key, value]) => {
    if (/^-?\d+(\.\d+)?$/.test(String(value))) {
      return `'${key}': ${value}`;
    }
    return `'${key}': '${value}'`;
  });
  return `{${rendered.join(', ')}}`;
}

function findPythonClassMethodBody(className, methodName, code) {
  const classMatch = code.match(new RegExp(`class\\s+${escapeRegExp(className)}\\s*:\\s*\\n([\\s\\S]*?)(?=\\n[^ \\t]|$)`));
  if (!classMatch) return null;

  const classBody = classMatch[1];
  const methodMatch = classBody.match(new RegExp(`(?:^|\\n)\\s*def\\s+${escapeRegExp(methodName)}\\s*\\(([^)]*)\\)\\s*:\\s*\\n([\\s\\S]*?)(?=\\n\\s*def\\s+|$)`));
  if (!methodMatch) return null;
  return methodMatch[2];
}

function buildPythonSelfMap(className, ctorArgs, code) {
  const selfMap = {};
  const classMatch = code.match(new RegExp(`class\\s+${escapeRegExp(className)}\\s*:\\s*\\n([\\s\\S]*?)(?=\\n[^ \\t]|$)`));
  if (!classMatch) return selfMap;

  const initMatch = classMatch[1].match(/(?:^|\n)\s*def\s+__init__\s*\(([^)]*)\)\s*:\s*\n([\s\S]*?)(?=\n\s*def\s+|$)/);
  if (!initMatch) return selfMap;

  const params = splitTopLevelArgs(initMatch[1]).map(p => p.trim()).filter(Boolean);
  const argMap = {};
  params.forEach((param, index) => {
    if (param === 'self') return;
    argMap[param] = ctorArgs[index - 1];
  });

  const initBody = initMatch[2];
  const assignRegex = /self\.(\w+)\s*=\s*(\w+)/g;
  let assignMatch;
  while ((assignMatch = assignRegex.exec(initBody)) !== null) {
    const field = assignMatch[1];
    const source = assignMatch[2];
    if (source in argMap) selfMap[field] = argMap[source];
  }

  return selfMap;
}

function splitTopLevelArgs(value) {
  const parts = [];
  let current = '';
  let depth = 0;
  let quote = null;

  for (let index = 0; index < value.length; index += 1) {
    const char = value[index];
    const prev = value[index - 1];

    if (quote) {
      current += char;
      if (char === quote && prev !== '\\') quote = null;
      continue;
    }

    if (char === '"' || char === "'") {
      quote = char;
      current += char;
      continue;
    }

    if (char === '(' || char === '[' || char === '{') depth += 1;
    if (char === ')' || char === ']' || char === '}') depth -= 1;

    if (char === ',' && depth === 0) {
      if (current.trim()) parts.push(current.trim());
      current = '';
      continue;
    }

    current += char;
  }

  if (current.trim()) parts.push(current.trim());
  return parts;
}

function createZeroDivisionError() {
  const error = new Error('division by zero');
  error.isZeroDivision = true;
  return error;
}

function collectPythonForLoopOutputs(code) {
  const outputs = [];
  const loopRegex = /for\s+(\w+)\s+in\s+([A-Za-z_]\w*(?:\([^)]*\))?)\s*:\s*\n((?:[ \t]+.+(?:\n|$))*)/g;
  let remainingCode = code;
  let match;

  while ((match = loopRegex.exec(code)) !== null) {
    const iteratorName = match[1];
    const iterableExpr = match[2];
    const body = match[3] || '';
    let iterableValues = [];

    if (/^[A-Za-z_]\w*$/.test(iterableExpr)) {
      iterableValues = parseSimplePythonList(iterableExpr, code);
    } else {
      const callMatch = iterableExpr.match(/^([A-Za-z_]\w*)\s*\(([^)]*)\)$/);
      if (callMatch) {
        const funcName = callMatch[1];
        const generatorValues = findPythonGeneratorValues(funcName, code);
        iterableValues = generatorValues.length ? generatorValues : [];
      }
    }

    if (!iterableValues.length) continue;

    const bodyLines = body.split('\n').map(line => line.trim()).filter(Boolean);

    for (const item of iterableValues) {
      const pseudoCode = `${code}\n${iteratorName} = ${typeof item === 'number' ? item : `"${item}"`}`;
      for (const line of bodyLines) {
        if (!line.startsWith('print(') || !line.endsWith(')')) continue;
        const arg = line.slice(line.indexOf('(') + 1, line.lastIndexOf(')')).trim();
        if (!arg) continue;
        outputs.push(resolvePythonExpressionValue(arg, pseudoCode));
      }
    }

    remainingCode = remainingCode.replace(match[0], '');
  }

  return { outputs, remainingCode };
}

function parseSimplePythonList(name, code) {
  const safe = escapeRegExp(name);
  const listMatch = code.match(new RegExp(`\\b${safe}\\b\\s*=\\s*\\[([^\\]]*)\\]`, 'm'));
  if (!listMatch) return [];

  return listMatch[1]
    .split(',')
    .map(part => part.trim())
    .filter(Boolean)
    .map(part => {
      if (/^-?\d+(\.\d+)?$/.test(part)) return Number(part);
      if ((part.startsWith('"') && part.endsWith('"')) || (part.startsWith("'") && part.endsWith("'"))) {
        return part.slice(1, -1);
      }
      return part;
    });
}

function findPythonGeneratorValues(functionName, code) {
  const safe = escapeRegExp(functionName);
  const functionRegex = new RegExp(`def\\s+${safe}\\s*\\([^)]*\\)\\s*:\\s*\\n([\\s\\S]*?)(?=\\n[^ \\t]|$)`);
  const functionMatch = code.match(functionRegex);
  if (!functionMatch) return [];

  const values = [];
  const yieldRegex = /yield\s+(.+)/g;
  let yieldMatch;
  while ((yieldMatch = yieldRegex.exec(functionMatch[1])) !== null) {
    const raw = yieldMatch[1].trim();
    if (/^-?\d+(\.\d+)?$/.test(raw)) {
      values.push(Number(raw));
    } else if ((raw.startsWith('"') && raw.endsWith('"')) || (raw.startsWith("'") && raw.endsWith("'"))) {
      values.push(stripQuotes(raw));
    } else {
      values.push(raw);
    }
  }

  return values;
}

function findSimplePythonDictString(name, code) {
  const safe = escapeRegExp(name);
  const dictMatch = code.match(new RegExp(`\\b${safe}\\b\\s*=\\s*\\{([^\\}]*)\\}`, 'm'));
  if (!dictMatch) return null;
  return `{${dictMatch[1].replace(/\"/g, "'")}}`;
}

function findSimplePythonDictEntry(name, key, code) {
  const safe = escapeRegExp(name);
  const entryKey = escapeRegExp(key);
  const entryRegex = new RegExp(`\\b${safe}\\b\\s*=\\s*\\{[\\s\\S]*?["']${entryKey}["']\\s*:\\s*(?:["'](.+?)["']|(-?\\d+\\.?\\d*))`, 'm');
  const match = code.match(entryRegex);
  if (!match) return null;
  return match[1] || match[2] || null;
}

function evaluatePythonFunctionCall(callExpr, code) {
  const callMatch = callExpr.match(/^([A-Za-z_]\w*)\s*\((.*)\)$/);
  if (!callMatch) return null;

  const functionName = callMatch[1];
  const argString = callMatch[2].trim();
  const argValues = argString ? argString.split(',').map(part => part.trim()) : [];

  const functionRegex = new RegExp(`def\\s+${escapeRegExp(functionName)}\\s*\\(([^)]*)\\)\\s*:\\s*\\n([\\s\\S]*?)(?=\\n[^ \\t]|$)`);
  const functionMatch = code.match(functionRegex);
  if (!functionMatch) return null;

  const params = functionMatch[1]
    .split(',')
    .map(param => param.trim())
    .filter(Boolean);

  const bodyLines = functionMatch[2].split('\n').map(line => line.trim()).filter(Boolean);
  const returnLine = bodyLines.find(line => line.startsWith('return '));
  if (!returnLine) return null;

  let expr = returnLine.slice(7).trim();
  params.forEach((param, index) => {
    const replacement = argValues[index] ?? '0';
    expr = expr.replace(new RegExp(`\\b${escapeRegExp(param)}\\b`, 'g'), replacement);
  });

  const resolved = resolvePythonExpressionValue(expr, code, 1);
  if (/^[\d+\-*/().\s]+$/.test(String(resolved))) {
    try {
      return String(Function(`"use strict"; return (${resolved})`)());
    } catch {
      return resolved;
    }
  }
  return resolved;
}

function resolveFStringVars(template, code, lang) {
  const varPattern = lang === 'python'
    ? /\{(\w+)\}/g
    : /\$\{(\w+)\}/g;

  return template.replace(varPattern, (_, name) => {
    return findVarValue(name, code, lang);
  });
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function stripQuotes(value) {
  const trimmed = value.trim();
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function resolveExpressionValue(expression, code, langId) {
  if (!expression) return '';

  const raw = expression.trim().replace(/;+$/, '').trim();
  if (!raw) return '';

  if ((raw.startsWith('"') && raw.endsWith('"')) || (raw.startsWith("'") && raw.endsWith("'"))) {
    return stripQuotes(raw);
  }

  if (/^-?\d+(\.\d+)?$/.test(raw)) {
    return raw;
  }

  if (/^(true|false)$/i.test(raw)) {
    return raw.toLowerCase();
  }

  if (langId === 'python') {
    const functionValue = evaluatePythonFunctionCall(raw, code);
    if (functionValue !== null && functionValue !== undefined) return functionValue;

    const dictAccess = raw.match(/^([A-Za-z_]\w*)\s*\[\s*["'](.+?)["']\s*\]$/);
    if (dictAccess) {
      const dictValue = findSimplePythonDictEntry(dictAccess[1], dictAccess[2], code);
      if (dictValue !== null && dictValue !== undefined) return dictValue;
    }
  }

  if (langId === 'php' && /^\$[A-Za-z_]\w*$/.test(raw)) {
    return findVarValue(raw.slice(1), code, 'php');
  }

  if (/^[A-Za-z_]\w*$/.test(raw)) {
    return findVarValue(raw, code, langId);
  }

  let replaced = raw;

  if (langId === 'php') {
    replaced = replaced.replace(/\$[A-Za-z_]\w*/g, token => {
      const value = findVarValue(token.slice(1), code, 'php');
      return value === token.slice(1) ? token : value;
    });
  } else {
    replaced = replaced.replace(/\b[A-Za-z_]\w*\b/g, token => {
      if (/^(true|false|null)$/i.test(token)) return token;
      const value = findVarValue(token, code, langId);
      return value === token ? token : value;
    });
  }

  if (/^[\d+\-*/().\s]+$/.test(replaced)) {
    try {
      const evaluated = Function(`"use strict"; return (${replaced})`)();
      return String(evaluated);
    } catch {
      return replaced;
    }
  }

  return replaced;
}

function findVarValue(name, code, lang) {
  const safeName = escapeRegExp(name);
  let assignRegex;

  if (lang === 'python') {
    assignRegex = new RegExp(`\\b${safeName}\\b\\s*=\\s*(?:["'](.+?)["']|(-?\\d+\\.?\\d*)|((?:true|false|True|False)))`, 'm');
  } else if (lang === 'javascript' || lang === 'typescript') {
    assignRegex = new RegExp(`(?:let|const|var)\\s+${safeName}\\s*=\\s*(?:["'\`](.+?)["'\`]|(-?\\d+\\.?\\d*)|(true|false))`, 'm');
  } else if (lang === 'go') {
    assignRegex = new RegExp(`(?:var\\s+)?${safeName}\\s*:?=\\s*(?:["'](.+?)["']|(-?\\d+\\.?\\d*)|(true|false))`, 'm');
  } else if (lang === 'cpp') {
    assignRegex = new RegExp(`(?:int|string|float|double|auto|bool)\\s+${safeName}\\s*=\\s*(?:["'](.+?)["']|(-?\\d+\\.?\\d*)|(true|false))`, 'm');
  } else if (lang === 'java') {
    assignRegex = new RegExp(`(?:byte|short|int|long|float|double|boolean|char|String|var)\\s+${safeName}\\s*=\\s*(?:["'](.+?)["']|(-?\\d+\\.?\\d*)|(true|false))`, 'm');
  } else if (lang === 'csharp') {
    assignRegex = new RegExp(`(?:var|int|double|float|decimal|bool|string|char|long)\\s+${safeName}\\s*=\\s*(?:["'](.+?)["']|(-?\\d+\\.?\\d*)|(true|false))`, 'm');
  } else if (lang === 'swift') {
    assignRegex = new RegExp(`(?:let|var)\\s+${safeName}\\s*=\\s*(?:["'](.+?)["']|(-?\\d+\\.?\\d*)|(true|false))`, 'm');
  } else if (lang === 'kotlin') {
    assignRegex = new RegExp(`(?:val|var)\\s+${safeName}\\s*=\\s*(?:["'](.+?)["']|(-?\\d+\\.?\\d*)|(true|false))`, 'm');
  } else if (lang === 'php') {
    assignRegex = new RegExp(`\\$${safeName}\\s*=\\s*(?:["'](.+?)["']|(-?\\d+\\.?\\d*)|(true|false))`, 'm');
  } else if (lang === 'ruby') {
    assignRegex = new RegExp(`\\b${safeName}\\b\\s*=\\s*(?:["'](.+?)["']|(-?\\d+\\.?\\d*)|(true|false))`, 'm');
  } else if (lang === 'rust') {
    assignRegex = new RegExp(`let\\s+(?:mut\\s+)?${safeName}\\s*=\\s*(?:["'](.+?)["']|(-?\\d+\\.?\\d*)|(true|false))`, 'm');
  } else {
    return name;
  }

  const match = code.match(assignRegex);
  if (match) return match[1] || match[2] || match[3] || name;

  if (lang === 'python') {
    const listValues = parseSimplePythonList(name, code);
    if (listValues.length) {
      const rendered = listValues.map(item => (typeof item === 'string' ? `'${item}'` : String(item))).join(', ');
      return `[${rendered}]`;
    }

    const dictString = findSimplePythonDictString(name, code);
    if (dictString) return dictString;
  }

  return name;
}

function resolveRustVar(argName, code) {
  const assignRegex = new RegExp(`let\\s+(?:mut\\s+)?${argName}\\s*=\\s*(?:["'](.+?)["']|(\\d+\\.?\\d*))`, 'm');
  const match = code.match(assignRegex);
  if (match) return match[1] || match[2] || argName;

  const funcCallMatch = argName.match(/(\w+)\s*\((.+)\)/);
  if (funcCallMatch) {
    const funcName = funcCallMatch[1];
    const funcArgs = funcCallMatch[2].split(',').map(a => a.trim());
    return evaluateSimpleFunc(funcName, funcArgs, code);
  }

  return argName;
}

function resolveGoVar(name, code) {
  return resolveExpressionValue(name, code, 'go');
}

function resolveCppVar(name, code) {
  return resolveExpressionValue(name, code, 'cpp');
}

function evaluateSimpleFunc(funcName, args, code) {
  const funcRegex = new RegExp(`fn\\s+${funcName}\\s*\\((.+?)\\).*?\\{([\\s\\S]*?)\\}`, 'm');
  const match = code.match(funcRegex);
  if (!match) return `${funcName}(${args.join(', ')})`;

  const body = match[2].trim();
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

function isOutputMatch(actualOutput, expectedOutput, context = {}) {
  const actual = normalizeConsoleText(actualOutput);
  const expected = normalizeConsoleText(expectedOutput);

  if (actual === expected) return true;

  const noteLessExpected = expected
    .replace(/\s*\((Reihenfolge kann variieren|Lokale Sandbox Ausgabe kann leicht variieren|lokale Simulation:.+?)\)\s*$/i, '')
    .trim();

  if (noteLessExpected && actual === noteLessExpected) return true;

  if (/reihenfolge kann variieren/i.test(expected)) {
    const expectedSet = parseSetLiteral(noteLessExpected);
    const actualSet = parseSetLiteral(actual);
    if (expectedSet && actualSet && expectedSet.size === actualSet.size) {
      let allFound = true;
      for (const value of expectedSet) {
        if (!actualSet.has(value)) {
          allFound = false;
          break;
        }
      }
      if (allFound) return true;
    }
  }

  if (/Lokale Sandbox Ausgabe kann leicht variieren/i.test(expected)) {
    if (actual.startsWith(noteLessExpected)) return true;
    if (/^User\(/.test(noteLessExpected) && /^User\(/.test(actual)) return true;
  }

  if (/Ein zufälliges Element wird gedruckt/i.test(expected)) {
    if (actual && !actual.includes('\n')) return true;
  }

  if (context.langId === 'python' && /lokale simulation/i.test(expected) && actual) {
    return true;
  }

  return false;
}

function normalizeConsoleText(value) {
  return String(value ?? '')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .trim();
}

function parseSetLiteral(value) {
  const raw = String(value || '').trim();
  const match = raw.match(/^\{([\s\S]*)\}$/);
  if (!match) return null;

  const inside = match[1].trim();
  if (!inside) return new Set();
  const parts = splitTopLevelArgs(inside).map(part => stripQuotes(part.trim()));
  return new Set(parts.map(String));
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
