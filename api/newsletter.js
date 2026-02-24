// In-memory rate limiter: 3 requests per hour per IP
const rateLimit = new Map();
const RATE_LIMIT_WINDOW = 3600 * 1000;
const RATE_LIMIT_MAX = 3;

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
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const ip =
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.socket?.remoteAddress ||
    'unknown';
  if (isRateLimited(ip, RATE_LIMIT_WINDOW, RATE_LIMIT_MAX)) {
    return res.status(429).json({ error: 'Too many requests. Please wait before trying again.' });
  }

  const { name, email, role } = req.body || {};

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email address is required.' });
  }
  if (email.length > 254) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }
  if (name && typeof name === 'string' && name.length > 100) {
    return res.status(400).json({ error: 'Name too long.' });
  }

  const webhookUrl = process.env.N8N_NEWSLETTER_WEBHOOK;
  if (!webhookUrl) {
    console.error('N8N_NEWSLETTER_WEBHOOK not configured');
    return res.status(500).json({ error: 'Service configuration error. Please contact hearn.sa@gmail.com.' });
  }

  try {
    const payload = {
      name: (name || '').trim().slice(0, 100),
      email: email.trim().toLowerCase(),
      role: (role || 'other').trim().slice(0, 50),
      timestamp: new Date().toISOString(),
      source: 'fg2g-rwfw.com'
    };

    const n8nRes = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!n8nRes.ok) {
      console.error('n8n newsletter webhook error:', n8nRes.status);
      return res.status(502).json({ error: 'Unable to process signup. Please try again.' });
    }

    return res.status(200).json({ success: true, message: 'You\'re subscribed! Check your inbox for a welcome email.' });
  } catch (err) {
    console.error('Newsletter handler error:', err);
    return res.status(500).json({ error: 'Something went wrong. Please try again shortly.' });
  }
}
