// @ts-check
import cloudflare from '@astrojs/cloudflare';
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

function stabilizeCloudflareDevDeps() {
  return {
    name: 'stabilize-cloudflare-dev-deps',
    /** @param {string} name */
    configEnvironment(name) {
      if (name !== 'client') {
        return {
          optimizeDeps: {
            exclude: ['astro/app', 'astro:i18n', 'astro/virtual-modules/i18n.js'],
          },
        };
      }
    },
  };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://almanaquealternativo.com.br',
  adapter: cloudflare(),

  vite: {
    plugins: [stabilizeCloudflareDevDeps()],
  },

  integrations: [sitemap()],
});