# Root Work Framework — Landing Page

Lead landing page for the Root Work Framework (RWFW) Learning Management System.

**Live site:** https://fg2g-rwfw.com  
**Platform:** Vercel (serverless)  
**Owner:** Dr. Shawn A. Hearn, Ed.D., J.D.

---

## Overview

The Root Work Framework is a dual-purpose pedagogy weaving academic rigor with healing-centered, biophilic practice, built on the 5Rs Framework: Root, Regulate, Reflect, Restore, Reconnect.

This repository contains the public landing page, which includes:
- Main landing page with chatbot (Rooty AI, powered by Claude)
- Savannah Initiative partnership page
- Newsletter and consultation form integrations via n8n
- Privacy Policy, Terms of Service, and Security Policy pages

---

## Project Structure

```
FG2GLandingpage/
├── index.html                  # Main landing page
├── savannah-initiative.html    # Savannah Initiative page
├── privacy.html                # Privacy Policy (/privacy)
├── terms.html                  # Terms of Service (/terms)
├── security-policy.html        # Security Policy (/security-policy)
├── 404.html                    # Custom 404 error page
├── api/
│   ├── chat.js                 # Claude AI chatbot (Anthropic API)
│   ├── consultation.js         # Consultation form → n8n webhook
│   ├── newsletter.js           # Newsletter signup → n8n webhook
│   └── unsubscribe.js          # Unsubscribe handler → n8n webhook
├── icons/                      # Site icons and images
├── .well-known/
│   └── security.txt            # Security disclosure policy
├── vercel.json                 # Vercel config (headers, rewrites, CSP)
├── package.json                # Project metadata
├── robots.txt                  # SEO robots file
├── sitemap.xml                 # XML sitemap
└── .env.example                # Environment variable template
```

---

## Local Development

### Prerequisites
- Node.js 18+
- Vercel CLI: `npm install -g vercel`

### Setup

```bash
git clone https://github.com/SAHearn1/FG2GLandingpage.git
cd FG2GLandingpage
cp .env.example .env
# Fill in your environment variables in .env
vercel dev
```

---

## Environment Variables

Copy `.env.example` to `.env` and populate all variables before running locally or deploying.

| Variable | Description | Required |
|----------|-------------|----------|
| `ANTHROPIC_API_KEY` | Claude AI API key for the Rooty chatbot | Yes |
| `N8N_NEWSLETTER_WEBHOOK` | n8n webhook URL for newsletter signups | Yes |
| `N8N_CONSULTATION_WEBHOOK` | n8n webhook URL for consultation form | Yes |
| `N8N_UNSUBSCRIBE_WEBHOOK` | n8n webhook URL for unsubscribe requests | Yes |

---

## API Endpoints

All endpoints are Vercel serverless functions under `/api/`.

### POST /api/chat
Powers the Rooty AI chatbot. Proxies to the Anthropic Claude API.

**Rate limit:** 10 requests/minute per IP

**Body:**
```json
{ "messages": [{ "role": "user", "content": "..." }] }
```

### POST /api/newsletter
Handles newsletter signups. Forwards to n8n webhook.

**Rate limit:** 3 requests/hour per IP

**Body:**
```json
{ "name": "...", "email": "...", "role": "..." }
```

### POST /api/consultation
Handles consultation form submissions. Forwards to n8n webhook.

**Rate limit:** 5 requests/hour per IP

**Body:**
```json
{ "name": "...", "email": "...", "organization": "...", "message": "..." }
```

### POST /api/unsubscribe
Handles newsletter unsubscribes. Forwards to n8n webhook.

**Rate limit:** 10 requests/hour per IP

**Body:**
```json
{ "email": "...", "token": "..." }
```

---

## Deployment

This project deploys automatically via Vercel on push to `main`.

```bash
# Manual deploy
vercel --prod
```

Configure environment variables in the Vercel dashboard under Project Settings → Environment Variables.

---

## Security

Security headers are configured in `vercel.json`:
- Content Security Policy
- Strict Transport Security
- X-Content-Type-Options
- X-Frame-Options
- Permissions Policy
- Referrer Policy

To report a security vulnerability, see [/.well-known/security.txt](/.well-known/security.txt) or email hearn.sa@gmail.com.

---

## Brand & Design System

| Token | Value |
|-------|-------|
| Dark Green | `#082A19`, `#0A3622`, `#3B523A` |
| Gold | `#C9A84C` |
| Cream | `#F2F4CA` |
| Heading font | Cormorant Garamond |
| Body font | Nunito |

---

## License

See [LICENSE](LICENSE) for details.
