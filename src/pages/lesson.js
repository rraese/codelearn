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

  const markers = [
    'In dieser Lektion lernst du die wichtigsten Konzepte und Techniken.',
    '<h3>Grundlagen</h3>',
    'Grundlegendes Verständnis von'
  ];

  return markers.filter(marker => theoryHtml.includes(marker)).length >= 2;
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

function getTopicBlueprint(topic) {
  const blueprints = {
    basics: {
      intro: 'Du legst den Grundstein: minimale Syntax, saubere Ausgabe und korrektes Ausführen.',
      steps: ['Starter-Code lesen und Struktur verstehen.', 'Eine kleine Änderung durchführen und testen.', 'Ausgabe exakt mit der Zielausgabe abgleichen.'],
      mistakes: ['Anführungszeichen oder Klammern vergessen.', 'Falsche Groß-/Kleinschreibung.', 'Ausgabe nicht exakt getroffen.']
    },
    variables: {
      intro: 'Hier geht es darum, Werte sicher zu speichern, zu verändern und korrekt auszugeben.',
      steps: ['Variablen/Konstanten sauber anlegen.', 'Werte gezielt aktualisieren.', 'Endwert kontrolliert ausgeben.'],
      mistakes: ['Falsches Schlüsselwort für veränderliche/unveränderliche Werte.', 'Zahl und Text verwechselt.', 'Variablenname inkonsistent geschrieben.']
    },
    loops: {
      intro: 'Schleifen wiederholen Schritte automatisch und sparen redundanten Code.',
      steps: ['Datenquelle oder Zählbereich festlegen.', 'Schleifenkopf korrekt formulieren.', 'Pro Schleifendurchlauf genau eine klare Aktion ausführen.'],
      mistakes: ['Off-by-one bei Start/Ende.', 'Falsche Einrückung bzw. Blockgrenzen.', 'Schleife ohne Fortschritt.']
    },
    conditions: {
      intro: 'Bedingungen steuern, welcher Codepfad abhängig von einem Zustand läuft.',
      steps: ['Bedingung klar formulieren.', 'True-/False-Pfad eindeutig trennen.', 'Ergebnis über die Ausgabe prüfen.'],
      mistakes: ['Vergleichsoperator mit Zuweisung verwechselt.', 'Verschachtelung ohne klare Struktur.', 'Nicht alle Fälle abgedeckt.']
    },
    functions: {
      intro: 'Funktionen kapseln Logik, machen Code wiederverwendbar und leichter testbar.',
      steps: ['Signatur mit sinnvollen Parametern definieren.', 'Kernlogik in der Funktion implementieren.', 'Funktion gezielt aufrufen und Ergebnis prüfen.'],
      mistakes: ['Falsche Reihenfolge der Argumente.', 'Rückgabewert vergessen.', 'Funktionsname und Aufruf stimmen nicht überein.']
    },
    collections: {
      intro: 'Sammlungen helfen, mehrere Werte strukturiert zu verwalten und zu bearbeiten.',
      steps: ['Passende Datenstruktur wählen.', 'Werte lesen/ändern/iterieren.', 'Ergebnis kontrolliert ausgeben.'],
      mistakes: ['Falscher Index/Key.', 'Mutierende und nicht-mutierende Operationen verwechselt.', 'Duplikate oder leere Werte nicht berücksichtigt.']
    },
    oop: {
      intro: 'Objektorientierung organisiert Verhalten und Daten in klaren, wiederverwendbaren Bausteinen.',
      steps: ['Typ/Klasse/Struktur sinnvoll definieren.', 'Eigenschaften und Verhalten trennen.', 'Instanz erzeugen und Verhalten testen.'],
      mistakes: ['Zuständigkeiten zu breit definiert.', 'Sichtbarkeit/Modifizierer falsch gewählt.', 'Vererbung/Interfaces ohne klaren Zweck genutzt.']
    },
    async: {
      intro: 'Asynchronität hält Programme reaktionsfähig, während langsame Aufgaben im Hintergrund laufen.',
      steps: ['Asynchrone Operation klar starten.', 'Auf Ergebnis korrekt warten/synchronisieren.', 'Ausgabe erst nach gültigem Ergebnis durchführen.'],
      mistakes: ['Ergebnis vor Abschluss der Operation verwenden.', 'Fehlerpfad bei Async-Abläufen ignorieren.', 'Race Conditions durch geteilten Zustand.']
    },
    errors: {
      intro: 'Sauberes Error-Handling macht Programme stabil und nachvollziehbar.',
      steps: ['Fehlerquelle klar identifizieren.', 'Fehler bewusst behandeln (nicht verschlucken).', 'Nutzerfreundliche Ausgabe/Weitergabe definieren.'],
      mistakes: ['Catch-Block ohne sinnvolle Reaktion.', 'Zu breite Fehlerbehandlung.', 'Fehlerzustände nicht getestet.']
    },
    modules: {
      intro: 'Module und Pakete strukturieren größere Projekte und reduzieren Kopplung.',
      steps: ['Code in sinnvolle Einheiten aufteilen.', 'Importe/Exports sauber definieren.', 'Verwendung mit klaren Abhängigkeiten testen.'],
      mistakes: ['Namenskonflikte bei Imports.', 'Zu viele Verantwortlichkeiten pro Modul.', 'Versteckte Abhängigkeiten.']
    },
    testing: {
      intro: 'Tests sichern Verhalten und geben dir schnelle Rückmeldung bei Änderungen.',
      steps: ['Erwartetes Verhalten als klaren Testfall formulieren.', 'Code ausführen und Ergebnis vergleichen.', 'Fehler gezielt beheben und erneut testen.'],
      mistakes: ['Nur Happy-Path getestet.', 'Unklare Assertions.', 'Tests hängen von zufälligem Zustand ab.']
    },
    web: {
      intro: 'Web-Themen verbinden Logik, Daten und Kommunikation über HTTP/API-Grenzen hinweg.',
      steps: ['Ein- und Ausgabe klar definieren.', 'Request/Response-Logik sauber aufbauen.', 'Fehler- und Randfälle testen.'],
      mistakes: ['Statuscodes/Antwortformat inkonsistent.', 'Unvalidierte Eingaben.', 'Seiteneffekte ohne Kontrolle.']
    },
    data: {
      intro: 'Datenformate und Speicherzugriffe verlangen saubere Struktur und robuste Verarbeitung.',
      steps: ['Datenformat korrekt aufbauen/lesen.', 'Werte validieren und transformieren.', 'Ergebnis gezielt ausgeben oder speichern.'],
      mistakes: ['Falsches Format (Typen/Keys).', 'Fehlende Fehlerbehandlung bei I/O.', 'Ungültige Eingabedaten nicht abgefangen.']
    },
    project: {
      intro: 'Im Projekt kombinierst du mehrere Konzepte zu einem durchgängigen, funktionierenden Ablauf.',
      steps: ['Aufgabe in kleine Teilziele zerlegen.', 'Kernfunktionen nacheinander umsetzen.', 'End-to-End testen und Ausgabe prüfen.'],
      mistakes: ['Zu großer Sprung ohne Zwischenchecks.', 'Teillösungen nicht integriert getestet.', 'Unklare Struktur oder Verantwortlichkeiten.']
    },
    general: {
      intro: 'Du vertiefst ein zentrales Konzept und übst die saubere Umsetzung im Code.',
      steps: ['Aufgabe und Zielausgabe präzise lesen.', 'Code schrittweise ergänzen.', 'Ergebnis überprüfen und gezielt korrigieren.'],
      mistakes: ['Zu viel auf einmal ändern.', 'Ausgabe nicht exakt geprüft.', 'Syntax- und Strukturfehler übersehen.']
    }
  };

  return blueprints[topic] || blueprints.general;
}

