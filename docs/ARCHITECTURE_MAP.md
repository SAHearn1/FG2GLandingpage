# Architecture Map — FG2GLandingpage

## Structure

```
/
├── index.html            # Landing page
├── api/                  # Vercel serverless functions (TODO: verify)
├── css/ or styles/       # Stylesheets (TODO: verify)
├── js/ or scripts/       # JavaScript (TODO: verify)
└── public/ or assets/    # Static assets (TODO: verify)
```

## Deployment Flow
```
Git push to main → Vercel auto-deploy → CDN distribution
```

## Serverless Functions (TODO: verify)
- Vercel Functions in `/api` directory
- Called from client-side JavaScript
- May handle: form submissions, email, external API proxy
