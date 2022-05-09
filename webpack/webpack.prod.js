const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.common');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

const prodConfig = {
    mode: 'production',
    cache: false,
    plugins: [
        // html模板配置插件
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, '../public/index.html'),
            inject: true,
            minify: {
                removeComments: true, // 去掉注释
                collapseWhitespace: true, // 去掉多余空白
                removeAttributeQuotes: true, // 去掉一些属性的引号，例如id="moo" => id=moo
            },
        }),
        // css单独提取插件
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: 'css/[name].[contenthash:8].bundle.css',
            chunkFilename: 'css/[name].[id].[contenthash:8].chunk.css',
            ignoreOrder: true,
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
        usedExports: true,
        removeAvailableModules: true,
        removeEmptyChunks: true,
        splitChunks: {
            // 将多入口的公共部分单独打包
            chunks: 'all',
            automaticNameDelimiter: '-',
            cacheGroups: {
                vendors: {
                    filename: 'js/[name].[contenthash:8].vendors.js',
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10,
                    reuseExistingChunk: true,
                },
                default: {
                    filename: 'js/[name].[contenthash:8].common.js',
                    minSize: 0,
                    minChunks: 2,
                    priority: 5,
                    reuseExistingChunk: true,
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
