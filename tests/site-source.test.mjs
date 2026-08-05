import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

const domain = 'https://warfare1942unblocked.org';
const iframeUrl = 'https://www.gamezhero.com/get-game-code/cd49f7f7616e5661b97901dc688b4385';
const sourcePages = [
  'src/pages/index.astro',
  'src/pages/promo-codes/index.astro',
  'src/pages/download/index.astro',
  'src/pages/how-to-play/index.astro',
  'src/pages/unblocked/index.astro',
  'src/pages/privacy/index.astro',
  'src/pages/contact/index.astro',
  'src/pages/404.astro'
];

test('all required source routes exist', () => {
  const missing = sourcePages.filter((file) => !existsSync(file));
  assert.deepEqual(missing, [], `Missing source routes: ${missing.join(', ')}`);
});

test('shared data uses the production domain and public playable embed', () => {
  assert.ok(existsSync('src/data/site.mjs'), 'src/data/site.mjs must exist');
  const source = readFileSync('src/data/site.mjs', 'utf8');
  assert.match(source, new RegExp(domain.replaceAll('.', '\\.')));
  assert.ok(source.includes(iframeUrl), 'public game iframe URL must be centralized');
  assert.ok(source.includes('com.warfare.ww2.online'), 'verified Android package must be recorded');
});

test('production source does not contain fabricated promo codes or placeholder domains', () => {
  const files = sourcePages.filter(existsSync);
  const source = files.map((file) => readFileSync(file, 'utf8')).join('\n');
  assert.doesNotMatch(source, /EXAMPLE_ONLY_NOT_FOR_PRODUCTION|YOUR-DOMAIN|example\.com/i);
  assert.doesNotMatch(source, /9\.2\s*(?:player|rating|score)/i);
});

test('crawl and deployment files target the production domain', () => {
  for (const file of ['public/robots.txt', 'public/sitemap.xml', 'public/_headers']) {
    assert.ok(existsSync(file), `${file} must exist`);
  }
  assert.ok(readFileSync('public/robots.txt', 'utf8').includes(`${domain}/sitemap.xml`));
  const sitemap = readFileSync('public/sitemap.xml', 'utf8');
  for (const path of ['', 'promo-codes/', 'download/', 'how-to-play/', 'unblocked/', 'privacy/', 'contact/']) {
    assert.ok(sitemap.includes(`<loc>${domain}/${path}</loc>`), `sitemap missing /${path}`);
  }
});

test('Astro inline and external scripts declare inline handling explicitly', () => {
  for (const file of ['src/layouts/BaseLayout.astro', 'src/components/Breadcrumbs.astro']) {
    const source = readFileSync(file, 'utf8');
    const scriptTags = source.match(/<script[^>]*>/g) ?? [];
    for (const tag of scriptTags) {
      assert.ok(tag.includes('is:inline'), `${file} has an implicit inline script: ${tag}`);
    }
  }
});

test('clean-clone verification builds output and the iframe has minimal permissions', () => {
  const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
  assert.match(packageJson.scripts.test, /npm run build/, 'npm test must create dist before output assertions');

  const player = readFileSync('src/components/GamePlayer.astro', 'utf8');
  assert.match(player, /allow="autoplay; fullscreen; gamepad"/);
  assert.doesNotMatch(player, /clipboard-read|clipboard-write/);

  const home = readFileSync('src/pages/index.astro', 'utf8');
  assert.doesNotMatch(home, /August 6, 2026/, 'homepage verification date must come from shared data');
});
