// @ts-check
import cloudflare from '@astrojs/cloudflare';
import { defineConfig } from 'astro/config';

function stabilizeCloudflareDevDeps() {
  return {
    name: 'stabilize-cloudflare-dev-deps',
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
  adapter: cloudflare(),
  vite: {
    plugins: [stabilizeCloudflareDevDeps()],
  },
});
