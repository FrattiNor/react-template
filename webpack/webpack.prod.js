/* eslint-disable @typescript-eslint/camelcase */
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.common')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// const TerserPlugin = require('terser-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// const path = require('path')
// const PrerenderSPAPlugin = require('prerender-spa-plugin')
const defaultConfig = require('./default.const')

const { output, htmlWebpackPlugin, lessRule } = defaultConfig

// chunk: 是指代码中引用的文件（如：js、css、图片等）会根据配置合并为一个或多个包，我们称一个包为 chunk。
// module: 是指将代码按照功能拆分，分解成离散功能块。拆分后的代码块就叫做 module。可以简单的理解为一个 export/import 就是一个 module。

const prodConfig = {
    mode: 'production',
    devtool: 'none',
    output: {
        filename: 'js/[name].[chunkhash].js',
        publicPath: '/',
        ...output
    },
    module: {
        rules: [
            lessRule({
                styleLoader: MiniCssExtractPlugin.loader,
                cssLoaderModules: {
                    localIdentName: '[hash:base64:6]'
                }
            })
        ]
    },
    plugins: [
        // html模板配置插件
        new HtmlWebpackPlugin({
            ...htmlWebpackPlugin,
            minify: {
                removeComments: true, // 去掉注释
                collapseWhitespace: true, // 去掉多余空白
                removeAttributeQuotes: true // 去掉一些属性的引号，例如id="moo" => id=moo
            }
        }),
        // css单独提取插件
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: 'css/[name].[contenthash].css',
            chunkFilename: 'css/[name].[id].[contenthash].css'
        }),
        // 清除上次dist文件内容插件
        new CleanWebpackPlugin(),
        // 注意一定要在HtmlWebpackPlugin之后引用
        // inline 的name 和你 runtimeChunk 的 name保持一致
        // 其实我们发现打包生成的 runtime.js（开启runtimeChunk: true后生成）非常的小，gzip 之后一般只有几 kb，但这个文件又经常会改变，我们每次都需要重新请求它，它的 http 耗时远大于它的执行时间了，所以建议不要将它单独拆包，而是将它内联到我们的 index.html 之中(index.html 本来每次打包都会变)。
        new ScriptExtHtmlWebpackPlugin({
            //`runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/
        })
        // webpack打包之后输出文件的大小占比
        // new BundleAnalyzerPlugin(),
        // 预渲染插件
        // new PrerenderSPAPlugin({
        //     routes: ['/', '/doc'],
        //     staticDir: path.join(__dirname, '../dist')
        //     // renderer: new Renderer({
        //     //     renderAfterTime: 50000
        //     // })
        // })
    ],
    optimization: {
        // 性能配置
        minimizer: [
            // 打包时优化压缩css代码
            new OptimizeCssAssetsPlugin({
                cssProcessor: require('cssnano'), // 使用 cssnano 压缩器
                cssProcessorOptions: {
                    reduceIdents: false,
                    autoprefixer: false,
                    safe: true,
                    discardComments: {
                        removeAll: true
                    }
                }
            })
            // // 打包时优化压缩js代码
            // new TerserPlugin({
            //     test: /\.js(\?.*)?$/i
            // })
        ],
        // 将包含chunks映射关系的list单独从app.js里提取出来
        runtimeChunk: true
    },
    stats: {
        entrypoints: false,
        builtAt: false,
        assets: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }
}

module.exports = merge(baseConfig, prodConfig)
