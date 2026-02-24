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

---

## Swarm Orchestration Plan — Parallel Execution

> **STATUS: PLANNING COMPLETE — AWAITING APPROVAL BEFORE EXECUTION**
> Last updated: 2026-02-24
> Branch: `claude/github-issues-gap-analysis-wHR7K`

### Overview

All remaining open items are executed by a coordinated swarm of independent agents.
Execution is split into two sequential waves of parallel agents. No agent may begin
execution until Wave 0 (GitHub issue filing) is complete and this plan has been
approved by the project owner.

---

### Open Items (Remaining Work)

| ID | Task | Priority | Agent | Blocked? |
|----|------|----------|-------|----------|
| P3-2 | Add srcset + `<picture>` for responsive images | High | AGENT-IMAGES | No |
| P3-3 | Convert PNGs in icons/ to WebP | High | AGENT-IMAGES | No |
| P3-8 | PWA service worker + manifest | Low | DEFERRED | No |
| P3-9 | Extract logo base64 from index.html → icons/ | High | AGENT-IMAGES | No |
| P4-4 | Add Husky + lint-staged pre-commit hooks | Medium | AGENT-DEVEX | No |
| P4-5 | Add build/minification pipeline | Medium | AGENT-DEVEX | No |
| S.1 | FAQ schema (FAQPage JSON-LD) | Medium | BLOCKED | Needs FAQ content |
| S.3 | Fix og:image to 1200×630 | Medium | AGENT-SEO | No |
| FAV | Add favicon.ico fallback for legacy browsers | Low | AGENT-IMAGES | No |
| UX-1 | Testimonials / case studies section | Medium | BLOCKED | Needs client content |

**Blocked items** (S.1, UX-1) have GitHub issues filed but are NOT assigned to any Wave.
They require human content input from Dr. Hearn before implementation can begin.

---

### Wave 0 — GitHub Issue Filing (Sequential, No Code)

**Agent:** Single `gh` CLI agent
**Duration:** Runs first, must complete before Wave 1
**Scope:** File all open items as GitHub issues using `gh issue create`

Issues to file:

| GitHub Issue Title | Labels | Body source |
|--------------------|--------|-------------|
| `[PERF] Add srcset and <picture> for responsive images` | `performance,phase:3` | GITHUB_ISSUES.md #P3-2 |
| `[PERF] Convert icons/\*.png to WebP format` | `performance,phase:3` | GITHUB_ISSUES.md #P3-3 |
| `[PERF] Extract logo base64 from index.html to icons/` | `performance,phase:3` | New — see P3-9 spec below |
| `[PERF] Add PWA service worker and web app manifest` | `performance,phase:3,deferred` | GITHUB_ISSUES.md #P3-8 |
| `[DEVEX] Add Husky + lint-staged pre-commit hooks` | `devops,phase:4` | GITHUB_ISSUES.md #P4-4 |
| `[DEVEX] Add build/minification pipeline` | `devops,phase:4` | GITHUB_ISSUES.md #P4-5 |
| `[SEO] Fix og:image dimensions to 1200×630` | `seo` | GITHUB_ISSUES.md #S-3 |
| `[SEO] Add FAQPage JSON-LD schema` | `seo,blocked:content` | GITHUB_ISSUES.md #S-1 |
| `[UX] Add testimonials / case studies section` | `ux,blocked:content` | New — content required |
| `[PERF] Add favicon.ico for legacy browser support` | `performance,ux` | New — see FAV spec below |

**New issue specs (not in GITHUB_ISSUES.md):**

**P3-9 — Extract logo base64 from index.html:**
> index.html line ~79 contains a very large base64-encoded WebP blob for the animated logo
> coin. This inflates the HTML parse cost. The blob should be extracted to `icons/logo.webp`
> and the `src` attribute updated to `/icons/logo.webp`. Acceptance: index.html line 79 uses
> a URL src, not a data URI. File size of index.html reduces significantly.

