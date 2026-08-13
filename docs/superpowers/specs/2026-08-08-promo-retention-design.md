# Promo Freshness and Session Retention Design

## Outcome

Give visitors a truthful weekly reason to revisit the Warfare 1942 promo-code page and a useful next action after the embedded game, without fabricating codes, freshness, or playable related-game pages.

## Promo-code operating model

- Promise a weekly verification cadence, not a weekly code release: `Checked every Friday`.
- Show `Last verified`, `Next scheduled check`, current web/Android status, and a short visible check history.
- Keep the current zero-code result until exact source, platform, reward, redemption path, date, and reproducible result exist.
- If a scheduled review is missed, the data model must be able to expose an overdue state instead of silently advancing the date.
- Keep visible dates and FAQ answers sourced from one shared data object.
- Do not advance sitemap `lastmod` merely because a date rolled over; it changes only with a significant page update.

## Related-game decision

- Render one shared `More games like this` strip immediately after the Warfare 1942 player block on both `/` and `/unblocked/`.
- Use three evidence-labelled candidates: Fields of Fury IO, Pixel Warfare IO, and Narrow One.
- Each candidate has a public Gamezhero listing and public embed code, but browser QA on 2026-08-08 did not complete the provider-controlled advertising/security flow into the actual game client.
- Therefore every card is an external provider link opened in a new tab and labelled `External play`; no internal playable route is created, indexed, or added to the sitemap.
- Record clicks with a guarded Microsoft Clarity custom event when the production tracker is available.

## Components and data

- `src/data/promo-status.mjs` owns the cadence, platform status, and history.
- `src/data/related-games.mjs` owns candidate identity, labels, provider URLs, image URLs, and evidence state.
- `src/components/PromoUpdateStatus.astro` renders the weekly operating status.
- `src/components/RelatedGames.astro` renders the reusable card strip.
- `GamePlayer.astro` composes `RelatedGames` after the existing fallback block.
- `public/scripts/site.js` emits `related_game_click` without failing when Clarity is absent.

## SEO and indexability

- Keep existing canonical routes unchanged.
- Add no new sitemap URLs.
- Do not use external candidates in VideoGame structured data as if they were hosted games.
- The promo page remains indexable because it provides a direct answer, transparent evidence state, and a visible operating history.

## Verification

- Tests assert the promo cadence, visible ISO dates, history, candidate labels, external-link behavior, and absence of new related-game sitemap URLs.
- Production build must pass with zero Astro diagnostics.
- Desktop and mobile browser QA must confirm the strip appears after the player, links are keyboard accessible, and the page has no horizontal overflow.
