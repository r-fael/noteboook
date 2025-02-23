import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],
  define: {
    __API_KEY__: JSON.stringify(process.env.VITE_API_KEY),
    __AUTH_DOMAIN__: JSON.stringify(process.env.VITE_AUTH_DOMAIN),
    __PROJECT_ID__: JSON.stringify(process.env.VITE_PROJECT_ID),
    __STORAGE_BUCKET__: JSON.stringify(process.env.VITE_STORAGE_BUCKET),
    __MESSAGING_SENDER_ID__: JSON.stringify(process.env.VITE_MESSAGING_SENDER_ID),
    __APP_ID__: JSON.stringify(process.env.VITE_APP_ID),
    __MEASUREMENT_ID__: JSON.stringify(process.env.VITE_MEASUREMENT_ID),
  }
});