**FAV — favicon.ico:**
> Generate a 32×32 and 16×16 favicon.ico from `icons/root.png` using Python Pillow
> (`pip3 install pillow` then `python3 -c "from PIL import Image; img=Image.open('icons/root.png'); img.save('favicon.ico', sizes=[(32,32),(16,16)])"`)
> Place at repo root. Add `<link rel="icon" href="/favicon.ico" sizes="any">` to all HTML
> pages. Acceptance: `/favicon.ico` serves a valid .ico file.

---

### Wave 1 — Three Parallel Agents

Wave 1 agents run **simultaneously**. Each owns a disjoint set of files.
No agent may read-modify-write a file owned by another agent.

---

#### AGENT-IMAGES

**GitHub Issues:** P3-9, P3-3, P3-2, FAV
**Execution order within agent (sequential):** P3-9 → P3-3 → FAV → P3-2
**Rationale for order:** Extract logo first (reduces index.html bloat), then convert existing
PNGs to WebP (creates the .webp assets), then generate favicon.ico (uses root.png before
it might be replaced), then add srcset/picture elements referencing the new .webp files.

**Files this agent OWNS (read + write):**
```
icons/                          ← full ownership of entire directory
  *.webp                        ← new files created by P3-3
  logo.webp                     ← new file created by P3-9
  favicon.ico (root)            ← new file created by FAV, placed at repo root
```

**Targeted edits (line-range locked):**
```
index.html  line ~79            ← P3-9: change src="data:image/webp;base64,..." to src="/icons/logo.webp"
index.html  <img> tags only     ← P3-2: wrap in <picture>, add srcset/WebP source
savannah-initiative.html <img>  ← P3-2: same srcset treatment
index.html  line 16-18          ← FAV: add favicon.ico link tag
savannah-initiative.html head   ← FAV: add favicon.ico link tag
privacy.html head               ← FAV: add favicon.ico link tag
terms.html head                 ← FAV: add favicon.ico link tag
security-policy.html head       ← FAV: add favicon.ico link tag
404.html head                   ← FAV: add favicon.ico link tag
```

**Hard limits for AGENT-IMAGES:**
- MUST NOT touch: `styles.css`, `scripts.js`, `vercel.json`, `api/`, `package.json`
- MUST NOT touch: `index.html` `<head>` JSON-LD blocks (lines 36–73)
- MUST NOT touch: `index.html` `<meta>` og:image tags (lines 25–27)
- MUST NOT touch: any `<section>` body content
- MUST use targeted `Edit` tool calls, never full `Write` rewrites of existing files
- MUST commit after each subtask (P3-9 commit, P3-3 commit, FAV commit, P3-2 commit)

**P3-2 implementation spec:**
For each `<img src="/icons/foo.png">` tag, wrap as:
```html
<picture>
  <source srcset="/icons/foo.webp" type="image/webp">
  <img src="/icons/foo.png" alt="[existing alt]" loading="lazy" width="[W]" height="[H]">
</picture>
```
The logo coin base64 img at line 79 is already WebP — after P3-9 extracts it to
`/icons/logo.webp`, no picture wrapper is needed for it (single format, already modern).

**P3-3 implementation spec:**
Use Python Pillow to batch-convert all `icons/*.png` to `icons/*.webp`:
```python
from PIL import Image
import glob, os
for f in glob.glob('icons/*.png'):
    img = Image.open(f)
    out = f.replace('.png', '.webp')
    img.save(out, 'WEBP', quality=85)
    print(f'Converted {f} → {out}')
```
**Do not delete the original .png files** — they are fallbacks in `<picture>` elements.

---

#### AGENT-SEO

**GitHub Issues:** S.3
**Files this agent OWNS (read + write):**
```
index.html              lines 20–35 only (og:image + twitter:image meta block)
savannah-initiative.html lines ~15-35 (og:image meta block, if present)
```

**Targeted edits:**
```
index.html line 25      ← S.3: og:image URL → /icons/og-image-1200x630.png (or note asset needed)
index.html line 26-27   ← S.3: og:image:width="1200" og:image:height="630"
index.html line 34      ← S.3: twitter:image same update
```

