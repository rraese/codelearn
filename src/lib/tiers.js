import { getUserTier } from '../auth.js';

// Free tier: lessons 1-4, Pro tier: all lessons
const FREE_LESSON_LIMIT = 4;

export function isLessonAccessible(lessonId) {
    const tier = getUserTier();
    if (tier === 'pro') return true;
    return lessonId <= FREE_LESSON_LIMIT;
}

export function isProLesson(lessonId) {
    return lessonId > FREE_LESSON_LIMIT;
}

export function getFreeLessonLimit() {
    return FREE_LESSON_LIMIT;
}

export const tierFeatures = {
    free: {
        name: 'Free',
        price: '0€',
        features: [
            '12 Programmiersprachen',
            '4 Lektionen pro Sprache',
            'Code-Editor im Browser',
            'Interaktive Quizzes',
            'Fortschritt speichern',
        ],
    },
    pro: {
        name: 'Pro',
        price: '9,99€/Monat',
        features: [
            'Alles aus Free',
            'Alle 30 Lektionen pro Sprache',
            'Fortgeschrittene Themen',
            'Prioritäts-Support',
            'Keine Werbung',
            'Zertifikate (bald)',
        ],
    },
};
