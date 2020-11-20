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
        new CleanWebpackPlugin(),
    ],
    optimization: {
        // 将包含chunks映射关系的list单独从app.js里提取出来
        runtimeChunk: true
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
