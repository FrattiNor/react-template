/* eslint-disable @typescript-eslint/no-var-requires */
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { merge } = require('webpack-merge');
const WebpackBar = require('webpackbar');
const path = require('path');

const jsPrefix = 'js';
const cssPrefix = 'css';
const assetsPrefix = 'assets';

const config = ({ isDev }) => ({
    entry: {
        main: path.join(__dirname, './src/index.tsx'),
    },
    output: {
        filename: `${jsPrefix}/bundle/[name].[contenthash:8].js`,
        chunkFilename: `${jsPrefix}/chunk/[name].[contenthash:8].js`,
        assetModuleFilename: `${assetsPrefix}/[contenthash:8][ext][query]`,
        path: path.join(__dirname, './dist'),
        publicPath: './',
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.(j|t)sx?$/,
                use: ['babel-loader'],
                exclude: [/node_modules/],
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                type: 'asset/resource',
                generator: {
                    filename: `${assetsPrefix}/[name]-[contenthash:8][ext]`,
                },
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                type: 'asset/resource',
                generator: {
                    filename: `${assetsPrefix}/[name]-[contenthash:8][ext]`,
                },
            },
            {
                test: /\.css$/,
                use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.less$/,
                use: [
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[local]--[hash:base64:6]',
                            },
                        },
                    },
                    'postcss-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                javascriptEnabled: true,
                            },
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        alias: {
            '@': path.join(__dirname, './src'),
            '@proxy': path.join(__dirname, './proxy'),
        },
    },
    plugins: [new WebpackBar(), new NodePolyfillPlugin()],
});

const prodConfig = {
    mode: 'production',
    cache: false,
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, './webpack.index.html'),
            inject: true,
            minify: {
                removeComments: true, // 去掉注释
                collapseWhitespace: true, // 去掉多余空白
                removeAttributeQuotes: true, // 去掉一些属性的引号，例如id="moo" => id=moo
            },
        }),
        new MiniCssExtractPlugin({
            filename: `${cssPrefix}/[name].[contenthash:8].css`,
            chunkFilename: `${cssPrefix}/[name].[id].[contenthash:8].css`,
            ignoreOrder: true,
        }),
    ],
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin({
                extractComments: false,
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
            chunks: 'all',
            automaticNameDelimiter: '-',
            enforceSizeThreshold: 10 * 1024 * 1024,
            maxSize: 10 * 1024 * 1024,
            minSize: 0 * 1024,
            minSizeReduction: 0 * 1024,
            maxAsyncRequests: 1000,
            maxInitialRequests: 1000,
            minChunks: 1,
        },
    },
    stats: 'normal',
};

module.exports = merge(config({ isDev: false }), prodConfig);
