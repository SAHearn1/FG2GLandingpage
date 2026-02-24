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
├── index.html                  # Main landing page
├── savannah-initiative.html    # Savannah Initiative page
├── privacy.html                # Privacy Policy (/privacy)
├── terms.html                  # Terms of Service (/terms)
├── security-policy.html        # Security Policy (/security-policy)
├── 404.html                    # Custom 404 error page
├── api/
│   ├── chat.js                 # Claude AI chatbot endpoint (Anthropic API)
│   ├── consultation.js         # Consultation form → n8n webhook
│   ├── newsletter.js           # Newsletter signup → n8n webhook
│   └── unsubscribe.js          # Unsubscribe handler → n8n webhook
├── icons/                      # Site icons/images (including extracted PNGs)
├── .well-known/
│   └── security.txt            # Security disclosure policy
├── .github/workflows/ci.yml    # GitHub Actions CI (lint + HTML validate)
├── .eslintrc.json              # ESLint config for API functions
├── .prettierrc                 # Prettier formatting config
├── .env.example                # Environment variable template
├── vercel.json                 # Vercel config (headers, rewrites, caching)
├── package.json                # Project metadata
├── robots.txt                  # SEO robots file
└── sitemap.xml                 # XML sitemap
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
| 1.1 | CSP uses `unsafe-inline` in script-src and style-src | High | ✅ Done |
| 1.2 | Add Privacy Policy page (/privacy) | High (Legal) | ✅ Done |
| 1.3 | Add Terms of Service page (/terms) | High (Legal) | ✅ Done |
| 1.4 | Add cookie consent banner | High (Legal) | ✅ Done |
| 1.5 | Create .env.example documenting all required vars | Medium | ✅ Done |
| 1.6 | Fix package.json repository URL placeholder | Low | ✅ Done |
| 1.7 | Add rate limiting to newsletter, consultation, unsubscribe endpoints | Medium | ✅ Done |
| 1.8 | Fix .well-known/security.txt referencing non-existent /security-policy | Low | ✅ Done |
| 1.9 | Create /security-policy page | Low | ✅ Done |
| 1.10 | Remove duplicate `gitignore` file (keep `.gitignore`) | Low | ✅ Done |

### Phase 2 — Accessibility (WCAG 2.1 AA)

| # | Issue | Status |
|---|-------|--------|
| 2.1 | Add skip-to-main-content link | ✅ Done |
| 2.2 | Add role="dialog", aria-modal, aria-labelledby to all modals | ✅ Done |
| 2.3 | Add ARIA labels and live regions to chatbot interface | ✅ Done |
| 2.4 | Fix 1 missing image alt text | ✅ Done (all images confirmed to have alt text) |
| 2.5 | Add aria-expanded to interactive toggles | ✅ Done |

### Phase 3 — Performance

| # | Issue | Impact | Status |
|---|-------|--------|--------|
| 3.1 | Add loading="lazy" to all images | High | ✅ Done |
| 3.2 | Add srcset and <picture> for responsive images | High | Planned |
| 3.3 | Convert PNGs to WebP format | High | Planned |
| 3.4 | Extract and minify CSS to external stylesheet | High | ✅ Done — styles.css (1,435 lines) |
| 3.5 | Extract JS to external files with defer | High | ✅ Done — scripts.js (453 lines) |
| 3.6 | Extract base64 images from savannah-initiative.html (1.04 MB → ~22 KB) | High | ✅ Done |
| 3.7 | Add custom 404 page | Medium | ✅ Done |
| 3.8 | Add PWA service worker | Low | Planned |

### Phase 4 — Developer Experience

| # | Issue | Status |
|---|-------|--------|
| 4.1 | Rewrite README.md with full setup/deploy/API docs | ✅ Done |
| 4.2 | Add ESLint + Prettier config | ✅ Done |
| 4.3 | Add GitHub Actions for linting and Lighthouse CI | ✅ Done |
| 4.4 | Add pre-commit hooks (Husky + lint-staged) | Planned |
| 4.5 | Add build/minification pipeline | Planned |

### SEO Gaps

| # | Issue | Status |
|---|-------|--------|
| S.1 | Add FAQ schema (JSON-LD) | Planned (no clear FAQ section found in index.html) |
| S.2 | Add BreadcrumbList schema | ✅ Done |
| S.3 | Fix og:image dimensions to 1200x630 | Partial — documented current 1024×1024 dimensions; new 1200×630 image asset needed |
| S.4 | Fix missing alt text on 1 image | ✅ Done (all images confirmed with alt text) |

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
