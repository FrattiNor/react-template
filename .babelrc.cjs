module.exports = {
    presets: ['@babel/preset-env', '@babel/preset-typescript', ['@babel/preset-react', { runtime: 'automatic' }]],
    plugins: [
        ['@babel/plugin-transform-runtime', { corejs: 3 }], // 动态导入polyfill
    ],
};
