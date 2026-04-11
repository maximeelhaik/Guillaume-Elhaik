import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import { SITE_CONFIG } from './src/config/site-config';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'html-transform',
        transformIndexHtml(html) {
          return html.replace(/%(\w+)%/g, (match, key) => {
            // Mapping des variables de SITE_CONFIG pour l'injection HTML
            const replacements: Record<string, string> = {
              SITE_TITLE: SITE_CONFIG.SEO.TITLE,
              SITE_DESCRIPTION: SITE_CONFIG.SEO.DESCRIPTION,
              SITE_KEYWORDS: SITE_CONFIG.SEO.KEYWORDS,
              SITE_URL: 'https://elhaik-avocat.fr',
              CONTACT_PHONE: SITE_CONFIG.CONTACT_PHONE,
              CONTACT_EMAIL: SITE_CONFIG.CONTACT_EMAIL,
              OWNER_NAME: SITE_CONFIG.OWNER_NAME,
              ADDRESS_STREET: SITE_CONFIG.ADDRESS_STREET,
              ADDRESS_CITY: SITE_CONFIG.ADDRESS_CITY,
              ADDRESS_LOCALITY: "Versailles",
              ADDRESS_POSTAL_CODE: "78000",
              GEO_LAT: SITE_CONFIG.SEO.LATITUDE.toString(),
              GEO_LNG: SITE_CONFIG.SEO.LONGITUDE.toString(),
            };
            return replacements[key] || match;
          });
        },
      },
    ],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
