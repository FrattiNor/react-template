const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { getExportFilePrefix } = require('./conf/utils');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const baseConfig = require('./webpack.common');
const { merge } = require('webpack-merge');
const path = require('path');

const { jsPrefix, cssPrefix } = getExportFilePrefix();

const prodConfig = {
    mode: 'production',
    cache: false,
    plugins: [
        // html模板配置插件
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, '../public/index.html'),
            favicon: path.join(__dirname, '../public/favicon.ico'),
            inject: true,
            minify: {
                removeComments: true, // 去掉注释
                collapseWhitespace: true, // 去掉多余空白
                removeAttributeQuotes: true, // 去掉一些属性的引号，例如id="moo" => id=moo
            },
        }),
        // css单独提取插件
        new MiniCssExtractPlugin({
            filename: `${cssPrefix}/[name].[contenthash:8].bundle.css`,
            chunkFilename: `${cssPrefix}/[name].[id].[contenthash:8].chunk.css`,
            ignoreOrder: true,
        }),
        new CopyPlugin({
            patterns: [{ from: path.join(__dirname, '../static'), to: 'static' }],
        }),
    ],
    optimization: {
        // 性能配置
        minimizer: [
            // 打包时优化压缩css代码
            new CssMinimizerPlugin(),
            // 打包时优化压缩js代码
            new TerserPlugin({
                extractComments: false, // 取消打包生产的LICENSE文件
            }),
        ],
        runtimeChunk: {
            name: 'runtime',
        },
        providedExports: true,
        sideEffects: true,
        usedExports: true,
        removeAvailableModules: true,
        removeEmptyChunks: true,
        splitChunks: {
            // 将多入口的公共部分单独打包
            chunks: 'all',
            automaticNameDelimiter: '-',
            enforceSizeThreshold: 10 * 1024 * 1024,
            maxSize: 10 * 1024 * 1024,
            minSize: 0 * 1024,
            minSizeReduction: 0 * 1024,
            maxAsyncRequests: 1000,
            maxInitialRequests: 1000,
            minChunks: 1,
            cacheGroups: {
                react: {
                    filename: `${jsPrefix}/react/[name].[contenthash:8].react.js`,
                    test: /node_modules[\\/](react|react-|redux|@reduxjs[\\/]toolkit)/,
                    minChunks: 1,
                    priority: 10,
                    reuseExistingChunk: true,
                    enforceSizeThreshold: 10 * 1024 * 1024,
                    maxSize: 10 * 1024 * 1024,
                    minSize: 0 * 1024,
                    minSizeReduction: 0 * 1024,
                },
                antd: {
                    filename: `${jsPrefix}/antd/[name].[contenthash:8].antd.js`,
                    test: /node_modules[\\/](antd|@ant-design|rc-|@ctrl\/tinycolor)/,
                    minChunks: 1,
                    priority: 9,
                    reuseExistingChunk: true,
                    enforceSizeThreshold: 10 * 1024 * 1024,
                    maxSize: 10 * 1024 * 1024,
                    minSize: 10 * 1024,
                    minSizeReduction: 10 * 1024,
                },
                zrender: {
                    filename: `${jsPrefix}/zrender/[name].[contenthash:8].zrender.js`,
                    test: /node_modules[\\/]zrender/,
                    minChunks: 1,
                    priority: 5,
                    reuseExistingChunk: true,
                    enforceSizeThreshold: 10 * 1024 * 1024,
                    maxSize: 10 * 1024 * 1024,
                    minSize: 0 * 1024,
                    minSizeReduction: 0 * 1024,
                },
                babel: {
                    filename: `${jsPrefix}/babel/[name].[contenthash:8].babel.js`,
                    test: /node_modules[\\/](babel|@babel|core-js-pure)/,
                    minChunks: 1,
                    priority: 3,
                    reuseExistingChunk: true,
                    enforceSizeThreshold: 10 * 1024 * 1024,
                    maxSize: 10 * 1024 * 1024,
                    minSize: 10 * 1024,
                    minSizeReduction: 10 * 1024,
                },
                defaultVendors: {
                    filename: `${jsPrefix}/vendors/[name].[contenthash:8].vendors.js`,
                    test: /node_modules/,
                    minChunks: 2,
                    priority: 2,
                    reuseExistingChunk: true,
                    enforceSizeThreshold: 10 * 1024 * 1024,
                    maxSize: 10 * 1024 * 1024,
                    minSize: 10 * 1024,
                    minSizeReduction: 10 * 1024,
                },
                default: {
                    filename: `${jsPrefix}/component/[name].[contenthash:8].component.js`,
                    minChunks: 2,
                    priority: 1,
                    reuseExistingChunk: true,
                    enforceSizeThreshold: 10 * 1024 * 1024,
                    maxSize: 10 * 1024 * 1024,
                    minSize: 10 * 1024,
                    minSizeReduction: 10 * 1024,
                },
            },
        },
    },
    stats: {
        entrypoints: false,
        builtAt: false,
        assets: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false,
    },
};

module.exports = merge(baseConfig({ isDev: false }), prodConfig);
