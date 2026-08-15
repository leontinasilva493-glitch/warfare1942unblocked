export const site = {
  name: 'Warfare 1942 Guide',
  displayName: 'WARFARE 1942',
  domain: 'https://warfare1942unblocked.org',
  description: 'An independent Warfare 1942 guide for browser play, controls, promo code status, and safe download links.',
  verifiedDate: 'August 7, 2026',
  verifiedIso: '2026-08-07',
  iframeUrl: 'https://www.gamezhero.com/get-game-code/cd49f7f7616e5661b97901dc688b4385',
  embedProvider: 'Gamezhero',
  developerUrl: 'https://fahrenheitdev.com/',
  crazyGamesUrl: 'https://www.crazygames.com/game/warfare-1942-riz',
  playgamaUrl: 'https://playgama.com/game/warfare-1942',
  googlePlayUrl: 'https://play.google.com/store/apps/details?id=com.warfare.ww2.online',
  legacyAndroidRecordUrl: 'https://www.appbrain.com/app/warfare-1942-shooting-games/com.ww2.shooter.war.games.online',
  warfare1917Url: 'https://armorgames.com/play/2267/',
  warfare1944Url: 'https://armorgames.com/play/4071/warfare-1944',
  repositoryUrl: 'https://github.com/leontinasilva493-glitch/warfare1942unblocked'
};

export const primaryRoutes = [
  { href: '/promo-codes/', label: 'Promo Codes' },
  { href: '/download/', label: 'Download' },
  { href: '/how-to-play/', label: 'How to Play' },
  { href: '/multiplayer/', label: 'Multiplayer' },
  { href: '/unblocked/', label: 'Play Online' }
];

export const controls = [
  { key: 'WASD', action: 'Move' },
  { key: 'Mouse 1', action: 'Shoot' },
  { key: 'Mouse 2', action: 'Aim' },
  { key: 'R', action: 'Reload' },
  { key: 'Space', action: 'Jump' },
  { key: 'C', action: 'Crouch' },
  { key: 'M', action: 'Open map' },
  { key: '1–5', action: 'Switch equipment' },
  { key: 'U', action: 'War dog ability' },
  { key: 'T', action: 'Match chat' },
  { key: 'Tab', action: 'Game menu' }
];

export const versionRows = [
  {
    version: 'Web browser',
    identity: 'Fahrenheit Dev title / distributor build',
    entry: 'Browser player',
    guidance: 'Play online; no installer is required.',
    href: '/unblocked/'
  },
  {
    version: 'Current Android',
    identity: 'Mosaic Games LLC',
    entry: 'com.warfare.ww2.online',
    guidance: 'Use the official Google Play listing only.',
    href: site.googlePlayUrl
  },
  {
    version: 'Legacy Android',
    identity: 'Archived publisher records vary',
    entry: 'com.ww2.shooter.war.games.online',
    guidance: 'No longer available on Google Play; no APK is hosted here.'
  },
  {
    version: 'iPhone / iPad',
    identity: 'Not independently confirmed',
    entry: 'No verified listing',
    guidance: 'Do not install a same-name app without checking its developer.'
  }
];

export const guideCards = [
  {
    href: '/promo-codes/',
    title: 'Promo Code Status',
    label: 'Verification · Rewards · Updates',
    image: '/images/guide-codes.webp',
    alt: 'WWII command map with unit markers'
  },
  {
    href: '/download/',
    title: 'Safe Download Options',
    label: 'Browser · Android · Version check',
    image: '/images/guide-download.webp',
    alt: 'Tank moving across a dusty battlefield'
  },
  {
    href: '/how-to-play/',
    title: 'Controls & Field Guide',
    label: 'Controls · First match · Tips',
    image: '/images/guide-controls.webp',
    alt: 'Stylized soldiers in a ruined city firefight'
  }
];

export function canonicalUrl(path = '/') {
  return new URL(path, `${site.domain}/`).toString();
}
