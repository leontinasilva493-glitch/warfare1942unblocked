# Warfare 1942 Guide

Static Astro site for `https://warfare1942unblocked.org`. It combines an iframe player with evidence-safe pages for promo-code status, downloads, controls, and version identity.

## Local development

Requirements: Node.js 22 or newer and npm.

```powershell
npm.cmd install
npm.cmd run dev
```

Astro prints the local development URL, normally `http://localhost:4321/`.

## Production verification

```powershell
npm.cmd test
npm.cmd run preview -- --host 127.0.0.1
```

`npm test` creates a fresh production build before checking the generated HTML, so it is safe to run in a clean clone.

- Static output: `dist/`
- Required build command: `npm run build`
- Required output directory: `dist`
- No runtime environment variables are required.

## Content and evidence updates

Shared platform facts and player URLs live in `src/data/site.mjs`. Before changing the visible verification date:

1. Reopen the direct sources recorded in `research-notes.md`.
2. Record the version, platform, source URL, result, and check date.
3. Update public copy only when the evidence supports it.
4. Update `site.verifiedDate`, `site.verifiedIso`, visible page dates, and sitemap `lastmod` together.

Never add a promo code without the exact code, source, platform, reward, test date, and reproducible result. Do not host APK, EXE, DMG, or modified files.

## Embedded game player

The outer CrazyGames game page blocks cross-site framing. Its internal game frame can be loaded but shows an exclusivity notice instead of the game outside CrazyGames. Miniplay's public wrapper also fails on an independent top-level domain because its nested player has a restrictive `frame-ancestors` policy. The site therefore uses Gamezhero's public Warfare 1942 embed page:

```text
https://www.gamezhero.com/get-game-code/cd49f7f7616e5661b97901dc688b4385
```

Browser QA reached the actual GameDistribution client and its resource-loading screen through this embed. The provider shows advertising and several start prompts before gameplay; do not describe it as ad-free or one-click play. After every deployment, verify the complete start flow from the production domain. If Gamezhero changes or blocks it, remove the iframe or replace it only with another distributor endpoint that explicitly provides embed code. Keep the external CrazyGames link as the fallback.

## Cloudflare Pages

Create a Pages project from the GitHub repository with:

- Production branch: `main`
- Framework preset: Astro
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: repository root
- Node version: `22`

The repository includes `public/_headers` and `public/_redirects`; Astro copies them into `dist/` for Cloudflare Pages.

For the custom domain:

1. Add `warfare1942unblocked.org` in **Workers & Pages → project → Custom domains**.
2. Follow Cloudflare's DNS prompt. Do not manually guess a CNAME target when the zone is already on Cloudflare.
3. Add `www.warfare1942unblocked.org` only if it will be redirected consistently to the apex domain.
4. Wait for the domain status and edge certificate to become active.
5. Verify HTTPS, canonical HTML, `/robots.txt`, `/sitemap.xml`, all routes, the 404 response, and the iframe from an external network.

## Vercel alternative

Import the repository, keep the detected Astro preset, use `npm run build`, and publish `dist`. Add the apex domain in Project Settings → Domains, follow the shown DNS records, and repeat the same live checks.

## Rollback

Cloudflare Pages and Vercel both retain prior deployments. Roll back to the last verified deployment, then confirm the live HTML is served from the expected Git commit. A successful local build or GitHub push alone is not production proof.

## Routes

- `/` — entity hub and embedded player
- `/promo-codes/` — evidence-gated code status
- `/download/` — browser and Android options
- `/how-to-play/` — controls and first-match guide
- `/unblocked/` — focused player route and loading help
- `/privacy/` — iframe and local-storage disclosure
- `/contact/` — correction and issue channel

## Independence notice

Warfare 1942 Guide is an independent fan-made resource and is not affiliated with or endorsed by the game's developers or distribution platforms.
