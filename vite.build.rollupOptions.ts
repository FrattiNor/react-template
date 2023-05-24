import { UserConfig } from 'vite';

// 将 build 模式的 rollupOptions 单独提取
const rollupOptions: UserConfig['build']['rollupOptions'] = {
    output: {
        // splitCode 返回一个key，如果key一样将打包到一个文件里（css也会打包到同名css中【全部】）
        manualChunks(id, { getModuleInfo }) {
            // 处理第三方包
            if (id.includes('node_modules')) {
                const info = getModuleInfo(id);
                // 未被 tree-shaking 的部分，并且不是外部模块
                if (info.isIncluded === true && info.isExternal === false) {
                    const list = id.split('node_modules/');
                    const vendorPath = list[list.length - 1];
                    const vendorName = vendorPath.split('/')[0];
                    // 大于30KB
                    switch (vendorName) {
                        case 'react-dom':
                        case 'antd-mobile':
                        case '@better-scroll':
                        case '@remix-run':
                        case 'js-sdsl':
                        case '@tanstack':
                        case '@react-spring':
                        case 'readable-stream':
                        case 'lodash':
                        case 'rc-field-form':
                        case 'axios':
                        case 'mqtt':
                        case 'mqtt-packet':
                        case '@reduxjs':
                        case '@use-gesture':
                        case 'buffer':
                        case 'async-validator':
                        case 'react-router':
                        case '@babel':
                        case '@floating-ui':
                        case 'react-router-dom':
                        case 'immer':
                        case 'redux':
                        case 'dayjs':
                        case 'bl':
                        case 'antd-mobile-icons':
                        case 'react':
                        case 'path-browserify':
                            return `vendor-${vendorName}`;
                        // 其余小文件打包成一个包
                        default:
                            // return `vendor-${vendorName}`;
                            return 'vendor-other';
                    }
                }
            }
        },
        chunkFileNames() {
            return 'js/[name]-[hash].js';
        },
        entryFileNames() {
            return 'js/[name]-[hash].js';
        },
        assetFileNames(assetInfo) {
            // css无法解决index命名的问题
            const { name } = assetInfo;
            // css 单独一个文件夹
            if (/.css$/.test(name)) {
                return '[ext]/[name]-[hash].[ext]';
            }
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
