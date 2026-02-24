# GitHub Issue Tickets — FG2GLandingpage Gap Analysis

> Generated: 2026-02-24
> Branch: claude/github-issues-gap-analysis-wHR7K
> These issues are organized by phase and ready to be filed on GitHub.

---

## PHASE 1 — Security & Legal Compliance

---

### Issue #P1-1: [SEC-HIGH] Fix CSP `unsafe-inline` in script-src and style-src

**Labels:** `security`, `priority:critical`, `phase:1`

**Description:**
The Content Security Policy in `vercel.json` allows `'unsafe-inline'` for both `script-src` and `style-src`, effectively negating CSP protection against cross-site scripting (XSS) attacks.

**Current CSP:**
```
script-src 'self' 'unsafe-inline'
style-src 'self' 'unsafe-inline' fonts.googleapis.com
```

**Steps to Reproduce:** Check `vercel.json` headers section.

**Expected Behavior:** CSP should enforce restrictions that prevent arbitrary inline script/style execution.

**Proposed Fix:**
1. Extract all inline `<style>` blocks from `index.html` and `savannah-initiative.html` to a versioned `styles.css` file (removes need for `style-src unsafe-inline`)
2. Generate per-request nonces for `<script>` tags OR move inline scripts to external `.js` files
3. Update `vercel.json` CSP to remove `unsafe-inline` directives
4. Add `style-src-attr` and `script-src-attr` as needed

**Acceptance Criteria:**
- [ ] No `unsafe-inline` in CSP
- [ ] Site renders correctly in all supported browsers
- [ ] Chrome/Firefox DevTools show no CSP violations
- [ ] Lighthouse security score improves

---

### Issue #P1-2: [LEGAL-HIGH] Add Privacy Policy page (/privacy)

**Labels:** `legal`, `priority:critical`, `phase:1`, `new-page`

**Description:**
The site collects personally identifiable information (names, emails, phone numbers) via newsletter and consultation forms, and uses Vercel Analytics for tracking. Under GDPR, CCPA, and COPPA (given the K-12 education audience), a privacy policy is legally required.

**Missing Page:** `/privacy` (404 currently)

**Required Sections:**
- What data is collected (name, email, phone, organization, role)
- How data is used (newsletter delivery, consultation follow-up)
- Data storage and third-party processors (n8n, Vercel, Anthropic)
- User rights (access, deletion, opt-out)
- Cookie policy (Vercel Analytics)
- Contact for privacy requests (hearn.sa@gmail.com)
- Effective date

**Acceptance Criteria:**
- [ ] `/privacy` returns 200 with valid HTML
- [ ] Page linked from site footer
- [ ] Matches site branding and design system
- [ ] Includes all legally required sections
- [ ] `vercel.json` rewrite updated to serve the new page

---

### Issue #P1-3: [LEGAL-HIGH] Add Terms of Service page (/terms)

**Labels:** `legal`, `priority:critical`, `phase:1`, `new-page`

**Description:**
The site offers educational services, AI chatbot interaction, and form submissions without any terms of service. A ToS is required to define acceptable use, limit liability, and protect intellectual property.

**Missing Page:** `/terms` (404 currently)

