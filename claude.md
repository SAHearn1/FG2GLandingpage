# Claude.md — FG2GLandingpage Project Context

## Project Overview

**Repository:** SAHearn1/FG2GLandingpage
**Live Site:** https://fg2g-rwfw.com
**Platform:** Vercel (serverless)
**Owner:** Dr. Shawn A. Hearn, Ed.D., J.D.
**Purpose:** Lead landing page for the Root Work Framework (RWFW) Learning Management System

### Architecture

```
FG2GLandingpage/
├── index.html              # Main landing page (235 KB)
├── savannah-initiative.html # Savannah Initiative page (1.04 MB)
├── api/
│   ├── chat.js             # Claude AI chatbot endpoint (Anthropic API)
│   ├── consultation.js     # Consultation form → n8n webhook
│   ├── newsletter.js       # Newsletter signup → n8n webhook
│   └── unsubscribe.js      # Unsubscribe handler → n8n webhook
├── icons/                  # Site icons/images
├── .well-known/            # security.txt
├── vercel.json             # Vercel config (headers, rewrites, caching)
├── package.json            # Project metadata
├── robots.txt              # SEO robots file
└── sitemap.xml             # XML sitemap
```

### Environment Variables Required

```bash
ANTHROPIC_API_KEY=          # Claude AI API key for /api/chat
N8N_NEWSLETTER_WEBHOOK=     # n8n webhook URL for newsletter signups
N8N_CONSULTATION_WEBHOOK=   # n8n webhook URL for consultation form
N8N_UNSUBSCRIBE_WEBHOOK=    # n8n webhook URL for unsubscribe requests
```

---

## Gap Analysis — Remediation Phases

This document tracks the comprehensive gap analysis performed on 2026-02-24 and the phased remediation plan.

### Phase 1 — Security & Legal Compliance (CRITICAL — Execute First)

| # | Issue | Severity | Status |
|---|-------|----------|--------|
| 1.1 | CSP uses `unsafe-inline` in script-src and style-src | High | Planned |
| 1.2 | Add Privacy Policy page (/privacy) | High (Legal) | Planned |
| 1.3 | Add Terms of Service page (/terms) | High (Legal) | Planned |
| 1.4 | Add cookie consent banner | High (Legal) | Planned |
| 1.5 | Create .env.example documenting all required vars | Medium | Planned |
| 1.6 | Fix package.json repository URL placeholder | Low | Planned |
| 1.7 | Add rate limiting to newsletter, consultation, unsubscribe endpoints | Medium | Planned |
| 1.8 | Fix .well-known/security.txt referencing non-existent /security-policy | Low | Planned |
| 1.9 | Create /security-policy page | Low | Planned |
| 1.10 | Remove duplicate `gitignore` file (keep `.gitignore`) | Low | Planned |

### Phase 2 — Accessibility (WCAG 2.1 AA)

| # | Issue | Status |
|---|-------|--------|
| 2.1 | Add skip-to-main-content link | Planned |
| 2.2 | Add role="dialog", aria-modal, aria-labelledby to all modals | Planned |
| 2.3 | Add ARIA labels and live regions to chatbot interface | Planned |
| 2.4 | Fix 1 missing image alt text | Planned |
| 2.5 | Add aria-expanded to interactive toggles | Planned |

### Phase 3 — Performance

| # | Issue | Impact | Status |
|---|-------|--------|--------|
| 3.1 | Add loading="lazy" to all images | High | Planned |
| 3.2 | Add srcset and <picture> for responsive images | High | Planned |
| 3.3 | Convert PNGs to WebP format | High | Planned |
| 3.4 | Extract and minify CSS to external stylesheet | High | Planned |
| 3.5 | Extract JS to external files with defer | High | Planned |
| 3.6 | Investigate and reduce savannah-initiative.html (1.04 MB) | High | Planned |
| 3.7 | Add custom 404 page | Medium | Planned |
| 3.8 | Add PWA service worker | Low | Planned |

### Phase 4 — Developer Experience

| # | Issue | Status |
|---|-------|--------|
| 4.1 | Rewrite README.md with full setup/deploy/API docs | Planned |
| 4.2 | Add ESLint + Prettier config | Planned |
| 4.3 | Add GitHub Actions for linting and Lighthouse CI | Planned |
| 4.4 | Add pre-commit hooks (Husky + lint-staged) | Planned |
| 4.5 | Add build/minification pipeline | Planned |

### SEO Gaps

| # | Issue | Status |
|---|-------|--------|
| S.1 | Add FAQ schema (JSON-LD) | Planned |
| S.2 | Add BreadcrumbList schema | Planned |
| S.3 | Fix og:image dimensions to 1200x630 | Planned |
| S.4 | Fix missing alt text on 1 image | Planned |

---

## Development Rules (CRITICAL — All Agents Must Follow)

1. **Never break existing functionality.** The site is live and in production.
2. **Test all API changes** — the 4 Vercel serverless functions must remain functional.
3. **Preserve all existing HTML structure.** Refactoring is incremental, not wholesale.
4. **No new dependencies** without explicit approval — serverless budget is tight.
5. **Always work on `claude/github-issues-gap-analysis-wHR7K` branch.**
6. **Use semantic HTML5** for any new pages.
7. **Match the existing design system** — colors, fonts, and brand voice.
8. **In-memory rate limiter pattern** (from chat.js) should be replicated consistently.
9. **All new pages** must include matching meta tags, canonical URLs, and OG data.
10. **Security headers** in vercel.json apply globally — any CSP changes must be tested.

---

## Brand & Design System

### Colors
- Dark Green: `#082A19`, `#0A3622`, `#3B523A`
- Gold/Cream: `#C9A84C`, `#F2F4CA`
- Forest: `#1E3D2B`, `#2D5A3F`

### Fonts
- Google Fonts: Cormorant Garamond (headings), Nunito (body)

### Voice
- Warm, healing-centered, trauma-informed
- Professional but approachable
- Rooted in SAMHSA principles

---

## Key Contacts
- **Owner:** Dr. Shawn A. Hearn, Ed.D., J.D.
- **Contact Email:** hearn.sa@gmail.com
- **Live Domain:** fg2g-rwfw.com
