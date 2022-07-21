const path = require('path');
const WebpackBar = require('webpackbar');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const cssUse = (endLoader) => [endLoader, 'css-loader'];
const lessLocalUse = (endLoader) => [
    endLoader,
    {
        loader: 'css-loader',
        options: {
            modules: {
                localIdentName: '[local]--[hash:base64:6]',
            },
        },
    },
    'postcss-loader',
    'less-loader',
];
const lessAntdUse = (endLoader) => [
    endLoader,
    'css-loader',
    'postcss-loader',
    {
        loader: 'less-loader',
        options: {
            lessOptions: {
                javascriptEnabled: true,
                // modifyVars: theme,
            },
        },
    },
];

const config = ({ isDev }) => ({
    // 入口
    entry: {
        main: path.join(__dirname, '../src/index.tsx'),
        // ...(isDev ? { mock: path.join(__dirname, '../mock/index.ts') } : {}),
    },
    output: {
        filename: 'js/[name].[contenthash:8].bundle.js',
        chunkFilename: 'js/[name].[contenthash:8].chunk.js',
        assetModuleFilename: 'assets/[hash][contenthash:8][query]',
        path: path.join(__dirname, '../dist'),
        publicPath: '/',
        clean: true,
    },
    // 模块
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
                    filename: 'assets/[contenthash:8][ext]',
                },
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/[contenthash:8][ext]',
                },
            },
            {
                test: /\.css$/,
                use: isDev ? cssUse('style-loader') : cssUse(MiniCssExtractPlugin.loader),
            },
            {
                test: /\.less$/,
                use: isDev ? lessLocalUse('style-loader') : lessLocalUse(MiniCssExtractPlugin.loader),
                include: [/src/],
            },
            // 正则匹配css，less, 样式文件只匹配依赖文件夹，只用于antd样式引入，非依赖下的less文件配置在对应配置文件下
            {
                test: /\.less$/,
                use: isDev ? lessAntdUse('style-loader') : lessAntdUse(MiniCssExtractPlugin.loader),
                include: [/node_modules/],
            },
        ],
    },
    // 解析
    resolve: {
        // 自动解析确定的扩展,import的时候可以不带后缀
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        // 别名
        alias: {
            '@': path.join(__dirname, '../src'),
        },
    },
    performance: {
        // 性能提示，可以提示过大文件
        hints: 'warning', // 性能提示开关 false | "error" | "warning"
        maxAssetSize: 102400, // 生成的文件最大限制 整数类型（以字节为单位）(100kb)
        maxEntrypointSize: 102400, // 引入的文件最大限制 整数类型（以字节为单位）(100kb)
        assetFilter: function (assetFilename) {
            // 提供资源文件名的断言函数
            return /\.(png|jpe?g|gif|svg)(\?.*)?$/.test(assetFilename);
        },
    },
    plugins: [
        // 打包📦进度条
        new WebpackBar(),
    ],
});

module.exports = config;
