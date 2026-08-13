const menuButton = document.querySelector('[data-menu-toggle]');
const menu = document.querySelector('[data-primary-nav]');

if (menuButton && menu) {
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    menu.classList.toggle('is-open', !open);
  });

  menu.addEventListener('click', (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      menuButton.setAttribute('aria-expanded', 'false');
      menu.classList.remove('is-open');
    }
  });
}

document.querySelectorAll('[data-game-player]').forEach((player) => {
  const frame = player.querySelector('[data-game-frame]');
  const loading = player.querySelector('[data-game-loading]');
  const loadingMessage = player.querySelector('[data-loading-message]');
  const container = player.querySelector('[data-game-container]');
  const fullscreenButton = player.querySelector('[data-fullscreen]');

  if (frame && loading) {
    frame.addEventListener('load', () => loading.classList.add('is-loaded'));
    window.setTimeout(() => {
      if (!loading.classList.contains('is-loaded') && loadingMessage) {
        loadingMessage.textContent = 'The player is taking longer than expected. Use the fallback link below if it remains unavailable.';
      }
    }, 15000);
  }

  fullscreenButton?.addEventListener('click', async () => {
    if (!container?.requestFullscreen) {
      fullscreenButton.textContent = 'Not supported';
      return;
    }

    try {
      await container.requestFullscreen();
    } catch {
      fullscreenButton.textContent = 'Fullscreen blocked';
    }
  });
});

document.querySelectorAll('[data-share-page]').forEach((button) => {
  button.addEventListener('click', async () => {
    const shareData = { title: document.title, url: window.location.href };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        button.textContent = 'Link copied';
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;
      button.textContent = 'Copy failed';
    }
  });
});

document.querySelectorAll('[data-related-game]').forEach((link) => {
  link.addEventListener('click', () => {
    if (typeof window.clarity === 'function') {
      window.clarity('event', 'related_game_click');
    }
  });
});

document.querySelectorAll('[data-save-page]').forEach((button) => {
  const storageKey = `warfare1942:saved:${window.location.pathname}`;
  let saved = false;
  try {
    saved = window.localStorage.getItem(storageKey) === 'true';
  } catch {
    saved = false;
  }

  const render = () => {
    button.setAttribute('aria-pressed', String(saved));
    button.textContent = saved ? 'Saved' : 'Save page';
  };

  render();
  button.addEventListener('click', () => {
    saved = !saved;
    try {
      window.localStorage.setItem(storageKey, String(saved));
    } catch {
      saved = false;
    }
    render();
  });
});
