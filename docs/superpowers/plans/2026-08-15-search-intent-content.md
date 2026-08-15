# Warfare 1942 Search-Intent Content Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the approved search-intent page consolidation, provider coverage, multiplayer guide, and truthful promo freshness state.

**Architecture:** Reuse the existing Astro page, breadcrumb, table, card, and shared-data patterns. Keep keyword synonyms consolidated into existing canonical pages and add only one differentiated `/multiplayer/` route.

**Tech Stack:** Astro 7 static output, JavaScript data modules, Node test runner, Playwright browser QA.

**Spec:** `docs/superpowers/specs/2026-08-15-search-intent-content-design.md`

## Global Constraints

- Preserve uncommitted `README.md` and `docs/PROJECT_HANDOFF.md` changes.
- Do not commit, push, create a PR, or deploy; the user requested review links after local verification.
- Do not fabricate promo codes, current mode names, map names, map rankings, or cross-version compatibility.
- Keep thin phrase-match routes absent and sitemap-excluded.

---

### Task 1: Lock the approved routing and evidence behavior with failing tests

**Files:**
- Modify: `tests/site-source.test.mjs`
- Modify: `tests/site-build.test.mjs`
- Modify: `tests/browser_check.py`

**Interfaces:**
- Consumes: Astro source files and generated `dist` HTML.
- Produces: regression coverage for `/multiplayer/`, promo overdue state, provider choices, beginner intent, and rejected thin routes.

- [ ] Add `/multiplayer/` to required source and built route collections.
- [ ] Assert `/multiplayer/` is in the sitemap with `2026-08-15` lastmod.
- [ ] Assert `/how-to-play/` owns beginner, tips, and gameplay-video intent.
- [ ] Assert `/unblocked/` links to Playgama without creating `/playgama/`.
- [ ] Assert the promo component says the August 14 check is overdue and does not claim it was completed.
- [ ] Assert multiplayer copy separates web, current Android, and legacy Android while refusing a fabricated best-map ranking.
- [ ] Run `node --test tests/site-source.test.mjs` and confirm failures are caused by the missing approved content.

### Task 2: Implement truthful shared status and provider data

**Files:**
- Modify: `src/data/site.mjs`
- Modify: `src/data/promo-status.mjs`
- Modify: `src/components/PromoUpdateStatus.astro`

**Interfaces:**
- Consumes: evidence dates and external provider URLs.
- Produces: `site.playgamaUrl`, overdue status copy, and an explicit `nextAction` message.

- [ ] Add the verified Playgama provider URL to shared site data.
- [ ] Change the missed promo status from `On schedule` to `Update overdue` without advancing `lastChecked`.
- [ ] Render the overdue explanation next to the existing schedule.
- [ ] Run `node --test tests/site-source.test.mjs` and confirm the shared-data assertions pass.

### Task 3: Consolidate beginner, tips, and video intent into `/how-to-play/`

**Files:**
- Modify: `src/pages/how-to-play/index.astro`

**Interfaces:**
- Consumes: published web controls and the approved external Y8 gameplay video.
- Produces: a single beginner-guide page with first-match flow, evidence labels, tactical advice, FAQ data, and an external video module.

- [ ] Update title, description, H1, and FAQ schema for beginner-guide intent.
- [ ] Add a table of contents and a version scope callout.
- [ ] Expand first-match steps and beginner mistakes while retaining the published controls.
- [ ] Add a labelled external Y8 gameplay-video section without creating a video route or third-party iframe.
- [ ] Run `npm.cmd run build` and confirm the page compiles.

### Task 4: Add Playgama to `/unblocked/` and keep provider intent consolidated

**Files:**
- Modify: `src/pages/unblocked/index.astro`

**Interfaces:**
- Consumes: `site.playgamaUrl`, existing Y8 URL, CrazyGames URL, and embedded player.
- Produces: a provider comparison table and external Playgama choice.

- [ ] Add Playgama to the provider-choice cards.
- [ ] Add a provider comparison table covering device guidance, download requirement, and scope.
- [ ] Add a concise Armor Games disambiguation link back to the homepage.
- [ ] Run `npm.cmd run build` and confirm the page compiles.

### Task 5: Create the differentiated multiplayer guide

**Files:**
- Create: `src/pages/multiplayer/index.astro`
- Modify: `src/data/site.mjs`
- Modify: `src/components/SiteFooter.astro`
- Modify: `public/sitemap.xml`

**Interfaces:**
- Consumes: version identities and evidence boundaries from `src/data/site.mjs` and `research-notes.md`.
- Produces: indexable `/multiplayer/` HTML, navigation links, canonical metadata, FAQ schema, and sitemap entry.

- [ ] Create the page with version-first scope, known multiplayer facts, evidence tables, team tips, and map-status answer.
- [ ] Add `/multiplayer/` to shared routes and footer navigation.
- [ ] Add `/multiplayer/` to the sitemap with `2026-08-15` lastmod.
- [ ] Run `npm.cmd run build` and confirm the new static route is generated.

### Task 6: Connect homepage intent and finish regression coverage

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `public/sitemap.xml`
- Modify: `tests/site-source.test.mjs`
- Modify: `tests/site-build.test.mjs`
- Modify: `tests/browser_check.py`

**Interfaces:**
- Consumes: `/multiplayer/` and the existing page cluster.
- Produces: homepage feature-language alignment, internal links, refreshed lastmod values, and end-to-end coverage.

- [ ] Rename the homepage feature heading to `Warfare 1942 Game Features`.
- [ ] Add a multiplayer route card and FAQ answer without changing the same-name disambiguation boundary.
- [ ] Set affected sitemap lastmod values to `2026-08-15`; leave untouched pages unchanged.
- [ ] Run `npm.cmd test` and require all Node tests and Astro diagnostics to pass.
- [ ] Start a local preview and run `tests/browser_check.py` across desktop and mobile routes.
- [ ] Review `git diff --check`, `git diff --stat`, and the final changed-file allowlist.