**Hard limits for AGENT-SEO:**
- MUST NOT touch: any line outside the og/twitter meta block
- MUST NOT touch: `styles.css`, `scripts.js`, `vercel.json`, `api/`
- MUST NOT touch: JSON-LD `<script>` blocks (those are AGENT-SEO's jurisdiction only if
  new JSON-LD is being added — for S.1 which is BLOCKED, do nothing)
- S.1 (FAQ schema) is **BLOCKED** — do NOT implement. File the issue, then stop.
- The actual 1200×630 image asset may not exist yet. If `/icons/root.png` is the only
  option: update the meta tags to reference a new filename `og-image.png` and add a
  `<!-- TODO: replace with 1200×630 asset -->` comment. Do NOT fabricate dimensions.
- MUST commit after S.3 is complete.

**S.3 implementation decision tree:**
1. Check if `icons/` contains any 1200×630 image → use it directly
2. If not, check if Python + Pillow can generate a resized version from `root.png`
   → if yes, generate `icons/og-image.png` at 1200×630 (crop/pad with brand color `#082A19`)
3. Update meta tags to reference the new file and correct dimensions
4. If neither is feasible, update dimensions to the actual current image dimensions and
   add a documented TODO comment

---

#### AGENT-DEVEX

**GitHub Issues:** P4-4, P4-5
**Execution order within agent (sequential):** P4-4 (Husky) → P4-5 (build pipeline)

**Files this agent OWNS (read + write):**
```
package.json                    ← add scripts, devDependencies, lint-staged config
.github/workflows/ci.yml        ← extend with build step if needed
.husky/                         ← new directory: pre-commit hook
.husky/pre-commit               ← new file: runs lint-staged
build.js (or Makefile)          ← new file: minification pipeline
```

**Hard limits for AGENT-DEVEX:**
- MUST NOT touch: any `.html`, `.css`, `.js` source files (index.html, styles.css, etc.)
- MUST NOT touch: `vercel.json`, `api/`, `icons/`
- MUST NOT run `npm install` in the working tree (would modify package-lock.json or
  create node_modules — document the install command in package.json instead)
- MUST NOT add dependencies that require build steps on Vercel (Vercel serves static
  files directly — minification must be a local dev tool only, not a deploy step)
- MUST commit P4-4 and P4-5 separately.

**P4-4 implementation spec:**
```json
// package.json additions:
"scripts": {
  "prepare": "husky",
  "lint": "eslint api/**/*.js",
  "lint:staged": "lint-staged"
},
"lint-staged": {
  "api/**/*.js": ["eslint --fix", "prettier --write"],
  "*.html": ["prettier --write"]
},
"devDependencies": {
  "husky": "^9.0.0",
  "lint-staged": "^15.0.0"
}
```
`.husky/pre-commit`:
```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"
npx lint-staged
```

