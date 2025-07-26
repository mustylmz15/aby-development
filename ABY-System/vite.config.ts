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
            '@': './src',
        },
    },
    optimizeDeps: {
        include: [],
    },
    server: {
        port: 5174,
        host: true
    }
});
