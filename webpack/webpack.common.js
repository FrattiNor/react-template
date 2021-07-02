/* eslint-disable @typescript-eslint/explicit-function-return-type */
// node path模块
const path = require('path')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const HappyPack = require('happypack')

module.exports = {
    // 入口
    entry: [path.join(__dirname, '../src/index.tsx'), path.join(__dirname, '../public/rem.js')],
    // 模块
    module: {
        rules: [
            {
                test: /\.(j|t)sx?$/, // 匹配js，ts
                use: ['happypack/loader?id=babel'],
                include: [/src/, /public/]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, // 匹配图片文件
                use: ['happypack/loader?id=img'],
                include: [/src/]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/, // 匹配文字文件
                use: ['happypack/loader?id=font'],
                include: [/src/]
            },
            {
                test: /\.md$/,
                use: ['happypack/loader?id=md'],
                include: [/src/]
            },
            {
                test: /\.mdx$/,
                use: ['happypack/loader?id=mdx'],
                include: [/src/]
            }
        ]
    },
    // 解析
    resolve: {
        // 自动解析确定的扩展,import的时候可以不带后缀
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        // 别名
        alias: {
            '@': path.join(__dirname, '../src')
        }
    },
    performance: {
        // 性能提示，可以提示过大文件
        hints: 'warning', // 性能提示开关 false | "error" | "warning"
        maxAssetSize: 102400, // 生成的文件最大限制 整数类型（以字节为单位）(100kb)
        maxEntrypointSize: 102400, // 引入的文件最大限制 整数类型（以字节为单位）(100kb)
        assetFilter: function (assetFilename) {
            // 提供资源文件名的断言函数
            return /\.(png|jpe?g|gif|svg)(\?.*)?$/.test(assetFilename)
        }
    },
    plugins: [
        // 打包📦进度条
        new ProgressBarPlugin(),
        new HappyPack({
            id: 'babel',
            loaders: ['babel-loader']
        }),
        new HappyPack({
            id: 'mdx',
            loaders: ['babel-loader', '@mdx-js/loader']
        }),
        new HappyPack({
            id: 'md',
            loaders: ['html-loader', 'markdown-loader']
        }),
        new HappyPack({
            id: 'font',
            loaders: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 10240,
                        name: path.join('font/[name].[hash:7].[ext]')
                    }
                }
            ]
        }),
        new HappyPack({
            id: 'img',
            loaders: [
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
        })
    ]
}
