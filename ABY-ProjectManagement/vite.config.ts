import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';

export default defineConfig({
    plugins: [
        vue(),
        VueI18nPlugin({
            include: path.resolve(__dirname, './src/locales/**'),
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    optimizeDeps: {
        include: [],
    },
    server: {
        port: 5175,
        host: true
        // port kaldırıldı - Vite varsayılan 5173'ü kullanacak, meşgulse 5174
    }
});
