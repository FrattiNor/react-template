import viteNodePolyfillsPlugins from './viteNodePolyfillsPlugins';
import { UserConfig, UserConfigExport, defineConfig } from 'vite';
import requireTransform from 'vite-plugin-require-transform';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig(async ({ command }) => {
    const resolve: UserConfig['resolve'] = {
        extensions: ['.mts', '.ts', '.tsx', '.mjs', '.js', '.jsx', '.json'],
        alias: {
            '@': '/src',
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
                port: 5000,
            },
        };
        return config;
    }
});