**Required Sections:**
- Acceptance of terms
- Description of services
- Acceptable use policy
- Intellectual property (Root Work Framework, Dr. Hearn's content)
- Disclaimer of warranties
- Limitation of liability
- Governing law (relevant jurisdiction)
- Contact information

**Acceptance Criteria:**
- [ ] `/terms` returns 200
- [ ] Page linked from site footer
- [ ] Matches site branding
- [ ] `vercel.json` rewrite updated

---

### Issue #P1-4: [LEGAL-HIGH] Add cookie consent banner

**Labels:** `legal`, `privacy`, `priority:critical`, `phase:1`

**Description:**
Vercel Analytics sets tracking cookies/pixels. Under GDPR and EU/UK law, user consent must be obtained before setting non-essential cookies. Most US state privacy laws (CCPA, etc.) also require opt-out mechanisms.

**Implementation Requirements:**
- Banner must appear on first visit
- User must be able to accept or decline analytics cookies
- Preference must be persisted in `localStorage`
- Vercel Analytics should only initialize after consent
- Banner must link to Privacy Policy
- Must not use third-party consent libraries (keep it lightweight)

**Acceptance Criteria:**
- [ ] Banner appears on first visit
- [ ] Decline prevents analytics initialization
- [ ] Accept stores preference and loads analytics
- [ ] Preference persists across page reloads
- [ ] WCAG accessible (keyboard navigable, proper ARIA)

---

### Issue #P1-5: [DEVOPS] Create `.env.example` documenting required environment variables

**Labels:** `devops`, `documentation`, `priority:high`, `phase:1`

**Description:**
The project requires 4 environment variables that are undocumented. New developers or deployment attempts will fail without knowing what variables to configure in Vercel.

**Required variables:**
```bash
ANTHROPIC_API_KEY=          # Claude AI API key for /api/chat chatbot
N8N_NEWSLETTER_WEBHOOK=     # n8n webhook URL for newsletter form submissions
N8N_CONSULTATION_WEBHOOK=   # n8n webhook URL for consultation form submissions
N8N_UNSUBSCRIBE_WEBHOOK=    # n8n webhook URL for email unsubscribe requests
```

**Acceptance Criteria:**
- [ ] `.env.example` file exists in repo root
- [ ] All 4 variables documented with descriptions
- [ ] `.env.example` referenced in README.md
- [ ] `.env` added to `.gitignore` (verify)

---

### Issue #P1-6: [DEVOPS] Fix placeholder repository URL in `package.json`

**Labels:** `devops`, `priority:low`, `phase:1`

**Description:**
`package.json` contains a placeholder repository URL that was never updated:
```json
"repository": {
  "type": "git",
  "url": "https://github.com/YOUR-USERNAME/rootwork-framework.git"
}
```

**Fix:** Update to the actual repository URL: `https://github.com/SAHearn1/FG2GLandingpage.git`

**Acceptance Criteria:**
- [ ] `package.json` repository URL points to `SAHearn1/FG2GLandingpage`
- [ ] `npm pkg fix` passes without warnings on the URL field

---

### Issue #P1-7: [SEC-MEDIUM] Add rate limiting to all unprotected API endpoints

**Labels:** `security`, `priority:high`, `phase:1`

**Description:**
Only `/api/chat` has rate limiting. The `/api/newsletter`, `/api/consultation`, and `/api/unsubscribe` endpoints are unprotected and can be abused for spam, data harvesting, or webhook flooding.

**Current state:**
- `api/chat.js` — Has in-memory rate limiter (10 req/min/IP) ✅
- `api/newsletter.js` — No rate limiting ❌
- `api/consultation.js` — No rate limiting ❌
- `api/unsubscribe.js` — No rate limiting ❌

**Implementation:** Apply the same rate limiting pattern from `chat.js` to all three unprotected endpoints. Recommended limits:
- Newsletter: 3 req/hour/IP (prevent spam signups)
- Consultation: 5 req/hour/IP (prevent form spam)
- Unsubscribe: 10 req/hour/IP (tokens prevent abuse, but still limit)

**Acceptance Criteria:**
- [ ] All 4 API endpoints have rate limiting
- [ ] Rate limit responses return HTTP 429 with descriptive message
- [ ] Limits are proportional to expected legitimate use

**Note:** In-memory rate limiter resets on cold start (separate issue P1-SEC-2 for Redis/persistent solution).

---

### Issue #P1-8: [SEC-LOW] Fix security.txt referencing non-existent /security-policy

**Labels:** `security`, `priority:low`, `phase:1`

**Description:**
`.well-known/security.txt` references `/security-policy` which returns a 404. This is a broken link that undermines the security disclosure process.

**Fix Options:**
1. Create a minimal `/security-policy` page, OR
2. Update `security.txt` to remove the broken reference

**Acceptance Criteria:**
- [ ] `/security-policy` returns 200 OR `security.txt` no longer references it
- [ ] Security contact remains valid (hearn.sa@gmail.com)

---

### Issue #P1-9: [DEVOPS-LOW] Remove duplicate `gitignore` file

**Labels:** `devops`, `priority:low`, `phase:1`

**Description:**
The repository has both `gitignore` (no dot) and `.gitignore`. Only `.gitignore` is read by Git. The `gitignore` file is dead weight and causes confusion.

**Fix:** Delete the `gitignore` file (no leading dot) from the repository.

**Acceptance Criteria:**
- [ ] Only `.gitignore` exists
- [ ] `gitignore` file is deleted and committed

---

## PHASE 2 — Accessibility (WCAG 2.1 AA)

---

### Issue #P2-1: [A11Y] Add skip-to-main-content link

**Labels:** `accessibility`, `priority:high`, `phase:2`

**Description:**
Users navigating by keyboard or screen reader must tab through the entire navigation before reaching main content. A skip link is required for WCAG 2.1 AA compliance (Success Criterion 2.4.1).

**Implementation:**
```html
<a href="#main-content" class="skip-link">Skip to main content</a>
```
With CSS that shows it only on focus (`.skip-link:focus { ... }`).

---

### Issue #P2-2: [A11Y] Add proper ARIA to all modal dialogs

**Labels:** `accessibility`, `priority:high`, `phase:2`

**Description:**
Modal dialogs lack `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, and focus trapping. This fails WCAG 2.1 AA criteria 4.1.2 and 1.3.1.

**Required attributes for each modal:**
- `role="dialog"`
- `aria-modal="true"`
- `aria-labelledby="[modal-title-id]"`
- Focus trap (Tab/Shift+Tab confined to modal)
- Escape key closes modal
- Return focus to trigger element on close

---

### Issue #P2-3: [A11Y] Add ARIA live regions to chatbot interface

**Labels:** `accessibility`, `priority:high`, `phase:2`

**Description:**
The Rooty AI chatbot responses are not announced to screen readers. Messages appear visually but AT users receive no notification.

**Required changes:**
- Add `aria-live="polite"` to chat message container
- Add `aria-label` to chat input and send button
- Add `role="status"` to typing indicator
- Ensure `aria-expanded` on chat toggle button

---

### Issue #P2-4: [A11Y] Fix missing alt text on 1 image

**Labels:** `accessibility`, `priority:medium`, `phase:2`

**Description:**
15/16 images have alt text. 1 image is missing `alt=""` attribute or has an empty/descriptive alt. Identify and fix the missing image alt text in both `index.html` and `savannah-initiative.html`.

---

### Issue #P2-5: [A11Y] Add aria-expanded to interactive toggle elements

**Labels:** `accessibility`, `priority:medium`, `phase:2`

**Description:**
Interactive elements that show/hide content (FAQ accordions, collapsible sections) lack `aria-expanded` state. Screen reader users cannot determine if a section is collapsed or expanded.

---

## PHASE 3 — Performance

---

### Issue #P3-1: [PERF] Add loading="lazy" to all images

**Labels:** `performance`, `priority:high`, `phase:3`

**Description:**
No images use `loading="lazy"`, causing all images (including below-the-fold) to be downloaded on initial page load, blocking rendering.

**Acceptance Criteria:**
- [ ] All non-critical images have `loading="lazy"`
- [ ] Above-the-fold hero images retain `loading="eager"` or no attribute

---

### Issue #P3-2: [PERF] Add srcset and `<picture>` for responsive images

**Labels:** `performance`, `priority:high`, `phase:3`

**Description:**
All images use single-resolution `<img>` tags. Mobile users download full-size desktop images, wasting bandwidth and hurting Core Web Vitals.

---

### Issue #P3-3: [PERF] Convert PNG images to WebP format

**Labels:** `performance`, `priority:high`, `phase:3`

**Description:**
All site images are 1024x1024 PNGs. WebP provides 3-5x smaller file sizes at equivalent quality. Estimated savings: 500KB+ per page load.

---

### Issue #P3-4: [PERF] Extract and minify inline CSS to external stylesheet

**Labels:** `performance`, `priority:high`, `phase:3`

**Description:**
All CSS is inline in `<style>` blocks. It is not cached by browsers (re-downloaded on every page load), not minified, and contributes significantly to the large page sizes.

**Note:** This is linked to Issue #P1-1 (CSP fix). Both should be coordinated.

---

### Issue #P3-5: [PERF] Extract inline JavaScript to external files with defer

**Labels:** `performance`, `priority:high`, `phase:3`

**Description:**
All JS is in 6+ `<script>` inline blocks. Moving to external files with `defer` allows browser caching, parallel parsing, and reduces initial HTML parse time.

---

### Issue #P3-6: [PERF] Investigate and reduce savannah-initiative.html (1.04 MB)

**Labels:** `performance`, `priority:critical`, `phase:3`

**Description:**
`savannah-initiative.html` is 1.04 MB — over 3x the target size. Suspected causes: base64-embedded images, duplicate CSS, inline SVGs, or redundant content. A full audit is needed to identify the bloat and reduce to under 300 KB.

---

### Issue #P3-7: [PERF] Add custom 404 page

**Labels:** `performance`, `ux`, `priority:medium`, `phase:3`

**Description:**
Currently, Vercel rewrites all unknown paths to `index.html` (returning 200 instead of 404). This is wrong for SEO and UX. A proper `404.html` page should be created and `vercel.json` updated to serve it for unmatched routes.

---

## PHASE 4 — Developer Experience

---

### Issue #P4-1: [DEVEX] Rewrite README.md with complete project documentation

**Labels:** `documentation`, `priority:high`, `phase:4`

**Description:**
Current README is 50 bytes: "Lead landing page for the LMS". A complete README should include: project overview, prerequisites, local development setup, environment variable configuration, deployment guide, API documentation, and contributing guidelines.

---

### Issue #P4-2: [DEVEX] Add ESLint and Prettier configuration

**Labels:** `devops`, `code-quality`, `priority:medium`, `phase:4`

**Description:**
No linting or formatting tools are configured. This leads to inconsistent code style and missed errors. Add `.eslintrc.json` and `.prettierrc` configs appropriate for a Vercel serverless + vanilla JS project.

---

### Issue #P4-3: [DEVEX] Add GitHub Actions for CI (lint + Lighthouse)

**Labels:** `ci/cd`, `priority:medium`, `phase:4`

**Description:**
No automated checks run on pull requests. Add GitHub Actions workflows for:
1. ESLint on all API JS files
2. HTML validation
3. Lighthouse CI (performance, accessibility, SEO scores)

---

### Issue #P4-4: [DEVEX] Add pre-commit hooks with Husky and lint-staged

**Labels:** `devops`, `code-quality`, `priority:low`, `phase:4`

**Description:**
No pre-commit hooks prevent bad code from being committed. Add Husky + lint-staged to run ESLint and Prettier checks before each commit.

---

## SEO Gaps

---

### Issue #S-1: [SEO] Add FAQ schema (JSON-LD) to pages with Q&A content

**Labels:** `seo`, `priority:medium`

**Description:**
Both pages contain FAQ-style Q&A content but lack `FAQPage` JSON-LD schema. Adding this can generate rich results in Google Search.

---

### Issue #S-2: [SEO] Add BreadcrumbList schema

**Labels:** `seo`, `priority:low`

**Description:**
Add `BreadcrumbList` JSON-LD schema for improved SERP display, especially on `savannah-initiative.html`.

---

### Issue #S-3: [SEO] Fix og:image dimensions to 1200x630

**Labels:** `seo`, `priority:medium`

**Description:**
Facebook/OG recommends 1200x630px for `og:image`. Current OG images may not meet this specification, resulting in poor social share previews.

---

*Last updated: 2026-02-24 | Branch: claude/github-issues-gap-analysis-wHR7K*
