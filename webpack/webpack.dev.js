const webpack = require('webpack');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.common');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const portfinder = require('portfinder');
const path = require('path');
const { proxyAddress } = require('./proxy');

const devConfig = (port) => ({
    mode: 'development',
    cache: { type: 'memory' },
    devtool: 'eval-cheap-module-source-map',
    plugins: [
        // react 热加载
        new ReactRefreshPlugin({
            exclude: /node_modules/,
            overlay: false,
        }),
        // 配置模板html位置
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, '../public/index.html'),
            inject: true,
        }),
        // 优化webpack显示
        new FriendlyErrorsWebpackPlugin({
            // 清除控制台原有的信息
            clearConsole: true,
            // 打包成功之后在控制台给予开发者的提示
            compilationSuccessInfo: {
                messages: [`开发环境启动成功，项目运行在: http://127.0.0.1:${port}`],
            },
        }),
    ],
    optimization: {
        // 不添加影响热更新
        runtimeChunk: 'single',
    },
    // node 本地服务器配置
    devServer: {
        host: '0.0.0.0',
        port,
        compress: true,
        historyApiFallback: {
            htmlAcceptHeaders: ['text/html'],
        },
        client: {
            logging: 'error',
            progress: false,
            overlay: {
                //当出现编译器错误或警告时，就在网页上显示一层黑色的背景层和错误信息
                errors: true,
                warnings: false,
            },
        },
        hot: true, // 热加载
        open: `http://127.0.0.1:${port}`, // 打开页面
        proxy: {
            '/api': {
                target: proxyAddress,
                changeOrigin: true,
                secure: false,
                pathRewrite: { '^': '' },
            },
        },
    },
    infrastructureLogging: {
        level: 'none',
    },
    stats: 'errors-warnings',
});

const getDevConfig = new Promise((res, rej) => {
    //查找端口号
    portfinder.getPort({ port: 3000, stopPort: 9000 }, (err, port) => {
        if (err) {
            rej(err);
            return;
        }

        // 端口被占用时就重新设置devServer的端口
        res(merge(baseConfig({ isDev: true }), devConfig(port)));
    });
});

module.exports = getDevConfig;
