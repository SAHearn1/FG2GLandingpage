// In-memory rate limiter: 10 requests per minute per IP
const rateLimit = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000;
const RATE_LIMIT_MAX = 10;

function isRateLimited(ip, windowMs, maxRequests) {
  const now = Date.now();
  const entry = rateLimit.get(ip) || { count: 0, windowStart: now };
  if (now - entry.windowStart > windowMs) {
    entry.count = 1;
    entry.windowStart = now;
  } else {
    entry.count++;
  }
  rateLimit.set(ip, entry);
  return entry.count > maxRequests;
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const ip =
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.socket?.remoteAddress ||
    'unknown';
  if (isRateLimited(ip, RATE_LIMIT_WINDOW, RATE_LIMIT_MAX)) {
    return res.status(429).json({ error: 'Too many requests. Please wait before trying again.' });
  }

  const { token } = req.query || {};

  if (!token || typeof token !== 'string' || token.length < 8) {
    return res.status(400).send(renderPage('Invalid unsubscribe link. Please contact hearn.sa@gmail.com for help.', false));
  }

  const webhookUrl = process.env.N8N_UNSUBSCRIBE_WEBHOOK;
  if (!webhookUrl) {
    console.error('N8N_UNSUBSCRIBE_WEBHOOK not configured');
    return res.status(500).send(renderPage('Service error. Please contact hearn.sa@gmail.com.', false));
  }

  try {
    const n8nRes = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: token.slice(0, 128), timestamp: new Date().toISOString() })
    });

    if (!n8nRes.ok) {
      console.error('n8n unsubscribe webhook error:', n8nRes.status);
      return res.status(502).send(renderPage('Unable to process your request. Please try again or email hearn.sa@gmail.com.', false));
    }

    res.setHeader('Content-Type', 'text/html');
    return res.status(200).send(renderPage('You\'ve been successfully unsubscribed from the Root Work Framework newsletter. We\'re sorry to see you go. You can re-subscribe anytime at fg2g-rwfw.com.', true));
  } catch (err) {
    console.error('Unsubscribe handler error:', err);
    return res.status(500).send(renderPage('Something went wrong. Please email hearn.sa@gmail.com for help.', false));
  }
}

function renderPage(message, success) {
  const color = success ? '#3B523A' : '#8B0000';
  const icon = success ? '✅' : '⚠️';
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${success ? 'Unsubscribed' : 'Error'} — Root Work Framework</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #F2F4CA; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }
    .card { background: #fff; border-radius: 12px; padding: 48px 40px; max-width: 480px; text-align: center; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
    .icon { font-size: 48px; margin-bottom: 16px; }
    h1 { color: #082A19; font-size: 24px; margin: 0 0 12px; }
    p { color: #555; line-height: 1.6; margin: 0 0 24px; }
    a { display: inline-block; background: ${color}; color: #fff; text-decoration: none; padding: 12px 28px; border-radius: 999px; font-weight: 600; }
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">${icon}</div>
    <h1>Root Work Framework</h1>
    <p>${message}</p>
    <a href="https://fg2g-rwfw.com">Return Home</a>
  </div>
</body>
</html>`;
}
