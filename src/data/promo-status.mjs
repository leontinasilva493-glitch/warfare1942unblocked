export const promoStatus = {
  cadenceLabel: 'Checked every Friday',
  statusLabel: 'Update overdue',
  activeCodeCount: 0,
  lastChecked: {
    iso: '2026-08-07',
    label: 'Friday, August 7, 2026',
    shortLabel: 'August 7, 2026'
  },
  nextCheck: {
    iso: '2026-08-14',
    label: 'Friday, August 14, 2026',
    shortLabel: 'August 14, 2026'
  },
  nextAction: 'The scheduled August 14 verification has not been completed. The last verified result remains August 7 until a new evidence review is recorded.',
  platforms: [
    { name: 'Web build', status: 'No verified active codes' },
    { name: 'Current Android', status: 'No verified active codes' }
  ],
  history: [
    {
      iso: '2026-08-07',
      label: 'Friday, August 7, 2026',
      scope: 'Web and Android reviewed',
      result: '0 verified active codes'
    }
  ]
};
