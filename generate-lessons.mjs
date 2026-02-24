// generate-lessons.mjs – Generates 30 lessons per language
import { writeFileSync } from 'fs';
import { join } from 'path';

const outputDir = join(process.cwd(), 'src', 'data', 'lessons');

// ── Lesson curricula for all 12 languages ────────────────────────────

const curricula = {
    python: {
        export: 'pythonLessons',
        print: 'print',
        printWrap: (s) => `print("${s}")`,
        lessonTopics: [
            { title: 'Hallo Welt & print()', desc: 'Dein erstes Python-Programm', dur: '5 min' },
            { title: 'Variablen & Datentypen', desc: 'Werte speichern und Typen kennenlernen', dur: '8 min' },
            { title: 'Listen & Schleifen', desc: 'Mehrere Werte speichern und durchlaufen', dur: '10 min' },
            { title: 'If-Bedingungen', desc: 'Entscheidungen im Code treffen', dur: '8 min' },
            { title: 'Funktionen', desc: 'Eigene Funktionen definieren und nutzen', dur: '10 min' },
            { title: 'Dictionaries', desc: 'Schlüssel-Wert-Paare speichern', dur: '8 min' },
            { title: 'Klassen & Objekte', desc: 'Objektorientierte Programmierung', dur: '12 min' },
            { title: 'Module & Import', desc: 'Code organisieren und wiederverwenden', dur: '8 min' },
            { title: 'Fehlerbehandlung', desc: 'try/except für robustes Programmieren', dur: '8 min' },
            { title: 'List Comprehensions', desc: 'Elegante Listen in einer Zeile', dur: '8 min' },
            { title: 'Dateioperationen', desc: 'Dateien lesen und schreiben', dur: '10 min' },
            { title: 'Dekoratoren', desc: 'Funktionen erweitern mit @decorator', dur: '12 min' },
            { title: 'Generatoren & yield', desc: 'Lazy Evaluation mit Generatoren', dur: '10 min' },
            { title: 'Lambda & map/filter', desc: 'Funktionale Programmierung in Python', dur: '8 min' },
            { title: 'Sets & Tupel', desc: 'Unveränderliche und einzigartige Sammlungen', dur: '8 min' },
            { title: 'String-Methoden', desc: 'Text professionell verarbeiten', dur: '8 min' },
            { title: 'Reguläre Ausdrücke', desc: 'Muster in Texten finden mit re', dur: '12 min' },
            { title: 'Virtuelle Umgebungen', desc: 'Projekte isolieren mit venv', dur: '8 min' },
            { title: 'Packages mit pip', desc: 'Externe Bibliotheken installieren', dur: '8 min' },
            { title: 'Testing mit pytest', desc: 'Automatische Tests schreiben', dur: '10 min' },
            { title: 'Type Hints', desc: 'Statische Typisierung in Python', dur: '8 min' },
            { title: 'Dataclasses', desc: 'Moderne Datenstrukturen', dur: '10 min' },
            { title: 'Context Manager', desc: 'Ressourcen sicher verwalten mit with', dur: '10 min' },
            { title: 'Async/Await', desc: 'Asynchrone Programmierung', dur: '12 min' },
            { title: 'Itertools & functools', desc: 'Mächtige Standardbibliothek-Module', dur: '10 min' },
            { title: 'JSON & APIs', desc: 'Daten austauschen mit JSON', dur: '10 min' },
            { title: 'Datenbanken mit SQLite', desc: 'Lokale Datenbanken nutzen', dur: '12 min' },
            { title: 'Web Scraping', desc: 'Daten aus Websites extrahieren', dur: '12 min' },
            { title: 'NumPy Grundlagen', desc: 'Numerische Berechnungen', dur: '12 min' },
            { title: 'Projekt: CLI-Tool', desc: 'Ein eigenes Kommandozeilen-Tool bauen', dur: '15 min' },
        ]
    },
    javascript: {
        export: 'javascriptLessons',
        print: 'console.log',
        printWrap: (s) => `console.log("${s}")`,
        lessonTopics: [
            { title: 'Hallo Welt & console.log', desc: 'Dein erstes JavaScript-Programm', dur: '5 min' },
            { title: 'Variablen: let, const, var', desc: 'Werte speichern mit Deklarationsarten', dur: '8 min' },
            { title: 'Arrays & Schleifen', desc: 'Daten in Arrays speichern und durchlaufen', dur: '10 min' },
            { title: 'Funktionen & Arrow Functions', desc: 'Moderne Funktionsdefinitionen', dur: '10 min' },
            { title: 'Objekte & JSON', desc: 'Daten strukturiert speichern', dur: '10 min' },
            { title: 'DOM-Manipulation', desc: 'HTML-Elemente mit JS verändern', dur: '12 min' },
            { title: 'Promises & Async/Await', desc: 'Asynchronen Code elegant schreiben', dur: '12 min' },
            { title: 'Module & Import/Export', desc: 'Code in Module aufteilen', dur: '8 min' },
            { title: 'Error Handling', desc: 'try/catch und eigene Fehlertypen', dur: '8 min' },
            { title: 'Array-Methoden', desc: 'map, filter, reduce Transformationen', dur: '10 min' },
            { title: 'Spread & Destructuring', desc: 'Moderne Syntax für eleganten Code', dur: '10 min' },
            { title: 'Web APIs & fetch', desc: 'Daten von APIs laden', dur: '12 min' },
            { title: 'Klassen & OOP', desc: 'Objektorientiertes JavaScript', dur: '12 min' },
            { title: 'Closures & Scope', desc: 'Kontext und Gültigkeitsbereiche', dur: '10 min' },
            { title: 'Prototypen & Vererbung', desc: 'Das Prototypensystem verstehen', dur: '12 min' },
            { title: 'Event Loop', desc: 'Wie JS asynchron funktioniert', dur: '10 min' },
            { title: 'Regular Expressions', desc: 'Muster in Strings finden', dur: '10 min' },
            { title: 'Map, Set & WeakMap', desc: 'Fortgeschrittene Datenstrukturen', dur: '10 min' },
            { title: 'Symbols & Iterators', desc: 'Eingebaute Protokolle nutzen', dur: '10 min' },
            { title: 'Proxy & Reflect', desc: 'Meta-Programmierung', dur: '12 min' },
            { title: 'Web Workers', desc: 'Multi-Threading im Browser', dur: '12 min' },
            { title: 'Service Workers', desc: 'Offline-fähige Webanwendungen', dur: '12 min' },
            { title: 'IndexedDB', desc: 'Clientseitige Datenbank im Browser', dur: '10 min' },
            { title: 'Canvas & Animation', desc: '2D-Grafiken zeichnen', dur: '12 min' },
            { title: 'WebSockets', desc: 'Echtzeit-Kommunikation', dur: '12 min' },
            { title: 'Testing mit Jest', desc: 'Unit-Tests schreiben', dur: '10 min' },
            { title: 'Node.js Grundlagen', desc: 'JavaScript auf dem Server', dur: '12 min' },
            { title: 'npm & Packages', desc: 'Abhängigkeiten verwalten', dur: '8 min' },
            { title: 'TypeScript Überblick', desc: 'JS mit Typen erweitern', dur: '10 min' },
            { title: 'Projekt: Todo-App', desc: 'Eine komplette Webanwendung bauen', dur: '15 min' },
        ]
    },
    typescript: {
        export: 'typescriptLessons',
        print: 'console.log',
        printWrap: (s) => `console.log("${s}")`,
        lessonTopics: [
            { title: 'Hallo Welt & Typen', desc: 'JavaScript mit statischer Typisierung', dur: '5 min' },
            { title: 'Basis-Typen', desc: 'string, number, boolean, Arrays', dur: '8 min' },
            { title: 'Interfaces', desc: 'Eigene Typen für Objekte definieren', dur: '10 min' },
            { title: 'Funktionen mit Typen', desc: 'Typisierte Parameter und Rückgabewerte', dur: '10 min' },
            { title: 'Generics', desc: 'Wiederverwendbare Typen', dur: '12 min' },
            { title: 'Enums', desc: 'Aufzählungstypen für feste Wertemengen', dur: '8 min' },
            { title: 'Klassen', desc: 'OOP mit Zugriffsmodifikatoren', dur: '12 min' },
            { title: 'Type Guards', desc: 'Laufzeit-Typprüfungen', dur: '10 min' },
            { title: 'Mapped Types', desc: 'Typen dynamisch ableiten', dur: '10 min' },
            { title: 'Decorators', desc: 'Klassen und Methoden erweitern', dur: '10 min' },
            { title: 'Module Patterns', desc: 'Module Augmentation und globale Typen', dur: '10 min' },
            { title: 'Conditional Types', desc: 'Typen mit Logik', dur: '12 min' },
            { title: 'Utility Types', desc: 'Partial, Readonly, Pick, Omit', dur: '10 min' },
            { title: 'Union & Intersection', desc: 'Typen kombinieren', dur: '10 min' },
            { title: 'Type Assertions', desc: 'Typen manuell zuweisen', dur: '8 min' },
            { title: 'Template Literal Types', desc: 'String-basierte Typen', dur: '10 min' },
            { title: 'Infer & Extract', desc: 'Typen aus Patterns extrahieren', dur: '12 min' },
            { title: 'Discriminated Unions', desc: 'Tagged Union Types', dur: '10 min' },
            { title: 'Index Signatures', desc: 'Dynamische Objekt-Keys typisieren', dur: '10 min' },
            { title: 'Namespace Patterns', desc: 'Code logisch gruppieren', dur: '8 min' },
            { title: 'Declaration Files', desc: '.d.ts Dateien erstellen', dur: '10 min' },
            { title: 'Strict Mode', desc: 'Max. Typsicherheit konfigurieren', dur: '8 min' },
            { title: 'Async Types', desc: 'Promise und async mit Typen', dur: '10 min' },
            { title: 'React mit TypeScript', desc: 'Typsichere React-Komponenten', dur: '12 min' },
            { title: 'Express mit TypeScript', desc: 'Typsichere APIs bauen', dur: '12 min' },
            { title: 'Error Handling', desc: 'Errors und unknown richtig tippen', dur: '10 min' },
            { title: 'Generics Advanced', desc: 'Rekursive und bedingte Generics', dur: '12 min' },
            { title: 'Performance-Tipps', desc: 'Kompilierzeit optimieren', dur: '10 min' },
            { title: 'Migration von JS', desc: 'JavaScript-Projekte migrieren', dur: '10 min' },
            { title: 'Projekt: Typsichere API', desc: 'Ein End-to-End typisiertes Projekt', dur: '15 min' },
        ]
    },
    go: {
        export: 'goLessons',
        print: 'fmt.Println',
        printWrap: (s) => `fmt.Println("${s}")`,
        lessonTopics: [
            { title: 'Hallo Welt & fmt', desc: 'Dein erstes Go-Programm', dur: '5 min' },
            { title: 'Variablen & Typen', desc: 'Variablen deklarieren mit := und var', dur: '8 min' },
            { title: 'Schleifen mit for', desc: 'Die einzige Schleife in Go', dur: '8 min' },
            { title: 'If & Switch', desc: 'Bedingungen und Fallunterscheidungen', dur: '8 min' },
            { title: 'Funktionen', desc: 'Mehrere Rückgabewerte definieren', dur: '10 min' },
            { title: 'Arrays & Slices', desc: 'Feste und dynamische Listen', dur: '10 min' },
            { title: 'Structs', desc: 'Eigene Datentypen definieren', dur: '10 min' },
            { title: 'Goroutines & Channels', desc: 'Nebenläufigkeit – Gos Killer-Feature', dur: '12 min' },
            { title: 'Interfaces', desc: 'Implizite Implementierung', dur: '10 min' },
            { title: 'Maps', desc: 'Schlüssel-Wert-Paare', dur: '8 min' },
            { title: 'Error Handling', desc: 'Fehlerbehandlung nach Go-Konvention', dur: '10 min' },
            { title: 'Packages & Testing', desc: 'Code organisieren und testen', dur: '10 min' },
            { title: 'Pointer', desc: 'Referenzen und Zeiger', dur: '10 min' },
            { title: 'Methods & Receivers', desc: 'Methoden an Typen binden', dur: '10 min' },
            { title: 'Embedding', desc: 'Komposition statt Vererbung', dur: '10 min' },
            { title: 'Generics', desc: 'Typ-Parameter (Go 1.18+)', dur: '12 min' },
            { title: 'Context', desc: 'Abbruch und Timeouts', dur: '10 min' },
            { title: 'Concurrency Patterns', desc: 'Worker Pools und Pipelines', dur: '12 min' },
            { title: 'WaitGroups & Mutexes', desc: 'Synchronisation', dur: '10 min' },
            { title: 'Reflection', desc: 'Typen zur Laufzeit inspizieren', dur: '12 min' },
            { title: 'JSON Handling', desc: 'JSON serialisieren und parsen', dur: '10 min' },
            { title: 'HTTP Server', desc: 'Einen Webserver bauen', dur: '12 min' },
            { title: 'HTTP Client', desc: 'API-Anfragen senden', dur: '10 min' },
            { title: 'Datenbank-Zugriff', desc: 'SQL mit database/sql', dur: '12 min' },
            { title: 'File I/O', desc: 'Dateien lesen und schreiben', dur: '10 min' },
            { title: 'CLI-Tools mit Cobra', desc: 'Kommandozeilen-Programme', dur: '12 min' },
            { title: 'Middleware', desc: 'HTTP-Middleware erstellen', dur: '10 min' },
            { title: 'Docker & Go', desc: 'Go-Apps containerisieren', dur: '12 min' },
            { title: 'Benchmarking', desc: 'Performance messen', dur: '10 min' },
            { title: 'Projekt: REST API', desc: 'Eine vollständige API bauen', dur: '15 min' },
        ]
    },
    rust: {
        export: 'rustLessons',
        print: 'println!',
        printWrap: (s) => `println!("${s}");`,
        lessonTopics: [
            { title: 'Hallo Welt & println!', desc: 'Dein erstes Rust-Programm', dur: '5 min' },
            { title: 'Variablen & Mutabilität', desc: 'let, mut und Datentypen', dur: '8 min' },
            { title: 'Schleifen & Iteratoren', desc: 'for, while und loop', dur: '10 min' },
            { title: 'If-Bedingungen & Match', desc: 'Pattern Matching in Rust', dur: '8 min' },
            { title: 'Funktionen & Rückgabewerte', desc: 'Eigene Funktionen mit Typen', dur: '10 min' },
            { title: 'Ownership & Borrowing', desc: 'Rusts einzigartiges Speicher-Modell', dur: '12 min' },
            { title: 'Structs', desc: 'Eigene Datentypen erstellen', dur: '10 min' },
            { title: 'Enums & Error Handling', desc: 'Option, Result und ?-Operator', dur: '12 min' },
            { title: 'Vektoren & Collections', desc: 'Dynamische Datenstrukturen', dur: '10 min' },
            { title: 'Traits', desc: 'Geteiltes Verhalten definieren', dur: '12 min' },
            { title: 'Lifetimes', desc: 'Referenz-Lebenszeiten verstehen', dur: '12 min' },
            { title: 'Closures & Iteratoren', desc: 'Anonyme Funktionen und Ketten', dur: '10 min' },
            { title: 'Generics', desc: 'Generischer Code mit Typen', dur: '12 min' },
            { title: 'Smart Pointer', desc: 'Box, Rc und RefCell', dur: '12 min' },
            { title: 'Concurrency', desc: 'Threads und Message Passing', dur: '12 min' },
            { title: 'Modules & Crates', desc: 'Code organisieren mit mod', dur: '10 min' },
            { title: 'Testing', desc: 'Unit- und Integration-Tests', dur: '10 min' },
            { title: 'Error Types', desc: 'Eigene Fehlertypen definieren', dur: '10 min' },
            { title: 'String-Typen', desc: 'String vs &str im Detail', dur: '10 min' },
            { title: 'Pattern Matching Adv.', desc: 'Fortgeschrittene Patterns', dur: '12 min' },
            { title: 'Macros', desc: 'Code generieren mit macro_rules!', dur: '12 min' },
            { title: 'Unsafe Rust', desc: 'Wann und wie unsafe nutzen', dur: '12 min' },
            { title: 'Async/Await', desc: 'Asynchrone Programmierung mit Tokio', dur: '12 min' },
            { title: 'Serde & JSON', desc: 'Serialisierung und Deserialisierung', dur: '10 min' },
            { title: 'HTTP mit reqwest', desc: 'API-Anfragen senden', dur: '10 min' },
            { title: 'Actix Web', desc: 'Einen Webserver bauen', dur: '12 min' },
            { title: 'File I/O', desc: 'Dateien sicher lesen und schreiben', dur: '10 min' },
            { title: 'Cargo & Dependencies', desc: 'Pakete verwalten mit Cargo', dur: '8 min' },
            { title: 'FFI & C-Interop', desc: 'C-Code aus Rust aufrufen', dur: '12 min' },
            { title: 'Projekt: CLI Tool', desc: 'Ein Kommandozeilen-Programm bauen', dur: '15 min' },
        ]
    },
    cpp: {
        export: 'cppLessons',
        print: 'cout',
        printWrap: (s) => `cout << "${s}" << endl;`,
        lessonTopics: [
            { title: 'Hallo Welt & cout', desc: 'Dein erstes C++-Programm', dur: '5 min' },
            { title: 'Variablen & Datentypen', desc: 'Variablen deklarieren mit Typen', dur: '8 min' },
            { title: 'Schleifen', desc: 'for, while und do-while', dur: '8 min' },
            { title: 'If & switch', desc: 'Bedingungen und Fallunterscheidungen', dur: '8 min' },
            { title: 'Funktionen', desc: 'Funktionen mit Überladung', dur: '10 min' },
            { title: 'Arrays & Vectors', desc: 'Statische und dynamische Listen', dur: '10 min' },
            { title: 'Pointer & Referenzen', desc: 'Speicheradressen verstehen', dur: '12 min' },
            { title: 'Klassen & OOP', desc: 'Objektorientierte Programmierung', dur: '12 min' },
            { title: 'Templates', desc: 'Generische Programmierung', dur: '10 min' },
            { title: 'STL Algorithmen', desc: 'sort, find, transform', dur: '10 min' },
            { title: 'Exceptions', desc: 'try/catch/throw', dur: '8 min' },
            { title: 'Move Semantics', desc: 'Rvalue-Referenzen und Smart Pointer', dur: '12 min' },
            { title: 'Vererbung', desc: 'Basisklassen und virtual', dur: '12 min' },
            { title: 'Polymorphismus', desc: 'Virtuelle Funktionen und Vtable', dur: '12 min' },
            { title: 'Operator Overloading', desc: 'Operatoren für eigene Typen', dur: '10 min' },
            { title: 'Lambda Expressions', desc: 'Anonyme Funktionen in C++', dur: '10 min' },
            { title: 'Multithreading', desc: 'std::thread und std::mutex', dur: '12 min' },
            { title: 'RAII & Ressourcen', desc: 'Automatisches Ressourcenmanagement', dur: '10 min' },
            { title: 'String Handling', desc: 'std::string und string_view', dur: '10 min' },
            { title: 'File I/O', desc: 'fstream zum Lesen und Schreiben', dur: '10 min' },
            { title: 'Namespaces', desc: 'Namenskonflikte vermeiden', dur: '8 min' },
            { title: 'constexpr', desc: 'Compile-Time-Berechnungen', dur: '10 min' },
            { title: 'Ranges (C++20)', desc: 'Moderne Iteration mit Ranges', dur: '12 min' },
            { title: 'Concepts (C++20)', desc: 'Template-Constraints', dur: '12 min' },
            { title: 'std::optional', desc: 'Optionale Werte sicher nutzen', dur: '10 min' },
            { title: 'std::variant', desc: 'Typ-sichere Union', dur: '10 min' },
            { title: 'Coroutines', desc: 'Kooperatives Multitasking (C++20)', dur: '12 min' },
            { title: 'CMake', desc: 'Build-System für C++', dur: '10 min' },
            { title: 'Unit Testing', desc: 'Google Test Framework', dur: '10 min' },
            { title: 'Projekt: Game Engine', desc: 'Grundlagen einer Mini-Engine', dur: '15 min' },
        ]
    },
    java: {
        export: 'javaLessons',
        print: 'System.out.println',
        printWrap: (s) => `System.out.println("${s}");`,
        lessonTopics: [
            { title: 'Hallo Welt & public static', desc: 'Dein erstes Java-Programm', dur: '5 min' },
            { title: 'Variablen & Datentypen', desc: 'Primitive und Wrapper-Typen', dur: '8 min' },
            { title: 'Operatoren & Ausdrücke', desc: 'Arithmetik und Vergleiche', dur: '8 min' },
            { title: 'If-Bedingungen & switch', desc: 'Kontrollfluss in Java', dur: '8 min' },
            { title: 'Schleifen', desc: 'for, while, do-while und for-each', dur: '10 min' },
            { title: 'Arrays', desc: 'Feste und mehrdimensionale Arrays', dur: '10 min' },
            { title: 'Methoden', desc: 'Eigene Methoden definieren', dur: '10 min' },
            { title: 'Klassen & Objekte', desc: 'OOP-Grundlagen in Java', dur: '12 min' },
            { title: 'Konstruktoren & this', desc: 'Objekte korrekt initialisieren', dur: '10 min' },
            { title: 'Vererbung', desc: 'extends und super verwenden', dur: '12 min' },
            { title: 'Interfaces', desc: 'Verträge definieren und implementieren', dur: '10 min' },
            { title: 'Abstract Classes', desc: 'Abstrakte Klassen vs Interfaces', dur: '10 min' },
            { title: 'Exceptions', desc: 'try/catch/finally und throws', dur: '10 min' },
            { title: 'Collections: List & Set', desc: 'ArrayList, LinkedList, HashSet', dur: '12 min' },
            { title: 'Collections: Map', desc: 'HashMap und TreeMap', dur: '10 min' },
            { title: 'Generics', desc: 'Typ-Sicherheit mit Generics', dur: '12 min' },
            { title: 'Streams API', desc: 'Funktionale Datenverarbeitung', dur: '12 min' },
            { title: 'Lambda Expressions', desc: 'Anonyme Funktionen in Java', dur: '10 min' },
            { title: 'Optional', desc: 'Null sicher handhaben', dur: '10 min' },
            { title: 'String & StringBuilder', desc: 'Strings effizient verarbeiten', dur: '10 min' },
            { title: 'Enums', desc: 'Typsichere Aufzählungen', dur: '8 min' },
            { title: 'Records', desc: 'Immutable Datenklassen (Java 16)', dur: '10 min' },
            { title: 'Pattern Matching', desc: 'instanceof und switch Patterns', dur: '10 min' },
            { title: 'Multithreading', desc: 'Threads und Synchronisation', dur: '12 min' },
            { title: 'File I/O', desc: 'Dateien lesen und schreiben', dur: '10 min' },
            { title: 'Annotations', desc: 'Metadaten im Code', dur: '10 min' },
            { title: 'Maven & Gradle', desc: 'Build-Tools und Dependency Management', dur: '10 min' },
            { title: 'JUnit Testing', desc: 'Unit-Tests schreiben', dur: '10 min' },
            { title: 'Spring Überblick', desc: 'Das populärste Java-Framework', dur: '12 min' },
            { title: 'Projekt: REST API', desc: 'Eine Java REST-API bauen', dur: '15 min' },
        ]
    },
    csharp: {
        export: 'csharpLessons',
        print: 'Console.WriteLine',
        printWrap: (s) => `Console.WriteLine("${s}");`,
        lessonTopics: [
            { title: 'Hallo Welt & Console', desc: 'Dein erstes C#-Programm', dur: '5 min' },
            { title: 'Variablen & Datentypen', desc: 'Primitive Typen und var', dur: '8 min' },
            { title: 'Operatoren & Ausdrücke', desc: 'Rechnen und Vergleichen in C#', dur: '8 min' },
            { title: 'If-Bedingungen & switch', desc: 'Pattern-basierte Verzweigung', dur: '8 min' },
            { title: 'Schleifen', desc: 'for, foreach, while und do', dur: '10 min' },
            { title: 'Arrays & Listen', desc: 'Feste Arrays und List<T>', dur: '10 min' },
            { title: 'Methoden', desc: 'Eigene Methoden mit Parametern', dur: '10 min' },
            { title: 'Klassen & Objekte', desc: 'OOP-Grundlagen in C#', dur: '12 min' },
            { title: 'Properties', desc: 'Get/Set und Auto-Properties', dur: '10 min' },
            { title: 'Vererbung', desc: 'Basisklassen und override', dur: '12 min' },
            { title: 'Interfaces', desc: 'Verträge definieren und implementieren', dur: '10 min' },
            { title: 'Generics', desc: 'Typsichere generische Klassen', dur: '12 min' },
            { title: 'LINQ', desc: 'Integrierte Datenabfragen', dur: '12 min' },
            { title: 'Exceptions', desc: 'try/catch und eigene Exceptions', dur: '10 min' },
            { title: 'Delegates & Events', desc: 'Callback-Muster in C#', dur: '12 min' },
            { title: 'Lambda Expressions', desc: 'Anonyme Funktionen mit =>', dur: '10 min' },
            { title: 'Async/Await', desc: 'Asynchrone Programmierung', dur: '12 min' },
            { title: 'Nullable Types', desc: 'Null-Sicherheit mit ? und ??', dur: '10 min' },
            { title: 'Records & Structs', desc: 'Value-Typen und immutable Records', dur: '10 min' },
            { title: 'Pattern Matching', desc: 'switch expressions und is-Patterns', dur: '10 min' },
            { title: 'Collections', desc: 'Dictionary, Queue, Stack', dur: '10 min' },
            { title: 'Extension Methods', desc: 'Bestehende Typen erweitern', dur: '10 min' },
            { title: 'Reflection', desc: 'Typen zur Laufzeit inspizieren', dur: '12 min' },
            { title: 'Attributes', desc: 'Metadaten und Annotationen', dur: '10 min' },
            { title: 'File I/O', desc: 'Dateien lesen und schreiben', dur: '10 min' },
            { title: 'Entity Framework', desc: 'ORM für Datenbankzugriff', dur: '12 min' },
            { title: 'ASP.NET Basics', desc: 'Webanwendungen mit .NET', dur: '12 min' },
            { title: 'Unit Testing', desc: 'xUnit und NUnit', dur: '10 min' },
            { title: 'Dependency Injection', desc: 'Lose Kopplung von Komponenten', dur: '12 min' },
            { title: 'Projekt: Web API', desc: 'Eine .NET API bauen', dur: '15 min' },
        ]
    },
    swift: {
        export: 'swiftLessons',
        print: 'print',
        printWrap: (s) => `print("${s}")`,
        lessonTopics: [
            { title: 'Hallo Welt & print', desc: 'Dein erstes Swift-Programm', dur: '5 min' },
            { title: 'Variablen: var & let', desc: 'Veränderliche und konstante Werte', dur: '8 min' },
            { title: 'Datentypen & Optionals', desc: 'Sichere Null-Behandlung', dur: '10 min' },
            { title: 'If-Bedingungen & guard', desc: 'Sicherer Kontrollfluss', dur: '8 min' },
            { title: 'Schleifen & ranges', desc: 'for-in und while Schleifen', dur: '8 min' },
            { title: 'Funktionen', desc: 'Funktionen mit benannten Parametern', dur: '10 min' },
            { title: 'Arrays & Dictionaries', desc: 'Sammlungen in Swift', dur: '10 min' },
            { title: 'Closures', desc: 'Anonyme Funktionen in Swift', dur: '12 min' },
            { title: 'Structs vs Classes', desc: 'Value-Types und Reference-Types', dur: '12 min' },
            { title: 'Enums & Associated Values', desc: 'Mächtige Aufzählungen', dur: '10 min' },
            { title: 'Protocols', desc: 'Interfaces in Swift', dur: '10 min' },
            { title: 'Extensions', desc: 'Bestehende Typen erweitern', dur: '10 min' },
            { title: 'Error Handling', desc: 'do-try-catch in Swift', dur: '10 min' },
            { title: 'Generics', desc: 'Generischer Code', dur: '12 min' },
            { title: 'Access Control', desc: 'public, private, internal', dur: '8 min' },
            { title: 'Property Wrappers', desc: '@State, @Binding und mehr', dur: '12 min' },
            { title: 'Concurrency', desc: 'async/await in Swift', dur: '12 min' },
            { title: 'Actors', desc: 'Thread-sichere Datentypen', dur: '12 min' },
            { title: 'Collection Protocols', desc: 'Sequence und Collection', dur: '10 min' },
            { title: 'Result Builder', desc: 'DSLs wie SwiftUI erstellen', dur: '12 min' },
            { title: 'Key Paths', desc: 'Referenzen auf Properties', dur: '10 min' },
            { title: 'Codable & JSON', desc: 'JSON serialisieren und parsen', dur: '10 min' },
            { title: 'SwiftUI Grundlagen', desc: 'Deklarative UI-Entwicklung', dur: '12 min' },
            { title: 'SwiftUI State', desc: 'State Management in SwiftUI', dur: '12 min' },
            { title: 'URLSession', desc: 'Netzwerk-Anfragen senden', dur: '10 min' },
            { title: 'Core Data', desc: 'Lokale Datenbank auf Apple-Geräten', dur: '12 min' },
            { title: 'Swift Package Manager', desc: 'Abhängigkeiten verwalten', dur: '10 min' },
            { title: 'XCTest', desc: 'Unit-Tests schreiben', dur: '10 min' },
            { title: 'Memory Management', desc: 'ARC und weak/unowned', dur: '12 min' },
            { title: 'Projekt: iOS App', desc: 'Eine einfache iOS-App bauen', dur: '15 min' },
        ]
    },
    kotlin: {
        export: 'kotlinLessons',
        print: 'println',
        printWrap: (s) => `println("${s}")`,
        lessonTopics: [
            { title: 'Hallo Welt & println', desc: 'Dein erstes Kotlin-Programm', dur: '5 min' },
            { title: 'Variablen: val & var', desc: 'Unveränderliche und veränderliche Werte', dur: '8 min' },
            { title: 'Datentypen & Null Safety', desc: 'Sichere Null-Behandlung mit ?', dur: '10 min' },
            { title: 'If-Bedingungen & when', desc: 'Kotlins elegante Verzweigung', dur: '8 min' },
            { title: 'Schleifen & Ranges', desc: 'for und while mit Ranges', dur: '8 min' },
            { title: 'Funktionen', desc: 'Top-Level und Extension Functions', dur: '10 min' },
            { title: 'Collections', desc: 'List, Set und Map', dur: '10 min' },
            { title: 'Lambda Expressions', desc: 'Anonyme Funktionen in Kotlin', dur: '10 min' },
            { title: 'Klassen & OOP', desc: 'Objektorientiertes Kotlin', dur: '12 min' },
            { title: 'Data Classes', desc: 'Datenklassen für weniger Boilerplate', dur: '10 min' },
            { title: 'Sealed Classes', desc: 'Eingeschränkte Hierarchien', dur: '10 min' },
            { title: 'Enums & Companion', desc: 'Aufzählungen und statische Member', dur: '10 min' },
            { title: 'Generics', desc: 'Generische Typen in Kotlin', dur: '12 min' },
            { title: 'Extensions', desc: 'Bestehende Klassen erweitern', dur: '10 min' },
            { title: 'Scope Functions', desc: 'let, run, apply, also, with', dur: '10 min' },
            { title: 'Coroutines Basics', desc: 'Asynchrone Programmierung', dur: '12 min' },
            { title: 'Coroutines Advanced', desc: 'Flows und Channels', dur: '12 min' },
            { title: 'Delegation', desc: 'by und delegates', dur: '10 min' },
            { title: 'Destructuring', desc: 'Werte auspacken', dur: '8 min' },
            { title: 'Inline Functions', desc: 'Performance mit inline', dur: '10 min' },
            { title: 'Annotation Processing', desc: 'Metaprogrammierung', dur: '12 min' },
            { title: 'Sequences', desc: 'Lazy Evaluation', dur: '10 min' },
            { title: 'Type Aliases', desc: 'Typen umbenennen', dur: '8 min' },
            { title: 'DSLs in Kotlin', desc: 'Eigene DSLs erstellen', dur: '12 min' },
            { title: 'Serialization', desc: 'JSON mit kotlinx.serialization', dur: '10 min' },
            { title: 'Ktor', desc: 'HTTP-Client und Server', dur: '12 min' },
            { title: 'Android Basics', desc: 'Kotlin für Android', dur: '12 min' },
            { title: 'Jetpack Compose', desc: 'Deklarative Android-UI', dur: '12 min' },
            { title: 'Testing', desc: 'Tests mit JUnit und MockK', dur: '10 min' },
            { title: 'Projekt: Android App', desc: 'Eine Android-App bauen', dur: '15 min' },
        ]
    },
    php: {
        export: 'phpLessons',
        print: 'echo',
        printWrap: (s) => `echo "${s}";`,
        lessonTopics: [
            { title: 'Hallo Welt & echo', desc: 'Dein erstes PHP-Programm', dur: '5 min' },
            { title: 'Variablen & $', desc: 'Variablen mit Dollar-Zeichen', dur: '8 min' },
            { title: 'Datentypen & Casting', desc: 'Strings, Integers und Arrays', dur: '8 min' },
            { title: 'If/elseif/else', desc: 'Bedingungen in PHP', dur: '8 min' },
            { title: 'Schleifen', desc: 'for, foreach, while und do', dur: '10 min' },
            { title: 'Funktionen', desc: 'Eigene Funktionen definieren', dur: '10 min' },
            { title: 'Arrays', desc: 'Numerische und assoziative Arrays', dur: '10 min' },
            { title: 'Strings', desc: 'String-Funktionen und Interpolation', dur: '10 min' },
            { title: 'Klassen & OOP', desc: 'Objektorientiertes PHP', dur: '12 min' },
            { title: 'Vererbung & Interfaces', desc: 'extends und implements', dur: '12 min' },
            { title: 'Traits', desc: 'Code-Wiederverwendung mit Traits', dur: '10 min' },
            { title: 'Namespaces', desc: 'Code organisieren', dur: '10 min' },
            { title: 'Error Handling', desc: 'try/catch und Exceptions', dur: '10 min' },
            { title: 'Superglobals', desc: '$_GET, $_POST, $_SESSION', dur: '10 min' },
            { title: 'Dateien lesen/schreiben', desc: 'File I/O in PHP', dur: '10 min' },
            { title: 'Regular Expressions', desc: 'Muster mit preg_match', dur: '10 min' },
            { title: 'Datenbanken mit PDO', desc: 'MySQL/SQLite mit PDO', dur: '12 min' },
            { title: 'Sessions & Cookies', desc: 'User-Sessions verwalten', dur: '10 min' },
            { title: 'JSON Handling', desc: 'json_encode und json_decode', dur: '8 min' },
            { title: 'Composer', desc: 'PHP-Dependency-Manager', dur: '10 min' },
            { title: 'Type Declarations', desc: 'Strikte Typisierung in PHP 8', dur: '10 min' },
            { title: 'Enums (PHP 8.1)', desc: 'Typ-sichere Aufzählungen', dur: '10 min' },
            { title: 'Fibers', desc: 'Lightweight Concurrency (PHP 8.1)', dur: '12 min' },
            { title: 'Named Arguments', desc: 'Benannte Parameter (PHP 8)', dur: '8 min' },
            { title: 'Match Expression', desc: 'Modernes switch mit match', dur: '8 min' },
            { title: 'Laravel Grundlagen', desc: 'Das populärste PHP-Framework', dur: '12 min' },
            { title: 'Laravel Routing', desc: 'Routen und Controller', dur: '12 min' },
            { title: 'Laravel Eloquent', desc: 'ORM für Datenbanken', dur: '12 min' },
            { title: 'PHPUnit Testing', desc: 'Unit-Tests schreiben', dur: '10 min' },
            { title: 'Projekt: Blog-Engine', desc: 'Einen Blog mit PHP bauen', dur: '15 min' },
        ]
    },
    ruby: {
        export: 'rubyLessons',
        print: 'puts',
        printWrap: (s) => `puts "${s}"`,
        lessonTopics: [
            { title: 'Hallo Welt & puts', desc: 'Dein erstes Ruby-Programm', dur: '5 min' },
            { title: 'Variablen & Datentypen', desc: 'Dynamische Typisierung in Ruby', dur: '8 min' },
            { title: 'Strings & Symbole', desc: 'Text und unveränderliche Identifier', dur: '8 min' },
            { title: 'If/unless & Ternary', desc: 'Rubys elegante Bedingungen', dur: '8 min' },
            { title: 'Schleifen & Iteratoren', desc: 'each, times, loop und while', dur: '10 min' },
            { title: 'Methoden', desc: 'Eigene Methoden mit def', dur: '10 min' },
            { title: 'Arrays', desc: 'Listen und Array-Methoden', dur: '10 min' },
            { title: 'Hashes', desc: 'Schlüssel-Wert-Paare', dur: '10 min' },
            { title: 'Blocks & Procs', desc: 'Code-Blöcke als Objekte', dur: '12 min' },
            { title: 'Klassen & Objekte', desc: 'OOP in Ruby', dur: '12 min' },
            { title: 'Module & Mixins', desc: 'Code-Wiederverwendung mit Modules', dur: '10 min' },
            { title: 'Vererbung', desc: 'Klassen erweitern', dur: '10 min' },
            { title: 'Exceptions', desc: 'begin/rescue/ensure', dur: '10 min' },
            { title: 'Regular Expressions', desc: 'Muster mit /regex/', dur: '10 min' },
            { title: 'Enumerables', desc: 'map, select, reduce und Co.', dur: '12 min' },
            { title: 'Lambdas & Closures', desc: 'Stabby Lambdas und Procs', dur: '10 min' },
            { title: 'File I/O', desc: 'Dateien lesen und schreiben', dur: '10 min' },
            { title: 'Metaprogramming', desc: 'define_method und method_missing', dur: '12 min' },
            { title: 'Open Classes', desc: 'Bestehende Klassen erweitern', dur: '10 min' },
            { title: 'Gems & Bundler', desc: 'Pakete verwalten', dur: '10 min' },
            { title: 'Testing mit RSpec', desc: 'BDD-Tests schreiben', dur: '10 min' },
            { title: 'JSON & APIs', desc: 'JSON parsen und generieren', dur: '10 min' },
            { title: 'Concurrency', desc: 'Threads und Ractors', dur: '12 min' },
            { title: 'Pattern Matching', desc: 'case/in Patterns (Ruby 3)', dur: '10 min' },
            { title: 'Rails Grundlagen', desc: 'Das berühmteste Ruby-Framework', dur: '12 min' },
            { title: 'Rails MVC', desc: 'Models, Views und Controllers', dur: '12 min' },
            { title: 'ActiveRecord', desc: 'ORM für Datenbanken', dur: '12 min' },
            { title: 'Rails Routing', desc: 'RESTful Routen', dur: '10 min' },
            { title: 'Rake Tasks', desc: 'Automatisierung mit Rake', dur: '10 min' },
            { title: 'Projekt: Web-App', desc: 'Eine Webanwendung mit Ruby bauen', dur: '15 min' },
        ]
    },
};

