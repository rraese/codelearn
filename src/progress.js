// Progress tracking via localStorage
const STORAGE_KEY = 'codelearn_progress';

export function getProgress() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : {};
    } catch {
        return {};
    }
}

export function saveProgress(progress) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function markLessonComplete(languageId, lessonId) {
    const progress = getProgress();
    if (!progress[languageId]) {
        progress[languageId] = { completed: [] };
    }
    if (!progress[languageId].completed.includes(lessonId)) {
        progress[languageId].completed.push(lessonId);
    }
    saveProgress(progress);
}

export function isLessonComplete(languageId, lessonId) {
    const progress = getProgress();
    return progress[languageId]?.completed?.includes(lessonId) || false;
}

export function getCompletedCount(languageId) {
    const progress = getProgress();
    return progress[languageId]?.completed?.length || 0;
}
