import { UserConfig, UserConfigExport, defineConfig } from 'vite';
import rollupOptions from './vite.build.rollupOptions';
import { getProxyObj, getPort } from './proxy';
import react from '@vitejs/plugin-react-swc';
import legacy from '@vitejs/plugin-legacy';

// https://vitejs.dev/config/
export default defineConfig(async ({ command }) => {
    const resolve: UserConfig['resolve'] = {
        alias: {
            '@': '/src',
            '@proxy': '/proxy',
            buffer: 'buffer',
            path: 'path-browserify',
        },
    };

    if (command === 'serve') {
        const config: UserConfigExport = {
            resolve,
            logLevel: 'error',
            plugins: [react()],
            server: {
                open: true,
                host: '0.0.0.0',
                port: getPort(),
                proxy: getProxyObj(),
            },
        };
        return config;
    }

    if (command === 'build') {
        const config: UserConfigExport = {
            resolve,
            plugins: [react(), legacy()],
            build: {
                rollupOptions,
                sourcemap: 'inline',
                chunkSizeWarningLimit: 600, // 目前最大的是 react-dom 556.14 kB
            },
        };

        return config;
    }
});