function getLanguageSyntaxGuide(langId) {
  const guides = {
    python: { output: 'print(...)', comment: '#' },
    javascript: { output: 'console.log(...)', comment: '//' },
    typescript: { output: 'console.log(...)', comment: '//' },
    go: { output: 'fmt.Println(...)', comment: '//' },
    rust: { output: 'println!(...)', comment: '//' },
    cpp: { output: 'cout << ...', comment: '//' },
    java: { output: 'System.out.println(...)', comment: '//' },
    csharp: { output: 'Console.WriteLine(...)', comment: '//' },
    swift: { output: 'print(...)', comment: '//' },
    kotlin: { output: 'println(...)', comment: '//' },
    php: { output: 'echo ...;', comment: '//' },
    ruby: { output: 'puts ...', comment: '#' },
  };

  return guides[langId] || { output: 'Ausgabefunktion', comment: '//' };
}

function buildTopicPattern(topic, langId) {
  const guide = getLanguageSyntaxGuide(langId);

  const patterns = {
    basics: `${guide.comment} Starte klein und prüfe jede Änderung\n${guide.comment} Ziel: eine exakte Konsolenausgabe\n${guide.output}`,
    variables: `${guide.comment} 1) Wert speichern\n${guide.comment} 2) Wert aktualisieren\n${guide.comment} 3) Ergebnis ausgeben\n${guide.output}`,
    loops: `${guide.comment} 1) Datenquelle waehlen\n${guide.comment} 2) Wiederholung formulieren\n${guide.comment} 3) Pro Durchlauf eine klare Aktion\n${guide.output}`,
    conditions: `${guide.comment} 1) Bedingung prüfen\n${guide.comment} 2) Pfad A/B sauber trennen\n${guide.comment} 3) Ergebnis sichtbar machen\n${guide.output}`,
    functions: `${guide.comment} 1) Funktion mit Parametern definieren\n${guide.comment} 2) Ergebnis zurueckgeben\n${guide.comment} 3) Funktion aufrufen\n${guide.output}`,
    collections: `${guide.comment} 1) Datenstruktur aufbauen\n${guide.comment} 2) Elemente lesen/verarbeiten\n${guide.comment} 3) Ergebnis prüfen\n${guide.output}`,
    oop: `${guide.comment} 1) Typ/Klasse definieren\n${guide.comment} 2) Verhalten kapseln\n${guide.comment} 3) Instanz testen\n${guide.output}`,
    async: `${guide.comment} 1) Asynchrone Aufgabe starten\n${guide.comment} 2) Auf Ergebnis warten/synchronisieren\n${guide.comment} 3) Erst dann ausgeben\n${guide.output}`,
    errors: `${guide.comment} 1) Fehlerfall erkennen\n${guide.comment} 2) Kontrolliert behandeln\n${guide.comment} 3) Sinnvolle Rückmeldung geben\n${guide.output}`,
    modules: `${guide.comment} 1) Funktionalität trennen\n${guide.comment} 2) Abhängigkeiten sauber importieren\n${guide.comment} 3) Ergebnis im Hauptfluss prüfen\n${guide.output}`,
    testing: `${guide.comment} 1) Erwartung formulieren\n${guide.comment} 2) Ausfuehren und vergleichen\n${guide.comment} 3) Bei Abweichung gezielt korrigieren`,
    web: `${guide.comment} 1) Eingabe/Request verstehen\n${guide.comment} 2) Verarbeitung implementieren\n${guide.comment} 3) Antwort/Output prüfen\n${guide.output}`,
    data: `${guide.comment} 1) Daten lesen/parsen\n${guide.comment} 2) Werte validieren\n${guide.comment} 3) Ergebnis ausgeben oder speichern\n${guide.output}`,
    project: `${guide.comment} 1) In kleine Teilaufgaben zerlegen\n${guide.comment} 2) Schrittweise implementieren\n${guide.comment} 3) End-to-End überprüfen\n${guide.output}`,
    general: `${guide.comment} Starte mit dem Kern der Aufgabe\n${guide.comment} Ergänze Code in kleinen Schritten\n${guide.comment} Prüfe die Zielausgabe nach jedem Run\n${guide.output}`,
  };

  return patterns[topic] || patterns.general;
}

