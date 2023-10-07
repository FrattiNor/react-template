// @ts-ignore
import { getProxyObj, getPort } from './proxy';
import viteNodePolyfillsPlugins from './vite-node-polyfills-plugins';
import { UserConfig, UserConfigExport, defineConfig } from 'vite';
import requireTransform from 'vite-plugin-require-transform';
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
            plugins: [react(), viteNodePolyfillsPlugins(), requireTransform({})],
            server: {
                host: '0.0.0.0',
                port: getPort(),
                proxy: getProxyObj(),
            },
            preview: {
                host: '0.0.0.0',
                port: getPort(),
                proxy: getProxyObj(),
            },
        };
        return config;
    }
});
