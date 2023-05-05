// postcss-loader 的配置
module.exports = {
    plugins: [
        require('autoprefixer'),
        require('postcss-pxtorem')({
            // 多少px转换成1rem
            rootValue: 100,
            // 哪些需要进行px转rem
            propList: ['*'],
            // 排除哪些开头的如 .button 等等
            selectorBlackList: [],
            // 最小转换，如低于 4px的不会进行转成rem
            minPixelValue: 4,
        }),
    ],
};
