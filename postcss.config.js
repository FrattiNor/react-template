// postcss-loader 的配置
// browser 的参数在 package.json的browserslist
module.exports = {
    plugins: [
        require('autoprefixer'),
        // require('postcss-pxtorem')({
        //     // 多少px转换成1rem
        //     rootValue: 100,
        //     // 哪些需要进行px转rem
        //     propList: ['*'],
        //     // 排除哪些开头的如 .weui-button 等等
        //     selectorBlackList: ['weui-'],
        //     // 最小转换，如低于 4px的不会进行转成rem
        //     minPixelValue: 4
        // })
    ]
}
