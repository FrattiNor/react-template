const isDev = process.env.NODE_ENV === 'development'

const presets = ['@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react']

const plugins = [
    ['@babel/plugin-proposal-decorators', { legacy: true }], // 支持class的装饰器写法
    ['@babel/plugin-proposal-class-properties', { loose: true }], // 支持一些es的class的语法
    '@babel/plugin-syntax-dynamic-import', // import 语法动态导入
    [
        '@babel/plugin-transform-runtime', // 动态导入polyfill
        {
            corejs: 3
        }
    ]
]

if (isDev) {
    plugins.push('react-refresh/babel')
}

module.exports = { presets, plugins }
