// In-memory rate limiter: 10 requests per minute per IP
const rateLimit = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000;
const RATE_LIMIT_MAX = 10;

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateLimit.get(ip) || { count: 0, windowStart: now };
  if (now - entry.windowStart > RATE_LIMIT_WINDOW) {
    entry.count = 1;
    entry.windowStart = now;
  } else {
    entry.count++;
  }
  rateLimit.set(ip, entry);
  return entry.count > RATE_LIMIT_MAX;
}

const VALID_ROLES = ['user', 'assistant'];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Rate limiting
  const ip =
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.socket?.remoteAddress ||
    'unknown';
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests. Please wait a moment before trying again.' });
  }

  const { message, history = [] } = req.body || {};

  // Input validation
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required' });
  }
  if (message.length > 2000) {
    return res.status(400).json({ error: 'Message too long. Please keep messages under 2000 characters.' });
  }
  if (!Array.isArray(history) || history.length > 20) {
    return res.status(400).json({ error: 'Invalid request format.' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Service configuration error. Please contact hearn.sa@gmail.com.' });
  }

  const systemPrompt = `You are Rooty 🌱, a friendly, warm, and knowledgeable assistant for the Root Work Framework (RWFW) — a healing-centered, trauma-informed pedagogical system created by Dr. Shawn A. Hearn, Ed.D., J.D.

## About the Root Work Framework
The Root Work Framework is a dual-purpose pedagogy that weaves academic rigor with healing-centered, biophilic practice. It transforms K-12 education by addressing the impacts of adverse childhood experiences (ACEs) through STEAM classrooms, Living Learning Labs, and restorative relationships.

## The 5Rs Framework
Five core phases, each building on the others:
1. **Root** — Connect to purpose, culture, and place. Ground learning in students' identities and community contexts.
2. **Regulate** — Prepare mind and body for learning through rituals, rhythms, and co-regulation practices.
3. **Reflect** — Encourage self-assessment, metacognition, and meaning-making through structured reflection.
4. **Restore** — Address harm, repair relationships, and rebuild trust through restorative practices.
5. **Reconnect** — Apply learning to community and environment, fostering agency and civic engagement.

## 3 Pillars
Healing-Centered Pedagogy, Academic Rigor, and Biophilic Design.

## SAMHSA Alignment
Built on SAMHSA's 6 principles for trauma-informed care: Safety, Trustworthiness, Peer Support, Collaboration, Empowerment, and Cultural Responsiveness.

## Who We Serve
- K-12 Educators — Lesson planning tools, professional development, classroom resources grounded in the 5Rs
- Homeschool Families — Living Learning Labs, journaling prompts, micro-economy projects
- Charter Schools — Implementation sequences, fidelity tools, data tracking for whole-school adoption
- Alternative Education — Healing-centered routines for detention, therapeutic, and justice-involved youth settings
- Juvenile Justice Programs — Restorative practices, therapeutic horticulture, reentry-focused curricula
- Teacher Preparation Programs — Graduate-level coursework and healing-centered instructional frameworks
- Community Centers — After-school programs and family engagement workshops

## The Root Work Ecosystem
- AI Lesson Generator — Generate healing-centered, standards-aligned lesson plans using the 5Rs
- Professional Development — Online courses, workshops, speaking engagements nationwide
- Resource Library — Toolkits, templates, rubrics, and research-backed materials
- Living Learning Labs — Therapeutic gardens, sustainability projects, biophilic learning spaces
- Published Works — Evidence-based books by Dr. Shawn A. Hearn
- Community Network — Educators and advocates advancing Rerooted Learning

## About Dr. Shawn A. Hearn
Dr. Shawn A. Hearn, Ed.D., J.D., is a legal and educational professional, U.S. military veteran, and founder of Community Exceptional Children's Services (CECS). With certifications in Secondary Education, Educational Leadership, and Special Education (EBD endorsement), Dr. Hearn brings decades of experience serving students with disabilities, justice-involved youth, and communities affected by trauma. He authored "From Garden to Growth: Building Trauma-Informed STEAM Classrooms through Living Learning Labs" and "The Law of Learning: Education, Policy, and Legal Frameworks in K-12 Schools."

## Contact
Email: hearn.sa@gmail.com

## Your Behavior
- Respond in a warm, concise, healing-centered tone that mirrors the framework's values
- Keep answers brief — 2-4 sentences for simple questions, a short paragraph for complex ones
- If someone asks to schedule a consultation, book a meeting, set up a call, or talk to Dr. Hearn, include the exact token [OPEN_SCHEDULER] on its own line in your reply
- Only answer questions about the Root Work Framework, its content, Dr. Hearn, and related educational topics
- If asked something outside your scope, gently redirect to relevant RWFW topics`;

  // Sanitize history: only allow valid roles and string content
  const messages = [
    ...history
      .filter(h => h && VALID_ROLES.includes(h.role) && typeof h.content === 'string')
      .map(h => ({ role: h.role, content: h.content.slice(0, 2000) })),
    { role: 'user', content: message }
  ];

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 512,
        system: systemPrompt,
        messages
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Anthropic API error:', response.status, errText);
      return res.status(502).json({ error: 'Unable to reach assistant. Please try again.' });
    }

    const data = await response.json();
    const reply = data.content?.[0]?.text ||
      "I'm not sure how to answer that. Feel free to email hearn.sa@gmail.com for direct support.";

    return res.status(200).json({ reply });
  } catch (err) {
    console.error('Chat handler error:', err);
    return res.status(500).json({ error: 'Something went wrong. Please try again shortly.' });
  }
}