**P4-5 implementation spec:**
Add a `build.js` script (Node.js, no extra deps beyond what's in package.json) that:
1. Minifies `styles.css` → `dist/styles.min.css` (simple whitespace/comment removal)
2. Minifies `scripts.js` → `dist/scripts.min.js` (same)
3. Outputs file size before/after for each file
Note: `dist/` output is for local reference only. Vercel deploys the unminified source.
Add `"build": "node build.js"` to package.json scripts.
Add `dist/` to `.gitignore`.

---

### Wave 2 — Blocked Items (Human Input Required)

These items have GitHub issues filed but WILL NOT be executed by any agent until
Dr. Hearn provides content or makes a decision.

| Item | What's needed | GitHub Issue |
|------|--------------|-------------|
| S.1 FAQ schema | A designated FAQ section in index.html with real Q&A content | Filed in Wave 0 |
| UX-1 Testimonials | Real testimonials/case studies from clients | Filed in Wave 0 |
| P3-8 PWA | Separate planning session — involves service worker, manifest, offline strategy | Filed in Wave 0 |

---

### File Ownership Matrix (Complete)

| File / Directory | Wave 1 Owner | All Others |
|-----------------|--------------|------------|
| `icons/` | AGENT-IMAGES | READ-ONLY |
| `favicon.ico` (root) | AGENT-IMAGES | N/A (new) |
| `.husky/` | AGENT-DEVEX | N/A (new) |
| `build.js` | AGENT-DEVEX | N/A (new) |
| `package.json` | AGENT-DEVEX | **FROZEN** |
| `.github/workflows/ci.yml` | AGENT-DEVEX | **FROZEN** |
| `index.html` lines 16–18 (favicon link) | AGENT-IMAGES | **FROZEN** |
| `index.html` line ~79 (logo src attr) | AGENT-IMAGES | **FROZEN** |
| `index.html` `<img>` tags in body | AGENT-IMAGES | **FROZEN** |
| `index.html` lines 20–35 (og/twitter meta) | AGENT-SEO | **FROZEN** |
| `index.html` lines 36–73 (JSON-LD) | NO AGENT (blocked) | **FROZEN** |
| `savannah-initiative.html` `<img>` tags | AGENT-IMAGES | **FROZEN** |
| `savannah-initiative.html` og meta | AGENT-SEO | **FROZEN** |
| All other HTML head lines | NO AGENT | **FROZEN** |
| `styles.css` | NO AGENT | **FROZEN** |
| `scripts.js` | NO AGENT | **FROZEN** |
| `vercel.json` | NO AGENT | **FROZEN** |
| `api/*.js` | NO AGENT | **FROZEN** |
| `privacy.html`, `terms.html` | AGENT-IMAGES (favicon only) | **FROZEN** |
| `security-policy.html`, `404.html` | AGENT-IMAGES (favicon only) | **FROZEN** |

---

### Collision Prevention Rules (All Agents)

1. **Read before write.** Every agent must read the full current state of a file before editing it.
2. **Targeted edits only.** Use `Edit` tool with the smallest possible `old_string` that uniquely identifies the change location. Never use `Write` to overwrite an existing file entirely.
3. **Atomic commits.** Commit after each individual subtask. Small commits = easy reversion.
4. **No structural rewrites.** If a change requires restructuring more than 5 lines, stop and flag for human review.
5. **Verify after edit.** After each `Edit`, re-read the modified lines to confirm the change is correct and nothing adjacent was corrupted.
6. **No vercel.json changes.** Any CSP header change could break the live site immediately. Vercel.json is frozen for all agents in all waves.
7. **No package-lock.json.** Agents must not run `npm install`. Document required installs in comments or README only.
8. **No force pushes.** All agents push with `git push -u origin claude/github-issues-gap-analysis-wHR7K`.
9. **Conflict resolution.** If a push is rejected due to a remote conflict, the agent must `git fetch` + `git merge` (not rebase), resolve conflicts conservatively (prefer keeping both changes), and push again.
10. **Stop on unexpected state.** If an agent encounters a file that doesn't match its mental model (unexpected content, changed line numbers), it must stop and report rather than proceeding.

---

### Execution Checklist

- [ ] Plan reviewed and approved by project owner
- [ ] Wave 0: GitHub issues filed (all 10 issues)
- [ ] Wave 1 launch: 3 agents launched simultaneously
  - [ ] AGENT-IMAGES: P3-9 complete (logo extracted)
  - [ ] AGENT-IMAGES: P3-3 complete (PNGs → WebP)
  - [ ] AGENT-IMAGES: FAV complete (favicon.ico generated)
  - [ ] AGENT-IMAGES: P3-2 complete (srcset + picture)
  - [ ] AGENT-SEO: S.3 complete (og:image 1200×630)
  - [ ] AGENT-DEVEX: P4-4 complete (Husky + lint-staged)
  - [ ] AGENT-DEVEX: P4-5 complete (build pipeline)
- [ ] Wave 1 validation: verify no file conflicts, site structure intact
- [ ] Wave 2: await human content input
  - [ ] S.1 FAQ schema (pending Dr. Hearn FAQ content)
  - [ ] UX-1 Testimonials (pending client content)
  - [ ] P3-8 PWA (separate planning session)

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
