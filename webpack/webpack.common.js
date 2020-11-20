const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

module.exports = {
    // 入口
    entry: [
        path.join(__dirname, '../src/index.tsx'), // main
        path.join(__dirname, '../public/rem.js') // rem
    ],
    // 打包出口
    output: {
        filename: 'js/[name].[fullhash].js',
        path: path.join(__dirname, '../dist'),
        publicPath: '/'
    },
    // 模块
    module: {
        rules: [
            {
                test: /\.(j|t)sx?$/, // 匹配js,ts,jsx,tsx
                use: ['babel-loader'],
                include: path.join(__dirname, '../src')
            },
            {
                test: /\.(css|less)$/, // antd样式引入出了问题（该条rules只针对antd的样式）
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true
                            // modifyVars: theme,
                        }
                    }
                ], // 注意loader生效是从下往上的
                include: /node_modules/
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)(\?.*)?$/, // 匹配图片文件 和 文字文件
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            //1024 == 1kb
                            //小于10kb时打包成base64编码的图片否则单独打包成图片
                            limit: 10240,
                            name: path.join('img/[name].[hash:7].[ext]')
                        }
                    }
                ]
            },
            {
                test: /\.md$/, // 匹配md文件
                use: ['html-loader', 'markdown-loader']
            }
        ]
    },
    // 插件
    plugins: [
        // 打包📦进度条
        new ProgressBarPlugin(),
        // html模板插件
        // 目前会报 DeprecationWarning: Compilation.assets will be frozen in future, all modifications are deprecated.（待后续升级）
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'public/index.html',
            favicon: 'public/favicon.ico',
            inject: true // js,css 打包进body
        })
    ],
    // 解析
    resolve: {
        // 自动解析确定的扩展,import的时候可以不带后缀
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        // 别名
        alias: {
            '@': path.join(__dirname, '../src')
        }
    }
}
