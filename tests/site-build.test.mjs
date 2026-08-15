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
  ['/multiplayer/', 'dist/multiplayer/index.html'],
  ['/unblocked/', 'dist/unblocked/index.html'],
  ['/chromebook/', 'dist/chromebook/index.html'],
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

test('playable routes render the public embed with a CrazyGames fallback', () => {
  for (const file of ['dist/index.html', 'dist/unblocked/index.html', 'dist/chromebook/index.html']) {
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

test('homepage routes generic visitors and disambiguates similarly named games', () => {
  const html = readFileSync('dist/index.html', 'utf8');
  assert.match(html, /aria-label="Choose your Warfare 1942 task"/i);
  assert.match(html, /third-person World War II online shooter/i);
  assert.match(html, /Battlefield 1942/i);
  assert.match(html, /Call of War 1942/i);
  assert.match(html, /different game series/i);
  assert.match(html, /Warfare 1942 Game Features/i);
  assert.match(html, /href="\/multiplayer\/"/i);
});

test('online page directly answers play-now and no-download intent', () => {
  const html = readFileSync('dist/unblocked/index.html', 'utf8');
  assert.match(html, /online shooter/i);
  assert.match(html, /without a PC download/i);
  assert.match(html, /Warfare 1942 online quick facts/i);
});

test('online page offers verified provider choices without promising network bypasses', () => {
  const html = readFileSync('dist/unblocked/index.html', 'utf8');
  assert.match(html, /Where can I play Warfare 1942 online/i);
  assert.match(html, /href="https:\/\/www\.y8\.com\/games\/warfare_1942"/i);
  assert.match(html, /Y8.*desktop.*keyboard.*mouse/is);
  assert.match(html, /href="https:\/\/playgama\.com\/game\/warfare-1942"/i);
  assert.match(html, /Playgama.*PC.*no download/is);
  assert.match(html, /availability and device support can vary by provider/i);
  assert.match(html, /does not provide proxies, VPN instructions/i);
});

test('download page distinguishes current, legacy, and unverified listings', () => {
  const html = readFileSync('dist/download/index.html', 'utf8');
  assert.match(html, /com\.warfare\.ww2\.online/);
  assert.match(html, /com\.ww2\.shooter\.war\.games\.online/);
  assert.match(html, /no longer available on Google Play/i);
  assert.match(html, /App Store listing.*not independently verified/is);
});

test('download page gives an accessible platform decision before installation details', () => {
  const html = readFileSync('dist/download/index.html', 'utf8');
  assert.match(html, /aria-label="Warfare 1942 platform options"/i);
  assert.match(html, /Windows.*Mac.*Play in browser/is);
  assert.match(html, /Android.*Google Play/is);
  assert.match(html, /iPhone.*iPad.*Not independently confirmed/is);
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

test('promo-code page uses a durable title and separates the Wardogs control query', () => {
  const html = readFileSync('dist/promo-codes/index.html', 'utf8');
  assert.doesNotMatch(html, /<title>[^<]*(?:January|February|March|April|May|June|July|August|September|October|November|December) 20\d{2}/i);
  assert.match(html, /Wardogs key.*keyboard control/is);
  assert.match(html, /href="\/how-to-play\/"/i);
});

test('player pages render three external browser-war-game recommendations', () => {
  for (const file of ['dist/index.html', 'dist/unblocked/index.html', 'dist/chromebook/index.html']) {
    const html = readFileSync(file, 'utf8');
    assert.match(html, /More Browser War Games/i, file);
    assert.doesNotMatch(html, /More games like this/i, file);
    assert.match(html, /Fields of Fury IO/i, file);
    assert.match(html, /Pixel Warfare IO/i, file);
    assert.match(html, /Narrow One/i, file);
    assert.equal((html.match(/data-related-game=/g) ?? []).length, 3, file);
    assert.match(html, /External play/i, file);
    assert.match(html, /target="_blank"/i, file);
    assert.match(html, /rel="noopener"/i, file);
    assert.doesNotMatch(html, /href="\/games\//i, file);
  }
});

test('privacy page discloses third-party related-game thumbnail requests', () => {
  const html = readFileSync('dist/privacy/index.html', 'utf8');
  assert.match(html, /<time datetime="2026-08-08">August 8, 2026<\/time>/i);
  assert.match(html, /related-game thumbnails/i);
  assert.match(html, /Gamezhero image CDN/i);
  assert.match(html, /IP address.*user-agent/is);
});

test('promo-code page exposes a truthful Friday verification cadence', () => {
  const html = readFileSync('dist/promo-codes/index.html', 'utf8');
  assert.match(html, /Checked every Friday/i);
  assert.match(html, /Last verified/i);
  assert.match(html, /<time datetime="2026-08-07">Friday, August 7, 2026<\/time>/i);
  assert.match(html, /Next scheduled check/i);
  assert.match(html, /<time datetime="2026-08-14">Friday, August 14, 2026<\/time>/i);
  assert.match(html, /Update overdue/i);
  assert.match(html, /scheduled August 14 verification has not been completed/i);
  assert.match(html, /Verification history/i);
  assert.match(html, /Web and Android reviewed/i);
});

test('how-to-play page answers the Wardogs key query for the web build', () => {
  const html = readFileSync('dist/how-to-play/index.html', 'utf8');
  assert.match(html, /What is the Wardogs key in Warfare 1942/i);
  assert.match(html, /press <kbd>U<\/kbd>/i);
  assert.match(html, /published web controls/i);
  assert.match(html, /not a promo code or activation key/i);
});

test('how-to-play page distinguishes verified web keys from mobile controls', () => {
  const html = readFileSync('dist/how-to-play/index.html', 'utf8');
  assert.doesNotMatch(html, /<title>[^<]*Modes/i);
  assert.match(html, /aria-label="Warfare 1942 control differences"/i);
  assert.match(html, /Web browser.*published keyboard bindings/is);
  assert.match(html, /Android.*control layout.*not independently documented/is);
  assert.match(html, /on-screen layout.*remain unverified/is);
});

test('how-to-play page identifies the covered browser shooter in search-facing copy', () => {
  const html = readFileSync('dist/how-to-play/index.html', 'utf8');
  assert.match(html, /<title>How to Play Warfare 1942: Beginner Guide, Controls &amp; Tips/i);
  assert.match(html, /<h1[^>]*>Warfare 1942 Beginner Guide: How to Play/i);
  assert.match(html, /CrazyGames/i);
  assert.match(html, /not Call of War or Battlefield 1942/i);
  assert.match(html, /Warfare 1942 Gameplay Video/i);
  assert.match(html, /href="https:\/\/www\.youtube\.com\/watch\?v=8XhZIrXphYM"/i);
});

test('multiplayer page separates version evidence and answers modes, maps, and team intent', () => {
  const html = readFileSync('dist/multiplayer/index.html', 'utf8');
  assert.match(html, /<title>Warfare 1942 Multiplayer Guide: Modes, Maps &amp; Team Tips/i);
  assert.match(html, /<h1[^>]*>Warfare 1942 Multiplayer Modes and Guide/i);
  assert.match(html, /Web browser.*Current Android.*Legacy Android/is);
  assert.match(html, /session-based shooter/i);
  assert.match(html, /dedicated tank battle mode/i);
  assert.match(html, /Map names and a best-map ranking are not independently verified/i);
  assert.match(html, /Published fact/i);
  assert.match(html, /Guide advice/i);
  assert.match(html, /Not verified/i);
  assert.match(html, /href="\/how-to-play\/"/i);
  assert.match(html, /"@type":"FAQPage"/i);
  assert.doesNotMatch(html, /best map is/i);
});

test('Chromebook page gives a scoped play path without promising policy bypasses', () => {
  const html = readFileSync('dist/chromebook/index.html', 'utf8');
  assert.match(html, /<title>Warfare 1942 on Chromebook:/i);
  assert.match(html, /<h1[^>]*>Warfare 1942 on Chromebook/i);
  assert.match(html, /no Windows or Mac installer/i);
  assert.match(html, /managed Chromebook/i);
  assert.match(html, /administrator.*network policy/is);
  assert.match(html, /does not provide proxies, VPNs, or bypass methods/i);
  assert.match(html, /href="\/"/i);
});

test('download page answers mod APK intent without offering an APK file', () => {
  const html = readFileSync('dist/download/index.html', 'utf8');
  assert.match(html, /Is there an official Warfare 1942 mod APK/i);
  assert.match(html, /no official or independently verified Warfare 1942 mod APK/i);
  assert.match(html, /href="https:\/\/play\.google\.com\/store\/apps\/details\?id=com\.warfare\.ww2\.online"/i);
  assert.doesNotMatch(html, /href="[^"]+\.apk(?:[?#][^"]*)?"/i);
});
