const isDev = process.env.NODE_ENV === 'development'

const presets = ['@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react']

const plugins = [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    '@babel/plugin-syntax-dynamic-import'
]

if (isDev) {
    plugins.push('react-refresh/babel')
}

module.exports = { presets, plugins }