// ── Helper function to generate lesson content ────────────────────────

function generateLesson(lang, topic, index) {
    const id = index + 1;
    const { print, printWrap } = curricula[lang];

    // For first 12 lessons, reference existing content marker
    // For lessons 13-30, generate new content

    const confirmation = id <= 4
        ? topic.title.split(' ')[0] + ' verstanden!'
        : id <= 12
            ? topic.title.split('&')[0].trim() + ' verstanden!'
            : topic.title.split('&')[0].trim() + ' gemeistert!';

    const theoryHTML = generateTheory(lang, topic, id);

    return `    {
        id: ${id},
        title: '${topic.title.replace(/'/g, "\\'")}',
        description: '${topic.desc.replace(/'/g, "\\'")}',
        duration: '${topic.dur}',
        theory: \`
${theoryHTML}
    \`,
        exercise: {
            instructions: 'Gib "${confirmation}" aus.',
            starterCode: '// ${topic.title}\\n',
            expectedOutput: '${confirmation}',
            hint: '${printWrap(confirmation).replace(/'/g, "\\'")}'
        },
        quiz: [
            { question: 'Was hast du in dieser Lektion gelernt?', options: ['${topic.title.replace(/'/g, "\\'")}', 'Nichts Neues', 'Nur Theorie', 'Nur Praxis'], correct: 0 },
            { question: 'Wie schwer war diese Lektion?', options: ['Zu einfach', 'Genau richtig', 'Etwas schwer', 'Zu schwer'], correct: 1 }
        ]
    }`;
}

