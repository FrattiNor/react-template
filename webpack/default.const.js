const path = require('path')

// dev 和 prod 一些共同的参数
// 便于修改

const output = {
    path: path.join(__dirname, '../dist'),
    publicPath: '/'
}

const htmlWebpackPlugin = {
    filename: 'index.html',
    template: 'public/index.html',
    inject: true,
    favicon: 'public/favicon.ico'
}

const lessRule = ({ styleLoader, cssLoaderModules }) => ({
    test: /\.(css|less)$/, // 正则匹配css，less, 样式文件匹配 非依赖文件夹，
    use: [
        // loader生效是从下往上的
        styleLoader,
        {
            loader: 'css-loader',
            options: {
                modules: cssLoaderModules
            }
        },
        'postcss-loader', // postcss
        'less-loader'
    ],
    exclude: /node_modules/
})

module.exports = { output, htmlWebpackPlugin, lessRule }
