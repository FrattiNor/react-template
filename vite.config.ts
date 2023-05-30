import viteNodePolyfillsPlugins from './vite-node-polyfills-plugins';
import { UserConfig, UserConfigExport, defineConfig } from 'vite';
import { getProxyObj, getPort } from './proxy';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig(async ({ command }) => {
    const resolve: UserConfig['resolve'] = {
        alias: {
            '@': '/src',
            '@proxy': '/proxy',
        },
    };

    if (command === 'serve') {
        const config: UserConfigExport = {
            resolve,
            base: './',
            optimizeDeps: { disabled: false },
            plugins: [react(), viteNodePolyfillsPlugins()],
            server: {
                open: true,
                host: '0.0.0.0',
                port: getPort(),
                proxy: getProxyObj(),
            },
        };
        return config;
    }
});
