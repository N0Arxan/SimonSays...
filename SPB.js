import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
    
const SUPABASE_URL = 'https://pexuxvwqvbozsptyssel.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBleHV4dndxdmJvenNwdHlzc2VsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc1NjcwMjAsImV4cCI6MjA1MzE0MzAyMH0.dRdYfw7VuL9LTbuD0gAlpvUXaI3A2Rju88KRAstTU-4';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
window.saveScore = async function (playerName, score) {
const { error } = await supabase
    .from('scores')
    .insert([{ player_name: playerName, score: score }]);
    if (error) console.error('Error:', error);
}
window.fetchHighScore = async function() {
    const { data, error } = await supabase
    .from('scores')
    .select('player_name, score')
    .order('score', { ascending: false })
    .limit(2);
    return data || [];
}