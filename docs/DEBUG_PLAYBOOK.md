# Debug Playbook — FG2GLandingpage

## Static Asset Failures

| Symptom | First Check | Likely Cause |
|---------|------------|---------------|
| Styles missing | CSS link path | Wrong relative path |
| Images broken | src attribute | Missing file or wrong path |
| Blank page | Browser console | JS error on load |

## Vercel Function Failures

| Symptom | First Check | Likely Cause |
|---------|------------|---------------|
| 500 on API call | Vercel function logs | Runtime error in function |
| 404 on /api route | Function file path | Wrong directory structure |
| CORS error | Function headers | Missing CORS headers |
| Env var undefined | Vercel project settings | Var not set in Vercel dashboard |

## Deployment Failures

| Symptom | First Check | Likely Cause |
|---------|------------|---------------|
| Deploy failed | Vercel build logs | Build error |
| Changes not live | Vercel dashboard | Deploy didn't trigger |
