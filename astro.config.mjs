import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://warfare1942unblocked.org',
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory'
  }
});
