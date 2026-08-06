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
