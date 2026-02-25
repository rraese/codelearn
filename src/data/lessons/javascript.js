export const javascriptLessons = [
    {
        id: 1,
        title: 'Hallo Welt & console.log',
        description: 'Dein erstes JavaScript-Programm',
        duration: '5 min',
        theory: `
<h2>Hallo Welt & console.log 🚀</h2>
<p>Willkommen in der Welt von JavaScript! JavaScript ist die Sprache, die Webseiten zum Leben erweckt (Interaktivität, Animationen, Logik).</p>

<h3>Die Konsole</h3>
<p>Der wichtigste Befehl für jeden JS-Entwickler ist <code>console.log()</code>. Damit kannst du Text, Zahlen und vieles mehr "ausdrucken", um zu überprüfen, ob dein Code richtig funktioniert.</p>

<pre class="code-block">// Das ist ein Kommentar. Er wird von JavaScript ignoriert.

// Text (Strings) muss immer in Anführungszeichen stehen:
console.log("Hallo Welt!");
console.log('Einfache Anführungszeichen gehen auch.');

// Zahlen können direkt geschrieben werden:
console.log(42);</pre>

<p><em>Im Browser findest du die Konsole meistens durch Drücken von F12 -> "Console". Hier auf der Plattform simulieren wir die Ausgabe für dich!</em></p>
    `,
        exercise: {
            instructions: 'Nutze console.log(), um den Text "Hallo JavaScript-Welt!" auszugeben. Achte auf korrekte Anführungszeichen.',
            starterCode: '// Dein erstes JavaScript-Programm\n\n',
            expectedOutput: 'Hallo JavaScript-Welt!',
            hint: '1) Ergaenze den fehlenden Code nach dem Muster aus der Theorie.\n2) Beispiel:\nNutze console.log("Hallo JavaScript-Welt!")'
        },
        quiz: [
            { question: 'Wofür wird console.log() am häufigsten verwendet?', options: ['Um ein Fenster im Browser zu öffnen', 'Um Daten dauerhaft in einer Datenbank zu speichern', 'Um Variablen und Text zur Fehlersuche (Debugging) auszugeben', 'Um den Computermonitor auszuschalten'], correct: 2 },
            { question: 'Wie markiert man einfachen Text (Strings) in JavaScript?', options: ['Text', '(Text)', '[Text]', '"Text" oder \\\'Text\\\''], correct: 3 }
        ]
    },
    {
        id: 2,
        title: 'Variablen: let, const, var',
        description: 'Werte speichern mit Deklarationsarten',
        duration: '8 min',
        theory: `
<h2>Variablen: let, const, var 📦</h2>
<p>Eine Variable ist wie eine kleine Box im Speicher deines Computers. Du gibst ihr einen Namen und legst einen Wert hinein (z.B. eine Zahl oder Text).</p>

<h3>Das moderne JS: let und const</h3>
<p>In modernem JavaScript gibt es zwei Hauptarten, Variablen zu erstellen (deklarieren):</p>

<pre class="code-block">// let: Für Variablen, die sich später ändern dürfen
let punkte = 0;
punkte = 10; // Wert überschrieben!

// const (Konstante): Für Werte, die IMMER gleich bleiben
const pi = 3.1415;
// pi = 4; -> DAS ERZEUGT EINEN FEHLER!</pre>

<h3>Das alte var</h3>
<p>Früher nutzte man <code>var name = "Max";</code>. Heute solltest du das vermeiden, da es zu seltsamen Fehlern führen kann. <strong>Nutze immer const, es sei denn, der Wert muss sich später ändern (dann let).</strong></p>
    `,
        exercise: {
            instructions: 'Erstelle eine Konstante (const) namens "spielerName" mit dem Wert "Mario" und eine Variable (let) "level" mit dem Wert 1. Erhöhe "level" danach auf 2 und gib mit console.log() das level aus.',
            starterCode: '// Variablen deklarieren\n\n\n// Level ausgeben\n',
            expectedOutput: '2',
            hint: '1) Ergaenze den fehlenden Code nach dem Muster aus der Theorie.\n2) Beispiel:\nconst spielerName = "Mario";\nlet level = 1;\nlevel = 2;\nconsole.log(level);'
        },
        quiz: [
            { question: 'Welches Schlüsselwort nutzt man in modernem JavaScript für einen Wert, der sich garantiert NICHT mehr ändert?', options: ['let', 'var', 'const', 'static'], correct: 2 },
            { question: 'Warum sollte man "var" heutzutage meistens vermeiden?', options: ['Weil es nur Text speichern kann', 'Weil es historisch bedingt zu unübersichtlichen Fehlern (Scope-Problemen) führen kann', 'Weil "var" langsamer auf aktuellen CPUs läuft', 'Weil "var" in allen Browsern deaktiviert wurde'], correct: 1 }
        ]
    },
    {
        id: 3,
        title: 'Arrays & Schleifen',
        description: 'Daten in Arrays speichern und durchlaufen',
        duration: '10 min',
        theory: `
<h2>Arrays & Schleifen 🔄</h2>
<p>Wenn du eine Einkaufsliste hast, willst du nicht 10 verschiedene Variablen erstellen. Nutze dafür eine Liste: Ein <strong>Array</strong>!</p>

<h3>Arrays (Listen) erstellen</h3>
<p>Ein Array wird mit eckigen Klammern <code>[]</code> erstellt. Der erste Wert hat die Position (Index) 0!</p>
<pre class="code-block">const fruechte = ["Apfel", "Banane", "Kirsche"];
console.log(fruechte[0]); // Gibt "Apfel" aus
console.log(fruechte.length); // Gibt 3 aus (Anzahl der Elemente)</pre>

<h3>Schleifen (Loops)</h3>
<p>Um jedes Element im Array einzeln zu bearbeiten, nutzen wir eine Schleife. Sehr beliebt in JS ist die <code>for...of</code> Schleife:</p>

<pre class="code-block">const zahlen = [10, 20, 30];

for (let zahl of zahlen) {
    console.log("Wert:", zahl);
}</pre>
<p>Die klassische Zählschleife sieht so aus: <code>for (let i = 0; i < 3; i++) { ... }</code>.</p>
    `,
        exercise: {
            instructions: 'Hier ist ein Array mit Namen. Nutze eine for...of Schleife, um jeden Namen mit console.log() einzeln auszugeben.',
            starterCode: 'const namen = ["Anna", "Max", "Lisa"];\n\n// Schreibe hier deine for...of Schleife\n',
            expectedOutput: 'Anna\nMax\nLisa',
            hint: '1) Ergaenze den fehlenden Code nach dem Muster aus der Theorie.\n2) Beispiel:\nfor (let name of namen) {\n    console.log(name);\n}'
        },
        quiz: [
            { question: 'Welchen Index (Position) hat das erste Element in einem JavaScript-Array?', options: ['1', '0', '-1', 'A'], correct: 1 },
            { question: 'Welche Schleifen-Art eignet sich perfekt, um elegant über alle Elemente eines Arrays zu iterieren (in modernem JS)?', options: ['while-Schleife', 'for...in', 'for...of', 'do-while'], correct: 2 }
        ]
    },
    {
        id: 4,
        title: 'Funktionen & Arrow Functions',
        description: 'Moderne Funktionsdefinitionen',
        duration: '10 min',
        theory: `
<h2>Funktionen & Arrow Functions 🔀</h2>
<p>Funktionen erlauben es uns, ein Stück Code zu verpacken und immer wieder zu verwenden, ohne ihn neu schreiben zu müssen.</p>

<h3>Die klassische Funktion</h3>
<p>Mit dem Wort <code>function</code> definierst du eine Aktion. <code>return</code> gibt das Ergebnis zurück.</p>
<pre class="code-block">function addieren(a, b) {
    return a + b;
}

let summe = addieren(5, 3);
console.log(summe); // 8</pre>

<h3>Die Arrow Function (Pfeilfunktion)</h3>
<p>Modernes JavaScript liebt <strong>Arrow Functions</strong>. Sie sind kürzer und eleganter, besonders bei kleinen Berechnungen.</p>
<pre class="code-block">// Das ist exakt dasselbe wie oben!
const addierenModern = (a, b) => {
    return a + b;
};

// Wenn es nur eine Zeile ist, geht es noch kürzer (das "return" wird unsichtbar!):
const multiplizieren = (a, b) => a * b;

console.log(multiplizieren(4, 5)); // 20</pre>
    `,
        exercise: {
            instructions: 'Schreibe eine Arrow Function (Pfeilfunktion) namens "begruessen", die einen Namen (z.B. "Peter") als Parameter nimmt und "Hallo Peter" zurückgibt. Gib das Ergebnis der Funktion für den Namen "CodeLearn" aus.',
            starterCode: '// Definiere die Arrow Function "begruessen"\n\n\n// Rufe sie auf und logge das Ergebnis\n',
            expectedOutput: 'Hallo CodeLearn',
            hint: '1) Ergaenze den fehlenden Code nach dem Muster aus der Theorie.\n2) Beispiel:\nconst begruessen = (name) => "Hallo " + name;\nconsole.log(begruessen("CodeLearn"));'
        },
        quiz: [
            { question: 'Mit welchem Schlüsselwort gibt eine Funktion ein fertiges Ergebnis an das Programm zurück?', options: ['send', 'output', 'yield', 'return'], correct: 3 },
            { question: 'Was ist eine Arrow Function?', options: ['Eine Funktion, die nur auf Vektoren (Pfeilen) arbeiten kann', 'Das neue Symbol für eine if-Abfrage', 'Eine kürzere, moderne Schreibweise für normale Funktionen', 'Eine spezielle Schleife'], correct: 2 }
        ]
    },
    {
        id: 5,
        title: 'Objekte & JSON',
        description: 'Daten strukturiert speichern',
        duration: '10 min',
        theory: `
<h2>Objekte & JSON 🔧</h2>
<p>Während Arrays einfache Listen sind, sind <strong>Objekte</strong> wie Karteikarten: Sie speichern Werte unter Namen (sogenannten Schlüsseln oder "Keys").</p>

<h3>Objekte erstellen</h3>
<p>Objekte nutzen geschweifte Klammern <code>{}</code>.</p>
<pre class="code-block">const user = {
    name: "Thomas",
    alter: 28,
    istAdmin: false
};

// So greifst du auf Daten zu (Punkt-Notation):
console.log(user.name); // "Thomas"
user.alter = 29;        // Wert ändern</pre>

<h3>JSON (JavaScript Object Notation)</h3>
<p>JSON ist fast identisch mit JS-Objekten, wird aber als Text-String formatiert, um Daten über das Internet zu schicken. Wichtig: Bei JSON MÜSSEN die Schlüssel in doppelten Anführungszeichen stehen!</p>
<pre class="code-block">const textVomServer = '{"name": "Lisa", "alter": 22}';

// JSON-Text in ein echtes JS-Objekt umwandeln:
const obj = JSON.parse(textVomServer);
console.log(obj.alter); // 22</pre>
    `,
        exercise: {
            instructions: 'Erstelle ein Objekt "auto" mit den Eigenschaften "marke" (z.B. "Tesla") und "ps" (z.B. 400). Gib danach NUR die Marke des Autos in der Konsole aus.',
            starterCode: '// Erstelle das Objekt\n\n\n// Gib die Marke aus\n',
            expectedOutput: 'Tesla',
            hint: '1) Ergaenze den fehlenden Code nach dem Muster aus der Theorie.\n2) Beispiel:\nconst auto = { marke: "Tesla", ps: 400 };\nconsole.log(auto.marke);'
        },
        quiz: [
            { question: 'Welche Klammern nutzt man, um ein Objekt in JavaScript zu erstellen?', options: ['Runde Klammern ()', 'Eckige Klammern []', 'Geschweifte Klammern {}', 'Spitze Klammern <>'], correct: 2 },
            { question: 'Welcher Befehl wandelt einen Text im JSON-Format wieder in ein nutzbares JavaScript-Objekt um?', options: ['JSON.stringify()', 'JSON.parse()', 'JSON.convert()', 'Object.load()'], correct: 1 }
        ]
    },
    {
        id: 6,
        title: 'DOM-Manipulation',
        description: 'HTML-Elemente mit JS verändern',
        duration: '12 min',
        theory: `
<h2>DOM-Manipulation 📋</h2>
<p>Die absolute Superkraft von JavaScript im Browser ist die Fähigkeit, HTML und CSS live zu verändern. Das Document Object Model (<strong>DOM</strong>) ist die Struktur deiner Webseite.</p>

<h3>Elemente finden</h3>
<p>Zuerst müssen wir das HTML-Element finden, das wir verändern wollen. Dafür nutzen wir meistens <code>document.querySelector()</code>.</p>
<pre class="code-block">// Sucht den ersten Button auf der Seite
const meinButton = document.querySelector('button');

// Sucht ein Element mit der ID "titel"
const ueberschrift = document.querySelector('#titel');</pre>

<h3>Elemente verändern</h3>
<p>Sobald wir das Element haben, können wir seinen Text oder seine Styles ändern:</p>
<pre class="code-block">ueberschrift.textContent = "Hallo DOM!"; // Text ändern
ueberschrift.style.color = "blue";       // Farbe ändern</pre>

<h3>Auf Klicks reagieren (Events)</h3>
<p>Mit <code>addEventListener</code> lauschen wir auf Ereignisse, wie z.B. einen Mausklick:</p>
<pre class="code-block">meinButton.addEventListener('click', () => {
    alert("Button wurde geklickt!");
});</pre>
    `,
        exercise: {
            instructions: 'In der Sandbox simulieren wir ein DOM-Element. Du hast ein Objekt namens "titelElement". Ändere dessen Eigenschaft "textContent" auf "JavaScript rockt!".',
            starterCode: '// Sandbox-Simulation eines DOM-Elements\nconst titelElement = { textContent: "Alter Text" };\n\n// Ändere den textContent hier\n\n\n// Ausgabe zur Kontrolle\nconsole.log(titelElement.textContent);\n',
            expectedOutput: 'JavaScript rockt!',
            hint: '1) Ergaenze den fehlenden Code nach dem Muster aus der Theorie.\n2) Beispiel:\ntitelElement.textContent = "JavaScript rockt!";'
        },
        quiz: [
            { question: 'Wofür steht DOM in der Webentwicklung?', options: ['Data Output Mechanism', 'Document Object Model', 'Design Order Manager', 'Digital Output Mode'], correct: 1 },
            { question: 'Welcher vielseitige Befehl wird am häufigsten genutzt, um ein HTML-Element über einen CSS-Selektor (wie "#id" oder ".klasse") in JavaScript zu finden?', options: ['document.get()', 'document.fetchElement()', 'document.querySelector()', 'document.find()'], correct: 2 }
        ]
    },
    {
        id: 7,
        title: 'Promises & Async/Await',
        description: 'Asynchronen Code elegant schreiben',
        duration: '12 min',
        theory: `
<h2>Promises & Async/Await 🏗️</h2>
<p>JavaScript erledigt die meisten Dinge sofort. Aber manche Dinge dauern lange, wie das Herunterladen eines Bildes oder das Abfragen einer Datenbank. Dafür nutzt man <strong>asynchronen Code</strong>.</p>

<h3>Die Promise (Das Versprechen)</h3>
<p>Eine <code>Promise</code> ist das Versprechen, dass in Zukunft ein Wert geliefert wird (oder ein Fehler). Früher nutzte man <code>.then()</code>, was oft unübersichtlich wurde.</p>

<h3>Modernes JS: Async / Await</h3>
<p>Heute packen wir langen Code in eine Funktion mit dem Wort <code>async</code>. Innen drin nutzen wir <code>await</code> ("Warte!"), um JavaScript zu pausieren, bis die langsamen Daten da sind.</p>

<pre class="code-block">// Simulierte langsame Funktion
const ladeDaten = () => new Promise(res => setTimeout(() => res("Daten da!"), 1000));

async function programmStarten() {
    console.log("Lade...");
    
    // JS wartet hier, ohne den Browser einzufrieren!
    const ergebnis = await ladeDaten(); 
    
    console.log(ergebnis); // "Daten da!"
}

programmStarten();</pre>
    `,
        exercise: {
            instructions: 'Du hast eine async Funktion "zeigeWetter()". Rufe intern die vorhandene Funktion ladeWetter() mit dem "await" Keyword auf, speichere das Ergebnis in der Variable "wetter" und gib sie mit console.log aus.',
            starterCode: '// Simulation der API\nconst ladeWetter = async () => "Sonnig im simulierten Netz!";\n\nasync function zeigeWetter() {\n    // Dein Code hier: Nutze await\n    \n}\n\n// Lass die Simulation laufen\nzeigeWetter();',
            expectedOutput: 'Sonnig im simulierten Netz!',
            hint: '1) Ergaenze den fehlenden Code nach dem Muster aus der Theorie.\n2) Beispiel:\nconst wetter = await ladeWetter();\nconsole.log(wetter);'
        },
        quiz: [
            { question: 'Wofür wird das Keyword "await" verwendet?', options: ['Um eine Schleife vorzeitig zu beenden', 'Um eine Konstante zu deklarieren', 'Um innerhalb einer "async"-Funktion zu warten, bis eine Promise erfüllt ist', 'Um den Arbeitsspeicher zu leeren'], correct: 2 },
            { question: 'Was muss vor dem Begriff "function" stehen, damit man drinnen "await" benutzen darf?', options: ['promise', 'async', 'defer', 'wait'], correct: 1 }
        ]
    },
    {
        id: 8,
        title: 'Module & Import/Export',
        description: 'Code in Module aufteilen',
        duration: '8 min',
        theory: `
<h2>Module & Import/Export ⚡</h2>
<p>Wenn dein Projekt wächst, kannst du nicht den ganzen Code in einer riesigen <code>app.js</code> Datei lassen. Du musst ihn in <strong>Module</strong> aufteilen!</p>

<h3>Exportieren</h3>
<p>In einer Datei (z.B. <code>mathe.js</code>) schreibst du Funktionen und sagst JavaScript mit <code>export</code>, dass andere Dateien diese Funktionen nutzen dürfen.</p>

<pre class="code-block">// In mathe.js
export const addieren = (a, b) => a + b;
export const pi = 3.1415;</pre>

<h3>Importieren</h3>
<p>In deiner Hauptdatei (<code>main.js</code>) holst du dir diese Funktionen mit <code>import</code>.</p>

<pre class="code-block">// In main.js
import { addieren, pi } from './mathe.js';

console.log("Pi ist", pi);
console.log("5+3 =", addieren(5, 3));</pre>

<p><em>Im Browser (HTML) musst du dem Script-Tag <code>[Pfad entfernt]</code> hinzufügen, damit Module funktionieren!</em></p>
    `,
        exercise: {
            instructions: 'Simuliere einen Export/Import. In der Sandbox steht ein simuliertes Modul bereit. Gib den String "Erfolgreich von App.js aus aufgerufen!" aus, um zu zeigen, dass du verstanden hast, wie Module Code verbinden.',
            starterCode: '// Stell dir vor, dies ist die importierende main.js\n// import { startApp } from "./app.js";\n\n// Simulation\nconsole.log("Erfolgreich von App.js aus aufgerufen!")\n',
            expectedOutput: 'Erfolgreich von App.js aus aufgerufen!',
            hint: '1) Ergaenze den fehlenden Code nach dem Muster aus der Theorie.\n2) Beispiel:\nEinfach console.log() wie im Startercode angegeben aufrufen.'
        },
        quiz: [
            { question: 'Welches Keyword macht eine Funktion in einer JS-Datei für andere Dateien verfügbar?', options: ['public', 'share', 'export', 'expose'], correct: 2 },
            { question: 'Wie holt man gezielt Funktionen namens "x" und "y" aus einer Datei namens "tools.js"?', options: ['include x, y from "tools.js"', 'import { x, y } from "./tools.js"', 'require("./tools.js").load(x, y)', 'fetch x and y from "./tools.js"'], correct: 1 }
        ]
    },
    {
        id: 9,
        title: 'Error Handling',
        description: 'try/catch und eigene Fehlertypen',
        duration: '8 min',
        theory: `
<h2>Error Handling 🛡️</h2>
<p>Code ist nie perfekt. Manchmal fallen APIs aus oder User geben falschen Text in Zahlenfelder ein. Wenn ein Fehler auftritt, stürzt dein ganzes JS-Programm ab – es sei denn, du fängst ihn auf!</p>

<h3>try...catch</h3>
<p>Mit <code>try</code> ("Versuche dies") und <code>catch</code> ("Fange den Fehler") kannst du Abstürze verhindern.</p>

<pre class="code-block">try {
    // Gefährlicher Code
    let user = JSON.parse("KAPUTTER JSON TEXT!!!");
    console.log(user.name);
} catch (fehler) {
    // Dieser Block wird ausgeführt, wenn das try abstürzt
    console.log("Huch, da ging etwas schief!");
    console.log("Der Fehler lautet:", fehler.message);
}</pre>

<h3>Selbst Fehler werfen</h3>
<p>Du kannst auch eigene Fehler auslösen, wenn etwas gegen deine Regeln verstößt:</p>
<pre class="code-block">if (passwort.length < 5) {
    throw new Error("Passwort ist zu kurz!");
}</pre>
    `,
        exercise: {
            instructions: 'Nutze try...catch. Der Code im "try" Block wird garantiert crashen (wir rufen fehlerMacher() auf). Sorge dafür, dass der "catch" Block das Programm rettet und "Gefangen!" in der Konsole ausgibt.',
            starterCode: 'function fehlerMacher() {\n    throw new Error("Bumm!");\n}\n\n// Füge hier try...catch hinzu:\n\nfehlerMacher(); // packe das in den try-Block\n\n',
            expectedOutput: 'Gefangen!',
            hint: '1) Ergaenze den fehlenden Code nach dem Muster aus der Theorie.\n2) Beispiel:\ntry {\n    fehlerMacher();\n} catch (e) {\n    console.log("Gefangen!");\n}'
        },
        quiz: [
            { question: 'Was passiert mit einem JavaScript-Programm, wenn ein Fehler auftritt und KEIN try...catch Block genutzt wird?', options: ['Es ignoriert den Fehler und macht weiter', 'Es stürzt komplett ab und die Ausführung stoppt', 'Es repariert den Fehler automatisch durch eine KI', 'Es warnt den User mit einem PopUp'], correct: 1 },
            { question: 'Mit welchem Kommando löst du im Code absichtlich einen eigenen Fehler aus?', options: ['throw new Error()', 'cast Error()', 'return false', 'catch()'], correct: 0 }
        ]
    },
    {
        id: 10,
        title: 'Array-Methoden',
        description: 'map, filter, reduce Transformationen',
        duration: '10 min',
        theory: `
<h2>Array-Methoden ✨</h2>
<p>JavaScript bietet magische Methoden (Higher-Order Functions), um Arrays elegant umzubauen, ohne mühsame <code>for</code>-Schleifen schreiben zu müssen. Die wichtigsten sind <strong>map</strong> und <strong>filter</strong>.</p>

<h3>Die map() Methode</h3>
<p><code>map()</code> geht durch jedes Element im Array und baut daraus ein komplett <strong>neues Array</strong>, indem es eine Arrow Function auf das Element anwendet.</p>

<pre class="code-block">const preise = [10, 20, 30];

// Verdoppelt jeden Preis! Die alte Liste bleibt erhalten.
const doppeltePreise = preise.map(preis => preis * 2);
console.log(doppeltePreise); // [20, 40, 60]</pre>

<h3>Die filter() Methode</h3>
<p><code>filter()</code> liefert ein neues Array, das nur die Elemente behält, bei denen deine Arrow Function <code>true</code> zurückgibt.</p>

<pre class="code-block">const zahlen = [1, 5, 8, 12, 3];

// Behalte nur Zahlen, die größer als 6 sind
const grosseZahlen = zahlen.filter(zahl => zahl > 6);
console.log(grosseZahlen); // [8, 12]</pre>
    `,
        exercise: {
            instructions: 'Du hast ein Array [1, 2, 3]. Nutze .map(), um ein neues Array zu erzeugen, bei dem jede Zahl mit 10 multipliziert wird. Gib das neue Array mit console.log aus.',
            starterCode: 'const zahlen = [1, 2, 3];\n\n// Dein Code mit .map() hier:\n\n',
            expectedOutput: '[ 10, 20, 30 ]',
            hint: '1) Ergaenze den fehlenden Code nach dem Muster aus der Theorie.\n2) Beispiel:\nconst neu = zahlen.map(x => x * 10);\nconsole.log(neu);'
        },
        quiz: [
            { question: 'Welche Array-Methode verändert NIEMALS die Anzahl der Elemente, sondern baut jedes Element nach deinen Regeln um?', options: ['filter()', 'map()', 'reduce()', 'splice()'], correct: 1 },
            { question: 'Welche Methode wirft Elemente aus dem Array, die nicht zu einer Bedingung passen?', options: ['map()', 'filter()', 'delete()', 'shift()'], correct: 1 }
        ]
    },
    {
        id: 11,
        title: 'Spread & Destructuring',
        description: 'Moderne Syntax für eleganten Code',
        duration: '10 min',
        theory: `
<h2>Spread & Destructuring 📄</h2>
<p>Zwei der beliebtesten Features in modernem JavaScript helfen dir, Arrays und Objekte extrem elegant zu entpacken und zu kopieren.</p>

<h3>Destructuring (Entpacken)</h3>
<p>Anstatt Werte einzeln aus einem Objekt zu fischen, kannst du sie in einer einzigen Zeile "herausziehen":</p>
<pre class="code-block">const user = { name: "Max", alter: 30, stadt: "Berlin" };

// Klassisch: const name = user.name;
// Modern(Destructuring):
const { name, stadt } = user;
console.log(name); // "Max"</pre>

<h3>Spread-Syntax (...)</h3>
<p>Die drei Punkte <code>...</code> kopieren den kompletten Inhalt eines Arrays oder Objekts in ein neues.</p>
<pre class="code-block">const ersteZahlen = [1, 2, 3];
const zweiteZahlen = [4, 5, ...ersteZahlen];

console.log(zweiteZahlen); // [4, 5, 1, 2, 3]</pre>
    `,
        exercise: {
            instructions: 'Du hast ein Objekt "spieler". Nutze Objekt-Destructuring in einer Zeile, um die Variablen "level" und "punkte" daraus zu extrahieren. Gib danach beide Werte summiert aus.',
            starterCode: 'const spieler = { name: "Lisa", level: 5, punkte: 120 };\n\n// 1. Extrahiere level und punkte per Destructuring:\n\n\n// 2. Addiere sie und gib das Ergebnis aus (Sollte 125 sein)\n',
            expectedOutput: '125',
            hint: '1) Ergaenze den fehlenden Code nach dem Muster aus der Theorie.\n2) Beispiel:\nconst { level, punkte } = spieler;\nconsole.log(level + punkte);'
        },
        quiz: [
            { question: 'Wie nennt man den Vorgang, bei dem man Eigenschaften eines Objekts direkt in eigene Variablen gleichen Namens extrahiert?', options: ['Resting', 'Spread', 'Destructuring', 'Spreading'], correct: 2 },
            { question: 'Welches Symbol wird für die "Spread"-Syntax genutzt, um z.B. den Inhalt eines Arrays in ein anderes zu kopieren?', options: ['[...]', '...', '->', '&&'], correct: 1 }
        ]
    },
    {
        id: 12,
        title: 'Web APIs & fetch',
        description: 'Daten von APIs laden',
        duration: '12 min',
        theory: `
<h2>Web APIs & fetch 🎀</h2>
<p>Um Daten aus dem Internet in deine Webseite zu laden (wie aktuelle Wetterdaten oder News), nutzt man die <strong>fetch API</strong>. Sie gibt immer eine <code>Promise</code> zurück.</p>

<h3>Daten abfragen</h3>
<p>Wir kombinieren <code>fetch()</code> mit <code>async/await</code>, um den Code lesbar zu halten. Wenn die Antwort ankommt, müssen wir sie oft noch als <strong>JSON</strong> parsen.</p>

<pre class="code-block">async function ladeZufallsUser() {
    try {
        // 1. Fetch startet die Netzwerkanfrage
        const antwort = await fetch("https://randomuser.me/api/");
        
        // 2. Wir warten, bis der JSON-Text komplett da ist
        const daten = await antwort.json();
        
        console.log(daten.results[0].name.first); // z.B. "Susan"
    } catch (fehler) {
        console.log("Netzwerkfehler:", fehler);
    }
}
ladeZufallsUser();</pre>

<p><em>Hinweis: In unserer "Sandbox" simulieren wir den Netzwerkzugriff oft für dich, aber in echten Browsern funktioniert fetch exakt so!</em></p>
    `,
        exercise: {
            instructions: 'In der Sandbox ist `fetchSimulation()` bereits definiert und liefert ein JSON-ähnliches Objekt zurück. Rufe die Funktion mit await auf und gib die Eigenschaft "titel" aus.',
            starterCode: '// Simulation\nconst fetchSimulation = async () => ({ titel: "API geladen!", ok: true });\n\nasync function zeigeDaten() {\n    // Dein Code: Nutze await fetchSimulation()\n    \n}\nzeigeDaten();',
            expectedOutput: 'API geladen!',
            hint: '1) Ergaenze den fehlenden Code nach dem Muster aus der Theorie.\n2) Beispiel:\nconst daten = await fetchSimulation();\n    console.log(daten.titel);'
        },
        quiz: [
            { question: 'Was liefert fetch() als erstes Ergebnis zurück?', options: ['Einen fertigen JSON-String', 'Ein HTML-Dokument', 'Eine Promise, die das Response-Objekt enthält', 'Ein Array mit Bytes'], correct: 2 },
            { question: 'Mit welcher Methode des Response-Objekts wandelst du bei fetch() den empfangenen Server-Text in ein nutzbares JavaScript-Objekt um?', options: ['.toObject()', '.parse()', '.json()', '.parseJSON()'], correct: 2 }
        ]
    },
    {
        id: 13,
        title: 'Klassen & OOP',
        description: 'Objektorientiertes JavaScript',
        duration: '12 min',
        theory: `
<h2>Klassen & OOP 🔗</h2>
<p>Wenn du viele ähnliche Objekte brauchst (z.B. tausende Spieler in einem Spiel), nutze Baupläne: <strong>Klassen</strong>! Das nennt sich Objektorientierte Programmierung (OOP).</p>

<h3>Klassen definieren</h3>
<p>Eine Klasse bündelt Variablen (Eigenschaften) und Funktionen (Methoden). Die Funktion <code>constructor()</code> wird aufgerufen, wenn ein neues Objekt erschaffen wird.</p>

<pre class="code-block">class Hund {
    // Wird aufgerufen bei: new Hund(...)
    constructor(name, alter) {
        this.name = name;
        this.alter = alter;
    }

    // Eine Methode der Klasse
    bellen() {
        console.log(this.name + " sagt: Wuff!");
    }
}

// Objekte (Instanzen) erschaffen:
const bello = new Hund("Bello", 3);
bello.bellen(); // "Bello sagt: Wuff!"</pre>
    `,
        exercise: {
            instructions: 'Baue eine Klasse "Auto". Der Constructor soll "marke" als Parameter annehmen und in "this.marke" speichern. Schreibe eine Methode "hupen()", die "Die Marke hupte" ausgibt. Erstelle danach einen BMW und rufe hupen() auf.',
            starterCode: 'class Auto {\n    // Constructor hier\n    \n    \n    // Methode hupen() hier\n    \n}\n\n// Erstelle ein "BMW" Auto und rufe hupen() auf\n',
            expectedOutput: 'BMW sagt: Honk!',
            hint: '1) Ergaenze den fehlenden Code nach dem Muster aus der Theorie.\n2) Beispiel:\nclass Auto { constructor(m) { this.marke = m; } hupen() { console.log(this.marke + " sagt: Honk!"); } } const meinAuto = new Auto("BMW"); meinAuto.hupen();'
        },
        quiz: [
            { question: 'Wie heißt die spezielle Methode in einer JavaScript Klasse, die automatisch ausgeführt wird, wenn ein neues Objekt mit "new" erzeugt wird?', options: ['init()', 'start()', 'constructor()', 'create()'], correct: 2 },
            { question: 'Welches Keyword verknüpft Variablen und Funktionen an die aktuelle, individuelle "Instanz" eines Objekts innerhalb einer Klasse?', options: ['self', 'this', 'me', 'object'], correct: 1 }
        ]
    },
    {
        id: 14,
        title: 'Closures & Scope',
        description: 'Kontext und Gültigkeitsbereiche',
        duration: '10 min',
        theory: `
<h2>Closures & Scope 🧩</h2>
<p><strong>Scope</strong> (Gültigkeitsbereich) bestimmt, in welchem Teil deines Codes eine Variable "bekannt" ist. Eine Variable, die in einer Funktion erstellt wird, ist außerhalb unsichtbar!</p>

<h3>Die Closure (Funktionsabschluss)</h3>
<p>Eine <strong>Closure</strong> ist das Phänomen, dass Funktionen auf Variablen zugreifen können, die in <em>der umgebenden Funktion</em> definiert wurden, auch wenn die äußere Funktion schon fertig ist.</p>

<pre class="code-block">function baueZaehler() {
    let zahl = 0; // Diese Variable lebt in der Closure
    
    // Wir geben eine Funktion zurück
    return function() {
        zahl++;
        return zahl;
    };
}

const derZaehler = baueZaehler(); // baueZaehler ist fertig!
console.log(derZaehler()); // 1
console.log(derZaehler()); // 2
console.log(zahl); // FEHLER! 'zahl' ist hier unsichtbar.</pre>
<p>Das ist ein toller Trick, um geheime (private) Variablen zu verstecken, die niemand von außen manipulieren kann!</p>
    `,
        exercise: {
            instructions: 'Die Funktion "kasse" liefert eine Closure zurück, die den internen Kontostand erhöht. Erhöhe den Stand zweimal und logge das zweite Ergebnis (sollte 20 sein).',
            starterCode: 'function baueKasse() {\n    let geld = 0;\n    return (betrag) => {\n        geld += betrag;\n        return geld;\n    };\n}\n\nconst meineKasse = baueKasse();\n// 1. Zahle 10 ein: meineKasse(10)\n// 2. Zahle nochmals 10 ein und logge das Ergebnis\n',
            expectedOutput: '20',
            hint: '1) Ergaenze den fehlenden Code nach dem Muster aus der Theorie.\n2) Beispiel:\nmeineKasse(10);\nconsole.log(meineKasse(10));'
        },
        quiz: [
            { question: 'Was ist in JavaScript eine Definition von "Scope"?', options: ['Ein Tool zur Fehlersuche', 'Der Gültigkeits- und Sichtbarkeitsbereich von Variablen', 'Eine Teleskop-Funktion', 'Ein veraltetes Wort für Array'], correct: 1 },
            { question: 'Warum nutzt man oft das Konzept der "Closure"?', options: ['Um den Browser schneller zu machen', 'Um HTML und CSS schneller zu binden', 'Um Daten als privat (geheim) zu kapseln, sodass sie nur von einer bestimmten Funktion geändert werden können', 'Damit man keine Loops mehr schreiben muss'], correct: 2 }
        ]
    },
    {
        id: 15,
        title: 'Prototypen & Vererbung',
        description: 'Das Prototypensystem verstehen',
        duration: '12 min',
        theory: `
<h2>Prototypen & Vererbung 🎯</h2>
<p>Hinter den Kulissen nutzt JavaScript für Klassen das sogenannte <strong>Prototypen-System</strong>. Im Gegensatz zu Java oder C++ erben JS-Objekte direkt von anderen Objekten.</p>

<h3>Vererbung mit extends</h3>
<p>Wenn du eine Klasse bauen willst, die alle Fähigkeiten einer anderen besitzt, aber mehr kann, nutzt du Vererbung (<code>extends</code>).</p>

<pre class="code-block">class Tier {
    atmen() { console.log("Atmet..."); }
}

// Ein Vogel IST ein Tier (erbt von Tier)
class Vogel extends Tier {
    fliegen() { console.log("Fliegt in den Himmel!"); }
}

const tweety = new Vogel();
tweety.atmen();  // Ererbt aus Tier!
tweety.fliegen(); // Eigene Funktion</pre>
<p>Mit <code>super()</code> im Konstruktor kann eine abgeleitete Klasse den Konstruktor der Elternklasse aufrufen.</p>
    `,
        exercise: {
            instructions: 'Erstelle eine Klasse "Superheld", die von Klasse "Mensch" erbt. Mensch hat eine Methode "laufen()". In Superheld schreibe "fliegen()". Rufe danach laufen() und fliegen() für deinen Helden auf.',
            starterCode: 'class Mensch {\n    laufen() { console.log("Läuft..."); }\n}\n\n// Schreibe hier deine Klasse Superheld mit extends Mensch\n\n\n// Erschaffe einen Helden und rufe laufen() und fliegen() auf\n',
            expectedOutput: 'Läuft...\nFliegt...',
            hint: '1) Ergaenze den fehlenden Code nach dem Muster aus der Theorie.\n2) Beispiel:\nclass Superheld extends Mensch { fliegen() { console.log("Fliegt..."); } } const hero = new Superheld(); hero.laufen(); hero.fliegen();'
        },
        quiz: [
            { question: 'Mit welchem Schlüsselwort erbt eine neue Klasse alle Eigenschaften und Methoden einer anderen?', options: ['inherits', 'extends', 'super', 'adopts'], correct: 1 },
            { question: 'Wie nennt sich in JavaScript die unsichtbare "Kette", durch die Objekte Methoden nachschlagen, die sie nicht selbst besitzen?', options: ['The Function Tree', 'The Class Flow', 'Die Prototype Chain (Prototypenkette)', 'Der Inheritance Handler'], correct: 2 }
        ]
    },
    {
        id: 16,
        title: 'Event Loop',
        description: 'Wie JS asynchron funktioniert',
        duration: '10 min',
        theory: `
<h2>Event Loop 💡</h2>
<p>JavaScript ist <strong>Single-Threaded</strong>. Das bedeutet, es kann eigentlich nur eine Sache absolut gleichzeitig tun. Warum friert der Browser bei langsamen Aufgaben dann nicht ein?</p>

<h3>Die Call Stack und die Web APIs</h3>
<p>Die <strong>Call Stack</strong>führt deinen Code aus. Wenn dort ein <code>setTimeout</code> oder ein <code>fetch</code> landet, sagt JS dem Browser: "Hey, kümmere dich im Hintergrund darum!" und JS arbeitet den restlichen Code weiter ab.</p>

<h3>Die Aufgaben-Schlange (Task Queue)</h3>
<p>Ist der Browser im Hintergrund fertig (z.B. nach 2 Sekunden beim Timeout), schiebt er das Ergebnis in die sogenannte <strong>Task Queue</strong>. Die <strong>Event Loop</strong> schaut ständig: "Ist die Call Stack komplett leer? Ja? Dann hol die nächste Aufgabe aus der Queue!".</p>

<pre class="code-block">console.log("1. Geht sofort!");

setTimeout(() => {
    console.log("3. Geht erst am Ende!"); // Obwohl 0 Sekunden Wartezeit!
}, 0);

console.log("2. Geht sofort!");</pre>
<p>Das <code>setTimeout</code> landet in der Queue und muss warten, bis <em>sämtlicher</em> normaler Code fertig ist!</p>
    `,
        exercise: {
            instructions: 'Die Event Loop ist knifflig! Führe den Startercode in deinem Kopf aus und ordne die Ausgabe in der korrekten Reihenfolge an, indem du die fehlenden Konsolenausgaben einfügst, damit A, C, B ausgegeben wird.',
            starterCode: 'console.log("A");\n// Nutze setTimeout mit 0 Millisekunden für das "B"\n\n\nconsole.log("C");\n',
            expectedOutput: 'A\nC\nB',
            hint: '1) Ergaenze den fehlenden Code nach dem Muster aus der Theorie.\n2) Beispiel:\nsetTimeout(() => console.log("B"), 0);'
        },
        quiz: [
            { question: 'Was ist die Hauptaufgabe der Event Loop in JavaScript?', options: ['Daten in einer Endlosschleife zu speichern', 'Zu prüfen, ob der Call Stack leer ist und dann das nächste Event aus der Queue zu holen', 'Den Bildschirm 60 Mal pro Sekunde neu zu zeichnen', 'Einen Loop (for/while) schneller zu machen'], correct: 1 },
            { question: 'Woran liegt es, dass ein setTimeout(..., 0) trotzdem erst NACH dem restlichen regulären Code ausgeführt wird?', options: ['Wegen eines Bugs im Browser', 'Weil 0 intern immer als 1000 Millisekunden gewertet wird', 'Weil es sofort in eine Warteschlange (Task Queue) gesteckt wird und diese erst geleert wird, wenn der aktuelle Thread (Call Stack) fertig ist', 'Weil setTimeout nur für Animationen gedacht ist'], correct: 2 }
        ]
    },
    {
        id: 17,
        title: 'Regular Expressions',
        description: 'Muster in Strings finden',
        duration: '10 min',
        theory: `
<h2>Regular Expressions (RegEx) 🔒</h2>
<p>Oft musst du prüfen, ob ein String eine E-Mail-Adresse ist oder Zahlen enthält. <strong>RegEx</strong> ist eine mächtige, wenn auch etwas kryptische Mini-Sprache dafür!</p>

<h3>Regex bauen</h3>
<p>In JS werden RegEx oft zwischen zwei Slashes <code>/muster/</code> geschrieben.</p>
<pre class="code-block">// Prüft, ob irgendwo das Wort "hallo" steht (i = Groß/Klein ignorieren)
const muster = /hallo/i; 
console.log(muster.test("Hallo Welt!")); // true

// Prüft, ob ein String NUR aus 3-5 Zahlen besteht
const nummernMuster = /^[0-9]{3,5}$/;
console.log(nummernMuster.test("1234")); // true
console.log(nummernMuster.test("12abc")); // false</pre>

<h3>Ersetzen mit RegEx</h3>
<p>Du kannst <code>replace()</code> super mit RegEx nutzen:</p>
<pre class="code-block">const text = "Die Katze und die Maus";
// Ersetze alle (!) "die" (i) durch "Der"
const neu = text.replace(/die/gi, "Der"); 
console.log(neu); // "Der Katze und Der Maus"</pre>
    `,
        exercise: {
            instructions: 'Nutze die Regex-Methode .test(), um zu prüfen, ob die Variable "eingabe" das Wort "Code" enthält. Gib das True/False-Ergebnis aus.',
            starterCode: 'const eingabe = "Ich liebe CodeLearn!";\nconst muster = /Code/;\n\n// Prüfe mit muster.test() und drucke das Ergebnis\n',
            expectedOutput: 'true',
            hint: '1) Ergaenze den fehlenden Code nach dem Muster aus der Theorie.\n2) Beispiel:\nconst ergebnis = muster.test(eingabe);\nconsole.log(ergebnis);'
        },
        quiz: [
            { question: 'Wofür verwendet man "Regular Expressions" (Regex)?', options: ['Um die Browser-Konsole zu leeren', 'Um komplexe Muster in Strings zu suchen oder zu validieren', 'Als Ersatz für Arrays', 'Um Fehler im Code automatisch zu reparieren'], correct: 1 },
            { question: 'Mit welchen Zeichen umrandet man eine RegEx in JavaScript standardmäßig?', options: ['"..."', '[...]', '/.../', '<...>'], correct: 2 }
        ]
    },
    {
        id: 18,
        title: 'Map, Set & WeakMap',
        description: 'Fortgeschrittene Datenstrukturen',
        duration: '10 min',
        theory: `
<h2>Map und Set ⏳</h2>
<p>Neben normalen Objekten und Arrays gibt es spezielle Datenstrukturen für besondere Zwecke.</p>

<h3>Map</h3>
<p>Eine <code>Map</code> ist wie ein normales Objekt, aber sie merkt sich die exakte Reihenfolge und erlaubt es, dass <em>alles</em> ein Key sein kann (sogar andere Objekte!).</p>
<pre class="code-block">const lager = new Map();
lager.set("Apfel", 50);
lager.set("Banane", 20);

console.log(lager.get("Apfel")); // 50
console.log(lager.has("Mango")); // false</pre>

<h3>Set</h3>
<p>Ein <code>Set</code> ist wie ein Array, in dem <strong>jeder Wert nur exakt einmal</strong> vorkommen darf! Perfekt, um Duplikate zu entfernen.</p>
<pre class="code-block">const zahlen = [1, 1, 2, 2, 3];
const einzigartig = new Set(zahlen);

console.log([...einzigartig]); // [1, 2, 3]</pre>
    `,
        exercise: {
            instructions: 'Du hast ein Array mit vielen doppelten Namen. Nutze ein Set und die Spread-Syntax [...], um ein Array GANZ OHNE Duplikate zu erzeugen und auszugeben.',
            starterCode: 'const namen = ["Max", "Lisa", "Max", "Anna", "Lisa"];\n\n// Entferne Duplikate mittels Set\n\n',
            expectedOutput: '[ \'Max\', \'Lisa\', \'Anna\' ]',
            hint: '1) Ergaenze den fehlenden Code nach dem Muster aus der Theorie.\n2) Beispiel:\nconst sauber = [...new Set(namen)];\nconsole.log(sauber);'
        },
        quiz: [
            { question: 'Was ist die absolute Besonderheit an der Datenstruktur "Set"?', options: ['Sie ist extrem langsam', 'Sie kann keine Zahlen speichern', 'Sie lässt keine echten Duplikate zu', 'Sie löscht sich nach 10 Sekunden selbst'], correct: 2 },
            { question: 'Im Gegensatz zu einem normalen JavaScript-Objekt ({}): Was erlaubt eine "Map", wenn es um die Eigenschaften-Namen ("Keys") geht?', options: ['Sie erlaubt Objekte, Funktionen und Arrays als Keys anstelle von nur Strings', 'Sie zwingt die Keys dazu, Zahlen zu sein', 'Sie erlaubt gar keine Keys', 'Sie übersetzt Keys in Fremdsprachen'], correct: 0 }
        ]
    },
    {
        id: 19,
        title: 'Symbols & Iterators',
        description: 'Eingebaute Protokolle nutzen',
        duration: '10 min',
        theory: `
<h2>Symbols & Iterators 🧮</h2>
<p>Wir tauchen jetzt tief in die Engine von JavaScript ein.</p>

<h3>Symbols</h3>
<p>Ein <code>Symbol</code> ist ein völlig einzigartiger, verborgener Identifikator. Selbst wenn zwei Symbole denselben Namen tragen, sind sie nicht gleich! Sie eignen sich super für versteckte Eigenschaften in Objekten.</p>
<pre class="code-block">const id1 = Symbol("ID");
const id2 = Symbol("ID");
console.log(id1 === id2); // false!

const user = { name: "Max" };
user[id1] = 12345; // Versteckte Eigenschaft</pre>

<h3>Iterators</h3>
<p>Warum funktioniert <code>for...of</code> bei Arrays, aber nicht bei normalen Objekten? Weil Arrays einen eingebauten "Iterator" (angegeben durch <code>Symbol.iterator</code>) besitzen! Er sagt dem for-Loop, wie er durch die Daten navigieren soll.</p>
    `,
        exercise: {
            instructions: 'Beweise, dass Symbole einzigartig sind. Erstelle zwei Konstanten, sym1 und sym2, beide als Symbol("Test"). Vergleiche sie mit === und logge das Ergebnis (es muss false sein).',
            starterCode: '// Erstelle sym1 und sym2\n\n\n// Vergleiche und logge\n',
            expectedOutput: 'false',
            hint: '1) Ergaenze den fehlenden Code nach dem Muster aus der Theorie.\n2) Beispiel:\nconst sym1 = Symbol("Test"); const sym2 = Symbol("Test"); console.log(sym1 === sym2);'
        },
        quiz: [
            { question: 'Wenn du a = Symbol("x") und b = Symbol("x") definierst, was liefert dann "a === b"?', options: ['true, weil der Name identisch ist', 'false, da jedes erstellte Symbol vom Browser als absolut einzigartig garantiert wird', 'Einen Fehler', 'undefined'], correct: 1 },
            { question: 'Welches Symbol steuert das "Protokoll" eines Objekts, damit es mit einer for...of Schleife durchlaufen werden kann?', options: ['Symbol.loop', 'Symbol.next', 'Symbol.iterator', 'Symbol.array'], correct: 2 }
        ]
    },
    {
        id: 20,
        title: 'Proxy & Reflect',
        description: 'Meta-Programmierung',
        duration: '12 min',
        theory: `
<h2>Proxy & Reflect 🌐</h2>
<p>Das Zauberwort hier heißt <strong>Meta-Programmierung</strong>: Wir verändern, wie sich JavaScript selbst verhält!</p>

<h3>Der Proxy (Die Firewall)</h3>
<p>Ein <code>Proxy</code> erlaubt es dir, grundlegende Objekt-Operationen (wie "Eigenschaft lesen" oder "Eigenschaft setzen") abzufangen und zu überwachen.</p>
<pre class="code-block">const ziel = { secret: "42" };

const aufpasser = new Proxy(ziel, {
    // Wenn jemand versucht, etwas auszulesen (get):
    get(obj, eigenschaft) {
        if (eigenschaft === "secret") {
            return "VERBOTEN!";
        }
        return obj[eigenschaft];
    }
});

console.log(aufpasser.secret); // "VERBOTEN!"</pre>
<p>Moderne Frameworks wie Vue.js oder MobX nutzen Proxies massiv, um "magisch" zu erkennen, wenn du eine Variable änderst, und dann das HTML zu aktualisieren!</p>
    `,
        exercise: {
            instructions: 'Nutze den Starter-Proxy! Greife auf die Eigenschaft "geheimnis" des Objekts "tresor" zu und gib sie aus. Der Proxy wurde so programmiert, dass er "Zugriff gestoppt!" zurückgibt.',
            starterCode: 'const daten = { geheimnis: "Bitcoins" };\nconst tresor = new Proxy(daten, {\n    get(target, prop) {\n        return "Zugriff gestoppt!";\n    }\n});\n\n// Greife auf tresor.geheimnis zu und logge es\n',
            expectedOutput: 'Zugriff gestoppt!',
            hint: '1) Ergaenze den fehlenden Code nach dem Muster aus der Theorie.\n2) Beispiel:\nconsole.log(tresor.geheimnis);'
        },
        quiz: [
            { question: 'Wofür wird das Proxy-Objekt in modernem JavaScript häufig verwendet?', options: ['Um die IP-Adresse des Users zu fälschen (VPN)', 'Um das Lesen und Schreiben (Get/Set) von Objekt-Eigenschaften abzufangen (Intercepten) z.B. für Reaktives UI', 'Um HTTP-Anfragen schneller zu machen', 'Um eine Webseite lokal als App zu speichern'], correct: 1 },
            { question: 'Ein Framework, das bekanntermaßen Proxies nutzt, um Änderungen an Daten extrem elegant in der Benutzeroberfläche zu aktualisieren, ist...', options: ['jQuery', 'Express.js', 'Vue.js (in Version 3)', 'Node.js Core'], correct: 2 }
        ]
    },
    {
        id: 21,
        title: 'Web Workers',
        description: 'Multi-Threading im Browser',
        duration: '12 min',
        theory: `
<h2>Web Workers 🎨</h2>
<p>Da JavaScript grundsätzlich nur einen Task gleichzeitig erledigen kann (Single-Thread), friert der Browser bei extrem aufwendigen Berechnungen ein. <strong>Web Workers</strong> sind die Lösung: Echtes Multi-Threading im Browser!</p>

<h3>Einen Worker erstellen</h3>
<p>Ein Worker ist ein separates Skript, das im Hintergrund läuft. Er hat <strong>keinen Zugriff</strong> auf das DOM (HTML), aber er kann über das Senden von Nachrichten (Messaging) mit dem Haupt-Skript kommunizieren.</p>

<pre class="code-block">// 1. Im Haupt-Skript
const meinWorker = new Worker('worker.js');

// 2. Nachricht an Worker senden
meinWorker.postMessage('Starte Berechnung');

// 3. Auf Antwort vom Worker lauschen
meinWorker.onmessage = (event) => {
    console.log("Ergebnis vom Worker: ", event.data);
};</pre>

<p>Im <code>worker.js</code> Skript sieht es so aus:</p>
<pre class="code-block">// In worker.js
onmessage = (event) => {
    // Schwere Berechnung durchführen
    let resultat = 0;
    for(let i=0; i<1000000000; i++) resultat += i;
    
    // Ergebnis zurücksenden
    postMessage(resultat);
};</pre>
    `,
        exercise: {
            instructions: 'Simuliere die Kommunikation mit einem Worker. In der Sandbox ist "simulierteWorkerNachricht(daten)" definiert. Rufe diese auf und übergib den String "Hallo Worker!". Logge das Ergebnis.',
            starterCode: '// Simulation\nconst simulierteWorkerNachricht = (msg) => `Antwort auf: "${msg}" empfangen!`;\n\n// Sende Nachricht an Worker und logge die Antwort\n',
            expectedOutput: 'Antwort auf: "Hallo Worker!" empfangen!',
            hint: '1) Ergaenze den fehlenden Code nach dem Muster aus der Theorie.\n2) Beispiel:\nconst antwort = simulierteWorkerNachricht("Hallo Worker!"); console.log(antwort);'
        },
        quiz: [
            { question: 'Was ist das Hauptproblem, das Web Workers lösen?', options: ['Styling-Probleme in CSS', 'Aufwendige Berechnungen blockieren die Benutzeroberfläche nicht mehr, da sie in den Hintergrund verlagert werden', 'Sie machen SQL-Datenbanken schneller', 'Sie komprimieren Bilder'], correct: 1 },
            { question: 'Worauf haben Web Workers aus Sicherheits- und Stabilitätsgründen in ihrem Hintergrund-Thread logischerweise KEINEN Zugriff?', options: ['Auf Arrays', 'Auf das Netzwerk (fetch)', 'Auf das globale "window"-Objekt und das DOM (HTML)', 'Auf Math-Funktionen'], correct: 2 }
        ]
    },
    {
        id: 22,
        title: 'Service Workers',
        description: 'Offline-fähige Webanwendungen',
        duration: '12 min',
        theory: `
<h2>Service Workers 🔥</h2>
<p>Ein <strong>Service Worker</strong> ist ein spezieller Typ von Web Worker. Er sitzt wie ein Netzwerk-Proxy <em>zwischen</em> deinem Browser und dem Internet.</p>

<h3>Offline Apps (PWAs)</h3>
<p>Er ist die Magie hinter "Progressive Web Apps" (PWAs). Service Worker können:
<ul>
  <li>Netzwerkanfragen abfangen</li>
  <li>HTML, Bilder und CSS im Cache speichern</li>
  <li>Die Seite komplett <strong>offline</strong> laden, selbst ohne Internetverbindung!</li>
</ul></p>

<h3>Typischer Lebenszyklus</h3>
<pre class="code-block">// In sw.js (Dem Service Worker Skript)
self.addEventListener('install', (event) => {
    console.log("Service Worker wird installiert...");
    // Hier lädt man oft kritische Dateien in den Cache
});

self.addEventListener('fetch', (event) => {
    console.log("Browser fordert an:", event.request.url);
    // Hier kann man die Anfrage abfangen und Daten 
    // aus dem lokalen Cache statt aus dem Internet liefern!
});</pre>
    `,
        exercise: {
            instructions: 'Stell dir vor, du schreibst einen Service Worker. Simuliere das "fetch"-Event, indem du in der Arrow-Funktion "simuliereFetch" erkennst, ob "event.request" den Wert "Bild" hat. Wenn ja, gib "Aus dem Cache!" zurück, sonst "Aus dem Internet!".',
            starterCode: 'const simuliereFetch = (event) => {\n    // Dein Code hier\n    \n};\n\nconsole.log(simuliereFetch({ request: "Bild" }));\nconsole.log(simuliereFetch({ request: "Daten" }));\n',
            expectedOutput: 'Aus dem Cache!\nAus dem Internet!',
            hint: '1) Ergaenze den fehlenden Code nach dem Muster aus der Theorie.\n2) Beispiel:\nif(event.request === "Bild") return "Aus dem Cache!"; else return "Aus dem Internet!";'
        },
        quiz: [
            { question: 'Was ist eine der beeindruckendsten Fähigkeiten eines Service Workers?', options: ['Er wandelt JavaScript in C++ um', 'Er erlaubt Webseiten, Push-Benachrichtigungen zu empfangen und offline zu funktionieren', 'Er scannt nach Viren', 'Er generiert Passwörter'], correct: 1 },
            { question: 'Welcher Event-Listener in einem Service Worker ist dafür zuständig, jede ausgehende Netzwerkanfrage (wie das Laden eines Bildes) des Browsers abzufangen?', options: ['onMessage', 'install', 'activate', 'fetch'], correct: 3 }
        ]
    },
    {
        id: 23,
        title: 'IndexedDB',
        description: 'Clientseitige Datenbank im Browser',
        duration: '10 min',
        theory: `
<h2>IndexedDB 💪</h2>
<p>Wenn <code>localStorage</code> (was nur 5MB Strings speichern kann) zu klein wird, betritt die <strong>IndexedDB</strong> die Bühne. Es ist eine echte, vollwertige Datenbank direkt in deinem Browser!</p>

<h3>Eigenschaften von IndexedDB</h3>
<p>Sie ist eine <em>NoSQL-Datenbank</em> (speichert JS-Objekte), asynchron (blockiert den Browser nicht) und kann hunderte Megabytes an Daten, wie z.B. dicke JSON-Objekte oder ganze Bilder (Blobs), speichern.</p>

<pre class="code-block">// Eine Verbindung aufbauen (Stark vereinfacht)
const request = indexedDB.open("MeineDatenbank", 1);

request.onupgradeneeded = (event) => {
    let db = event.target.result;
    // Erstelle einen "Store" (ähnlich einer SQL-Tabelle) für User
    db.createObjectStore("UserStore", { keyPath: "id" });
};

request.onsuccess = (event) => {
    console.log("Datenbank erfolgreich geöffnet!");
};</pre>
<p>Da die originäre API von IndexedDB auf älteren Event-Handlern basiert, nutzt man heute in großen Projekten oft eine Wrapper-Library wie <code>localforage</code>, um sie mit Promises elegant ansprechen zu können.</p>
    `,
        exercise: {
            instructions: 'Wir simulieren IndexedDB. Speichere einen Benutzer in der Map "simDB" ab. Key soll "User1" sein, Value das Objekt { name: "Tom", alter: 40 }. Logge danach den Namen des Users von der DB wieder aus.',
            starterCode: 'const simDB = new Map(); // Unsere simulierte Datenbank\n\n// 1. Speichern (set)\n\n\n// 2. Auslesen (get) und Name loggen\n',
            expectedOutput: 'Tom',
            hint: '1) Ergaenze den fehlenden Code nach dem Muster aus der Theorie.\n2) Beispiel:\nsimDB.set("User1", { name: "Tom", alter: 40 });\nconsole.log(simDB.get("User1").name);'
        },
        quiz: [
            { question: 'Warum nutzt man IndexedDB anstelle von localStorage?', options: ['Weil localStorage nur auf dem Server läuft', 'Weil IndexedDB sicherer vor Viren ist', 'Weil IndexedDB asynchron ist und riesige Datenmengen inkl. komplexer Objekte speichern kann', 'Weil IndexedDB automatisch alle Daten ins Internet lädt'], correct: 2 },
            { question: 'Was für eine Art von Datenbank ist IndexedDB?', options: ['Relational (wie MySQL)', 'Graph-basiert', 'NoSQL Object Store (Speichert JavaScript-Objekte ab)', 'Ledger (wie Blockchain)'], correct: 2 }
        ]
    },
    {
        id: 24,
        title: 'Canvas & Animation',
        description: '2D-Grafiken zeichnen',
        duration: '12 min',
        theory: `
<h2>Canvas & Animation 🎮</h2>
<p>Wenn HTML und CSS nicht mehr reichen, um flüssige, komplexe Grafiken (wie in Browsergames) zu rendern, nutzt man das <code>&lt;canvas&gt;</code>-Element.</p>

<h3>Der 2D Context</h3>
<p>Das Canvas ist wie eine leere weiße Wand. Mit JavaScript holen wir uns den "2D Context" – den Pinsel – und fangen an zu malen!</p>

<pre class="code-block">// Angenommen <canvas id="spiel" width="500" height="500"></canvas>
const canvas = document.getElementById("spiel");
const ctx = canvas.getContext("2d");

// Zeichne ein rotes Rechteck
ctx.fillStyle = "red";
// x, y, breite, höhe
ctx.fillRect(50, 50, 100, 100);</pre>

<h3>Animationen</h3>
<p>Für flüssige Animationen (60 FPS) löscht man das gesamte Canvas, zeichnet das Objekt ein Stückchen weiter verschoben neu, und nutzt <code>requestAnimationFrame</code>, um den Browser zu bitten, das gleich nochmal zu tun.</p>
    `,
        exercise: {
            instructions: 'In der Sandbox ist `simCanvasCtx` ein Fake-Objekt, das den Context simuliert. Setze seine Eigenschaft "fillStyle" auf "blue" und rufe anschliessend `fillRect(0, 0, 50, 50)` auf.',
            starterCode: 'const simCanvasCtx = {\n    fillRect: (x, y, w, h) => console.log(`Zeichne Rechteck an $ {x},$ {y} mit Größe $ {w}x$ {h} in ${simCanvasCtx.fillStyle}`),\n    fillStyle: "black"\n};\n\n// Dein Code hier\n\n',
            expectedOutput: 'Zeichne Rechteck an 0,0 mit Größe 50x50 in blue',
            hint: '1) Ergaenze den fehlenden Code nach dem Muster aus der Theorie.\n2) Beispiel:\nsimCanvasCtx.fillStyle = "blue";\nsimCanvasCtx.fillRect(0,0,50,50); \n(Hinweis: Im String Template Startercode waren absichtlich Leerzeichen, dein Aufruf zählt)'
        },
        quiz: [
            { question: 'Welches Werkzeug benötigt man in JavaScript zwingend, um auf ein <canvas>-Element Formen und Farben zu malen?', options: ['Den 3D-Printer', 'Die CSS-Animation-API', 'Das Kontext-Objekt, meist "2d" (getContext("2d"))', 'Eine SVG-Datei'], correct: 2 },
            { question: 'Welche Methode wird in modernem JavaScript für extrem flüssige und ressourcenschonende Animationen genutzt, weil der Browser sie an die Bildschirmwiederholrate (meist 60 FPS) koppelt?', options: ['setTimeout()', 'requestAnimationFrame()', 'setInterval()', 'while(true)'], correct: 1 }
        ]
    },
    {
        id: 25,
        title: 'WebSockets',
        description: 'Echtzeit-Kommunikation',
        duration: '12 min',
        theory: `
<h2>WebSockets 📡</h2>
<p>Wenn du einen Chat baust, willst du nicht jede Sekunde per <code>fetch()</code> fragen: "Gibt es neue Nachrichten?". Das kostet viel Rechenleistung. Die Alternative? <strong>WebSockets</strong>!</p>

<h3>Dauerhafte Verbindungen</h3>
<p>Eine WebSocket-Verbindung ist wie ein offenes Telefongespräch zwischen Browser und Server. Beide können <em>jederzeit</em> sofort eine Nachricht in Echtzeit zum anderen schicken.</p>

<pre class="code-block">// Verbindung zum Server aufbauen
const socket = new WebSocket('ws://beispiel.server.com');

// 1. Wenn die Verbindung erfolgreich ist
socket.onopen = () => {
    // Nachricht an Server senden
    socket.send("Hallo Server, ich bin da!");
};

// 2. Wenn eine Nachricht vom Server eintrudelt
socket.onmessage = (event) => {
    console.log("Server sagt:", event.data);
};</pre>
<p>WebSockets sind die Technologie hinter Multiplayer-Browsergames, Live-Chats (Discord, WhatsApp Web) und Aktien-Tickern.</p>
    `,
        exercise: {
            instructions: 'Simuliere eine WebSocket-Verbindung. Erstelle ein Objekt "meinSocket". Es soll eine Eigenschaft "send" haben (eine Funktion, die das Übergebene ausgibt). Rufe danach meinSocket.send("Ping!") auf.',
            starterCode: '// WebSocket Simulation\nconst meinSocket = {\n    // Füge die send() Funktion hier hinzu\n    \n};\n\n// Rufe send auf\n',
            expectedOutput: 'Ping!',
            hint: '1) Ergaenze den fehlenden Code nach dem Muster aus der Theorie.\n2) Beispiel:\nconst meinSocket = { send: (msg) => console.log(msg) }; meinSocket.send("Ping!");'
        },
        quiz: [
            { question: 'Was ist der grundlegende Architektur-Unterschied zwischen "fetch" (HTTP) und WebSockets?', options: ['fetch lädt nur Bilder, WebSockets laden Text', 'WebSockets sind sicherer', 'HTTP ist eine kurzlebige Einweg-Anfrage (Client fragt, Server antwortet). WebSockets halten eine dauerhafte Zwei-Wege-Verbindung in Echtzeit offen', 'Es gibt keinen Unterschied'], correct: 2 },
            { question: 'Mit welcher Methode sendet man in der Regel eine Nachricht durch den WebSocket-Tunnel an den Server?', options: ['socket.push()', 'socket.write()', 'socket.post()', 'socket.send()'], correct: 3 }
        ]
    },
    {
        id: 26,
        title: 'Testing mit Jest',
        description: 'Unit-Tests schreiben',
        duration: '10 min',
        theory: `
<h2>Testing mit Jest 🗄️</h2>
<p>Wie weißt du, dass dein Code funktioniert? Indem du den Browser öffnest und klickst? Das ist zu langsam für große Firmen! Man schreibt Code, der deinen Code testet: <strong>Automatisierte Tests</strong>.</p>

<h3>Unit Tests</h3>
<p>Ein "Unit Test" prüft die kleinstmögliche Einheit (z.B. eine einzelne Funktion). <strong>Jest</strong> ist das beliebteste Test-Framework für JavaScript.</p>

<pre class="code-block">// Die Funktion, die wir testen wollen (mathe.js)
const addieren = (a, b) => a + b;

// Unser Test-Skript (mathe.test.js)
test('Ob 1 + 2 gleich 3 ist', () => {
    const ergebnis = addieren(1, 2);
    
    // Die "Assertion" (Behauptung)
    expect(ergebnis).toBe(3); 
});</pre>

<p>Wenn du nun in der Konsole <code>npm test</code> eintippst, sucht Jest automatisch nach allen <code>.test.js</code> Dateien und führt sie aus. Wenn <code>expect()</code> schiefgeht, leuchtet die Konsole feuerrot!</p>
    `,
        exercise: {
            instructions: 'Simuliere einen Testlauf. Wir haben den Befehl `expect(wert).toBe(erwartung)` rudimentär nachgebaut. Nutze dein Wissen, um die Funktion "multiplizieren(a, b)" so zu reparieren, dass der geschriebene Test grün wird (Ergebnis: "Test bestanden!").',
            starterCode: 'function multiplizieren(a, b) {\n    // Bisher falsch! Bitte reparieren:\n    return a + b; \n}\n\n// Unser Test-Szenario\nconst ergebnis = multiplizieren(3, 4);\n\nif (ergebnis === 12) console.log("Test bestanden!");\nelse console.log(`Fehler: Erwartet 12, bekam ${ergebnis}`);',
            expectedOutput: 'Test bestanden!',
            hint: '1) Ergaenze den fehlenden Code nach dem Muster aus der Theorie.\n2) Beispiel:\nÄndere `return a + b;` zu `return a * b;`.'
        },
        quiz: [
            { question: 'Wofür steht der Begriff "Assertion" in der Welt des Software-Testings?', options: ['Das Senden eines Fehlerberichts', 'Eine Art Virus', 'Eine feste Behauptung (z.B. "Erwarte, dass X gleich Y ist")', 'Ein Endlos-Loop'], correct: 2 },
            { question: 'Was prüft ein "Unit Test" im Normalfall?', options: ['Ob der Server nicht brennt', 'Die kleinstmögliche logische Einheit des Codes, z.B. eine einzelne Funktion', 'Wie schnell die Webseite lädt', 'Ob die Datenbank sicher ist'], correct: 1 }
        ]
    },
    {
        id: 27,
        title: 'Node.js Grundlagen',
        description: 'JavaScript auf dem Server',
        duration: '12 min',
        theory: `
<h2>Node.js Grundlagen 📦</h2>
<p>Lange Zeit lebte JavaScript eingesperrt im Browser. Dann kam 2009 <strong>Node.js</strong> und befreite es! Node erlaubt es, JS auf deinem Computer oder einem Server auszuführen.</p>

<h3>Was kann Node.js?</h3>
<p>Anstatt Webseiten bunter zu machen, kann Node.js auf deine Festplatte zugreifen, Webserver starten und mit Datenbanken sprechen. Es besitzt kein <code>window</code> oder <code>document</code> (DOM), dafür aber Core-Module wie <code>fs</code> (File System).</p>

<pre class="code-block">// Ein simples Node.js Skript (app.js)
const fs = require('fs'); // Integriertes Modul laden

// Datei schreiben
fs.writeFileSync('hallo.txt', 'Node war hier!');
console.log("Datei wurde erfolgreich erstellt!");</pre>

<p>Ab jetzt führst du Code in der Kommandozeile aus: <code>node app.js</code>. Das Konzept, tausende gleichzeitige Verbindungen durch die <em>Event Loop</em> nicht-blockierend ('non-blocking') extrem schnell zu verarbeiten, machte Node.js weltberühmt.</p>
    `,
        exercise: {
            instructions: 'In Node.js wird oft das alte `require()` (CommonJS) Muster benutzt, bevor Module (import) der Standard waren. In der Sandbox ist "require" als Simulation definiert. Hole dir das Modul "os" (Operating System) und logge os.platform().',
            starterCode: '// Sandbox-Simulation von Node.js\nconst require = (modulName) => {\n    if (modulName === "os") return { platform: () => "Linux / Sandbox OS" };\n};\n\n// 1. Speichere das modul "os" in der Konstante "os"\n\n\n// 2. Rufe os.platform() auf und logge es\n',
            expectedOutput: 'Linux / Sandbox OS',
            hint: '1) Ergaenze den fehlenden Code nach dem Muster aus der Theorie.\n2) Beispiel:\nconst os = require("os");\nconsole.log(os.platform());'
        },
        quiz: [
            { question: 'Welches extrem wichtige Objekt, das in jedem Browser existiert, FEHLT in Node.js komplett?', options: ['Das Math Objekt', 'Das window / document Objekt (DOM)', 'Arrays', 'Die Konsole (console)'], correct: 1 },
            { question: 'Über welches Design-Muster erreicht Node.js seine massive Geschwindigkeit bei I/O Operationen (z.B. viele parallele Datenbankanfragen)?', options: ['Non-blocking Asynchronous I/O (durch die Event Loop)', 'Durch das Kompilieren zu nativem C-Code', 'Durch das Ignorieren von Fehlern', 'Durch künstliche Intelligenz'], correct: 0 }
        ]
    },
    {
        id: 28,
        title: 'npm & Packages',
        description: 'Abhängigkeiten verwalten',
        duration: '8 min',
        theory: `
<h2>npm & Packages 🧪</h2>
<p>Stell dir vor, du möchtest Datumsangaben runden oder zufällige Namen generieren. Du musst das nicht alles selbst programmieren! Lade dir den Code anderer Entwickler herunter.</p>

<h3>Der Node Package Manager (npm)</h3>
<p>npm ist das größte Software-Register der Welt. Hier liegen über 2 Millionen Pakete bereit. Mit der Eingabe <code>npm install name_des_pakets</code> in deinem Terminal lädst du den Code herunter (er landet im massiven Ordner <code>node_modules</code>).</p>

<pre class="code-block">// Nach "npm install chalk" (Macht Terminal-Text farbig)
const chalk = require('chalk');

console.log(chalk.blue('Hallo Welt!'));
console.log(chalk.red.bgWhite('FEHLER!'));</pre>

<h3>Die package.json</h3>
<p>Wenn du in deinem Projekt <code>npm init</code> ausführst, wird eine Datei namens <code>package.json</code> erstellt. Sie merkt sich genau, welche Pakete dein Projekt benötigt und welche Version davon!</p>
    `,
        exercise: {
            instructions: 'Ergänze den Starter-Code mit einer passenden console.log()-Zeile und gib exakt "npm install success" aus.',
            starterCode: '// npm Pakete nutzen\n\n',
            expectedOutput: 'npm install success',
            hint: '1) Ergaenze den fehlenden Code nach dem Muster aus der Theorie.\n2) Beispiel:\nconsole.log("npm install success");'
        },
        quiz: [
            { question: 'Was macht der Terminal-Befehl "npm install irgendwas"?', options: ['Er deinstalliert deinen Browser', 'Er lädt das Paket "irgendwas" aus dem Internet herunter und speichert es in den Ordner node_modules', 'Er installiert einen Virus', 'Er startet einen Server namens "irgendwas"'], correct: 1 },
            { question: 'In welcher Datei protokolliert npm, welche Pakete und Versionen in diesem Projekt installiert wurden?', options: ['config.js', 'package.json', 'dependencies.txt', 'modules.xml'], correct: 1 }
        ]
    },
    {
        id: 29,
        title: 'TypeScript Überblick',
        description: 'JS mit Typen erweitern',
        duration: '10 min',
        theory: `
<h2>TypeScript Überblick 🏃</h2>
<p>In JavaScript kann eine Variable alles sein: Erst eine Zahl, dann plötzlich Text. Das führt bei großen Firmen zu tausenden unentdeckten Fehlern ("Bugs"). Die Lösung von Microsoft lautet: <strong>TypeScript</strong>!</p>

<h3>Typen annotieren (Type Annotations)</h3>
<p>TypeScript (TS) zwingt dich (optional), Variablen einen festen Typ zuzuweisen:</p>

<pre class="code-block">// Das ist TypeSript!
let alter: number = 30;
let name: string = "Bob";

alter = "Alt"; // TS wirft sofort einen roten FEHLER!</pre>

<h3>Interfaces (Baupläne)</h3>
<p>Mit Interfaces sagst du präzise, wie ein Objekt aufgebaut sein muss:</p>
<pre class="code-block">interface Auto {
    marke: string;
    ps: number;
}

const meinAuto: Auto = {
    marke: "Audi",
    // ps: "Schnell" -> FEHLER! Muss eine Zahl sein!
    ps: 200 
};</pre>
<p>Wichtig: Browser verstehen kein TypeScript! Es muss vor dem Start erst wieder in reines JavaScript übersetzt (kompiliert) werden.</p>
    `,
        exercise: {
            instructions: 'TypeScript hilft, Bugs früh zu finden. Im Startercode versuchen wir, eine Variable als "number" und "string" zu addieren, was eine Bug-Gefahr birgt (Resultat wäre "3020" statt 50). Ändere "alter2" zu einer Zahl (20), um die Logik zu "reparieren".',
            starterCode: 'let alter1 = 30; // Stell dir vor, dies sei streng typisiert\nlet alter2 = "20"; // Fehlerquelle! Ändere dies.\n\nconst summe = alter1 + alter2;\nconsole.log(summe);\n',
            expectedOutput: '50',
            hint: '1) Ergaenze den fehlenden Code nach dem Muster aus der Theorie.\n2) Beispiel:\nMache aus "20" eine reine Zahl 20.'
        },
        quiz: [
            { question: 'Was ist das größte Problem, das TypeScript im Vergleich zum "nackten" JavaScript lösen möchte?', options: ['Dass JavaScript im Browser so langsam ist', 'Dass man Fehler oft erst zur Laufzeit (beim Ausführen) bemerkt, da JS keine festen Typen erzwungen hat', 'Dass JS keine Datenbanken anbinden kann', 'Dass JS keine Klassen unterstützt'], correct: 1 },
            { question: 'Was MUSS passieren, bevor Code aus einer Datei.ts im Browser ausgeführt werden kann?', options: ['Er muss von Google freigegeben werden', 'Man muss "true" in die Konsole eintippen', 'Er muss kompiliert (übersetzt) werden, d.h. in reines JavaScript (Datei.js) umgewandelt werden', 'Man muss die Endung händisch in .js umschreiben'], correct: 2 }
        ]
    },
    {
        id: 30,
        title: 'Projekt: Todo-App',
        description: 'Eine komplette Webanwendung bauen',
        duration: '15 min',
        theory: `
<h2>Projekt: Todo-App 🏆</h2>
<p>Wahnsinn! Du bist bei der allerletzten Lektion angelangt. Zeit, alles zusammenzufügen! Die klassische Einstiegs-App ist eine interaktive ToDo-Liste.</p>

<h3>Der Workflow für eine Mini-App</h3>
<ul>
  <li><strong>1. Datenstruktur:</strong> Wir brauchen ein Array für die Aufgaben: <code>let todos = [];</code></li>
  <li><strong>2. UI (HTML):</strong> Ein Eingabefeld (<code>input</code>), ein Button und eine leere Liste (<code>ul</code>).</li>
  <li><strong>3. Die Logik (JS):</strong>
    <ul>
      <li><code>querySelector</code> hakt die HTML-Elemente ein.</li>
      <li><code>addEventListener</code> wartet auf den Button-Klick.</li>
      <li>Wir lesen den <code>.value</code> aus dem Input-Feld.</li>
      <li>Wir schieben ihn mittels <code>.push()</code> ins Array.</li>
      <li>Wir nutzen eine Loop oder <code>.map()</code>, um das Array in HTML-Strings zu wandeln und setzen den <code>.innerHTML</code> der Liste neu!</li>
    </ul>
  </li>
</ul>
<p>In modernen, echten Apps nutzen wir dafür React, Vue oder Svelte, statt blind mit <code>innerHTML</code> zu hantieren. Aber das pure Wissen ("Vanilla JS") ist essenziell.</p>
    `,
        exercise: {
            instructions: 'Dein Abschlussprojekt in der Sandbox! Führe die Todo-Logik aus: Schreibe eine Funktion `todoHinzufügen(text)`, die das Todo ans Array anfügt und 1x formatiert ausgibt. Füge dann "JavaScript meistern" und "Party machen" hinzu.',
            starterCode: 'const todos = [];\n\nfunction todoHinzufügen(text) {\n    // Dein Code: push() text in todos\n    \n    // Dein Code: Gib "[X] Neu: text" aus\n    \n}\n\n// Rufe todoHinzufügen zwei Mal auf\n',
            expectedOutput: '[X] Neu: JavaScript meistern\n[X] Neu: Party machen',
            hint: '1) Ergaenze den fehlenden Code nach dem Muster aus der Theorie.\n2) Beispiel:\ntodos.push(text); console.log(`[X] Neu: ${text}`);'
        },
        quiz: [
            { question: 'Welche Methode wendest du bei einem Array an, um deine neue Aufgabe in deiner ToDo-Listen-App GANZ ANS ENDE der Liste zu packen?', options: ['todos.insert()', 'todos.push()', 'todos.add()', 'todos.unshift()'], correct: 1 },
            { question: 'Herzlichen Glückwunsch zum Abschluss des JavaScript-Kurses! Was ist der vermutlich wichtigste nächste Schritt für dich als frischer Entwickler?', options: ['Nie wieder Code anfassen', 'Ein 1000-seitiges Theorie-Buch auswendig lernen', 'Eigene, verrückte kleine Projekte (wie diese Todo App) von Grund auf GANZ ALLEIN zu programmieren, um Erfahrung aufzubauen!', 'Klicken lernen'], correct: 2 }
        ]
    }
];
