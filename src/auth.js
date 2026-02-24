import { supabase } from './lib/supabase.js';

// Current user state
let currentUser = null;
let userProfile = null;
const authListeners = [];

// Initialize auth - call once on app start
export async function initAuth() {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
        currentUser = session.user;
        await loadProfile();
    }

    supabase.auth.onAuthStateChange(async (event, session) => {
        currentUser = session?.user || null;
        if (currentUser) {
            await loadProfile();
        } else {
            userProfile = null;
        }
        authListeners.forEach(cb => cb(currentUser, event));
    });
}

// Register a callback for auth state changes
export function onAuthChange(callback) {
    authListeners.push(callback);
    return () => {
        const idx = authListeners.indexOf(callback);
        if (idx > -1) authListeners.splice(idx, 1);
    };
}

// Sign up with email and password
export async function signUp(email, password) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;

    // Create profile
    if (data.user) {
        await supabase.from('profiles').upsert({
            id: data.user.id,
            email: email,
            tier: 'free',
        });
    }

    return data;
}

// Sign in with email and password
export async function signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
}

// Sign out
export async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    currentUser = null;
    userProfile = null;
}

// Get current user
export function getUser() {
    return currentUser;
}

// Get user profile (includes tier)
export function getProfile() {
    return userProfile;
}

// Get user tier
export function getUserTier() {
    return userProfile?.tier || 'free';
}

// Load user profile from Supabase
async function loadProfile() {
    if (!currentUser) return;
    const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', currentUser.id)
        .single();
    userProfile = data;
}