function buildAdaptiveTheory(lesson, langId, langName) {
  const topic = inferTopicType(lesson.title, lesson.description);
  const blueprint = getTopicBlueprint(topic);
  const topicPattern = buildTopicPattern(topic, langId);

  return `
<h2>${escapeHtml(lesson.title)}</h2>
<p><strong>${escapeHtml(lesson.description)}</strong>. ${escapeHtml(blueprint.intro)}</p>

<h3>Was du in dieser Lektion können sollst</h3>
<ul>
  <li>Das Kernkonzept in <strong>${escapeHtml(langName)}</strong> korrekt anwenden.</li>
  <li>Den Starter-Code gezielt statt blind ergänzen.</li>
  <li>Das Ergebnis exakt gegen die Zielausgabe validieren.</li>
</ul>

<h3>Empfohlene Vorgehensweise</h3>
<ol>
  ${blueprint.steps.map(step => `<li>${escapeHtml(step)}</li>`).join('')}
</ol>

<h3>Muster in ${escapeHtml(langName)} (ohne Aufgabenlösung)</h3>
<pre class="code-block">${escapeHtml(topicPattern)}</pre>

<h3>Typische Fehler</h3>
<ul>
  ${blueprint.mistakes.map(mistake => `<li>Hinweis: ${escapeHtml(mistake)}</li>`).join('')}
</ul>
  `;
}

