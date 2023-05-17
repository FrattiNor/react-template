import { UserConfig } from 'vite';

// 将 build 模式的 rollupOptions 单独提取
const rollupOptions: UserConfig['build']['rollupOptions'] = {
    output: {
        // splitCode
        // 返回一个key，如果key一样将打包到一个文件里（css也会打包到同名css中【全部】）
        manualChunks(id) {
            // 处理第三方包
            if (id.includes('node_modules')) {
                const list = id.split('node_modules/');
                const vendorPath = list[list.length - 1];
                const vendorName = vendorPath.split('/')[0];
                // 大于30KB
                switch (vendorName) {
                    case 'react-router-dom':
                    case 'path-browserify':
                    case '@better-scroll':
                    case '@react-spring':
                    case 'react-router':
                    case 'antd-mobile':
                    case '@remix-run':
                    case 'react-dom':
                    case '@tanstack':
                    case '@reduxjs':
                    case 'buffer':
                    case 'lodash':
                    case 'axios':
                    case 'immer':
                    case 'redux':
                    case 'react':
                        return vendorName;
                    // 其余小文件打包成一个包
                    default:
                        return 'vendor';
                }
            }
        },
        chunkFileNames(chunkInfo) {
            const { facadeModuleId } = chunkInfo;
            // 有 facadeModuleId 的是src下的代码（应该）
            if (typeof facadeModuleId === 'string') {
                const list = facadeModuleId.split('/');
                const lastOne = list[list.length - 1];
                const lastTwo = list[list.length - 2];
                // 处理文件名称为index的问题
                if (lastOne.includes('index') && typeof lastTwo === 'string') {
                    return `js/${lastTwo.toLocaleLowerCase()}-[hash].js`;
                }
                return 'js/[name]-[hash].js';
            }
            return 'vendor/[name]-[hash].js';
        },
        assetFileNames(assetInfo) {
            // css无法解决index命名的问题
            const { name } = assetInfo;
            // css 单独一个文件夹
            if (/.css$/.test(name)) {
                // console.log(assetInfo);
                return '[ext]/[name]-[hash].[ext]';
            }
            // console.log(assetInfo);
            return 'assets/[name]-[hash].[ext]';
        },
    },
    /**
     * react-query 报错屏蔽
     * Ignore "use client" waning since we are not using SSR
     * @see {@link https://github.com/TanStack/query/pull/5161#issuecomment-1477389761 Preserve 'use client' directives TanStack/query#5161}
     */
    onwarn(warning, warn) {
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE' && warning.message.includes(`"use client"`)) return;
        // console.log(warning);
        warn(warning);
    },
};

export default rollupOptions;