function generateTheory(lang, topic, id) {
    const emoji = ['🚀', '📦', '🔄', '🔀', '🔧', '📋', '🏗️', '⚡', '🛡️', '✨', '📄', '🎀', '🔗', '🧩', '🎯', '💡', '🔒', '⏳', '🧮', '🌐', '🎨', '🔥', '💪', '🎮', '📡', '🗄️', '📦', '🧪', '🏃', '🏆'][id - 1] || '📚';

    return `<h2>${topic.title} ${emoji}</h2>
<p>${topic.desc}. In dieser Lektion lernst du die wichtigsten Konzepte und Techniken.</p>

<h3>Grundlagen</h3>
<pre class="code-block">// ${topic.title} – Beispielcode
// Hier siehst du die Grundlagen dieses Themas</pre>

<h3>Wichtige Konzepte</h3>
<ul>
  <li>Grundlegendes Verständnis von ${topic.title}</li>
  <li>Praktische Anwendung im Code</li>
  <li>Best Practices und häufige Fehler</li>
</ul>

<h3>Praxis-Tipps</h3>
<p>Übe diese Konzepte regelmäßig und baue eigene kleine Projekte damit!</p>`;
}

// ── Generate all lesson files ─────────────────────────────────────────

for (const [lang, config] of Object.entries(curricula)) {
    const lessons = config.lessonTopics.map((topic, i) => generateLesson(lang, topic, i));

    const fileContent = `export const ${config.export} = [
${lessons.join(',\n')}
];
`;

    const filePath = join(outputDir, `${lang}.js`);
    writeFileSync(filePath, fileContent, 'utf8');
    console.log(`✅ Generated ${filePath} (${config.lessonTopics.length} lessons)`);
}

console.log(`\n🎉 Done! Generated ${Object.keys(curricula).length} language files.`);
