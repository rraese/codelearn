export const pythonLessons = [
    {
        id: 1,
        title: 'Hallo Welt & print()',
        description: 'Dein erstes Python-Programm – Texte ausgeben mit print()',
        duration: '5 min',
        theory: `
<h2>Willkommen bei Python! 🐍</h2>
<p>Python ist eine der einfachsten Programmiersprachen der Welt. Das Beste: Du kannst sofort loslegen!</p>

<h3>Die print()-Funktion</h3>
<p>Um einen Text auf dem Bildschirm auszugeben, nutzt du die Funktion <code class="inline">print()</code>. Der Text muss in Anführungszeichen stehen:</p>

<pre class="code-block">print("Hallo Welt!")</pre>

<p>Du kannst auch mehrere <code class="inline">print()</code>-Aufrufe nacheinander verwenden:</p>

<pre class="code-block">print("Zeile 1")
print("Zeile 2")</pre>

<h3>Wichtige Regeln</h3>
<ul>
  <li>Text (Strings) steht immer in <code class="inline">"Anführungszeichen"</code> oder <code class="inline">'einfachen Anführungszeichen'</code></li>
  <li>Python unterscheidet Groß- und Kleinschreibung: <code class="inline">Print()</code> funktioniert NICHT!</li>
  <li>Jede Anweisung kommt in eine eigene Zeile</li>
</ul>
    `,
        exercise: {
            instructions: 'Schreibe ein Programm, das "Hallo Welt!" ausgibt.',
            starterCode: '# Gib "Hallo Welt!" aus\n',
            expectedOutput: 'Hallo Welt!',
            hint: 'Benutze print("Hallo Welt!") – achte auf die Anführungszeichen!'
        },
        quiz: [
            {
                question: 'Welche Funktion gibt Text auf dem Bildschirm aus?',
                options: ['echo()', 'print()', 'write()', 'show()'],
                correct: 1
            },
            {
                question: 'Was passiert bei print("Hallo")?',
                options: ['Es wird "Hallo" mit Anführungszeichen ausgegeben', 'Es wird Hallo ohne Anführungszeichen ausgegeben', 'Es gibt einen Fehler', 'Nichts passiert'],
                correct: 1
            }
        ]
    },
    {
        id: 2,
        title: 'Variablen & Datentypen',
        description: 'Werte speichern und verschiedene Datentypen kennenlernen',
        duration: '8 min',
        theory: `
<h2>Variablen – Dein Datenspeicher 📦</h2>
<p>Variablen sind wie beschriftete Boxen, in denen du Werte speichern kannst.</p>

<h3>Variablen erstellen</h3>
<p>In Python erstellst du eine Variable einfach mit <code class="inline">=</code>:</p>

<pre class="code-block">name = "Anna"
alter = 25
groesse = 1.68
ist_student = True</pre>

<h3>Die wichtigsten Datentypen</h3>
<ul>
  <li><code class="inline">str</code> – Text (String): <code class="inline">"Hallo"</code></li>
  <li><code class="inline">int</code> – Ganzzahl (Integer): <code class="inline">42</code></li>
  <li><code class="inline">float</code> – Dezimalzahl: <code class="inline">3.14</code></li>
  <li><code class="inline">bool</code> – Wahrheitswert: <code class="inline">True</code> oder <code class="inline">False</code></li>
</ul>

<h3>Variablen verwenden</h3>
<p>Du kannst Variablen in <code class="inline">print()</code> verwenden und mit <code class="inline">f-Strings</code> Text und Variablen kombinieren:</p>

<pre class="code-block">name = "Anna"
alter = 25
print(f"Ich bin {name} und {alter} Jahre alt.")</pre>
    `,
        exercise: {
            instructions: 'Erstelle eine Variable "sprache" mit dem Wert "Python" und gib den Satz "Ich lerne Python!" aus.',
            starterCode: '# Erstelle die Variable und gib den Satz aus\nsprache = ""\nprint(f"Ich lerne !")',
            expectedOutput: 'Ich lerne Python!',
            hint: 'Setze "Python" als Wert und benutze {sprache} im f-String: print(f"Ich lerne {sprache}!")'
        },
        quiz: [
            {
                question: 'Was ist der Datentyp von 3.14?',
                options: ['str', 'int', 'float', 'bool'],
                correct: 2
            },
            {
                question: 'Wie gibt man eine Variable in einem Satz aus?',
                options: ['print("Text" + variable)', 'print(f"Text {variable}")', 'Beide sind richtig', 'Keines davon'],
                correct: 2
            }
        ]
    },
    {
        id: 3,
        title: 'Listen & Schleifen',
        description: 'Mehrere Werte speichern und automatisch durchgehen',
        duration: '10 min',
        theory: `
<h2>Listen – Mehrere Werte speichern 📋</h2>
<p>Eine Liste speichert mehrere Werte in einer bestimmten Reihenfolge:</p>

<pre class="code-block">farben = ["rot", "grün", "blau"]
zahlen = [1, 2, 3, 4, 5]</pre>

<h3>For-Schleifen</h3>
<p>Mit einer <code class="inline">for</code>-Schleife kannst du jeden Wert in einer Liste einzeln durchgehen:</p>

<pre class="code-block">farben = ["rot", "grün", "blau"]
for farbe in farben:
    print(farbe)</pre>

<p>Das gibt aus:</p>
<pre class="code-block">rot
grün
blau</pre>

<h3>range() – Zahlen generieren</h3>
<p>Mit <code class="inline">range()</code> kannst du automatisch Zahlenfolgen erzeugen:</p>

<pre class="code-block">for i in range(3):
    print(i)
# Gibt aus: 0, 1, 2</pre>

<h3>Wichtig: Einrückung!</h3>
<p>In Python wird statt geschweifter Klammern <strong>Einrückung</strong> (4 Leerzeichen) verwendet, um Codeblöcke zu definieren.</p>
    `,
        exercise: {
            instructions: 'Erstelle eine Liste mit den Sprachen "Python", "JavaScript", "Rust" und gib jede Sprache einzeln mit einer for-Schleife aus.',
            starterCode: '# Erstelle die Liste und gib jede Sprache aus\nsprachen = []\nfor sprache in sprachen:\n    print(sprache)',
            expectedOutput: 'Python\nJavaScript\nRust',
            hint: 'Fülle die Liste: sprachen = ["Python", "JavaScript", "Rust"]'
        },
        quiz: [
            {
                question: 'Was gibt range(3) zurück?',
                options: ['1, 2, 3', '0, 1, 2', '0, 1, 2, 3', '1, 2'],
                correct: 1
            },
            {
                question: 'Wie definiert Python Codeblöcke?',
                options: ['Mit geschweiften Klammern {}', 'Mit Einrückung (Leerzeichen)', 'Mit Semikolons ;', 'Mit Klammern ()'],
                correct: 1
            }
        ]
    },
    {
        id: 4,
        title: 'If-Bedingungen',
        description: 'Entscheidungen im Code treffen mit if, elif und else',
        duration: '8 min',
        theory: `
<h2>Bedingungen – Entscheidungen treffen 🔀</h2>
<p>Mit <code class="inline">if</code>-Bedingungen kann dein Programm Entscheidungen treffen:</p>

<pre class="code-block">alter = 18
if alter >= 18:
    print("Du bist volljährig!")
else:
    print("Du bist minderjährig.")</pre>

<h3>Vergleichsoperatoren</h3>
<ul>
  <li><code class="inline">==</code> – gleich</li>
  <li><code class="inline">!=</code> – ungleich</li>
  <li><code class="inline">></code>, <code class="inline"><</code> – größer/kleiner</li>
  <li><code class="inline">>=</code>, <code class="inline"><=</code> – größer/kleiner gleich</li>
</ul>

<h3>elif – Mehrere Bedingungen</h3>
<p>Mit <code class="inline">elif</code> (else if) prüfst du weitere Bedingungen:</p>

<pre class="code-block">punkte = 85
if punkte >= 90:
    print("Sehr gut!")
elif punkte >= 70:
    print("Gut!")
else:
    print("Üben!")</pre>
    `,
        exercise: {
            instructions: 'Schreibe ein Programm: Wenn die Variable "note" den Wert 1 hat, gib "Sehr gut!" aus. Bei 2 gib "Gut!" aus. Sonst gib "Weiter üben!" aus. Setze note auf 1.',
            starterCode: 'note = 0\n# Schreibe deine if-Bedingung hier\n',
            expectedOutput: 'Sehr gut!',
            hint: 'Setze note = 1 und prüfe: if note == 1: print("Sehr gut!")'
        },
        quiz: [
            {
                question: 'Was bedeutet "==" in Python?',
                options: ['Zuweisung', 'Vergleich (gleich)', 'Nicht gleich', 'Größer als'],
                correct: 1
            },
            {
                question: 'Was macht "elif"?',
                options: ['Beendet eine Bedingung', 'Prüft eine weitere Bedingung', 'Startet eine Schleife', 'Definiert eine Funktion'],
                correct: 1
            }
        ]
    }
];
