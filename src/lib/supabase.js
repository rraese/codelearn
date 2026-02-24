import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://kyyqurzqlfrsvexvekwt.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt5eXF1cnpxbGZyc3ZleHZla3d0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5NjA4ODcsImV4cCI6MjA4NzUzNjg4N30.u22JDp6dYhlzDp8kaLquA2S7ehc4Yk2Cj5m6aCJzcQU';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
