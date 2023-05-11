module.exports = {
    plugins: {
        autoprefixer: {
            overrideBrowserslist: ['Android 4.1', 'iOS 7.1', 'Chrome > 31', 'ff > 31', 'ie >= 8', 'last 10 versions'],
            grid: true,
        },
        'postcss-pxtorem': {
            rootValue: 37.5, // 设计稿宽度的十分之一
            propList: ['*'], // 可以从px改变为rem的属性
            unitPrecision: 5, // 小数点后精度
        },
    },
};
