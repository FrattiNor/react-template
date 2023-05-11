import { UserConfigExport, defineConfig } from 'vite';
import { getProxyObj, getPort } from './proxy';
import react from '@vitejs/plugin-react-swc';
import legacy from '@vitejs/plugin-legacy';

// https://vitejs.dev/config/
export default defineConfig(async ({ command }) => {
    const obj: UserConfigExport = {
        resolve: {
            alias: {
                '@': '/src',
            },
        },
    };

    if (command === 'serve') {
        obj.plugins = [react()];
        obj.server = {
            open: true,
            host: '0.0.0.0',
            port: getPort(),
            proxy: getProxyObj(),
        };
    }

    if (command === 'build') {
        obj.plugins = [react(), legacy()];
        obj.build = {
            target: ['es2015'],
            sourcemap: 'inline',
        };
    }

    return obj;
});
