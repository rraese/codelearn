export const rustLessons = [
    {
        id: 1,
        title: 'Hallo Welt & println!()',
        description: 'Dein erstes Rust-Programm – Makros und Ausgaben',
        duration: '5 min',
        theory: `
<h2>Willkommen bei Rust! ⚙️</h2>
<p>Rust ist eine moderne Systemsprache, die Sicherheit und Geschwindigkeit vereint. Sie wird von Mozilla und einer großen Community entwickelt.</p>

<h3>Das println!()-Makro</h3>
<p>In Rust werden Texte mit dem <code class="inline">println!()</code>-Makro ausgegeben. Das <code class="inline">!</code> zeigt an, dass es ein Makro ist, keine normale Funktion:</p>

<pre class="code-block">fn main() {
    println!("Hallo Welt!");
}</pre>

<h3>Die main()-Funktion</h3>
<p>Jedes Rust-Programm startet mit der Funktion <code class="inline">fn main()</code>. Das ist der Einstiegspunkt.</p>

<h3>Wichtige Unterschiede</h3>
<ul>
  <li>Rust wird <strong>kompiliert</strong> (nicht interpretiert wie Python)</li>
  <li>Geschweifte Klammern <code class="inline">{}</code> definieren Codeblöcke</li>
  <li>Semikolons <code class="inline">;</code> am Ende jeder Anweisung sind Pflicht!</li>
</ul>
    `,
        exercise: {
            instructions: 'Schreibe ein Rust-Programm in der main-Funktion, das "Hallo Welt!" ausgibt.',
            starterCode: 'fn main() {\n    // Gib "Hallo Welt!" aus\n    \n}',
            expectedOutput: 'Hallo Welt!',
            hint: 'Benutze println!("Hallo Welt!"); – vergiss das Semikolon und das Ausrufezeichen bei println nicht!'
        },
        quiz: [
            {
                question: 'Was bedeutet das "!" in println!()?',
                options: ['Es ist ein Fehler', 'Es ist ein Makro', 'Es ist eine Negation', 'Es ist optional'],
                correct: 1
            },
            {
                question: 'Wie heißt die Einstiegsfunktion in Rust?',
                options: ['start()', 'run()', 'main()', 'init()'],
                correct: 2
            }
        ]
    },
    {
        id: 2,
        title: 'Variablen & Mutabilität',
        description: 'Unveränderliche und veränderliche Variablen in Rust',
        duration: '8 min',
        theory: `
<h2>Variablen in Rust 📦</h2>
<p>In Rust sind Variablen standardmäßig <strong>unveränderlich</strong> (immutable)!</p>

<h3>let und let mut</h3>
<pre class="code-block">fn main() {
    let name = "Anna";        // Unveränderlich
    let mut alter = 25;        // Veränderlich (mut = mutable)
    alter = 26;                // OK, weil "mut"
    println!("{} ist {}", name, alter);
}</pre>

<h3>Datentypen</h3>
<ul>
  <li><code class="inline">i32</code>, <code class="inline">i64</code> – Ganzzahlen (mit Vorzeichen)</li>
  <li><code class="inline">u32</code>, <code class="inline">u64</code> – Ganzzahlen (ohne Vorzeichen)</li>
  <li><code class="inline">f64</code> – Dezimalzahlen</li>
  <li><code class="inline">&str</code>, <code class="inline">String</code> – Text</li>
  <li><code class="inline">bool</code> – Wahrheitswert</li>
</ul>

<h3>Formatierung mit {}</h3>
<p>Mit geschweiften Klammern <code class="inline">{}</code> in <code class="inline">println!()</code> kannst du Variablen einsetzen:</p>
<pre class="code-block">let sprache = "Rust";
println!("Ich lerne {}!", sprache);</pre>
    `,
        exercise: {
            instructions: 'Erstelle eine Variable "sprache" mit dem Wert "Rust" und gib "Ich lerne Rust!" aus.',
            starterCode: 'fn main() {\n    // Erstelle die Variable und gib den Satz aus\n    let sprache = "";\n    println!("Ich lerne {}!", sprache);\n}',
            expectedOutput: 'Ich lerne Rust!',
            hint: 'Setze den Wert: let sprache = "Rust";'
        },
        quiz: [
            {
                question: 'Sind Variablen in Rust standardmäßig veränderlich?',
                options: ['Ja', 'Nein, man braucht "mut"', 'Nur in Funktionen', 'Nur bei Zahlen'],
                correct: 1
            },
            {
                question: 'Was ist der Unterschied zwischen i32 und u32?',
                options: ['Kein Unterschied', 'i32 hat Vorzeichen, u32 nicht', 'u32 ist schneller', 'i32 ist für Strings'],
                correct: 1
            }
        ]
    },
    {
        id: 3,
        title: 'Vektoren & Schleifen',
        description: 'Dynamische Listen und Iteration in Rust',
        duration: '10 min',
        theory: `
<h2>Vektoren – Dynamische Listen ⚙️</h2>
<p>Vektoren (<code class="inline">Vec</code>) sind Rusts dynamische Arrays:</p>

<pre class="code-block">fn main() {
    let farben = vec!["rot", "grün", "blau"];
    println!("{}", farben[0]); // "rot"
}</pre>

<h3>For-Schleifen</h3>
<pre class="code-block">fn main() {
    let zahlen = vec![1, 2, 3];
    for zahl in &zahlen {
        println!("{}", zahl);
    }
}</pre>

<p><strong>Wichtig:</strong> Das <code class="inline">&</code> leiht den Vektor aus (Borrowing), damit er danach noch nutzbar ist!</p>

<h3>Ranges</h3>
<pre class="code-block">for i in 0..3 {
    println!("{}", i); // 0, 1, 2
}</pre>
    `,
        exercise: {
            instructions: 'Erstelle einen Vektor mit "Rust", "Go", "Zig" und gib jedes Element mit einer for-Schleife aus.',
            starterCode: 'fn main() {\n    let sprachen = vec![];\n    for sprache in &sprachen {\n        println!("{}", sprache);\n    }\n}',
            expectedOutput: 'Rust\nGo\nZig',
            hint: 'Fülle den Vektor: let sprachen = vec!["Rust", "Go", "Zig"];'
        },
        quiz: [
            {
                question: 'Was macht das "&" vor einem Vektor in einer for-Schleife?',
                options: ['Es kopiert den Vektor', 'Es leiht den Vektor aus (Borrowing)', 'Es löscht den Vektor', 'Es ist optional'],
                correct: 1
            },
            {
                question: 'Was gibt 0..3 als Range zurück?',
                options: ['0, 1, 2, 3', '0, 1, 2', '1, 2, 3', '1, 2'],
                correct: 1
            }
        ]
    },
    {
        id: 4,
        title: 'Funktionen & Ownership',
        description: 'Funktionen definieren und Rusts Ownership-Konzept kennenlernen',
        duration: '12 min',
        theory: `
<h2>Funktionen in Rust 🔄</h2>
<pre class="code-block">fn addiere(a: i32, b: i32) -> i32 {
    a + b  // Kein Semikolon = Rückgabewert!
}

fn main() {
    let ergebnis = addiere(3, 7);
    println!("Ergebnis: {}", ergebnis);
}</pre>

<h3>Ownership – Rusts Superkraft 🦸</h3>
<p>Ownership ist DAS Kernkonzept von Rust. Die drei Regeln:</p>
<ol>
  <li>Jeder Wert hat einen <strong>Besitzer</strong> (Owner)</li>
  <li>Es kann nur <strong>einen Besitzer</strong> gleichzeitig geben</li>
  <li>Wenn der Besitzer out of scope geht, wird der Wert <strong>freigegeben</strong></li>
</ol>

<pre class="code-block">fn main() {
    let s1 = String::from("Hallo");
    let s2 = s1;        // Ownership wird übertragen (Move)!
    // println!("{}", s1); // FEHLER! s1 ist nicht mehr gültig
    println!("{}", s2);  // OK
}</pre>

<p>Das macht Rust <strong>speichersicher ohne Garbage Collector</strong>!</p>
    `,
        exercise: {
            instructions: 'Erstelle eine Funktion "verdopple", die eine i32-Zahl verdoppelt und zurückgibt. Gib das Ergebnis von verdopple(21) aus.',
            starterCode: 'fn verdopple(x: i32) -> i32 {\n    // Gib das Doppelte zurück\n    0\n}\n\nfn main() {\n    println!("{}", verdopple(21));\n}',
            expectedOutput: '42',
            hint: 'Ersetze die 0 mit: x * 2 (ohne Semikolon, damit es als Rückgabewert gewertet wird!)'
        },
        quiz: [
            {
                question: 'Was bedeutet "Ownership" in Rust?',
                options: ['Jeder Wert gehört einer Variable', 'Variablen teilen sich Werte', 'Rust hat einen Garbage Collector', 'Werte werden automatisch kopiert'],
                correct: 0
            },
            {
                question: 'Was passiert, wenn man kein Semikolon am Ende einer Funktion schreibt?',
                options: ['Ein Fehler', 'Der Ausdruck wird als Rückgabewert gewertet', 'Nichts besonderes', 'Die Funktion wird ignoriert'],
                correct: 1
            }
        ]
    }
];
