import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';

export default defineConfig({
    plugins: [
        vue(),
        VueI18nPlugin({
            include: './src/locales/**',
        }),
    ],
    resolve: {
        alias: {
            '@': '/src',
        },
    },
    server: {
        port: 5175,
        host: true
    },
    build: {
        // Chunk size uyarısını sustur
        chunkSizeWarningLimit: 2000
    },
    optimizeDeps: {
        include: [],
    },
});
