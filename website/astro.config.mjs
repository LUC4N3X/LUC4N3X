import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://luc4n3x.pages.dev',
  output: 'static',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});
