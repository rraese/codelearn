export const javascriptLessons = [
    {
        id: 1,
        title: 'Hallo Welt & console.log()',
        description: 'Dein erstes JavaScript-Programm – Ausgaben in der Konsole',
        duration: '5 min',
        theory: `
<h2>Willkommen bei JavaScript! ⚡</h2>
<p>JavaScript ist DIE Sprache des Internets. Jede Website, die du täglich nutzt, verwendet JavaScript.</p>

<h3>console.log()</h3>
<p>Um Texte auszugeben, nutzt du <code class="inline">console.log()</code>:</p>

<pre class="code-block">console.log("Hallo Welt!");</pre>

<h3>Semikolon</h3>
<p>In JavaScript beendet man Anweisungen <strong>optional</strong> mit einem Semikolon <code class="inline">;</code>. Es ist gute Praxis, es zu verwenden!</p>

<h3>Kommentare</h3>
<p>Kommentare werden vom Programm ignoriert und dienen als Notizen:</p>
<pre class="code-block">// Das ist ein einzeiliger Kommentar
/* Das ist ein
   mehrzeiliger Kommentar */</pre>
    `,
        exercise: {
            instructions: 'Schreibe ein JavaScript-Programm, das "Hallo Welt!" ausgibt.',
            starterCode: '// Gib "Hallo Welt!" aus\n',
            expectedOutput: 'Hallo Welt!',
            hint: 'Benutze console.log("Hallo Welt!");'
        },
        quiz: [
            {
                question: 'Wie gibt man Text in der Konsole aus?',
                options: ['print()', 'console.log()', 'echo()', 'System.out.println()'],
                correct: 1
            },
            {
                question: 'Wie schreibt man einen einzeiligen Kommentar?',
                options: ['# Kommentar', '// Kommentar', '/* Kommentar */', '-- Kommentar'],
                correct: 1
            }
        ]
    },
    {
        id: 2,
        title: 'Variablen: let, const & var',
        description: 'Variablen deklarieren und Datentypen verstehen',
        duration: '8 min',
        theory: `
<h2>Variablen in JavaScript 📦</h2>
<p>In JavaScript gibt es drei Möglichkeiten, Variablen zu erstellen:</p>

<h3>let, const und var</h3>
<pre class="code-block">let name = "Max";       // Kann geändert werden
const PI = 3.14159;     // Kann NICHT geändert werden
var altesWort = "hallo"; // Veraltet, nicht mehr verwenden!</pre>

<h3>Datentypen</h3>
<ul>
  <li><code class="inline">string</code> – Text: <code class="inline">"Hallo"</code></li>
  <li><code class="inline">number</code> – Zahl: <code class="inline">42</code> oder <code class="inline">3.14</code></li>
  <li><code class="inline">boolean</code> – Wahrheitswert: <code class="inline">true</code> oder <code class="inline">false</code></li>
  <li><code class="inline">undefined</code> – Nicht definiert</li>
  <li><code class="inline">null</code> – Leerer Wert</li>
</ul>

<h3>Template Literals</h3>
<p>Mit Backticks und <code class="inline">\${}</code> kannst du Variablen in Text einbetten:</p>
<pre class="code-block">let name = "Max";
console.log(\`Hallo, \${name}!\`);</pre>
    `,
        exercise: {
            instructions: 'Erstelle eine Variable "sprache" mit let und dem Wert "JavaScript". Gib "Ich lerne JavaScript!" mit einem Template Literal aus.',
            starterCode: '// Erstelle die Variable und gib den Satz aus\n',
            expectedOutput: 'Ich lerne JavaScript!',
            hint: 'Benutze let sprache = "JavaScript"; und dann console.log(`Ich lerne ${sprache}!`);'
        },
        quiz: [
            {
                question: 'Welches Schlüsselwort erstellt eine unveränderliche Variable?',
                options: ['let', 'var', 'const', 'static'],
                correct: 2
            },
            {
                question: 'Was unterscheidet number in JS von int/float in Python?',
                options: ['Nichts', 'JS hat nur einen Zahlentyp', 'JS hat keinen Zahlentyp', 'JS nutzt nur int'],
                correct: 1
            }
        ]
    },
    {
        id: 3,
        title: 'Arrays & Schleifen',
        description: 'Listen verwalten und Elemente durchgehen',
        duration: '10 min',
        theory: `
<h2>Arrays – Listen in JavaScript 📋</h2>
<p>Arrays speichern mehrere Werte in einer geordneten Liste:</p>

<pre class="code-block">let farben = ["rot", "grün", "blau"];
console.log(farben[0]); // "rot" (Zählung beginnt bei 0!)</pre>

<h3>For-Schleife</h3>
<pre class="code-block">let zahlen = [10, 20, 30];
for (let i = 0; i < zahlen.length; i++) {
    console.log(zahlen[i]);
}</pre>

<h3>For...of-Schleife (modern)</h3>
<p>Einfacher und lesbarer:</p>
<pre class="code-block">let farben = ["rot", "grün", "blau"];
for (let farbe of farben) {
    console.log(farbe);
}</pre>

<h3>Nützliche Array-Methoden</h3>
<ul>
  <li><code class="inline">.push()</code> – Element hinzufügen</li>
  <li><code class="inline">.length</code> – Länge abfragen</li>
  <li><code class="inline">.includes()</code> – Prüfen ob enthalten</li>
</ul>
    `,
        exercise: {
            instructions: 'Erstelle ein Array mit "HTML", "CSS", "JavaScript" und gib jedes Element mit einer for...of-Schleife aus.',
            starterCode: '// Erstelle das Array und gib jedes Element aus\nlet technologien = [];\nfor (let tech of technologien) {\n    console.log(tech);\n}',
            expectedOutput: 'HTML\nCSS\nJavaScript',
            hint: 'Fülle das Array: let technologien = ["HTML", "CSS", "JavaScript"];'
        },
        quiz: [
            {
                question: 'Was gibt array[0] zurück?',
                options: ['Das letzte Element', 'Das erste Element', 'Die Länge', 'Einen Fehler'],
                correct: 1
            },
            {
                question: 'Welche Schleife ist moderner und lesbarer?',
                options: ['for (let i = 0; ...)', 'for...of', 'while', 'do...while'],
                correct: 1
            }
        ]
    },
    {
        id: 4,
        title: 'Funktionen',
        description: 'Code wiederverwenden mit Funktionen und Arrow Functions',
        duration: '10 min',
        theory: `
<h2>Funktionen – Code wiederverwenden 🔄</h2>
<p>Funktionen sind wiederverwendbare Codeblöcke:</p>

<h3>Klassische Funktionen</h3>
<pre class="code-block">function grüße(name) {
    return "Hallo, " + name + "!";
}
console.log(grüße("Max"));</pre>

<h3>Arrow Functions (modern)</h3>
<pre class="code-block">const grüße = (name) => {
    return \`Hallo, \${name}!\`;
};

// Kurzform für einzeilige Funktionen:
const verdopple = (x) => x * 2;</pre>

<h3>Parameter & Rückgabewerte</h3>
<ul>
  <li><strong>Parameter</strong>: Werte, die eine Funktion empfängt</li>
  <li><strong>return</strong>: Gibt einen Wert zurück</li>
  <li>Ohne return gibt die Funktion <code class="inline">undefined</code> zurück</li>
</ul>
    `,
        exercise: {
            instructions: 'Erstelle eine Arrow Function "addiere", die zwei Zahlen addiert. Gib das Ergebnis von addiere(3, 7) aus.',
            starterCode: '// Erstelle die Funktion\nconst addiere = () => {\n    \n};\nconsole.log(addiere(3, 7));',
            expectedOutput: '10',
            hint: 'Die Funktion braucht zwei Parameter: const addiere = (a, b) => a + b;'
        },
        quiz: [
            {
                question: 'Was ist eine Arrow Function?',
                options: ['Ein spezieller Datentyp', 'Eine kurze Funktions-Schreibweise mit =>', 'Eine Schleife', 'Ein Array-Typ'],
                correct: 1
            },
            {
                question: 'Was gibt eine Funktion ohne return zurück?',
                options: ['null', '0', 'undefined', 'false'],
                correct: 2
            }
        ]
    }
];
