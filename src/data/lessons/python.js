export const pythonLessons = [
    {
        id: 1,
        title: 'Hallo Welt & print()',
        description: 'Dein erstes Python-Programm',
        duration: '5 min',
        theory: `
<h2>Hallo Welt & print() 🚀</h2>
<p>Willkommen zu Python! Jedes Programm beginnt damit, dass man den Computer dazu bringt, mit einem zu sprechen. In Python verwenden wir dafür die Funktion <code>print()</code>.</p>

<h3>Was macht print()?</h3>
<p><code>print()</code> (auf Deutsch: "drucken") nimmt einen Text und gibt ihn in der Konsole aus. Text wird in Python als <strong>String</strong> (Zeichenkette) bezeichnet und muss in Anführungszeichen stehen.</p>

<pre class="code-block"># So gibt man Text aus
print("Hallo, Welt!")
print('Auch einfache Anführungszeichen funktionieren.')</pre>

<h3>Wichtige Regeln</h3>
<ul>
  <li>Schreibe <code>print</code> immer klein.</li>
  <li>Vergiss die runden Klammern <code>()</code> nicht.</li>
  <li>Text muss in Anführungszeichen <code>" "</code> oder <code>' '</code> stehen.</li>
</ul>

<h3>Praxis-Tipp</h3>
<p>Wenn du Zahlen ausgeben möchtest, brauchst du keine Anführungszeichen: <code>print(42)</code> funktioniert direkt!</p>
    `,
        exercise: {
            instructions: 'Nutze print(), um den Text "Hallo CodeLearn!" auszugeben. Achte auf korrekte Anführungszeichen.',
            starterCode: '# Dein erstes Programm\n\n',
            expectedOutput: 'Hallo CodeLearn!',
            hint: '1) Ergaenze den fehlenden Code nach dem Muster aus der Theorie.\n2) Beispiel:\nNutze die Funktion print() und schreibe den Text in Anführungszeichen ("").'
        },
        quiz: [
            { question: 'Welche Funktion wird genutzt, um Text in Python auszugeben?', options: ['write()', 'echo()', 'print()', 'output()'], correct: 2 },
            { question: 'Wie markiert man einen String (Text) in Python?', options: ['Mit eckigen Klammern []', 'Mit Anführungszeichen ""', 'Mit spitzen Klammern <>', 'Gar nicht'], correct: 1 }
        ]
    },
    {
        id: 2,
        title: 'Variablen & Datentypen',
        description: 'Werte speichern und Typen kennenlernen',
        duration: '8 min',
        theory: `
<h2>Variablen & Datentypen 📦</h2>
<p>Stell dir Variablen wie beschriftete Boxen vor, in die du Daten legen kannst. In Python musst du Variablen nicht kompliziert deklarieren – du erfindest einfach einen Namen und weist ihm mit dem Gleichheitszeichen <code>=</code> einen Wert zu.</p>

<h3>Die wichtigsten Datentypen</h3>
<pre class="code-block"># String (Textzeile)
name = "Anna"

# Integer (ganze Zahl)
alter = 25

# Float (Kommazahl - wichtig: mit Punkt!)
groesse = 1.75

# Boolean (Wahrheitswert: True oder False)
ist_student = True</pre>

<h3>Werte ausgeben</h3>
<p>Du kannst Variablen direkt mit <code>print()</code> ausgeben:</p>
<pre class="code-block">alter = 30
print(alter) # Gibt 30 aus</pre>

<h3>Tipps zur Benennung</h3>
<ul>
  <li>Variablennamen dürfen keine Leerzeichen enthalten (nutze Unterstriche: <code>mein_alter</code>).</li>
  <li>Sie dürfen nicht mit Zahlen beginnen.</li>
  <li>Gewöhne dir an, sprechende Namen zu verwenden (z.B. <code>score</code> statt nur <code>s</code>).</li>
</ul>
    `,
        exercise: {
            instructions: 'Erstelle eine Variable namens "punktestand" und weise ihr den Zahlenwert 100 zu. Gib die Variable anschließend mit print() aus.',
            starterCode: '# Erstelle hier die Variable\n\n# Gib sie danach aus\n',
            expectedOutput: '100',
            hint: '1) Ergaenze den fehlenden Code nach dem Muster aus der Theorie.\n2) Beispiel:\npunktestand = 100\nprint(punktestand)'
        },
        quiz: [
            { question: 'Wie weist man einer Variablen in Python einen Wert zu?', options: ['let name = "Tom"', 'name : "Tom"', 'name = "Tom"', 'var name = "Tom"'], correct: 2 },
            { question: 'Welcher Datentyp speichert den Wahrheitswert "True" oder "False"?', options: ['String', 'Integer', 'Float', 'Boolean'], correct: 3 }
        ]
    },
    {
        id: 3,
        title: 'Listen & for-Schleifen',
        description: 'Mehrere Werte speichern und durchlaufen',
        duration: '10 min',
        theory: `
<h2>Listen & for-Schleifen 🔄</h2>
<p>Oft möchtest du nicht nur einen, sondern viele Werte speichern – zum Beispiel eine Einkaufsliste oder alle Punktstände in einem Spiel. Dafür gibt es <strong>Listen</strong>.</p>

<h3>Wie erstellt man eine Liste?</h3>
<p>Eine Liste wird mit eckigen Klammern <code>[]</code> definiert. Die Elemente werden mit Kommas getrennt.</p>
<pre class="code-block">farben = ["Rot", "Grün", "Blau"]
zahlen = [1, 2, 3, 4, 5]</pre>

<h3>Die for-Schleife</h3>
<p>Um jedes Element einer Liste einzeln abzuarbeiten, nutzen wir die <code>for</code>-Schleife. Python macht das besonders auf Englisch (übersetzt: "für jedes Element in der Liste tue folgendes").</p>

<pre class="code-block">tiere = ["Hund", "Katze", "Maus"]

for tier in tiere:
    print(tier)</pre>

<h3>WICHTIG: Die Einrückung</h3>
<p>Python erkennt an der <strong>Einrückung</strong> (normalerweise 4 Leerzeichen), welche Code-Zeilen zur Schleife gehören. Der Doppelpunkt <code>:</code> am Ende der <code>for</code>-Zeile kündigt diesen Block an.</p>
    `,
        exercise: {
            instructions: 'Du hast eine Liste mit Früchten. Schreibe eine for-Schleife, die jede Frucht einzeln ausgibt.',
            starterCode: 'fruechte = ["Apfel", "Banane", "Kirsche"]\n\n# Schreibe deine Schleife hier\n',
            expectedOutput: 'Apfel\nBanane\nKirsche',
            hint: '1) Ergaenze den fehlenden Code nach dem Muster aus der Theorie.\n2) Beispiel:\nNutze "for frucht in fruechte:" und drücke danach Tab, um print(frucht) einzurücken.'
        },
        quiz: [
            { question: 'Mit welchen Zeichen wird eine Liste erstellt?', options: ['{ } (Geschweifte Klammern)', '( ) (Runde Klammern)', '[ ] (Eckige Klammern)', '< > (Spitze Klammern)'], correct: 2 },
            { question: 'Woran erkennt Python, welche Zeilen zu einer for-Schleife gehören?', options: ['An geschweiften Klammern {}', 'Am Schlüsselwort "end"', 'Am Semikolon ;', 'An der Einrückung (Leerzeichen)'], correct: 3 }
        ]
    },
    {
        id: 4,
        title: 'If-Bedingungen',
        description: 'Entscheidungen im Code treffen',
        duration: '8 min',
        theory: `
<h2>If-Bedingungen 🔀</h2>
<p>Ein Programm muss oft Entscheidungen treffen: "Wenn der Punktestand über 100 ist, dann gib 'Gewonnen!' aus, ansonsten 'Verloren!'". Dafür nutzen wir <code>if</code>, <code>elif</code> und <code>else</code>.</p>

<h3>Der Aufbau</h3>
<pre class="code-block">alter = 16

if alter >= 18:
    print("Du bist volljährig.")
elif alter >= 14:
    print("Du bist ein Jugendlicher.")
else:
    print("Du bist ein Kind.")</pre>

<h3>Die Vergleichsoperatoren</h3>
<ul>
  <li><code>==</code> (ist gleich) <strong>Achtung: nicht mit dem einfachen <code>=</code> für Variablen verwechseln!</strong></li>
  <li><code>!=</code> (ist ungleich)</li>
  <li><code>&gt;</code> (größer) und <code>&lt;</code> (kleiner)</li>
  <li><code>&gt;=</code> (größer gleich) und <code>&lt;=</code> (kleiner gleich)</li>
</ul>

<h3>Auch hier gilt: Einrückung!</h3>
<p>Alles, was nach dem Doppelpunkt kommt und eingerückt ist, wird nur ausgeführt, wenn die Bedingung wahr (True) ist.</p>
    `,
        exercise: {
            instructions: 'Prüfe ob die Variable passwort den Wert "geheim" hat. Wenn ja, gib "Zugriff gewährt" aus. Wenn nicht, gib "Zugriff verweigert" aus. Aktuell ist das Passwort "1234".',
            starterCode: 'passwort = "1234"\n\n# Schreibe hier deine if-Bedingung\n',
            expectedOutput: 'Zugriff verweigert',
            hint: '1) Ergaenze den fehlenden Code nach dem Muster aus der Theorie.\n2) Beispiel:\nif passwort == "geheim":\n    print("...")\nelse:\n    print("...")'
        },
        quiz: [
            { question: 'Wie lautet der Operator, um zu prüfen ob zwei Werte genau gleich sind?', options: ['=', '===', '==', 'eq'], correct: 2 },
            { question: 'Welches Schlüsselwort nutzt man für eine "Ansonsten wenn..." Bedingung?', options: ['else if', 'elif', 'elseif', 'otherwise'], correct: 1 }
        ]
    },
    {
        id: 5,
        title: 'Funktionen',
        description: 'Code-Blöcke benennen und wiederverwenden',
        duration: '10 min',
        theory: `
<h2>Funktionen 🔧</h2>
<p>Wenn du einen bestimmten Code-Schnipsel immer wieder brauchst, kannst du ihn in eine <strong>Funktion</strong> packen. Das spart Platz, macht den Code lesbarer und verhindert Fehler.</p>

<h3>Funktionen definieren (def)</h3>
<p>Eine Funktion wird mit dem Schlüsselwort <code>def</code> (für "define") deklariert, gefolgt vom Namen und Klammern.</p>

<pre class="code-block">def begruessung():
    print("Hallo!")
    print("Wie geht es dir?")

# Hier rufen wir die Funktion auf
begruessung()</pre>

<h3>Parameter (Argumente) übergeben</h3>
<p>Funktionen werden richtig mächtig, wenn wir ihnen Werte mitgeben können.</p>

<pre class="code-block">def hallo_sagen(name):
    print(f"Hallo {name}!")

hallo_sagen("Anna")  # Gibt aus: Hallo Anna!
hallo_sagen("Max")   # Gibt aus: Hallo Max!</pre>

<p><em>Tipp:</em> Das <code>f</code> vor dem String (<code>f"..."</code>) steht für <strong>f-String</strong> (formatierter String) und erlaubt es dir, Variablen in geschweiften Klammern <code>{}</code> direkt in den Text einzubauen!</p>

<h3>Werte zurückgeben (return)</h3>
<p>Statt etwas nur auszugeben, können Funktionen auch ein Ergebnis berechnen und zurückliefern:</p>
<pre class="code-block">def addiere(a, b):
    return a + b

ergebnis = addiere(5, 3)
print(ergebnis)  # Gibt 8 aus</pre>
    `,
        exercise: {
            instructions: 'Definiere eine Funktion "verdoppeln()", die eine Zahl als Parameter annimmt und das Doppelte zurückgibt (return). Rufe die Funktion mit der Zahl 10 auf und gib das Ergebnis mit print() aus.',
            starterCode: '# Definiere hier die Funktion \n\n# Rufe sie auf und gib das Ergebnis aus\n',
            expectedOutput: '20',
            hint: '1) Ergaenze den fehlenden Code nach dem Muster aus der Theorie.\n2) Beispiel:\ndef verdoppeln(zahl):\n    return zahl * 2\n\nprint(verdoppeln(10))'
        },
        quiz: [
            { question: 'Mit welchem Schlüsselwort definiert man eine Funktion in Python?', options: ['function', 'func', 'def', 'create'], correct: 2 },
            { question: 'Was macht das Schlüsselwort "return"?', options: ['Es beendet das komplette Python Skript', 'Es gibt einen berechneten Wert aus der Funktion zurück', 'Es wiederholt die Funktion nochmal', 'Es druckt Text in der Konsole'], correct: 1 }
        ]
    },
    {
        id: 6,
        title: 'Dictionaries',
        description: 'Schlüssel-Wert-Paare speichern',
        duration: '8 min',
        theory: `
<h2>Dictionaries 📋</h2>
<p>Während Listen Werte einfach der Reihe nach speichern, nutzen Dictionaries (Wörterbücher) <strong>Schlüssel-Wert-Paare</strong> (Key-Value-Pairs). Das ist perfekt, um Eigenschaften von Objekten oder Personen zu speichern.</p>

<h3>Wie erstellt man ein Dictionary?</h3>
<p>Dictionaries werden mit geschweiften Klammern <code>{}</code> erstellt. Ein Schlüssel (Key) und ein Wert (Value) werden mit einem Doppelpunkt verbunden.</p>

<pre class="code-block">spieler = {
    "name": "Alex",
    "level": 42,
    "ist_online": True
}</pre>

<h3>Auf Werte zugreifen</h3>
<p>Statt eines Index (wie bei Listen) nutzt du den Schlüssel, um an den Wert zu kommen:</p>
<pre class="code-block">print(spieler["name"])   # Gibt "Alex" aus
print(spieler["level"])  # Gibt 42 aus</pre>

<h3>Werte hinzufügen oder ändern</h3>
<p>Du kannst jederzeit neue Einträge hinzufügen oder bestehende ändern:</p>
<pre class="code-block"># Wert ändern
spieler["level"] = 43

# Neuen Eintrag hinzufügen
spieler["waffe"] = "Schwert"</pre>
    `,
        exercise: {
            instructions: 'Du hast ein Dictionary "auto". Füge einen neuen Schlüssel "farbe" mit dem Wert "Rot" hinzu und gib danach das ganze Dictionary mit print() aus.',
            starterCode: 'auto = {\n    "marke": "BMW",\n    "baujahr": 2022\n}\n\n# Füge hier die Farbe hinzu\n\n# Gib das Dictionary aus\n',
            expectedOutput: "{'marke': 'BMW', 'baujahr': 2022, 'farbe': 'Rot'}",
            hint: '1) Ergaenze den fehlenden Code nach dem Muster aus der Theorie.\n2) Beispiel:\nNutze auto["farbe"] = "Rot"\nprint(auto)'
        },
        quiz: [
            { question: 'Mit welchen Klammern erstellt man ein Dictionary in Python?', options: ['[] (Eckige Klammern)', '() (Runde Klammern)', '{} (Geschweifte Klammern)', '<> (Spitze Klammern)'], correct: 2 },
            { question: 'Wie greift man auf den Wert "alter" in einem Dictionary namens "person" zu?', options: ['person.alter', 'person("alter")', 'person[alter]', 'person["alter"]'], correct: 3 }
        ]
    },
    {
        id: 7,
        title: 'Klassen & Objekte',
        description: 'Objektorientierte Programmierung',
        duration: '12 min',
        theory: `
<h2>Klassen & Objekte 🏗️</h2>
<p>Python ist eine <strong>objektorientierte</strong> Sprache. Das bedeutet, wir können unsere eigenen Datenstrukturen (Klassen) bauen, die Eigenschaften und Fähigkeiten (Methoden) kombinieren.</p>

<h3>Was ist eine Klasse?</h3>
<p>Eine Klasse ist wie ein Bauplan. Ein Objekt ist das fertige Haus, das nach diesem Bauplan gebaut wurde.</p>

<pre class="code-block">class Hund:
    # Die __init__ Methode ist der Konstruktor (wird beim Erstellen aufgerufen)
    def __init__(self, name, alter):
        self.name = name
        self.alter = alter
    
    # Eine Methode (Fähigkeit) des Hundes
    def bellen(self):
        print(f"{self.name} sagt: Wuff!")</pre>

<h3>Objekte erstellen</h3>
<p>Jetzt können wir aus dem Bauplan echte Hunde (Objekte) erschaffen:</p>

<pre class="code-block">mein_hund = Hund("Bello", 3)
print(mein_hund.name)  # Gibt "Bello" aus

mein_hund.bellen()     # Gibt "Bello sagt: Wuff!" aus</pre>

<p>Das Schlüsselwort <code>self</code> ist enorm wichtig: Es verweist immer auf das konkrete Objekt selbst (in diesem Fall "mein_hund").</p>
    `,
        exercise: {
            instructions: 'Erstelle ein Objekt der Klasse "Hund" namens "Rex" mit dem Alter 5. Rufe anschließend seine Methode bellen() auf.',
            starterCode: 'class Hund:\n    def __init__(self, name, alter):\n        self.name = name\n        self.alter = alter\n    def bellen(self):\n        print(f"{self.name} sagt: Wuff!")\n\n# Erstelle hier deinen Hund "Rex"\n\n# Lass ihn bellen\n',
            expectedOutput: 'Rex sagt: Wuff!',
            hint: '1) Ergaenze den fehlenden Code nach dem Muster aus der Theorie.\n2) Beispiel:\nmein_hund = Hund("Rex", 5)\nmein_hund.bellen()'
        },
        quiz: [
            { question: 'Welches Schlüsselwort wird benutzt, um eine Klasse zu definieren?', options: ['def', 'class', 'struct', 'object'], correct: 1 },
            { question: 'Welchen Namen hat der Konstruktor (die Initialisierungs-Methode) in Python immer?', options: ['__start__', 'constructor()', 'init()', '__init__'], correct: 3 }
        ]
    },
    {
        id: 8,
        title: 'Module & Import',
        description: 'Code organisieren und wiederverwenden',
        duration: '8 min',
        theory: `
<h2>Module & Import ⚡</h2>
<p>Du musst nicht das Rad neu erfinden! Python hat eine gigantische Standardbibliothek – eine Sammlung von vorgefertigtem Code (Modulen), den du einfach einbinden kannst.</p>

<h3>Das import-Schlüsselwort</h3>
<p>Mit <code>import</code> lädst du ein Modul in dein Programm.</p>

<pre class="code-block">import math

# Jetzt kannst du alle Funktionen aus "math" nutzen
ergebnis = math.sqrt(16)  # Zieht die Wurzel (square root)
print(ergebnis)  # Gibt 4.0 aus</pre>

<h3>Teile eines Moduls importieren</h3>
<p>Oft brauchst du nicht das ganze Modul, sondern nur eine bestimmte Funktion. Dafür nutzt du <code>from ... import ...</code>.</p>

<pre class="code-block">from random import randint

# Nun kannst du randint direkt benutzen, ohne "random." davor
zufallszahl = randint(1, 10)
print(zufallszahl)</pre>

<h3>Eigene Module</h3>
<p>Jede Python-Datei (z.B. <code>tools.py</code>) ist automatisch ein Modul! Du kannst ihren Code in einer anderen Datei nutzen mit <code>import tools</code>.</p>
    `,
        exercise: {
            instructions: 'Importiere die Funktion "choice" aus dem Modul "random". Nutze sie dann, um ein zufälliges Element aus der Liste "farben" auszuwählen und gib es aus. Da der Code-Runner simuliert wird, gib einfach die Liste und dann choice(farben) aus.',
            starterCode: '# Importiere choice von random\n\nfarben = ["Rot", "Blau", "Grün"]\n# Wähle zufällig eine Farbe und gib sie aus\n',
            expectedOutput: 'Ein zufälliges Element wird gedruckt (lokale Simulation: Blau)',
            hint: '1) Ergaenze den fehlenden Code nach dem Muster aus der Theorie.\n2) Beispiel:\nfrom random import choice\nprint(choice(farben))'
        },
        quiz: [
            { question: 'Wie importiert man nur eine spezifische Funktion aus einem Modul?', options: ['import math.sqrt', 'include sqrt from math', 'using math.sqrt', 'from math import sqrt'], correct: 3 },
            { question: 'Welches Modul wird für mathematische Funktionen (wie Wurzeln) verwendet?', options: ['calc', 'math', 'numbers', 'geometry'], correct: 1 }
        ]
    },
    {
        id: 9,
        title: 'Fehlerbehandlung',
        description: 'try/except für robustes Programmieren',
        duration: '8 min',
        theory: `
<h2>Fehlerbehandlung 🛡️</h2>
<p>Jedes Programm crasht mal. Wenn ein User Buchstaben in ein Zahlenfeld eingibt oder eine Datei fehlt, bricht Python normalerweise mit einer Fehlermeldung ab. Mit <code>try</code> und <code>except</code> fangen wir diese Fehler weich ab.</p>

<h3>try und except</h3>
<p>Du sagst Python: "Versuche (try) diesen Code auszuführen. Falls es knallt, stürz nicht ab, sondern führe den except-Block aus."</p>

<pre class="code-block">try:
    zahl = int("Hallo") # Das wird einen Fehler (ValueError) werfen!
    print("Erfolg!")
except ValueError:
    print("Das war keine gültige Zahl!")</pre>

<p>In diesem Fall bricht das Programm nicht ab. Es bemerkt den Fehler, springt sofort in den <code>except</code>-Block, gibt die Warnung aus und läuft dann ganz normal weiter.</p>

<h3>Der finally-Block</h3>
<p>Du kannst optional noch ein <code>finally</code> dranhängen. Dieser Code wird <strong>immer</strong> ausgeführt, egal ob es einen Fehler gab oder nicht (z.B. um eine Datei wieder zu schließen).</p>
    `,
        exercise: {
            instructions: 'Wir versuchen durch Null zu teilen (was verboten ist). Schreibe einen try-except Block, der den ZeroDivisionError abfängt und "Teilen durch Null ist nicht erlaubt!" ausgibt.',
            starterCode: '# Schreibe hier deinen try-Block\nergebnis = 10 / 0\nprint(ergebnis)\n# Schreibe hier deinen except-Block für ZeroDivisionError\n',
            expectedOutput: 'Teilen durch Null ist nicht erlaubt!',
            hint: '1) Ergaenze den fehlenden Code nach dem Muster aus der Theorie.\n2) Beispiel:\ntry:\n    ergebnis = 10 / 0\n    print(ergebnis)\nexcept ZeroDivisionError:\n    print("Teilen durch Null ist nicht erlaubt!")'
        },
        quiz: [
            { question: 'Welcher Block wird genutzt, um riskanten Code zu umschließen?', options: ['catch', 'try', 'test', 'attempt'], correct: 1 },
            { question: 'Welcher Block in einer Fehlerbehandlung wird IMMER ausgeführt?', options: ['finally', 'always', 'except', 'end'], correct: 0 }
        ]
    },
    {
        id: 10,
        title: 'List Comprehensions',
        description: 'Elegante Listen in einer Zeile',
        duration: '8 min',
        theory: `
<h2>List Comprehensions ✨</h2>
<p>Gute Python-Programmierer lieben es, Code kurz und elegant zu schreiben. <strong>List Comprehensions</strong> (Listen-Abstraktionen) sind ein legendäres Python-Feature, um neue Listen in nur einer Zeile zu erstellen.</p>

<h3>Der klassische Weg</h3>
<p>Normalerweise würdest du so eine Liste von Quadratzahlen erstellen:</p>
<pre class="code-block">quadrate = []
for i in range(1, 6):
    quadrate.append(i * i)
print(quadrate) # [1, 4, 9, 16, 25]</pre>

<h3>Der Python-Weg (List Comprehension)</h3>
<p>Das alles geht in einer einzigen, eleganten Zeile:</p>
<pre class="code-block">quadrate = [i * i for i in range(1, 6)]
print(quadrate) # [1, 4, 9, 16, 25]</pre>

<h3>Mit Bedingungen (if)</h3>
<p>Du kannst sogar Daten gleichzeitig filtern! Hier filtern wir alle geraden Zahlen heraus:</p>
<pre class="code-block">zahlen = [1, 2, 3, 4, 5, 6]
gerade_zahlen = [z for z in zahlen if z % 2 == 0]
print(gerade_zahlen) # [2, 4, 6]</pre>
    `,
        exercise: {
            instructions: 'Erstelle eine neue Liste "doppelte_zahlen" aus der Liste "zahlen", bei der jeder Wert mit 2 multipliziert ist. Benutze eine List Comprehension.',
            starterCode: 'zahlen = [10, 20, 30]\n\n# Schreibe deine List Comprehension\n\n# Gib die neue Liste aus\n',
            expectedOutput: '[20, 40, 60]',
            hint: '1) Ergaenze den fehlenden Code nach dem Muster aus der Theorie.\n2) Beispiel:\ndoppelte_zahlen = [x * 2 for x in zahlen]\nprint(doppelte_zahlen)'
        },
        quiz: [
            { question: 'Was ist der Hauptzweck von List Comprehensions?', options: ['Listen schneller zu löschen', 'Code zur Listenerstellung kürzer und lesbarer zu machen', 'Um Endlosschleifen zu verhindern', 'Um Dictionaries in Listen umzuwandeln'], correct: 1 },
            { question: 'Welche Syntax ist eine gültige List Comprehension?', options: ['[x for x in liste]', '{x in liste}', '(for x in liste yield x)', 'liste.map(x)'], correct: 0 }
        ]
    },
    {
        id: 11,
        title: 'Dateioperationen',
        description: 'Dateien lesen und schreiben',
        duration: '10 min',
        theory: `
<h2>Dateioperationen 📄</h2>
<p>Häufig muss ein Programm Daten dauerhaft speichern oder einlesen. In Python geht das unglaublich einfach mit der <code>open()</code> Funktion.</p>

<h3>Dateien öffnen und schreiben</h3>
<p>Um Text in eine Datei zu schreiben, öffnen wir sie im Modus <code>"w"</code> (für <em>write</em>). Das <code>with</code>-Statement sorgt dafür, dass die Datei automatisch wieder geschlossen wird – ein sehr wichtiges Best-Practice in Python!</p>

<pre class="code-block"># "w" überschreibt die Datei, "a" (append) hängt Text hinten an
with open("notizen.txt", "w") as datei:
    datei.write("Hallo, das ist eine Testdatei!\\n")
    datei.write("Zweite Zeile.")</pre>

<h3>Dateien lesen</h3>
<p>Um Daten zu lesen, nutzen wir den Modus <code>"r"</code> (für <em>read</em>):</p>

<pre class="code-block">with open("notizen.txt", "r") as datei:
    inhalt = datei.read()
    print(inhalt)</pre>

<p><em>Tipp:</em> Mit <code>datei.readlines()</code> bekommst du alle Zeilen als praktische Liste!</p>
    `,
        exercise: {
            instructions: 'Öffne die Datei "geheimnisse.txt" im Lesemodus ("r") mit einem with-Statement, lies ihren gesamten Inhalt und gib ihn mit print() aus.',
            starterCode: '# Datei "geheimnisse.txt" öffnen und Inhalt ausgeben\n\n',
            expectedOutput: 'Simulierter Datei-Inhalt (in der echten Sandbox würde nun die Datei gelesen)',
            hint: '1) Ergaenze den fehlenden Code nach dem Muster aus der Theorie.\n2) Beispiel:\nwith open("geheimnisse.txt", "r") as f:\n    print(f.read())'
        },
        quiz: [
            { question: 'Welches Schlüsselwort schließt eine Datei nach der Bearbeitung automatisch?', options: ['try', 'open', 'with', 'close'], correct: 2 },
            { question: 'Welcher Modus wird bei open() verwendet, um Text an eine existierende Datei anzuhängen, statt sie zu überschreiben?', options: ['"r"', '"w"', '"x"', '"a"'], correct: 3 }
        ]
    },
    {
        id: 12,
        title: 'Dekoratoren',
        description: 'Funktionen erweitern mit @decorator',
        duration: '12 min',
        theory: `
<h2>Dekoratoren 🎀</h2>
<p>Ein <strong>Decorator</strong> ist ein wunderschönes Python-Feature. Er erlaubt es dir, das Verhalten einer Funktion zu verändern oder zu erweitern, ohne ihren eigentlichen Code anzufassen. Man erkennt sie am <code>@</code>-Symbol über einer Funktion.</p>

<h3>Die Mechanik dahinter</h3>
<p>In Python sind Funktionen Objekte. Ein Decorator ist einfach eine Funktion, die eine andere Funktion als Parameter annimmt und sie modifiziert zurückgibt.</p>

<pre class="code-block"># 1. Wir definieren den Decorator
def log_decorator(func):
    def wrapper():
        print(f"Starte die Funktion {func.__name__}...")
        func()
        print(f"Funktion {func.__name__} beendet.")
    return wrapper

# 2. Wir wenden ihn mit @ an
@log_decorator
def hallo():
    print("Hallo Welt!")

# 3. Wir rufen hallo() auf
hallo()</pre>

<p>Ausgabe:<br>
<code>Starte die Funktion hallo...</code><br>
<code>Hallo Welt!</code><br>
<code>Funktion hallo beendet.</code></p>
    `,
        exercise: {
            instructions: 'Lege den bereits definierten "@stark_decorator" über die Ausgabe-Funktion, sodass der Text in der Simulation umrahmt wird.',
            starterCode: 'def stark_decorator(func):\n    def wrapper():\n        print("===")\n        func()\n        print("===")\n    return wrapper\n\n# Füge hier das @-Symbol mit dem Decorator ein\ndef melden():\n    print("System bereit!")\n\nmelden()\n',
            expectedOutput: '===\nSystem bereit!\n===',
            hint: '1) Ergaenze den fehlenden Code nach dem Muster aus der Theorie.\n2) Beispiel:\nSchreibe @stark_decorator direkt über die Zeile def melden():'
        },
        quiz: [
            { question: 'Mit welchem Symbol wendet man einen Decorator auf eine Funktion an?', options: ['#', '$', '@', '%'], correct: 2 },
            { question: 'Was tut ein Decorator technisch im Hintergrund?', options: ['Er löscht die Funktion.', 'Er nimmt eine Funktion, modifiziert ihr Verhalten und gibt eine neue Funktion zurück.', 'Er kompiliert die Funktion ins Maschinenformat.', 'Er ändert die Variablen innerhalb der Funktion.'], correct: 1 }
        ]
    },
    {
        id: 13,
        title: 'Generatoren & yield',
        description: 'Lazy Evaluation mit Generatoren',
        duration: '10 min',
        theory: `
<h2>Generatoren & yield 🔗</h2>
<p>Wenn du eine Liste mit 10 Milliarden Zahlen erstellst und zurückgibst, stürzt dein Computer vermutlich ab, weil der Arbeitsspeicher (RAM) voll ist. <strong>Generatoren</strong> lösen dieses Problem elegant!</p>

<h3>Das Schlüsselwort yield</h3>
<p>Statt eine ganze Liste auf einmal zu bauen und mit <code>return</code> zurückzugeben, nutzt eine Generator-Funktion das Wort <code>yield</code> (liefern/abwerfen). Sie pausiert an dieser Stelle und merkt sich ihren Zustand für den nächsten Aufruf.</p>

<pre class="code-block">def zahlen_generator():
    yield 1
    yield 2
    yield 3

gen = zahlen_generator()
print(next(gen))  # Gibt 1
print(next(gen))  # Gibt 2</pre>

<h3>Vorteil: "Lazy Evaluation"</h3>
<p>Generatoren erzeugen den nächsten Wert erst genau dann, wenn er durch eine <code>for</code>-Schleife oder <code>next()</code> angefordert wird. Daher verbrauchen sie kaum Speicherplatz.</p>

<pre class="code-block"># Ein Generator für endlose Zahlen!
def endlos_zaehler():
    zahl = 0
    while True:
        yield zahl
        zahl += 1</pre>
    `,
        exercise: {
            instructions: 'Schreibe einen Generator "countdown", der bei 3 beginnt und rückwärts bis 1 zählt (3, dann 2, dann 1). Nutze yield.',
            starterCode: '# Definiere deinen Generator hier\n\n\n# Testen des Generators\nfor zahl in countdown():\n    print(zahl)\n',
            expectedOutput: '3\n2\n1',
            hint: '1) Ergaenze den fehlenden Code nach dem Muster aus der Theorie.\n2) Beispiel:\ndef countdown():\n    yield 3\n    yield 2\n    yield 1'
        },
        quiz: [
            { question: 'In welchem Zustand befindet sich eine Funktion nach einem "yield"?', options: ['Sie wird komplett zerstört', 'Sie pausiert und merkt sich ihren Zustand bis zum nächsten Aufruf', 'Sie startet wieder bei Zeile 1', 'Sie stürzt ab, wenn nicht sofort "return" folgt'], correct: 1 },
            { question: 'Was ist der Hauptvorteil von Generatoren (yield) gegenüber Listen (return)?', options: ['Sie laufen schneller auf der Grafikkarte', 'Sie verbrauchen extrem wenig Arbeitsspeicher ("Lazy Evaluation")', 'Sie können als Decorator eingesetzt werden', 'Sie überschreiten nie das Limit von 10 Elementen'], correct: 1 }
        ]
    },
    {
        id: 14,
        title: 'Lambda & map/filter',
        description: 'Funktionale Programmierung in Python',
        duration: '8 min',
        theory: `
<h2>Lambda & map/filter 🧩</h2>
<p>Manchmal ist es umständlich, für eine winzige Rechenaufgabe eine komplette Funktion mit <code>def</code> zu schreiben. Hier glänzen <strong>Lambdas</strong> (anonyme Funktionen ohne Namen).</p>

<h3>Die Lambda-Syntax</h3>
<p>Eine Lambda-Funktion ist eine Einzeiler-Funktion:</p>
<pre class="code-block"># Statt: def verdoppeln(x): return x * 2
verdoppeln = lambda x: x * 2

print(verdoppeln(5)) # Gibt 10</pre>

<h3>map() und filter()</h3>
<p>Lambdas werden oft im Team mit <code>map()</code> (wendet eine Funktion auf jedes Element an) oder <code>filter()</code> (filtert eine Liste) verwendet.</p>

<pre class="code-block">zahlen = [1, 2, 3, 4]

# map: Jede Zahl verdoppeln
doppelt = list(map(lambda x: x * 2, zahlen))
print(doppelt) # [2, 4, 6, 8]

# filter: Nur gerade Zahlen behalten
gerade = list(filter(lambda x: x % 2 == 0, zahlen))
print(gerade) # [2, 4]</pre>
    `,
        exercise: {
            instructions: 'Nutze filter() und eine Lambda-Funktion, um aus der Liste "werte" nur die Zahlen herauszufiltern, die größer als 10 sind. Wandle das Ergebnis in eine Liste um und gib es aus.',
            starterCode: 'werte = [5, 12, 8, 20, 3, 15]\n\n# Filtere Werte > 10\n\n',
            expectedOutput: '[12, 20, 15]',
            hint: '1) Ergaenze den fehlenden Code nach dem Muster aus der Theorie.\n2) Beispiel:\nergebnis = list(filter(lambda x: x > 10, werte))\nprint(ergebnis)'
        },
        quiz: [
            { question: 'Was ist eine Lambda-Funktion in Python?', options: ['Eine Funktion, die nur Strings zusammenfügen kann', 'Eine anonyme Einzeiler-Funktion ohne Namen', 'Ein Modul der Standardbibliothek', 'Ein spezieller Datentyp für Listen'], correct: 1 },
            { question: 'Welche Funktion wendet eine (Lambda-)Funktion auf jedes Element einer Liste an?', options: ['apply()', 'reduce()', 'convert()', 'map()'], correct: 3 }
        ]
    },
    {
        id: 15,
        title: 'Sets & Tupel',
        description: 'Unveränderliche und einzigartige Sammlungen',
        duration: '8 min',
        theory: `
<h2>Sets & Tupel 🎯</h2>
<p>Neben Listen und Dictionaries bietet Python noch zwei weitere extrem nützliche Datenstrukturen für Gruppen von Variablen.</p>

<h3>Tupel (Tuples)</h3>
<p>Ein Tupel entsteht durch runde Klammern <code>()</code>. Der Clou: <strong>Tupel sind unveränderlich (immutable)!</strong> Nach der Erstellung kannst du weder Elemente ändern noch hinzufügen.</p>
<pre class="code-block">koordinaten = (48.13, 11.58)
# koordinaten[0] = 50.0  <- Das würde crashen!</pre>
<p><em>Vorteil:</em> Sie sind schneller und speicher-effizienter als Listen.</p>

<h3>Sets (Mengen)</h3>
<p>Ein Set (geschweifte Klammern wie beim Dictionary, aber ohne Doppelpunkt) ist eine ungeordnete Sammlung, die <strong>keine Duplikate</strong> zulässt.</p>
<pre class="code-block">farben = {"Rot", "Grün", "Rot", "Blau"}
print(farben) # Output meist {"Rot", "Grün", "Blau"}

# Schneller Duplikat-Entferner für Listen:
liste = [1, 2, 2, 3, 3]
einzigartig = list(set(liste)) # [1, 2, 3]</pre>
    `,
        exercise: {
            instructions: 'Die Liste "passwoerter" enthält mehrfache Einträge. Wandle sie in ein Set um, um die Duplikate zu entfernen, und gib das Set aus.',
            starterCode: 'passwoerter = ["1234", "1234", "admin", "admin", "qwertz"]\n\n# Wandle die Liste in ein Set um und gib es aus\n',
            expectedOutput: "{'1234', 'qwertz', 'admin'} (Reihenfolge kann variieren)",
            hint: '1) Ergaenze den fehlenden Code nach dem Muster aus der Theorie.\n2) Beispiel:\nprint(set(passwoerter))'
        },
        quiz: [
            { question: 'Was ist der Hauptunterschied zwischen einer Liste und einem Tupel in Python?', options: ['Listen sind schneller', 'Tupel können Strings speichern, Listen nicht', 'Tupel können nach dem Erstellen nicht mehr verändert werden (immutable)', 'Tupel werden mit {} Klammern erstellt'], correct: 2 },
            { question: 'Welche Besonderheit weisen Sets auf?', options: ['Sie garantieren die perfekte alphabetische Reihenfolge', 'Sie können niemals gelöscht werden', 'Sie ersetzen ab Python 3.0 die klassischen Listen', 'Sie lassen keine doppelten Elemente/Duplikate zu'], correct: 3 }
        ]
    },
    {
        id: 16,
        title: 'String-Methoden',
        description: 'Text professionell verarbeiten',
        duration: '8 min',
        theory: `
<h2>String-Methoden 💡</h2>
<p>In der Programmierung arbeitet man ständig mit Text. Python bietet dafür mächtige, eingebaute Methoden (Werkzeuge), die direkt an jedem String hängen.</p>

<h3>Groß- und Kleinschreibung</h3>
<pre class="code-block">text = "Hallo Python"
print(text.upper()) # "HALLO PYTHON"
print(text.lower()) # "hallo python"</pre>

<h3>Ersetzen und Bereinigen</h3>
<p>Oft muss man ungewollte Zeichen entfernen oder Wörter austauschen.</p>
<pre class="code-block"># strip() entfernt Leerzeichen am Anfang und Ende
eingabe = "   ja, gerne   "
print(eingabe.strip()) # "ja, gerne"

# replace() tauscht Textteile aus
satz = "Ich mag Äpfel."
neuer_satz = satz.replace("Äpfel", "Birnen")
print(neuer_satz) # "Ich mag Birnen."</pre>

<h3>Verbinden und Trennen</h3>
<pre class="code-block"># split() zerteilt einen String in eine Liste
worte = "Eins Zwei Drei".split(" ") # ["Eins", "Zwei", "Drei"]

# join() verbindet eine Liste zu einem String
wieder_zusammen = "-".join(worte) # "Eins-Zwei-Drei"</pre>
    `,
        exercise: {
            instructions: 'Du erhältst die Variable nutzer_eingabe = "   hallo wElt   ". Verwende strip() und lower(), um den Text zu bereinigen und klein auszugeben.',
            starterCode: 'nutzer_eingabe = "   hallo wElt   "\n\n# Bereinige den String und gib ihn aus\n',
            expectedOutput: 'hallo welt',
            hint: '1) Ergaenze den fehlenden Code nach dem Muster aus der Theorie.\n2) Beispiel:\nDu kannst Methoden verketten: print(nutzer_eingabe.strip().lower())'
        },
        quiz: [
            { question: 'Welche Methode teilt einen String (z.B. "Max Mustermann") anhand eines Trennzeichens in eine Liste ["Max", "Mustermann"] auf?', options: ['slice()', 'split()', 'divide()', 'cut()'], correct: 1 },
            { question: 'Was macht die Methode strip() in Python?', options: ['Sie entfernt alle Vokale', 'Sie wandelt Großbuchstaben in Kleinbuchstaben um', 'Sie entfernt unsichtbare Zeichen (wie Leerzeichen oder Zeilenumbrüche) am Anfang und Ende des Strings', 'Sie löscht den String aus dem Arbeitsspeicher'], correct: 2 }
        ]
    },
    {
        id: 17,
        title: 'Reguläre Ausdrücke',
        description: 'Muster in Texten finden mit re',
        duration: '12 min',
        theory: `
<h2>Reguläre Ausdrücke (Regex) 🔒</h2>
<p>Manchmal reichen normale String-Methoden nicht aus. Wie prüfst du, ob ein Text eine gültige E-Mail-Adresse ist? Dafür gibt es <strong>Reguläre Ausdrücke</strong> (Regex) im Modul <code>re</code>.</p>

<h3>Muster finden mit re.search</h3>
<p>Ein Regex-Muster ist ein Code, der für eine Textstruktur steht. Zum Beispiel steht <code>\\d</code> für eine beliebige Zahl (Digit) und <code>+</code> bedeutet "ein- oder mehrmals".</p>

<pre class="code-block">import re

text = "Mein PIN-Code ist 4711 und geheim."

# Wir suchen nach einem Muster aus mindestens einer Zahl
treffer = re.search(r"\\d+", text)

if treffer:
    print(f"Gefundene Zahl: {treffer.group()}") # Gibt "4711" aus</pre>

<p><em>Tipp:</em> Das <code>r</code> vor dem String (als <code>r"..."</code>) steht für Raw-String und verhindert, dass Python Sonderzeichen im Muster falsch interpretiert.</p>

<h3>Alle Treffer finden mit re.findall</h3>
<pre class="code-block">text2 = "Es regnet in München, aber nicht in Berlin."
# Wir suchen nach allen Wörtern, die auf 'chen' enden
orte = re.findall(r"\\w+chen", text2)
print(orte) # ["München"]</pre>
    `,
        exercise: {
            instructions: 'Finde mithilfe von re.findall alle Zahlen (Schlüsselwort \\\\d+) in dem Satz "Ich habe 2 Äpfel und 5 Birnen gekauft" und gib die gefundene Liste aus.',
            starterCode: 'import re\n\nsatz = "Ich habe 2 Äpfel und 5 Birnen gekauft"\n\n# Finde alle Zahlen und gib die Liste aus\n',
            expectedOutput: "['2', '5']",
            hint: '1) Ergaenze den fehlenden Code nach dem Muster aus der Theorie.\n2) Beispiel:\nergebnis = re.findall(r"\\d+", satz)\nprint(ergebnis)'
        },
        quiz: [
            { question: 'Welches Modul muss importiert werden, um in Python Reguläre Ausdrücke zu nutzen?', options: ['regex', 'pattern', 're', 'match'], correct: 2 },
            { question: 'Wofür steht das "r" vor einem Regex-String wie r"\\d+"?', options: ['Raw-String (ignoriert Python-Sonderzeichen)', 'Regex-Mode', 'Recursive-Search', 'Read-Only'], correct: 0 }
        ]
    },
    {
        id: 18,
        title: 'Virtuelle Umgebungen',
        description: 'Projekte isolieren mit venv',
        duration: '8 min',
        theory: `
<h2>Virtuelle Umgebungen (venv) ⏳</h2>
<p>Wenn du in Python programmierst, lädst du oft Bibliotheken (Packages) aus dem Internet herunter. Das Problem: Wenn Projekt A Version 1.0 einer Bibliothek braucht und Projekt B Version 2.0, gibt es auf deinem PC einen Konflikt!</p>

<h3>Die Lösung: venv</h3>
<p>Eine <strong>virtuelle Umgebung</strong> (virtual environment) ist wie ein isolierter Raum für dein Projekt. Jedes Projekt bekommt sein eigenes Set an Bibliotheken.</p>

<h3>Umgebung erstellen (Terminal)</h3>
<p>Öffne dein Terminal im Projektordner und tippe:</p>
<pre class="code-block">python -m venv mein_env</pre>
<p>Dies erstellt einen unsichtbaren Ordner namens <code>mein_env</code>.</p>

<h3>Umgebung aktivieren</h3>
<p>Bevor du arbeitest, musst du den "Raum" betreten (aktivieren):</p>

<ul>
  <li><strong>Windows:</strong> <code>.\\mein_env\\Scripts\\activate</code></li>
  <li><strong>Mac/Linux:</strong> <code>source mein_env/bin/activate</code></li>
</ul>

<p>Dein Terminal zeigt nun den Namen der Umgebung, z.B. <code>(mein_env)</code>. Alles, was du jetzt installierst, bleibt in diesem Projekt isoliert!</p>
    `,
        exercise: {
            instructions: 'Dies ist eine Theorie-Lektion für das Terminal. Gib den Befehl "python -m venv mein_env" als String mit print() aus, um zu zeigen, dass du ihn dir gemerkt hast.',
            starterCode: '# Gib den Befehl zur Erstellung eines venv aus\n\n',
            expectedOutput: 'python -m venv mein_env',
            hint: '1) Ergaenze den fehlenden Code nach dem Muster aus der Theorie.\n2) Beispiel:\nprint("python -m venv mein_env")'
        },
        quiz: [
            { question: 'Warum nutzt man virtuelle Umgebungen in Python?', options: ['Damit der Code im Browser läuft', 'Um die Ausführungsgeschwindigkeit um 40% zu steigern', 'Um Abhängigkeiten (Packages) verschiedener Projekte voneinander zu isolieren', 'Um sicheren Code gegen Viren zu schreiben'], correct: 2 },
            { question: 'Mit welchem Terminal-Befehl erstellt man standardmäßig ein neues Virtual Environment namens "env" in Python 3?', options: ['python build env', 'python -m venv env', 'create-python-app env', 'init-env'], correct: 1 }
        ]
    },
    {
        id: 19,
        title: 'Packages mit pip',
        description: 'Externe Bibliotheken installieren',
        duration: '8 min',
        theory: `
<h2>Packages mit pip 🧮</h2>
<p>Sobald deine virtuelle Umgebung läuft, willst du wahrscheinlich externe Libraries installieren. Dafür nutzt Python das Tool <strong>pip</strong> (Package Installer for Python).</p>

<h3>Libraries installieren</h3>
<p>Möchtest du z.B. "requests" installieren (eine geniale Bibliothek, um Daten aus dem Internet herunterzuladen), tippst du ins Terminal:</p>
<pre class="code-block">pip install requests</pre>

<h3>Anzeigen, was installiert ist</h3>
<p>Mit diesem Befehl listet pip alle aktuell installierten Pakete auf:</p>
<pre class="code-block">pip freeze</pre>

<h3>Die requirements.txt</h3>
<p>Damit deine Kollegen wissen, welche Pakete dein Projekt braucht, speichert man die Liste in einer Textdatei:</p>
<pre class="code-block"># Die Liste in die Datei schreiben
pip freeze > requirements.txt

# Alle Pakete aus einer Datei installieren
pip install -r requirements.txt</pre>
    `,
        exercise: {
            instructions: 'Simuliere den Befehl zum Installieren aus einer Textdatei. Gib den Befehl "pip install -r requirements.txt" als String mit print() aus.',
            starterCode: '# Gib den Befehl zum Installieren aus der requirements-Datei aus\n\n',
            expectedOutput: 'pip install -r requirements.txt',
            hint: '1) Ergaenze den fehlenden Code nach dem Muster aus der Theorie.\n2) Beispiel:\nprint("pip install -r requirements.txt")'
        },
        quiz: [
            { question: 'Wofür steht das Tool "pip"?', options: ['Python Internal Player', 'Package Installer for Python', 'Program Interface Protocol', 'Platform Integration Process'], correct: 1 },
            { question: 'Mit welchem Befehl speicherst du eine Liste aller installierten Pakete in eine Textdatei?', options: ['pip save requirements.txt', 'pip export > list.txt', 'pip freeze > requirements.txt', 'pip dump'], correct: 2 }
        ]
    },
    {
        id: 20,
        title: 'Testing mit pytest',
        description: 'Automatische Tests schreiben',
        duration: '10 min',
        theory: `
<h2>Testing mit pytest 🌐</h2>
<p>Profis testen ihren Code nicht manuell nach jeder Änderung, sondern lassen Computer das machen! <strong>pytest</strong> ist das beliebteste Test-Framework in der Python-Welt.</p>

<h3>Einen Test schreiben</h3>
<p>Tests sind in pytest normale Funktionen, deren Name mit <code>test_</code> beginnt. Das Schlüsselwort <code>assert</code> (sicherstellen/behaupten) prüft, ob eine Annahme wahr ist.</p>

<pre class="code-block"># Datei: mathe.py
def addiere(a, b):
    return a + b

# Datei: test_mathe.py
def test_addiere():
    ergebnis = addiere(2, 3)
    # Wenn ergebnis nicht 5 ist, schlägt der Test Alarm!
    assert ergebnis == 5</pre>

<h3>Tests ausführen</h3>
<p>Im Terminal tippst du einfach:</p>
<pre class="code-block">pytest</pre>
<p>Pytest sucht dann automatisch alle Dateien, die mit <code>test_</code> beginnen und führt alle Testfunktionen darin aus.</p>
    `,
        exercise: {
            instructions: 'Schreibe einen einfachen Test (also eine Funktion), der prüft, ob 10 + 10 = 20 ergibt. Nutze das Schlüsselwort "assert". (Da wir in einer Sandbox sind, rufe die Funktion danach einfach auf)',
            starterCode: '# Schreibe hier den Test\ndef test_rechnung():\n    pass # Ersetze pass durch deinen Code\n\ntest_rechnung()\nprint("Test erfolgreich!")\n',
            expectedOutput: 'Test erfolgreich!',
            hint: '1) Ergaenze den fehlenden Code nach dem Muster aus der Theorie.\n2) Beispiel:\nSchreibe in die Funktion: assert 10 + 10 == 20'
        },
        quiz: [
            { question: 'Mit welchen Buchstaben müssen Testfunktionen standardmäßig beginnen, damit pytest sie findet?', options: ['check_', 'test_', 'verify_', 'assert_'], correct: 1 },
            { question: 'Welches Schlüsselwort nutzt man in Python-Tests, um einen Wert zu prüfen und ggf. einen Fehler auszulösen?', options: ['ensure', 'check', 'verify', 'assert'], correct: 3 }
        ]
    },
    {
        id: 21,
        title: 'Type Hints',
        description: 'Statische Typisierung in Python',
        duration: '8 min',
        theory: `
<h2>Type Hints 🎨</h2>
<p>Python erkennt Datentypen normalerweise automatisch (dynamische Typisierung). In großen Projekten kann das aber gefährlich sein, wenn z.B. eine Funktion Text erwartet, aber eine Zahl bekommt. <strong>Type Hints</strong> helfen, solche Fehler schon beim Programmieren zu finden.</p>

<h3>Typen annotieren (Type Hinting)</h3>
<p>Du kannst mit einem Doppelpunkt angeben, welchen Typ eine Variable haben soll (z.B. <code>int</code>, <code>str</code>, <code>bool</code>). Für den Rückgabewert einer Funktion benutzt du den Pfeil <code>-&gt;</code>.</p>

<pre class="code-block">def begruessen(name: str) -&gt; str:
    return "Hallo " + name

# Wenn man jetzt begruessen(42) schreibt, warnt dich dein Editor!</pre>

<h3>Listen und Dictionaries typisieren</h3>
<p>Für komplexere Typen brauchst du in älteren Python-Versionen das Modul <code>typing</code>. Ab Python 3.9 geht es eleganter direkt mit den Standardtypen:</p>

<pre class="code-block">def punktzahlen_addieren(scores: list[int]) -&gt; int:
    return sum(scores)</pre>

<p><em>Wichtig:</em> Type Hints sind nur "Hinweise" für dich und deinen Code-Editor. Python selbst bricht beim Ausführen (noch) nicht ab, wenn du die falschen Typen nutzt.</p>
    `,
        exercise: {
            instructions: 'Die vorgegebene Funktion "verdoppeln" empfängt eine Zahl und soll eine Zahl zurückgeben. Füge in der Definition die Type Hints ein: Der Parameter x soll ein Integer (int) sein, und der Rückgabewert ebenfalls.',
            starterCode: '# Füge Type Hints hinzu\ndef verdoppeln(x):\n    return x * 2\n\nprint(verdoppeln(10))\n',
            expectedOutput: '20',
            hint: '1) Ergaenze den fehlenden Code nach dem Muster aus der Theorie.\n2) Beispiel:\ndef verdoppeln(x: int) -> int:'
        },
        quiz: [
            { question: 'Mit welchem Symbol gibt man den Datentyp des Rückgabewerts einer Funktion (Type Hint) an?', options: ['=>', '->', ':', '::'], correct: 1 },
            { question: 'Was passiert, wenn man in Python trotz Type Hint einen falschen Datentyp übergibt?', options: ['Das Programm stürzt immer ab', 'Nichts (es ist nur ein Hinweis für Entwickler und Editoren)', 'Der Datentyp wird automatisch korrigiert', 'Die Funktion wird übersprungen'], correct: 1 }
        ]
    },
    {
        id: 22,
        title: 'Dataclasses',
        description: 'Moderne Datenstrukturen',
        duration: '10 min',
        theory: `
<h2>Dataclasses 🔥</h2>
<p>Wer Klassen schreibt, kennt das Problem: Man muss ständig <code>__init__</code> schreiben und jede Variable an <code>self</code> zuweisen. <strong>Dataclasses</strong> nehmen dir diese langweilige Arbeit ab!</p>

<h3>Der traditionelle Weg</h3>
<p>So sah eine Klasse früher aus:</p>
<pre class="code-block">class Produkt:
    def __init__(self, name: str, preis: float):
        self.name = name
        self.preis = preis</pre>

<h3>Der elegante Weg: @dataclass</h3>
<p>Aus dem Modul <code>dataclasses</code> importieren wir den Decorator <code>@dataclass</code>. Gepaart mit <em>Type Hints</em> liest sich der Code wie ein modernes Kunstwerk:</p>

<pre class="code-block">from dataclasses import dataclass

@dataclass
class Produkt:
    name: str     # Name ist ein String
    preis: float  # Preis ist ein Float (Kommazahl)

# Du kannst das Objekt sofort wie gewohnt nutzen!
handy = Produkt("Smartphone", 599.99)
print(handy.name)  # Gibt "Smartphone" aus</pre>

<p>Bonus: Dataclasses generieren im Hintergrund sogar coole Features wie <code>__repr__</code>, womit der <code>print(handy)</code> Aufruf statt rohem Speicher-Code direkt <code>Produkt(name='Smartphone', preis=599.99)</code> ausgibt!</p>
    `,
        exercise: {
            instructions: 'Benutze den @dataclass Decorator, um eine Klasse "User" zu erstellen. Sie benötigt zwei Attribute: "name" (Typ str) und "level" (Typ int). Erstelle dann einen User "Max" mit Level 5 und gib ihn print() aus.',
            starterCode: 'from dataclasses import dataclass\n\n# Bringe hier den Code auf Vordermann\nclass User:\n    pass\n\n',
            expectedOutput: "User(name='Max', level=5) (Lokale Sandbox Ausgabe kann leicht variieren)",
            hint: '1) Ergaenze den fehlenden Code nach dem Muster aus der Theorie.\n2) Beispiel:\n@dataclass\nclass User:\n    name: str\n    level: int\n\nprint(User("Max", 5))'
        },
        quiz: [
            { question: 'Welche mühselige Methode einer Klasse generiert @dataclass für dich automatisch im Hintergrund?', options: ['__str__', '__init__', '__new__', '__del__'], correct: 1 },
            { question: 'Was ist zwingend erforderlich, damit eine @dataclass funktioniert?', options: ['Mindestens 3 Attribute', 'Eine Funktion in der Klasse', 'Variablen immer in Großbuchstaben', 'Type Hints (z.B. name: str) bei jedem Attribut'], correct: 3 }
        ]
    },
    {
        id: 23,
        title: 'Context Manager',
        description: 'Ressourcen sicher verwalten mit with',
        duration: '10 min',
        theory: `
<h2>Context Manager 💪</h2>
<p>Erinnerst du dich an das Öffnen von Dateien mit <code>with open(...)</code>? Dieses <code>with</code>-Konstrukt nennt man einen <strong>Context Manager</strong>. Er sorgt dafür, dass Ressourcen (wie Dateien, Netzwerkverbindungen oder Datenbanken) ganz sicher wieder geschlossen werden – selbst wenn im Code ein Fehler passiert.</p>

<h3>Wie baut man eigene Context Manager?</h3>
<p>Wenn du einen eigenen bauen willst, brauchst du eine Klasse mit zwei speziellen Methoden: <code>__enter__</code> (wird aufgerufen, wenn man <code>with</code> startet) und <code>__exit__</code> (wird am Ende aufgerufen, um aufzuräumen).</p>

<pre class="code-block">class Stoppuhr:
    def __enter__(self):
        print("Stoppuhr gestartet!")
        return self
        
    def __exit__(self, exc_type, exc_value, traceback):
        print("Stoppuhr gestoppt!")

# So nutzt du den eigenen Context Manager
with Stoppuhr():
    print("Ich mache kurz Pause...")

# Ausgabe:
# Stoppuhr gestartet!
# Ich mache kurz Pause...
# Stoppuhr gestoppt!</pre>
    `,
        exercise: {
            instructions: 'Simuliere einen Context Manager. Ergänze die __exit__ Methode in der Klasse "Tuer", sodass sie "Tür wurde geschlossen!" ausdruckt, wenn der with-Block endet.',
            starterCode: 'class Tuer:\n    def __enter__(self):\n        print("Tür geöffnet!")\n        return self\n        \n    # Füge __exit__ hinzu\n\n# Testlauf\nwith Tuer():\n    print("Ich gehe hindurch...")\n',
            expectedOutput: 'Tür geöffnet!\nIch gehe hindurch...\nTür wurde geschlossen!',
            hint: '1) Ergaenze den fehlenden Code nach dem Muster aus der Theorie.\n2) Beispiel:\ndef __exit__(self, exc_type, exc_val, exc_tb):\n    print("Tür wurde geschlossen!")'
        },
        quiz: [
            { question: 'Mit welchem Schlüsselwort ruft man einen Context Manager auf?', options: ['use', 'open', 'with', 'context'], correct: 2 },
            { question: 'Welche zwei sogenannten "Dunder-Methoden" (Double Underscore) werden für eigene Context Manager benötigt?', options: ['__start__ & __stop__', '__init__ & __del__', '__open__ & __close__', '__enter__ & __exit__'], correct: 3 }
        ]
    },
    {
        id: 24,
        title: 'Async/Await',
        description: 'Asynchrone Programmierung',
        duration: '12 min',
        theory: `
<h2>Async/Await 🎮</h2>
<p>Stell dir vor, du kochst: Du wartest nicht 10 Minuten vor dem Herd auf das Nudelwasser, sondern schneidest in der Wartezeit das Gemüse. Genau das macht asynchrone Programmierung (Async) in Python!</p>

<h3>Synchron vs. Asynchron</h3>
<p>Beim "normalen" (synchronen) Code stoppt das Programm, wenn es 10 Sekunden lang Daten aus dem Internet herunterlädt. Mit <strong>Async</strong> nutzt Python die Wartezeit, um im Hintergrund andere Funktionen abzuarbeiten.</p>

<h3>async def und await</h3>
<p>Um eine asynchrone Funktion zu erstellen, nutzt du <code>async def</code>. Mit <code>await</code> markierst du Vorgänge, die auf eine Antwort warten müssen (z.B. Internetanfragen). Python kann beim "await" pausieren und andere Aufgaben erledigen.</p>

<pre class="code-block">import asyncio

# async macht die Funktion asynchron
async def lade_daten():
    print("Starte Download...")
    # await pausiert die Funktion virtuell für 2 Sekunden
    await asyncio.sleep(2) 
    print("Fertig!")

# Um asynchronen Code von normalem Code aus zu starten:
asyncio.run(lade_daten())</pre>

<p><em>Wichtig:</em> Async bringt keinen Geschwindigkeits-Boost bei reinen Rechenaufgaben, ist aber unglaublich schnell für I/O (Web-Server, API-Aufrufe, Datenbanken).</p>
    `,
        exercise: {
            instructions: 'Setze in der Zeile "def hallo():" das korrekte Stichwort ein, um eine asynchrone Funktion daraus zu machen. Setze außerdem in der Zeile "asyncio.sleep(1)" das "await" ein.',
            starterCode: 'import asyncio\n\n# Mach diese Funktion asynchron\ndef hallo():\n    print("Eins")\n    # Pausieren mit asyncio\n    asyncio.sleep(1)\n    print("Zwei")\n\n# (Wird vom System simuliert: asyncio.run(hallo()))\nprint("Eins")\nprint("Zwei")\n',
            expectedOutput: 'Eins\nZwei',
            hint: '1) Ergaenze den fehlenden Code nach dem Muster aus der Theorie.\n2) Beispiel:\nErsetze "def" durch "async def" und setze vor "asyncio.sleep(1)" das Wort "await".'
        },
        quiz: [
            { question: 'Wofür ist asynchrone Programmierung besonders gut geeignet?', options: ['Für extrem schwere mathematische Berechnungen', 'Um Spiele in 3D zu rendern', 'Für I/O-Aufgaben (wie Datenbankabfragen und Web-Requests)', 'Sie bringt generell gar keinen Vorteil'], correct: 2 },
            { question: 'Welches Python-Modul ist standardmäßig zum Starten und Verwalten asynchronen Codes gedacht?', options: ['asyncio', 'multiprocessing', 'threading', 'concurrent'], correct: 0 }
        ]
    },
    {
        id: 25,
        title: 'Itertools & functools',
        description: 'Mächtige Standardbibliothek-Module',
        duration: '10 min',
        theory: `
<h2>Itertools & functools 📡</h2>
<p>Die Standardbibliothek von Python enthält Schätze, von denen viele Anfänger nichts wissen. Zwei der wichtigsten Schatzkammern für Profis sind <strong>itertools</strong> und <strong>functools</strong>.</p>

<h3>itertools</h3>
<p>Dieses Modul gibt dir super-optimierte Werkzeuge in die Hand, um Schleifen/Iteratoren zu manipulieren.</p>
<pre class="code-block">import itertools

# count() zählt endlos weiter
fuer_immer = itertools.count(10)
print(next(fuer_immer))  # 10
print(next(fuer_immer))  # 11

# chain() verbindet mehrere Listen ressourcenschonend
a = [1, 2]
b = [3, 4]
for zahl in itertools.chain(a, b):
    print(zahl)  # 1 2 3 4</pre>

<h3>functools (Cache)</h3>
<p>Das absolute Highlight aus <code>functools</code> ist das Zwischenspeichern (Caching). Mit dem Decorator <code>@cache</code> merkt sich Python die Lösung einer Funktion. Ruft man die Funktion mit denselben Parametern erneut auf, rechnet Python nicht mehr, sondern liefert sofort das Ergebnis aus dem Gedächtnis!</p>
<pre class="code-block">from functools import cache

# Eine extrem rechenintensive Funktion (z.B. Fibonacci)
@cache
def lange_rechnung(zahl):
    print("Rechne extrem schwer...")
    return zahl * zahl</pre>
    `,
        exercise: {
            instructions: 'Aus Spaß: Setzen wir den Decorator @cache über eine Dummy-Funktion und rufen sie dreimal auf. Die Simulation wird ausgeben, wie genial das ist!',
            starterCode: 'from functools import cache\n\n# Schreibe hier den @cache Decorator\ndef aufwaendige_berechnung(x):\n    return x * x\n\n# (Simulierter Output bei echtem @cache: Itertools gemeistert!)\nprint("Itertools gemeistert!")\n',
            expectedOutput: 'Itertools gemeistert!',
            hint: '1) Ergaenze den fehlenden Code nach dem Muster aus der Theorie.\n2) Beispiel:\nEinfach @cache direkt über def aufwaendige_berechnung(x): schreiben.'
        },
        quiz: [
            { question: 'Was tut der Decorator @cache aus dem Paket functools?', options: ['Er bereinigt den Arbeitsspeicher', 'Er merkt sich die Ergebnisse von Parametern und spart so dramatisch Rechenzeit', 'Er verschlüsselt den Output', 'Er konvertiert Float in Integer'], correct: 1 },
            { question: 'Wofür ist das "itertools" Paket bekannt?', options: ['Für Netzwerkanfragen', 'Für maschinelles Lernen und KI', 'Für effiziente Funktionen zur Datenmanipulation und endlosen Generatoren', 'Um Dateien im Betriebssystem zu durchsuchen'], correct: 2 }
        ]
    },
    {
        id: 26,
        title: 'JSON & APIs',
        description: 'Daten austauschen mit JSON',
        duration: '10 min',
        theory: `
<h2>JSON & APIs 🗄️</h2>
<p>Wenn dein Python-Programm mit anderen Systemen (z.B. einer Website oder einer App) sprechen will, nutzt man als gemeinsame "Sprache" meistens <strong>JSON</strong> (JavaScript Object Notation). Es sieht fast exakt so aus wie ein Python-Dictionary!</p>

<h3>JSON lesen und schreiben</h3>
<p>Dafür gibt es das eingebaute <code>json</code>-Modul. <code>dumps()</code> wandelt ein Python-Objekt in einen JSON-String um (zum Senden). <code>loads()</code> wandelt einen JSON-String zurück in ein Python-Dictionary (zum Lesen).</p>

<pre class="code-block">import json

user_dict = {"name": "Anna", "alter": 25, "ist_admin": True}

# In JSON-Text umwandeln (True wird zu true etc.)
json_text = json.dumps(user_dict)
print(json_text) # '{"name": "Anna", "alter": 25, "ist_admin": true}'

# Wieder in ein Dictionary zurückverwandeln
neues_dict = json.loads(json_text)
print(neues_dict["name"]) # "Anna"</pre>

<h3>Wozu das Ganze? APIs!</h3>
<p>Wenn du Wetterdaten aus dem Internet abrufst (z.B. über eine <strong>REST API</strong> mit der Bibliothek <code>requests</code>), liefert dir der Server die Daten immer als praktischen JSON-String zurück.</p>
    `,
        exercise: {
            instructions: 'Wandle den JSON-String in der Sandbox mit json.loads() in ein echtes Python-Dictionary um und gib den Wert für den Schlüssel "stadt" aus.',
            starterCode: 'import json\n\njson_daten = \'{"name": "Max", "stadt": "Berlin"}\'\n\n# Wandle den String um und greife auf "stadt" zu\n',
            expectedOutput: 'Berlin',
            hint: '1) Ergaenze den fehlenden Code nach dem Muster aus der Theorie.\n2) Beispiel:\npython_dict = json.loads(json_daten)\nprint(python_dict["stadt"])'
        },
        quiz: [
            { question: 'Welchem Python-Datentyp ähnelt die Struktur von JSON am meisten?', options: ['List', 'Tuple', 'Dictionary', 'Set'], correct: 2 },
            { question: 'Welche Methode des json-Moduls wandelt einen JSON-String in ein Python-Objekt (Dictionary) um?', options: ['json.parse()', 'json.loads()', 'json.read()', 'json.dumps()'], correct: 1 }
        ]
    },
    {
        id: 27,
        title: 'Datenbanken mit SQLite',
        description: 'Lokale Datenbanken nutzen',
        duration: '12 min',
        theory: `
<h2>Datenbanken mit SQLite 📦</h2>
<p>Texte in Dateien speichern ist okay, aber eine echte Datenbank ist professioneller. Python hat <strong>SQLite</strong> direkt eingebaut! Es ist eine komplette relationale Datenbank, die jedoch nur in einer einzigen lokalen Datei lebt.</p>

<h3>Verbindung herstellen</h3>
<p>Mit dem Modul <code>sqlite3</code> verbinden wir uns mit einer Datei (die automatisch erstellt wird, falls sie nicht existiert) und erstellen einen <strong>Cursor</strong>, um SQL-Befehle auszuführen.</p>

<pre class="code-block">import sqlite3

# Verbindung herstellen
datenbank = sqlite3.connect("meine_app.db")
cursor = datenbank.cursor()

# Tabelle erstellen
cursor.execute("CREATE TABLE IF NOT EXISTS User (id INTEGER PRIMARY KEY, name TEXT)")

# Daten einfügen
cursor.execute("INSERT INTO User (name) VALUES ('Lisa')")
datenbank.commit() # Änderungen speichern

# Daten abrufen
cursor.execute("SELECT * FROM User")
ergebnisse = cursor.fetchall()
print(ergebnisse) # [(1, 'Lisa')]</pre>
    `,
        exercise: {
            instructions: 'Erstelle als SQL-Pirat deine eigene Schatzkarte! Führe den simulierten CREATE TABLE Befehl für eine Tabelle "Schatz" mit den Spalten (id INTEGER, ort TEXT) aus.',
            starterCode: 'import sqlite3\n# Wir simulieren eine InMemory-DB für die Sandbox\ndb = sqlite3.connect(":memory:")\ncursor = db.cursor()\n\n# Schreibe hier deinen CREATE TABLE Befehl (mit cursor.execute)\n\n\nprint("Tabelle erfolgreich erstellt!")\n',
            expectedOutput: 'Tabelle erfolgreich erstellt!',
            hint: '1) Ergaenze den fehlenden Code nach dem Muster aus der Theorie.\n2) Beispiel:\ncursor.execute("CREATE TABLE Schatz (id INTEGER, ort TEXT)")'
        },
        quiz: [
            { question: 'Was ist der große Vorteil von SQLite im Vergleich zu MySQL oder PostgreSQL?', options: ['Es ist schneller für Millionen von Nutzern', 'Es läuft serverlos direkt in einer lokalen Datei', 'Es unterstützt nur Strings', 'Es benötigt keine SQL-Befehle'], correct: 1 },
            { question: 'Welcher Modus zwingt SQLite, die Datenbank nur im Arbeitsspeicher (RAM) der aktuellen App zu erstellen, ohne eine Datei zu schreiben?', options: ['":virtual:"', '":memory:"', '":temp:"', '":ram:"'], correct: 1 }
        ]
    },
    {
        id: 28,
        title: 'Web Scraping',
        description: 'Daten aus Websites extrahieren',
        duration: '12 min',
        theory: `
<h2>Web Scraping 🧪</h2>
<p>Viele Daten im Internet gibt es nicht als sauberes JSON, sondern nur als wilde HTML-Websites. <strong>Web Scraping</strong> bedeutet, dass unser Python-Skript den Website-Code herunterlädt und die für uns wichtigen Infos herausfiltert!</p>

<h3>BeautifulSoup</h3>
<p>Die Bibliothek <code>BeautifulSoup</code> (zusammen mit <code>requests</code>) ist der Industriestandard dafür.</p>

<pre class="code-block">import requests
from bs4 import BeautifulSoup

# 1. Wir laden den HTML-Code eine Seite herunter
url = "https://example.com"
seite = requests.get(url)

# 2. Wir füttern BeautifulSoup mit dem HTML-Code
suppe = BeautifulSoup(seite.text, 'html.parser')

# 3. Wir suchen nach Tags (z.B. alle Links <a>)
links = suppe.find_all('a')
for link in links:
    print(link.get('href'))</pre>

<p><em>Warnung:</em> Scraping kann Webserver belasten. Scrape immer respektvoll, lies die "robots.txt" der Website und baue kurze Pausen (<code>time.sleep()</code>) in deine Schleifen ein, damit du nicht gebannt wirst!</p>
    `,
        exercise: {
            instructions: 'Simuliere BeautifulSoup. Ein HTML-Schnipsel "<h1>Hallo Python</h1>" ist gegeben. Wir stellen dir ein Dummy-Objekt "suppe" zur Verfügung, das eine find() Methode hat, die den Text aus dem Tag holt. Gib das Ergebnis aus.',
            starterCode: '# Sandbox-Simulation für BeautifulSoup\nclass DummySoup:\n    def find(self, tag):\n        return "Hallo Python" # Simulierter h1-Inhalt\n        \nsuppe = DummySoup()\n\n# Nutze suppe.find("h1") und drucke das Ergebnis\n',
            expectedOutput: 'Hallo Python',
            hint: '1) Ergaenze den fehlenden Code nach dem Muster aus der Theorie.\n2) Beispiel:\nprint(suppe.find("h1"))'
        },
        quiz: [
            { question: 'Worum geht es beim Web Scraping?', options: ['Das Kratzen an Hardware-Komponenten', 'Das automatische Extrahieren von Daten aus HTML-Websites', 'Websites designen mit CSS', 'Schädliche Viren aus Webseiten entfernen'], correct: 1 },
            { question: 'Welche Bibliothek wird in Python meistens genutzt, um den heruntergeladenen HTML-Code elegant zu durchsuchen?', options: ['HtmlSearcher', 'WebCrawler', 'BeautifulSoup', 'ScrapeMaster'], correct: 2 }
        ]
    },
    {
        id: 29,
        title: 'NumPy Grundlagen',
        description: 'Numerische Berechnungen',
        duration: '12 min',
        theory: `
<h2>NumPy Grundlagen 🏃</h2>
<p>Standard-Python-Listen sind großartig, aber wenn du mit Millionen von Zahlen rechnest (Datenanalyse, Künstliche Intelligenz), sind sie viel zu langsam. Hier kommt <strong>NumPy</strong> (Numerical Python) ins Spiel!</p>

<h3>NumPy Arrays</h3>
<p>Das Herzstück von NumPy sind die Arrays (Strukturen, die Vektoren oder Matrizen repräsentieren). Sie basieren unter der Haube auf rasend schnellem C-Code.</p>

<pre class="code-block">import numpy as np

# Ein normales NumPy Array aus einer Liste erstellen
zahlen = np.array([1, 2, 3, 4])

# Der Zauber: Wir können mit der kompletten Liste auf einmal rechnen!
verdoppelt = zahlen * 2
print(verdoppelt) # [2, 4, 6, 8]</pre>

<h3>Vieles mehr</h3>
<p>NumPy bietet hunderte extrem schnelle Geometrie- und Statistik-Funktionen. Zum Beispiel: <code>np.mean(zahlen)</code> für den Durchschnitt, <code>np.zeros(10)</code> für ein leeres Array oder <code>np.linspace(0, 100, 5)</code> für gleichmäßige Abstände.</p>
    `,
        exercise: {
            instructions: 'In der Sandbox simulieren wir NumPy mit einer Standard-Liste. Multipliziere jeden der Werte [1, 2, 3] mit 10 und gib die neue Liste aus (verwende z.B. eine List Comprehension, wie in der Simulation erwartet).',
            starterCode: '# Sandbox (NumPy Ersatz)\nzahlen = [1, 2, 3]\n\n# Multipliziere jede Zahl in "zahlen" mit 10\n',
            expectedOutput: '[10, 20, 30]',
            hint: '1) Ergaenze den fehlenden Code nach dem Muster aus der Theorie.\n2) Beispiel:\nergebnis = [x * 10 for x in zahlen]\nprint(ergebnis)'
        },
        quiz: [
            { question: 'Warum nutzt man Arrays aus NumPy anstatt normaler Python-Listen für Mathe/Datenanalyse?', options: ['Weil sie bunter ausgedruckt werden können', 'Weil sie extrem schnell und speichereffizient sind (dank C-Kern)', 'Weil Python-Listen keine Zahlen aufnehmen können', 'Um das Internet schneller zu machen'], correct: 1 },
            { question: 'Was passiert, wenn man in NumPy ein Array (z.B. np.array([1, 2])) mit * 5 multipliziert?', options: ['Der Code stürzt ab', 'Es wird eine Fehlermeldung ausgegeben', 'Das Array wird 5x aneinandergehängt: [1, 2, 1, 2...]', 'Jede Zahl im Array wird mathematisch multipliziert: [5, 10]'], correct: 3 }
        ]
    },
    {
        id: 30,
        title: 'Projekt: CLI-Tool',
        description: 'Ein eigenes Kommandozeilen-Tool bauen',
        duration: '15 min',
        theory: `
<h2>Projekt: CLI-Tool 🏆</h2>
<p>Herzlichen Glückwunsch! Du hast fast alle wichtigen Werkzeuge gemeistert. Zeit, sie zu kombinieren, indem du ein professionelles Kommandozeilen-Tool (CLI) mit der Bibliothek <code>argparse</code> baust.</p>

<h3>Argumente parsen</h3>
<p>Wenn Profis ein Skript im Terminal aufrufen, geschieht das oft mit Argumenten: <code>python tool.py --name Max</code>. Im Code fängst du diese Werte mit <code>argparse</code> auf.</p>

<pre class="code-block">import argparse

# Den "Parser" starten, der Argumente liest
parser = argparse.ArgumentParser(description="Begrüßungs-Tool")

# Wir definieren ein Argument namens --name
parser.add_argument("--name", type=str, help="Dein Name")

# Argumente verarbeiten
args = parser.parse_args()

if args.name:
    print(f"Hallo {args.name}! Du hast das CLI-Tool gemeistert!")
else:
    print("Kein Name angegeben.")</pre>

<p>Das Beste daran: Wenn ein User nun <code>python tool.py --help</code> aufruft, generiert dein Code automatisch ein wunderschönes Hilfs-Menü!</p>
    `,
        exercise: {
            instructions: 'Schreibe die finale print()-Ausgabe und gib exakt "Abschluss gemeistert: Willkommen in der Welt der Python-Profis!" aus.',
            starterCode: '# Das große Finale\n\n',
            expectedOutput: 'Abschluss gemeistert: Willkommen in der Welt der Python-Profis!',
            hint: '1) Ergaenze den fehlenden Code nach dem Muster aus der Theorie.\n2) Beispiel:\nprint("Abschluss gemeistert: Willkommen in der Welt der Python-Profis!")'
        },
        quiz: [
            { question: 'Welches eingebaute Modul nutzt man typischerweise, um Argumente für Terminal-Skripte wie "--name" oder "-verbose" zu verarbeiten?', options: ['subprocess', 'terminal', 'argparse', 'system_args'], correct: 2 },
            { question: 'Was generiert argparse für dich automatisch, absolut gratis und wunderschön?', options: ['Ein Graphical User Interface (GUI)', 'Eine SQLite Datenbank', 'Einen Webserver', 'Ein interaktives --help Menü für die Kommandozeile'], correct: 3 }
        ]
    }
];
