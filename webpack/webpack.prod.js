const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.common')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const path = require('path')

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
                removeAttributeQuotes: true // 去掉一些属性的引号，例如id="moo" => id=moo
            }
        }),
        // css单独提取插件
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: 'common/css/[name].[contenthash].css',
            chunkFilename: 'common/css/[name].[id].[contenthash].css',
            ignoreOrder: true
        }),
        // 注意一定要在HtmlWebpackPlugin之后引用
        // inline 的name 和你 runtimeChunk 的 name保持一致
        new ScriptExtHtmlWebpackPlugin({
            inline: /runtime\..*\.js$/
        })
        // webpack打包之后输出文件的大小占比
        // new BundleAnalyzerPlugin(),
    ],
    optimization: {
        // 性能配置
        minimizer: [
            // 打包时优化压缩css代码
            new OptimizeCssAssetsPlugin(),
            // 打包时优化压缩js代码
            new TerserPlugin({
                extractComments: false // 取消打包生产的LICENSE文件
            })
        ],
        runtimeChunk: {
            name: 'runtime'
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
                    name: 'vendors',
                    enforce: true,
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10
                },
                default: {
                    name: 'common',
                    minSize: 0,
                    minChunks: 3,
                    priority: 10,
                    reuseExistingChunk: true
                }
            }
        }
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
