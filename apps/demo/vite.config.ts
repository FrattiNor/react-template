import { UserConfig, UserConfigExport, defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig(async ({ command }) => {
    const resolve: UserConfig['resolve'] = {
        extensions: ['.mts', '.ts', '.tsx', '.mjs', '.js', '.jsx', '.json'],
        alias: {
            '@': '/src',
        },
    };

    const plugins: UserConfig['plugins'] = [react()];

    switch (command) {
        case 'serve': {
            const config: UserConfigExport = {
                resolve,
                plugins,
                optimizeDeps: { disabled: false },
                server: {
                    host: '0.0.0.0',
                    port: 5000,
                },
            };
            return config;
        }
        case 'build': {
            const config: UserConfigExport = {
                resolve,
                plugins,
                base: './',
                optimizeDeps: { disabled: true },
            };
            return config;
        }
    }
});
