const isDev = process.env.NODE_ENV === 'development';

const presets = ['@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react'];

const plugins = [
    ['@babel/plugin-transform-runtime', { corejs: 3 }], // 动态导入polyfill
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }, 'antd'],
];

if (isDev) {
    plugins.push('react-refresh/babel');
}

module.exports = { presets, plugins };
