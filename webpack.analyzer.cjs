/* eslint-disable @typescript-eslint/no-var-requires */
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const prodConfig = require('./webpack.config.cjs');
const { merge } = require('webpack-merge');

const analyzerConfig = {
    plugins: [
        // webpack打包之后输出文件的大小占比
        new BundleAnalyzerPlugin(),
    ],
};

module.exports = merge(prodConfig, analyzerConfig);
