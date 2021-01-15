const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common')
const portfinder = require('portfinder')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

const devConfig = (port) => ({
    // 模式
    mode: 'development',
    // source map
    // "^(inline-|hidden-|eval-)?(nosources-)?(cheap-(module-)?)?source-map$"
    devtool: 'inline-source-map',
    // 模块
    module: {
        rules: [
            {
                test: /\.(css|less)$/, // 正则匹配css，less, 样式文件匹配 非依赖文件夹，
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[hash:base64:6]-[name]-[local]'
                            }
                        }
                    },
                    'postcss-loader', // postcss
                    'less-loader' // loader生效是从下往上的
                ],
                exclude: /node_modules/
            }
        ]
    },
    // 插件
    plugins: [
        // devServer的热加载插件
        //【error】（目前热加载无效，可能是webpack v5的问题）
        new webpack.HotModuleReplacementPlugin(),
        // 优化webpack显示
        new FriendlyErrorsWebpackPlugin()
    ],
    // 性能提示，可以提示过大文件
    performance: {
        hints: 'warning', // 性能提示开关 false | "error" | "warning"
        maxAssetSize: 102400, // 生成的文件最大限制 整数类型（以字节为单位）(100kb)
        maxEntrypointSize: 102400, // 引入的文件最大限制 整数类型（以字节为单位）(100kb)
        // 提供资源文件名的断言函数（参与性能提示）
        assetFilter: function (assetFilename) {
            return /\.(png|jpe?g|gif|svg)(\?.*)?$/.test(assetFilename)
        }
    },
    // node 本地服务器配置
    devServer: {
        host: '0.0.0.0',
        port,
        publicPath: '/',
        historyApiFallback: true, // 该选项的作用所有的404都连接到index.html
        clientLogLevel: 'silent', // devServer.clientLogLevel 可能会导致日志过于冗余，你可以通过将其设置为 'silent' 来关闭日志
        compress: true, // 为每个静态文件开启 gzip compression
        overlay: {
            //当出现编译器错误或警告时，就在网页上显示一层黑色的背景层和错误信息
            errors: true
        },
        inline: true, // 模式
        //【error】（目前热加载无效，可能是webpack v5的问题）
        hot: true, // 热加载 
        // hotOnly: true, // 启用热模块替换，而无需页面刷新作为构建失败时的回退。
        open: true, // 打开页面
        useLocalIp: true, // 此选项允许浏览器使用本地 IP 打开
        proxy: {
            '/api/': {
                target: 'https://192.168.2.3/api/',
                changeOrigin: true,
                secure: false,
                pathRewrite: { '^/api': '' }
            }
        }
    },
    // 【error】webpack v5 不生效
    stats: 'errors-only'
})


const getDevConfig = new Promise((res, rej) => {
    //查找端口号
    portfinder.getPort({ port: 3000, stopPort: 9000 }, (err, port) => {
        if (err) {
            rej(err)
            return
        }

        // 端口被占用时就重新设置devServer的端口
        res(merge(commonConfig, devConfig(port)))
    })
})

module.exports = getDevConfig
