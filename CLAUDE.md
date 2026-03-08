# CLAUDE.md — FG2GLandingpage

> Agent briefing. Read before touching code.
> Governance hub: `SAHearn1/rwfw-agent-governance`

## Repo Identity
- **Purpose:** FG2G landing page with Vercel serverless functions
- **Tier:** 2 (active support)
- **Stack:** Static HTML + Vercel Functions

## Critical Rules

- **Static front, serverless back.** The HTML/CSS/JS is static. API routes live in `/api` as Vercel Functions.
- **Vercel Functions run in Node.js runtime** by default. Edge runtime requires explicit opt-in.
- **Env vars must be set in Vercel dashboard** for each environment (preview, production). VITE_ prefix not needed — no Vite build.
- **Test serverless functions locally** with `vercel dev` before pushing.
- **No `git add .`**

## Dev Workflow
```bash
npm i -g vercel
vercel dev     # Runs static site + Vercel Functions locally
```

## Governance
Follow `AGENTS.md`. Debug via `docs/AGENT_DEBUG_RUNBOOK.md`.

## Operating Rules

**If you resolve a bug during this session, you MUST append an entry to `docs/INCIDENTS.md` before the session ends. This is non-negotiable. Session is not complete until the entry is committed.**

See Rule 7 in `AGENTS.md` (governance hub: `SAHearn1/rwfw-agent-governance`) for the full incident logging protocol.
