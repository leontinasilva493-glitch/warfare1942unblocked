# Warfare 1942 Site Design

## Outcome

Build a production-ready English static game guide for `https://warfare1942unblocked.org` that lets visitors play Warfare 1942 in an iframe and also answers high-intent searches about promo codes, downloads, and controls.

## Source precedence

1. `Warfare-1942-快速上站更新版方案.md` controls information architecture, evidence standards, SEO, platform claims, and compliance copy.
2. `design-export/warfare-1942-design-spec.md` and its seven PNG references control visual direction, spacing, color, typography, and responsive layout.
3. The user's explicit instruction on 2026-08-06 controls the player: the site must iframe the CrazyGames-hosted game.

## Architecture

- Astro static output with shared layouts and components.
- English routes: `/`, `/promo-codes/`, `/download/`, `/how-to-play/`, `/unblocked/`, `/privacy/`, `/contact/`, plus a static 404 page.
- One shared evidence/data module is the source for domain, verification dates, platform facts, external URLs, controls, and iframe source.
- Homepage follows the exported seven-section design: sticky navigation, hero, 16:9 player, controls, game overview, guide cards, footer.
- Supporting routes reuse the same black, charcoal, and matte-gold military editorial system without copying the homepage composition verbatim.

## Player decision

- Do not iframe `https://www.crazygames.com/game/warfare-1942-riz`; it currently returns `X-Frame-Options: SAMEORIGIN` and will be blocked.
- Use the game frame loaded by the CrazyGames page: `https://games.crazygames.com/en_US/warfare-1942-riz/index.html`.
- Grant fullscreen, autoplay, clipboard, and gamepad permissions needed for play.
- Keep a visible loading layer, fullscreen control, and an external CrazyGames fallback link.
- Disclose the third-party frame in Privacy and do not promise that school or workplace filters can be bypassed.

## Content decisions

- Do not publish the unverified `9.2` rating from the design mockup.
- Do not invent active or expired promo codes, redemption steps, PC installers, APK files, iOS support, or cross-platform sync.
- The codes page states that this guide has no independently verified active codes as of August 6, 2026.
- PC and Mac are described as browser play; Android links only to Google Play package `com.warfare.ww2.online` by Mosaic Games LLC.
- Controls are limited to distributor-listed keys and are presented as the web build's published controls, not as claims from first-hand long-form gameplay testing.
- Use the real domain in canonical tags, Open Graph data, robots, sitemap, and JSON-LD.

## Visual system

- Background `#0F0E0E`, surface `#1A1917`, card `#22211E`, hairline `#2E2C28`, gold `#E8C268`, primary text `#F2F2EF`, secondary text `#A8A69F`.
- Bebas Neue for display text and Inter/system fallbacks for body copy.
- 1200px content width, straight-edged sections/cards, small radii only on buttons/media, and gold reserved for CTA and metadata accents.
- Responsive breakpoints at 1200px and 768px; player always stays 16:9.
- Crop the atmosphere image and three guide-card images from the user-provided design composites and serve optimized WebP assets.

## SEO and indexability

- All public content pages are indexable and self-canonical.
- Privacy and Contact are useful public trust pages and remain indexable.
- Every page has a unique title, description, H1, Open Graph/Twitter metadata, and appropriate breadcrumb JSON-LD.
- Homepage includes conservative `VideoGame` JSON-LD without rating or unsupported developer fields.
- Sitemap contains only implemented canonical routes with `2026-08-06` last modification dates.

## Verification

- Automated tests validate route manifests, domain/canonical consistency, iframe source, platform evidence, absence of fabricated codes, and built HTML metadata.
- Production build must exit successfully.
- Local production preview must return 200 for all routes and 404 for an unknown route.
- Desktop and mobile screenshots verify visual hierarchy, no overflow, and player aspect ratio.
- Browser console and iframe loading are checked; any third-party console noise is reported separately from site-owned errors.

