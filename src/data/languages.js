export const languages = [
    {
        id: 'python',
        name: 'Python',
        icon: '🐍',
        description: 'Die beliebteste Sprache für Einsteiger, Data Science und KI. Einfach zu lernen, mächtig im Einsatz.',
        difficulty: 'Einsteiger',
        difficultyClass: 'beginner',
        accentColor: 'var(--python-primary)',
        secondaryColor: 'var(--python-secondary)',
        glowColor: 'var(--python-glow)',
    },
    {
        id: 'javascript',
        name: 'JavaScript',
        icon: '⚡',
        description: 'Die Sprache des Webs. Unverzichtbar für interaktive Websites, Apps und Serveranwendungen.',
        difficulty: 'Einsteiger',
        difficultyClass: 'beginner',
        accentColor: 'var(--js-primary)',
        secondaryColor: 'var(--js-secondary)',
        glowColor: 'var(--js-glow)',
    },
    {
        id: 'rust',
        name: 'Rust',
        icon: '⚙️',
        description: 'Schnell, sicher und modern. Die Zukunft der Systemprogrammierung – ohne Kompromisse.',
        difficulty: 'Fortgeschritten',
        difficultyClass: 'intermediate',
        accentColor: 'var(--rust-primary)',
        secondaryColor: 'var(--rust-secondary)',
        glowColor: 'var(--rust-glow)',
    }
];

export function getLanguage(id) {
    return languages.find(l => l.id === id);
}
