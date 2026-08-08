# Promo Freshness and Session Retention Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a truthful Friday promo-code verification rhythm and a measured related-game recommendation strip below the existing Warfare 1942 player.

**Architecture:** Static evidence data modules feed two focused Astro components. The promo page renders one source of truth for dates and history; the shared player composes an external-only recommendation strip because candidate gameplay did not pass the internal-page evidence gate.

**Tech Stack:** Astro, JavaScript modules, CSS, Microsoft Clarity, Node test runner.

## Global Constraints

- Do not invent promo codes, redemption steps, rewards, or successful candidate-game playability.
- Do not create related-game routes or add them to the sitemap in this release.
- Keep all external links labelled and opened in a new tab with `rel="noopener"`.
- Update `lastmod` only for a significant page change.
- Preserve the existing Warfare 1942 iframe and fallback behavior.

---

### Task 1: Weekly promo verification status

**Files:**
- Create: `src/data/promo-status.mjs`
- Create: `src/components/PromoUpdateStatus.astro`
- Modify: `src/pages/promo-codes/index.astro`
- Test: `tests/site-build.test.mjs`

**Interfaces:**
- Produces: `promoStatus` with `cadenceLabel`, `lastChecked`, `nextCheck`, `isOverdue`, `platforms`, and `history`.
- Consumes: `PromoUpdateStatus` renders `promoStatus` without duplicating date literals.

- [ ] Add a built-HTML test requiring `Checked every Friday`, the two ISO dates, web/Android status, and the one currently evidenced history entry; future Friday checks append records rather than backfilling invented history.
- [ ] Run `npm.cmd test` and confirm the new assertion fails because the weekly component is absent.
- [ ] Implement the shared status object and component with `<time>` elements and an overdue-ready status label.
- [ ] Replace the promo page's duplicated quick answer/status block with the new component while retaining the evidence-safe detailed sections.
- [ ] Run `npm.cmd test` and confirm the promo assertion passes.

### Task 2: Related-game recommendation strip

**Files:**
- Create: `src/data/related-games.mjs`
- Create: `src/components/RelatedGames.astro`
- Modify: `src/components/GamePlayer.astro`
- Modify: `src/styles/global.css`
- Test: `tests/site-build.test.mjs`

**Interfaces:**
- Produces: `relatedGames`, three external-only candidate records with `title`, `description`, `tags`, `image`, `providerUrl`, and `evidenceLabel`.
- Consumes: `RelatedGames` maps each record to a labelled external card and `GamePlayer` renders the component once after the fallback.

- [ ] Add built-output tests requiring the strip on both player pages, exactly three candidate links per page, `target="_blank"`, `rel="noopener"`, and no internal `/games/` URLs.
- [ ] Run `npm.cmd test` and confirm the assertions fail because the component is absent.
- [ ] Implement the data module with Fields of Fury IO, Pixel Warfare IO, and Narrow One, using the public Gamezhero listing/image URLs recorded in research.
- [ ] Implement the semantic card strip and compose it in `GamePlayer.astro` after `.game-fallback`.
- [ ] Add responsive desktop grid and mobile horizontal-scroll styles with visible focus states.
- [ ] Run `npm.cmd test` and confirm both built player pages pass the recommendation contract.

### Task 3: Clarity click measurement and evidence notes

**Files:**
- Modify: `public/scripts/site.js`
- Modify: `research-notes.md`
- Modify: `public/sitemap.xml`
- Test: `tests/site-source.test.mjs`

**Interfaces:**
- Consumes: links expose `data-related-game` and `data-related-game-title`.
- Produces: guarded `window.clarity('event', 'related_game_click')` calls in production and an updated homepage/unblocked/promo significant-change date.

- [ ] Add a source test requiring the guarded Clarity event and confirming no `/games/` URL entered the sitemap.
- [ ] Run the source test and confirm it fails because the handler is absent.
- [ ] Add one delegated click handler that safely no-ops when Clarity is unavailable.
- [ ] Record candidate sources, embed endpoints, the incomplete play-flow result, and the external-only decision in `research-notes.md`.
- [ ] Update only the three materially changed sitemap entries to `2026-08-08`.
- [ ] Run the source test and full suite.

### Task 4: Production and browser verification

**Files:**
- Modify only task-owned files if verification finds a defect.

**Interfaces:**
- Produces: a reviewable local production URL with verified desktop/mobile routes.

- [ ] Run `npm.cmd test` and require 0 Astro diagnostics and all Node tests passing.
- [ ] Run `git diff --check` and inspect the complete scoped diff.
- [ ] Start `npm.cmd run preview -- --host 127.0.0.1 --port 4330` in a hidden task-owned process.
- [ ] Verify `/promo-codes/`, `/`, and `/unblocked/` return 200.
- [ ] Verify desktop placement, mobile horizontal scrolling, focusable links, target/rel attributes, and no document overflow.
- [ ] Report the local URLs and keep the branch uncommitted/unpushed for user review.