function getHintLevel(lessonId) {
  if (lessonId <= 10) return { key: 'beginner', label: 'Anfänger' };
  if (lessonId <= 20) return { key: 'intermediate', label: 'Aufbau' };
  return { key: 'advanced', label: 'Fortgeschritten' };
}

function normalizeHintText(hintText) {
  if (!hintText) return '';
  return hintText.replace(/Ergaenze/g, 'Ergänze');
}

function splitHintText(hintText) {
  const normalized = normalizeHintText(hintText).trim();
  const marker = '\n2) Beispiel:\n';
  const parts = normalized.split(marker);

  if (parts.length === 2) {
    return {
      guidance: parts[0].replace(/^1\)\s*/, '').trim(),
    };
  }

  return {
    guidance: normalized || 'Orientiere dich am Muster aus dem Theorie-Teil.',
  };
}

function getAdaptiveHint(hintText, lessonId) {
  if (!hintText) return null;

  const level = getHintLevel(lessonId);
  const { guidance } = splitHintText(hintText);

  if (level.key === 'beginner') {
    return {
      levelLabel: level.label,
      text: `1) ${guidance}\n2) Ergänze den Code Schritt für Schritt.\n3) Prüfe nach jedem Run die Zielausgabe.`,
    };
  }

  if (level.key === 'intermediate') {
    return {
      levelLabel: level.label,
      text: 'Arbeite vom Starter-Code aus in kleinen Schritten und prüfe die Zielausgabe nach jeder Änderung.',
    };
  }

  return {
    levelLabel: level.label,
    text: 'Korrigiere gezielt nur die Stelle, die die Ausgabe verfälscht, und vergleiche erneut mit der Zielausgabe.',
  };
}

function renderExerciseInstructions(exercise, lessonId) {
  const adaptiveHint = getAdaptiveHint(exercise.hint, lessonId);
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

      ${adaptiveHint ? `
      <div class="exercise-section">
        <h4>Lernhinweis (${escapeHtml(adaptiveHint.levelLabel)})</h4>
        <pre class="exercise-hint">${escapeHtml(adaptiveHint.text)}</pre>
      </div>
      ` : ''}
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
  const adaptiveHint = getAdaptiveHint(lesson.exercise.hint, lesson.id);

  // Run button
  btnRun?.addEventListener('click', () => {
    if (!editorInstance) return;

    const code = editorInstance.state.doc.toString().trim();

    if (!code || code === lesson.exercise.starterCode.trim()) {
      consoleOutput.innerHTML = `<div class="error-message">Bitte schreibe zuerst deinen Code!</div>`;
      return;
    }

    // Simulate execution by checking output
    const userOutput = simulateOutput(code, langId);
    const expectedOutput = lesson.exercise.expectedOutput.trim();

    if (userOutput === expectedOutput) {
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

function simulateOutput(code, langId) {
  let outputs = [];

  if (langId === 'python') {
    const printRegex = /print\s*\(\s*(?:f?["'`](.+?)["'`]|(.+?))\s*\)/g;
    let match;
    while ((match = printRegex.exec(code)) !== null) {
      let output = '';
      if (match[1]) {
        output = resolveFStringVars(match[1], code, 'python');
      } else {
        output = resolveExpressionValue(match[2], code, 'python');
      }
      outputs.push(output);
    }
  } else if (langId === 'javascript' || langId === 'typescript') {
    const logRegex = /console\.log\s*\(\s*(?:`(.+?)`|["'](.+?)["']|(.+?))\s*\)/g;
    let match;
    while ((match = logRegex.exec(code)) !== null) {
      let output = '';
      if (match[1]) {
        output = resolveFStringVars(match[1], code, 'javascript');
      } else if (match[2]) {
        output = match[2];
      } else {
        output = resolveExpressionValue(match[3], code, langId);
      }
      outputs.push(output);
    }
  } else if (langId === 'rust') {
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

  if (replaced !== raw && /^[\d+\-*/().\s]+$/.test(replaced)) {
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
    assignRegex = new RegExp(`\\b${safeName}\\b\\s*=\\s*(?:["'](.+?)["']|(-?\\d+\\.?\\d*)|(true|false))`, 'm');
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

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
