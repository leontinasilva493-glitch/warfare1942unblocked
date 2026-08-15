# Warfare 1942 Search-Intent Content Design

## Goal

Consolidate the Google and Bing search-intent clusters into useful, evidence-bounded pages without creating thin phrase-match routes.

## Approved information architecture

- Keep `/` as the generic game identity, version, feature, and same-name disambiguation page.
- Keep `/unblocked/` as the provider-choice and immediate browser-play page; add Playgama beside the existing embedded, Y8, and CrazyGames options.
- Keep `/how-to-play/` as the single canonical beginner-guide, controls, first-match, tips, and gameplay-video page.
- Add `/multiplayer/` for multiplayer structure, version-specific modes, map evidence, team play, and multiplayer tips.
- Keep `/download/` and `/promo-codes/` as the existing installation and code-status destinations.
- Do not add `/tips/`, `/beginner-guide/`, `/strategy-tips/`, `/game-features/`, `/best-maps/`, `/videos/`, `/y8/`, `/playgama/`, or `/armor-games/`.

## Evidence rules

- Separate the web build, current Android package `com.warfare.ww2.online`, and legacy Android package `com.ww2.shooter.war.games.online`.
- Label publisher statements as published facts and tactical recommendations as guide advice.
- Do not publish unverified map names, a best-map ranking, current mode names, friend-lobby behavior, bots, matchmaking rules, or cross-version progression claims.
- A missed promo-code verification date must be shown as overdue; dates advance only after a real evidence review.
- Third-party provider and video links must identify the external destination and must not imply affiliation.

## SEO and indexability

- `/multiplayer/` is indexable because it provides differentiated version and evidence tables rather than a phrase-match doorway.
- All affected pages use self-canonical trailing-slash URLs and remain in the sitemap.
- Thin provider, map-ranking, and video routes remain absent from the sitemap.

## Verification

- Source tests cover required routes, rejected thin routes, promo freshness, and approved keyword clusters.
- Build tests cover metadata, canonicals, page copy, provider links, sitemap inclusion, and evidence boundaries.
- Browser QA covers all indexable routes on desktop and mobile with overflow and first-party error checks.
