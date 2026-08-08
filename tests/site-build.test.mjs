import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

const domain = 'https://warfare1942unblocked.org';
const iframeUrl = 'https://www.gamezhero.com/get-game-code/cd49f7f7616e5661b97901dc688b4385';
const builtRoutes = new Map([
  ['/', 'dist/index.html'],
  ['/promo-codes/', 'dist/promo-codes/index.html'],
  ['/download/', 'dist/download/index.html'],
  ['/how-to-play/', 'dist/how-to-play/index.html'],
  ['/unblocked/', 'dist/unblocked/index.html'],
  ['/privacy/', 'dist/privacy/index.html'],
  ['/contact/', 'dist/contact/index.html'],
  ['/404', 'dist/404.html']
]);

test('build emits every required static route', () => {
  const missing = [...builtRoutes.values()].filter((file) => !existsSync(file));
  assert.deepEqual(missing, [], `Missing built routes: ${missing.join(', ')}`);
});

test('built pages have unique metadata and self-canonical URLs', () => {
  const titles = new Set();
  for (const [route, file] of builtRoutes) {
    if (!existsSync(file)) continue;
    const html = readFileSync(file, 'utf8');
    const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
    const description = html.match(/<meta name="description" content="([^"]+)"/i)?.[1];
    assert.ok(title, `${route} missing title`);
    assert.ok(description, `${route} missing description`);
    assert.ok(!titles.has(title), `${route} duplicates title ${title}`);
    titles.add(title);
    if (route !== '/404') {
      assert.ok(html.includes(`<link rel="canonical" href="${domain}${route}"`), `${route} canonical mismatch`);
    }
    assert.match(html, /<h1[ >]/i, `${route} missing H1`);
  }
});

test('home and unblocked routes render the playable embed with a CrazyGames fallback', () => {
  for (const file of ['dist/index.html', 'dist/unblocked/index.html']) {
    assert.ok(existsSync(file), `${file} must exist`);
    const html = readFileSync(file, 'utf8');
    assert.ok(html.includes(iframeUrl), `${file} missing iframe URL`);
    assert.match(html, /allowfullscreen/i);
    assert.match(html, /Play on CrazyGames/i);
  }
});

test('built site contains no production placeholders or fabricated example code', () => {
  const html = [...builtRoutes.values()].filter(existsSync).map((file) => readFileSync(file, 'utf8')).join('\n');
  assert.doesNotMatch(html, /EXAMPLE_ONLY_NOT_FOR_PRODUCTION|YOUR-DOMAIN|example\.com/i);
});

test('every built page loads the configured Microsoft Clarity project once', () => {
  for (const [route, file] of builtRoutes) {
    if (!existsSync(file)) continue;
    const html = readFileSync(file, 'utf8');
    const loaders = html.match(/https:\/\/www\.clarity\.ms\/tag\//g) ?? [];
    const projectInitializers = html.match(/"clarity",\s*"script",\s*"xy7h8iffbr"/g) ?? [];
    assert.equal(loaders.length, 1, `${route} must include one Clarity loader`);
    assert.equal(projectInitializers.length, 1, `${route} must initialize the configured Clarity project once`);
  }
});

test('homepage answers the game identity and Armor Games confusion', () => {
  const html = readFileSync('dist/index.html', 'utf8');
  assert.match(html, /session-based World War II online shooter/i);
  assert.match(html, /href="https:\/\/fahrenheitdev\.com\//i);
  assert.match(html, /no current Warfare 1942 listing on Armor Games/i);
  assert.match(html, /Warfare 1917/);
  assert.match(html, /Warfare 1944/);
});

test('online page directly answers play-now and no-download intent', () => {
  const html = readFileSync('dist/unblocked/index.html', 'utf8');
  assert.match(html, /online shooter/i);
  assert.match(html, /without a PC download/i);
  assert.match(html, /Warfare 1942 online quick facts/i);
});

test('download page distinguishes current, legacy, and unverified listings', () => {
  const html = readFileSync('dist/download/index.html', 'utf8');
  assert.match(html, /com\.warfare\.ww2\.online/);
  assert.match(html, /com\.ww2\.shooter\.war\.games\.online/);
  assert.match(html, /no longer available on Google Play/i);
  assert.match(html, /App Store listing.*not independently verified/is);
});

test('promo-code page gives dated web and Android status answers', () => {
  const html = readFileSync('dist/promo-codes/index.html', 'utf8');
  assert.match(html, /Web build/i);
  assert.match(html, /Current Android/i);
  assert.match(html, /No independently verified active codes/i);
  assert.match(html, /<time datetime="2026-08-07">August 7, 2026<\/time>/i);
});

test('promo-code page gives a direct query answer and exposes it as an FAQ', () => {
  const html = readFileSync('dist/promo-codes/index.html', 'utf8');
  assert.match(html, /Quick answer/i);
  assert.match(html, /0 independently verified active Warfare 1942 promo codes/i);
  assert.match(html, /"@type":"FAQPage"/i);
  assert.match(html, /Are there any working Warfare 1942 promo codes/i);
});

test('how-to-play page answers the Wardogs key query for the web build', () => {
  const html = readFileSync('dist/how-to-play/index.html', 'utf8');
  assert.match(html, /What is the Wardogs key in Warfare 1942/i);
  assert.match(html, /press <kbd>U<\/kbd>/i);
  assert.match(html, /published web controls/i);
  assert.match(html, /not a promo code or activation key/i);
});

test('download page answers mod APK intent without offering an APK file', () => {
  const html = readFileSync('dist/download/index.html', 'utf8');
  assert.match(html, /Is there an official Warfare 1942 mod APK/i);
  assert.match(html, /no official or independently verified Warfare 1942 mod APK/i);
  assert.match(html, /href="https:\/\/play\.google\.com\/store\/apps\/details\?id=com\.warfare\.ww2\.online"/i);
  assert.doesNotMatch(html, /href="[^"]+\.apk(?:[?#][^"]*)?"/i);
});
