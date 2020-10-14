/* eslint-disable @typescript-eslint/camelcase */
const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.common')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const defaultConfig = require('./default.const')
const PrerenderSPAPlugin = require('prerender-spa-plugin')

const { output, htmlWebpackPlugin, lessRule } = defaultConfig

const prodConfig = {
    mode: 'production',
    devtool: 'cheap-module-source-map',
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
        new ScriptExtHtmlWebpackPlugin({
            //`runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/
        }),
        // webpack打包之后输出文件的大小占比
        // new BundleAnalyzerPlugin(),
        // 预渲染插件
        new PrerenderSPAPlugin({
            routes: ['/', '/doc'],
            staticDir: path.join(__dirname, '../dist')
            // renderer: new Renderer({
            //     renderAfterTime: 50000
            // })
        })
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
            }),
            // 打包时优化压缩js代码
            new TerserPlugin({
                cache: true,
                // parallel: true,
                terserOptions: {
                    compress: {
                        warnings: true,
                        drop_console: true,
                        drop_debugger: true,
                        pure_funcs: ['console.log'] // 移除console
                    }
                },
                sourceMap: true
            })
        ],
        runtimeChunk: true
    }
}

module.exports = merge(baseConfig, prodConfig)
