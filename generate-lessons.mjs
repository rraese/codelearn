// generate-lessons.mjs – Generates 30 lessons per language with REAL educational content
import { writeFileSync, existsSync } from 'fs';
import { join } from 'path';

// Import real lesson content per language
import { pythonContent } from './lesson-content/python.mjs';
import { javascriptContent } from './lesson-content/javascript.mjs';
import { typescriptContent } from './lesson-content/typescript.mjs';
import { goContent } from './lesson-content/go.mjs';
import { rustContent } from './lesson-content/rust.mjs';
import { cppContent } from './lesson-content/cpp.mjs';
import { javaContent } from './lesson-content/java.mjs';
import { csharpContent } from './lesson-content/csharp.mjs';
import { swiftContent } from './lesson-content/swift.mjs';
import { kotlinContent } from './lesson-content/kotlin.mjs';
import { phpContent } from './lesson-content/php.mjs';
import { rubyContent } from './lesson-content/ruby.mjs';

const outputDir = join(process.cwd(), 'src', 'data', 'lessons');

// ── Language configurations ───────────────────────────────────────────
const languages = {
    python: { export: 'pythonLessons', comment: '#', content: pythonContent },
    javascript: { export: 'javascriptLessons', comment: '//', content: javascriptContent },
    typescript: { export: 'typescriptLessons', comment: '//', content: typescriptContent },
    go: { export: 'goLessons', comment: '//', content: goContent },
    rust: { export: 'rustLessons', comment: '//', content: rustContent },
    cpp: { export: 'cppLessons', comment: '//', content: cppContent },
    java: { export: 'javaLessons', comment: '//', content: javaContent },
    csharp: { export: 'csharpLessons', comment: '//', content: csharpContent },
    swift: { export: 'swiftLessons', comment: '//', content: swiftContent },
    kotlin: { export: 'kotlinLessons', comment: '//', content: kotlinContent },
    php: { export: 'phpLessons', comment: '//', content: phpContent },
    ruby: { export: 'rubyLessons', comment: '#', content: rubyContent },
};

// ── Emoji per lesson index ────────────────────────────────────────────
const emojis = ['🚀', '📦', '🔄', '🔀', '🔧', '📋', '🏗️', '⚡', '🛡️', '✨', '📄', '🎀', '🔗', '🧩', '🎯', '💡', '🔒', '⏳', '🧮', '🌐', '🎨', '🔥', '💪', '🎮', '📡', '🗄️', '📦', '🧪', '🏃', '🏆'];

// ── Render theory HTML from structured content ────────────────────────
function renderTheory(content, emoji) {
    const { title, intro, code, points, mistakes, tips } = content;
    let html = `<h2>${title} ${emoji}</h2>\n<p>${intro}</p>`;

    if (code) {
        html += `\n\n<h3>Codebeispiel</h3>\n<pre class="code-block">${escapeForTemplate(code)}</pre>`;
    }

    if (points && points.length) {
        html += `\n\n<h3>Wichtige Konzepte</h3>\n<ul>\n${points.map(p => `  <li>${p}</li>`).join('\n')}\n</ul>`;
    }

    if (mistakes && mistakes.length) {
        html += `\n\n<h3>Häufige Fehler</h3>\n<ul>\n${mistakes.map(m => `  <li>⚠️ ${m}</li>`).join('\n')}\n</ul>`;
    }

    if (tips) {
        html += `\n\n<h3>Praxis-Tipps</h3>\n<p>${tips}</p>`;
    }

    return html;
}

function escapeForTemplate(str) {
    return str.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
}

function escapeQuote(str) {
    return str.replace(/'/g, "\\'").replace(/\\/g, '\\\\');
}

// ── Generate a single lesson object string ────────────────────────────
function generateLesson(lessonContent, index) {
    const id = index + 1;
    const emoji = emojis[index] || '📚';
    const tc = lessonContent;

    const theoryHTML = renderTheory(tc.theory, emoji);

    const quizStr = tc.quiz.map(q => {
        const opts = q.options.map(o => `'${escapeQuote(o)}'`).join(', ');
        return `            { question: '${escapeQuote(q.question)}', options: [${opts}], correct: ${q.correct} }`;
    }).join(',\n');

    return `    {
        id: ${id},
        title: '${escapeQuote(tc.theory.title)}',
        description: '${escapeQuote(tc.description)}',
        duration: '${tc.duration}',
        theory: \`
${theoryHTML}
    \`,
        exercise: {
            instructions: '${escapeQuote(tc.exercise.instructions)}',
            starterCode: '${escapeQuote(tc.exercise.starterCode)}',
            expectedOutput: '${escapeQuote(tc.exercise.expectedOutput)}',
            hint: '${escapeQuote(tc.exercise.hint)}'
        },
        quiz: [
${quizStr}
        ]
    }`;
}

// ── Generate all lesson files ─────────────────────────────────────────
for (const [lang, config] of Object.entries(languages)) {
    const lessons = config.content.map((lc, i) => generateLesson(lc, i));

    const fileContent = `export const ${config.export} = [
${lessons.join(',\n')}
];
`;

    const filePath = join(outputDir, `${lang}.js`);
    writeFileSync(filePath, fileContent, 'utf8');
    console.log(`✅ Generated ${filePath} (${config.content.length} lessons)`);
}

console.log(`\n🎉 Done! Generated ${Object.keys(languages).length} language files with real educational content.`);
