// node path模块
const path = require('path')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const PxtoremWebpackPlugin = require('pxtorem-webpack-plugin')

module.exports = {
    // 入口
    entry: path.join(__dirname, '../src/index.tsx'),
    // 模块
    module: {
        rules: [
            {
                test: /\.(j|t)sx?$/, // 匹配js，ts
                include: path.join(__dirname, '../src'),
                use: ['babel-loader'],
                exclude: /node_modules/ // 排除node_modules底下的
            },
            {
                test: /\.(css|less)$/, // 正则匹配css，less, 样式文件只匹配依赖文件夹，只用于antd样式引入，非依赖下的less文件配置在对应配置文件下
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
                include: /node_modules/ // antd样式引入出了问题
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, // 匹配图片文件
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
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/, // 匹配文字文件
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240,
                            name: path.join('font/[name].[hash:7].[ext]')
                        }
                    }
                ]
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
            // '@antd': path.join(__dirname, '../src/components/antd'),
            // '@ant-design/icons/lib/dist$': path.join(__dirname, '../src/icons.ts')
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
        new PxtoremWebpackPlugin({
            // templates: ['index.html'],
            // baseDpr: 2,
            baseWidth: 1400,
            remUnit: 100
        })
    ]
}
