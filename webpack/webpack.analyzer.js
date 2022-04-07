const { merge } = require('webpack-merge');
const prodConfig = require('./webpack.prod');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const analyzerConfig = {
    plugins: [
        // webpack打包之后输出文件的大小占比
        new BundleAnalyzerPlugin(),
    ],
};

module.exports = merge(prodConfig, analyzerConfig);
