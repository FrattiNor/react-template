/* eslint-disable @typescript-eslint/no-var-requires */
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const WebpackBar = require('webpackbar');
const path = require('path');

const jsPrefix = 'js';
const cssPrefix = 'css';
const assetsPrefix = 'assets';

const prodConfig = {
    cache: false,
    mode: 'production',
    entry: {
        main: path.join(__dirname, './src/index.tsx'),
    },
    output: {
        filename: `${jsPrefix}/[name].[chunkhash].bundle.js`,
        chunkFilename: `${jsPrefix}/[name].[chunkhash].chunk.js`,
        assetModuleFilename: `${assetsPrefix}/[chunkhash][ext][query]`,
        path: path.join(__dirname, './dist'),
        publicPath: '/',
        clean: true,
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        alias: {
            '@': path.join(__dirname, './src'),
            '@proxy': path.join(__dirname, './proxy'),
        },
    },
    plugins: [
        new WebpackBar(),
        new NodePolyfillPlugin(),
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
            filename: `${cssPrefix}/[name].[chunkhash].css`,
            chunkFilename: `${cssPrefix}/[name].[id].[chunkhash].css`,
            ignoreOrder: true,
        }),
        new CopyPlugin({
            patterns: [{ from: path.join(__dirname, './static'), to: 'static' }],
        }),
    ],
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
                    filename: `${assetsPrefix}/[name].[contenthash][ext]`,
                },
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                type: 'asset/resource',
                generator: {
                    filename: `${assetsPrefix}/[name].[contenthash][ext]`,
                },
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[local]--[hash:base64]',
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
        sideEffects: true,
        usedExports: true,
        providedExports: true,
        removeAvailableModules: true,
        removeEmptyChunks: true,
        splitChunks: {
            chunks: 'all',
            minChunks: 1,
            usedExports: true,
            minSize: 20 * 1024,
            maxSize: 60 * 1024,
            hidePathInfo: false,
            minSizeReduction: 15 * 1024,
            automaticNameDelimiter: '-',
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    reuseExistingChunk: true,
                    usedExports: true,
                    priority: -10,
                    minChunks: 1,
                },
                default: {
                    reuseExistingChunk: true,
                    usedExports: true,
                    priority: -20,
                    minChunks: 2,
                },
            },
        },
    },
    stats: 'normal',
};

module.exports = prodConfig;
