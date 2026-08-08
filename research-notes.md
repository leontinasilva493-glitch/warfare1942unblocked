# Warfare 1942 research notes

Checked: 2026-08-06 (Asia/Shanghai)

## Player decision

- The requested outer CrazyGames page is `https://www.crazygames.com/game/warfare-1942-riz`.
- A HEAD request to that page returned HTTP 200 and `X-Frame-Options: SAMEORIGIN`, so the page itself cannot be embedded on `warfare1942unblocked.org`.
- The CrazyGames page source identifies its actual game frame as `https://games.crazygames.com/en_US/warfare-1942-riz/index.html`.
- A HEAD request to that game-frame URL returned HTTP 200 without an `X-Frame-Options` or `Content-Security-Policy` frame restriction in the response checked on 2026-08-06.
- The user explicitly requested a CrazyGames iframe so visitors could play on-site. Browser QA proved the direct game frame renders a CrazyGames exclusivity screen instead of the game when embedded on localhost.
- The CrazyGames-only frame is therefore not used as the production player. It remains a visible external fallback link.
- Miniplay's public wrapper was also browser-tested, but its nested Playhop player rejects an independent top-level origin through `Content-Security-Policy: frame-ancestors`; it is not used.
- A direct GameDistribution client request for `warfare1942unblocked.org` reaches an unregistered-domain block, so the raw client URL is not used or bypassed.
- Gamezhero publicly provides an embed page for its Warfare 1942 listing: `https://www.gamezhero.com/get-game-code/cd49f7f7616e5661b97901dc688b4385`.
- Browser QA on 2026-08-06 followed the Gamezhero start flow into GameDistribution's Warfare 1942 client and observed the client resource-loading progress bar. The production iframe uses this public embed page.
- The embed displays third-party advertising and multiple start prompts before the game client loads; the site discloses this behavior rather than claiming an ad-free or one-click player.
- Production-domain behavior must still be rechecked after deployment because a distributor can change frame policies independently of this repository.

## Current Android evidence

Google Play URL: `https://play.google.com/store/apps/details?id=com.warfare.ww2.online`

Observed on 2026-08-06:

- App name: Warfare 1942: Online Shooter
- Developer: Mosaic Games LLC
- Package: `com.warfare.ww2.online`
- Listing update date: July 24, 2026
- Download band shown: 10K+
- Content rating: Teen
- Published features include online PvP, a tank battle mode, soldier customization, a World War II weapon selection, 14 unique war dogs, and clans.

## Web distributor evidence

- Gamezhero publicly provides the embed page used by the site player; browser QA reached the nested GameDistribution client through it.
- Miniplay identifies Full HP Ltd and publishes basic move, shoot, aim, and reload controls.
- Gameflare's public game and embed page lists the extended web key set used in this guide: WASD, mouse buttons, Space, C, R, 1–5, U, M, T, and Tab.
- The website labels these as published distributor controls rather than first-hand gameplay observations.

## Evidence-safe code status

- No active promo code is rendered.
- No expired code is rendered.
- No redemption steps are rendered as confirmed.
- The visible statement is limited to: this guide has not independently verified an active code as of 2026-08-06.

## Items not independently verified

- Whether the browser and current Android releases share accounts, progress, purchases, or promo-code systems.
- A same-product iOS listing.
- A stable redemption menu in every current build.
- First-hand match modes, spawn rules, scoring, bots, login requirements, or matchmaking details.
- Permanent third-party iframe availability on the production domain.

These unknowns are intentionally not presented as confirmed facts on the public pages.

## GSC query-intent update (2026-08-08)

The user supplied a Google Search Console screenshot showing these hot queries:

- `warfare 1942 promo code`
- `wardogs key`
- `warfare 1942 mod apk`

The screenshot does not show clicks, impressions, CTR, position, country, device, or landing-page dimensions, so it supports query discovery but not a ranking or traffic-growth claim.

- Promo-code searchers want a current working-code answer, redemption location, reward, and version compatibility. The existing promo-code route now gives the evidence-bounded zero-code answer first and exposes matching FAQ data.
- `wardogs key` is treated as a control query because the recorded distributor controls map the web build's war-dog ability to `U`. The guide explicitly distinguishes that binding from a promo or activation key and does not extend it to Android controls.
- Mod-APK searchers want a modified Android package or the benefits commonly claimed for one. The download route now answers the exact query, explains that no official or independently verified mod APK is offered, and directs users to the verified Google Play listing or browser build.

No new route was created because each query already has a strong intent match among the existing pages. External search and page-retrieval services were unavailable during this update, so the shared source-verification date was not advanced and no new third-party claims were added.

## Related-game retention review (2026-08-08)

Three public Gamezhero listings were reviewed as closely related browser-action candidates:

- Fields of Fury IO: `https://www.gamezhero.com/games/fieldsoffuryio`
- Pixel Warfare IO: `https://www.gamezhero.com/games/pixelwarfareio`
- Narrow One: `https://www.gamezhero.com/games/narrow-one`

Each listing exposes a public provider page and embed wrapper. Browser QA reached the provider's advertising/start flow, but did not complete a reliable launch of the actual game client; one attempt was redirected into an unrelated advertisement and Cloudflare challenge. None of the three therefore passes the evidence gate for a first-party playable or indexable page on this site.

The conservative implementation renders them only as clearly labelled external recommendations below the existing Warfare 1942 player. Links open the public provider pages in a new tab, Clarity records the shared `related_game_click` event, and no `/games/` routes or sitemap entries were created.
