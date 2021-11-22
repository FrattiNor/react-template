const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const prodConfig = {
    // 模式
    mode: 'production',
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
                                localIdentName: '[hash:base64:6]'
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
        // 清除上次dist文件内容插件
        new CleanWebpackPlugin()
    ],
    optimization: {
        // 将包含chunks映射关系的list单独从app.js里提取出来
        runtimeChunk: true,
        splitChunks: {
            // 将多入口的公共部分单独打包
            chunks: 'all',
            minChunks: 1,
            minSize: 5120, // 5 KB
            maxSize: 1572864, // 1.5 MB
            maxAsyncRequests: Infinity,
            maxInitialRequests: Infinity,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    filename: `vendors.[name].[chunkhash:8].js`,
                    reuseExistingChunk: true
                    // minSize: 102400 // 100 KB
                },
                components: {
                    minChunks: 2,
                    priority: -20,
                    filename: `components.[name].[chunkhash:8].js`,
                    reuseExistingChunk: true
                },
                defaultVendors: false,
                default: false
            }
        }
    },
    // 【error】webpack v5 不生效
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

module.exports = merge(prodConfig, commonConfig)
