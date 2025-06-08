import fetch from 'node-fetch';

export default async function handler(req, res) {
  const url = req.query.url;
  if (!url) {
    res.status(400).send('Missing url param');
    return;
  }
  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': req.headers['user-agent'] || '' },
    });
    const body = await response.text();

    // For now, just return the raw HTML (no URL rewriting)
    res.status(response.status).send(body);
  } catch (e) {
    res.status(500).send('Error fetching the page');
  }
}
