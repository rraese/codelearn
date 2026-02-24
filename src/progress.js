import { supabase } from './lib/supabase.js';
import { getUser } from './auth.js';

// Progress tracking – Supabase primary (if logged in), localStorage fallback
const STORAGE_KEY = 'codelearn_progress';

// ---- Local Storage ----
function getLocalProgress() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : {};
    } catch {
        return {};
    }
}

function saveLocalProgress(progress) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

// ---- Supabase Cloud ----
async function getCloudProgress(userId) {
    const { data, error } = await supabase
        .from('user_progress')
        .select('language_id, lesson_id')
        .eq('user_id', userId);

    if (error) {
        console.error('Error loading cloud progress:', error);
        return {};
    }

    const progress = {};
    for (const row of data || []) {
        if (!progress[row.language_id]) {
            progress[row.language_id] = { completed: [] };
        }
        if (!progress[row.language_id].completed.includes(row.lesson_id)) {
            progress[row.language_id].completed.push(row.lesson_id);
        }
    }
    return progress;
}

async function saveToCloud(userId, languageId, lessonId) {
    const { error } = await supabase
        .from('user_progress')
        .upsert({
            user_id: userId,
            language_id: languageId,
            lesson_id: lessonId,
        }, { onConflict: 'user_id,language_id,lesson_id' });

    if (error) {
        console.error('Error saving cloud progress:', error);
    }
}

// ---- Sync: upload local progress to cloud on login ----
export async function syncProgressToCloud() {
    const user = getUser();
    if (!user) return;

    const local = getLocalProgress();
    for (const [langId, langData] of Object.entries(local)) {
        for (const lessonId of langData.completed || []) {
            await saveToCloud(user.id, langId, lessonId);
        }
    }
}

// ---- Public API ----
let cachedProgress = null;

export async function loadProgress() {
    const user = getUser();
    if (user) {
        cachedProgress = await getCloudProgress(user.id);
        // Merge with local
        const local = getLocalProgress();
        for (const [langId, langData] of Object.entries(local)) {
            if (!cachedProgress[langId]) {
                cachedProgress[langId] = { completed: [] };
            }
            for (const id of langData.completed || []) {
                if (!cachedProgress[langId].completed.includes(id)) {
                    cachedProgress[langId].completed.push(id);
                }
            }
        }
    } else {
        cachedProgress = getLocalProgress();
    }
    return cachedProgress;
}

export function getProgress() {
    if (cachedProgress) return cachedProgress;
    return getLocalProgress();
}

export function saveProgress(progress) {
    saveLocalProgress(progress);
    cachedProgress = progress;
}

export async function markLessonComplete(languageId, lessonId) {
    // Save locally
    const progress = getProgress();
    if (!progress[languageId]) {
        progress[languageId] = { completed: [] };
    }
    if (!progress[languageId].completed.includes(lessonId)) {
        progress[languageId].completed.push(lessonId);
    }
    saveProgress(progress);

    // Save to cloud if logged in
    const user = getUser();
    if (user) {
        await saveToCloud(user.id, languageId, lessonId);
    }
}

export function isLessonComplete(languageId, lessonId) {
    const progress = getProgress();
    return progress[languageId]?.completed?.includes(lessonId) || false;
}

export function getCompletedCount(languageId) {
    const progress = getProgress();
    return progress[languageId]?.completed?.length || 0;
}
