# Agent Debug Runbook — FG2GLandingpage

> 6-Phase deterministic debugging protocol.

## Phase 1 — Symptom Capture
- Record exact browser error
- Note network request failures
- Identify affected page section or serverless function

## Phase 2 — Boundary Identification
```
Browser → HTML/CSS/JS → Vercel Function → External API
   ↑           ↑               ↑               ↑
 Frontend    Static Layer    Serverless      Third-party
```

## Phase 3 — Root Cause Isolation
- For static issues: open HTML/CSS file, check asset paths
- For serverless: check Vercel function logs in dashboard
- Verify env vars set in Vercel project settings

## Phase 4 — Fix Design
Smallest change to the specific file.

## Phase 5 — Verification
- Test locally with `vercel dev`
- Test production preview deploy

## Phase 6 — Documentation
- Update `docs/INCIDENTS.md`
