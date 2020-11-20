const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.common')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const defaultConfig = require('./default.const')

const { output, htmlWebpackPlugin, lessRule } = defaultConfig

const devConfig = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    output: {
        filename: 'js/[name].[hash].js',
        publicPath: '/',
        ...output
    },
    plugins: [
        // 热加载插件，用于启用局部模块热重载方便我们开发
        new webpack.HotModuleReplacementPlugin(),
        // 配置模板html位置
        new HtmlWebpackPlugin({
            ...htmlWebpackPlugin
        }),
        // 优化webpack显示
        new FriendlyErrorsWebpackPlugin()
    ],
    module: {
        rules: [
            lessRule({
                styleLoader: 'style-loader',
                cssLoaderModules: {
                    localIdentName: '[path][name]__[local]--[hash:base64:6]'
                }
            })
        ]
    },
    // node 本地服务器配置
    devServer: {
        host: '0.0.0.0',
        port: 3000,
        historyApiFallback: true, // 该选项的作用所有的404都连接到index.html
        overlay: {
            //当出现编译器错误或警告时，就在网页上显示一层黑色的背景层和错误信息
            errors: true
        },
        inline: true, // 模式
        hot: true, // 热加载
        open: true, // 打开页面
        useLocalIp: true, // 此选项允许浏览器使用本地 IP 打开
        proxy: {
            '/api/': {
                target: 'https://192.168.2.3/api/',
                changeOrigin: true,
                secure: false,
                pathRewrite: { '^/api': '' }
            },
            '/external/': {
                target: 'https://192.168.2.3/external/',
                changeOrigin: true,
                secure: false,
                pathRewrite: { '^/external': '' }
            }
        }
    },
    stats: 'errors-only'
}

module.exports = merge(baseConfig, devConfig)
