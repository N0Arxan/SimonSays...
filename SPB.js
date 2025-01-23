// Remove all Supabase client code and use these instead

const WORKER_URL = 'https://supabase-proxy.arshan-hz.workers.dev/api';

window.saveScore = async function (playerName, score) {
  try {
    const response = await fetch(`${WORKER_URL}/scores`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([{ player_name: playerName, score: score }])
    });
    
    if (!response.ok) throw new Error('Save failed');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
  }
}

window.fetchHighScore = async function() {
  try {
    const response = await fetch(`${WORKER_URL}/scores?select=player_name,score&order=score.desc&limit=3`);
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}