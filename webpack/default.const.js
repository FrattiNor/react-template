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

const styleRule = ({ styleLoader, cssLoaderModules }) => [
    {
        test: /\.css$/, // 匹配css
        use: [styleLoader, 'css-loader']
    },
    {
        test: /\.less$/, // 正则匹配css，less, 样式文件匹配 非依赖文件夹，
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
    },
    {
        test: /\.less$/, // 正则匹配css，less, 样式文件只匹配依赖文件夹，只用于antd样式引入，非依赖下的less文件配置在对应配置文件下
        use: [
            styleLoader,
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
        include: /node_modules/
    }
]

module.exports = { output, htmlWebpackPlugin, styleRule }
