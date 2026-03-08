# AGENTS.md — FG2GLandingpage

> Ecosystem Operating Standard v3.0 | Governance Hub: `SAHearn1/rwfw-agent-governance`

## Rule 1 — Deterministic Debugging
Never guess. Read the actual file, the actual error, the actual log. Reproduce before fixing.

## Rule 2 — First-Failing-Boundary
Identify the exact layer where correct input produces incorrect output. Do not fix symptoms above the boundary.

## Rule 3 — Smallest-Viable-Fix
Change the minimum code required.

## Rule 4 — Verify Before Complete
Test in browser, check network requests, validate links before marking done.

## Rule 5 — Governance-Only Write Scope
This operating system governs `.github/`, `docs/`, `AGENTS.md`, `repo.intelligence.yml` only.

## Rule 6 — Swarm Safety
One agent writes to one file at a time.

## Rule 7 — Handoff Protocol
Write current state to `docs/INCIDENTS.md` before ending session.

## Rule 8 — Git Safety
- Never `git add .`
- Never force-push protected branches
- Always work on `agent-operating-system-install` or a named feature branch

---

## Stack Reference
- **Type:** Static HTML + Vercel Functions
- **Hosting:** Vercel
- **Serverless:** Vercel API routes / Edge functions (TODO: verify)
- **Purpose:** Landing page for FG2G

## Governance Hub
See `SAHearn1/rwfw-agent-governance` for full playbooks, registries, and swarm rules.
