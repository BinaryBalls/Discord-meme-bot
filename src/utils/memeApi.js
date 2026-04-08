const MEME_API_BASE = 'https://meme-api.com/gimme';

export async function fetchMeme(category) {
  const endpoint = category ? `${MEME_API_BASE}/${encodeURIComponent(category)}` : MEME_API_BASE;
  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      'User-Agent': 'DiscordMemeBot/1.0'
    }
  });

  if (!response.ok) {
    throw new Error(`Meme API request failed with status ${response.status}`);
  }

  const data = await response.json();

  if (!data?.url || !data?.title) {
    throw new Error('Meme API returned malformed data');
  }

  return data;
}
