// 根据颜色获取字体颜色
export const getContrastColor = (hexcolor1: string, opt?: { dark?: string; light?: string }) => {
    const { dark = '#444', light = '#fff' } = opt || {};

    if (typeof hexcolor1 === 'string' && (/^#([0-9]|[a-f]|[A-F]){3}$/.test(hexcolor1) || /^#([0-9]|[a-f]|[A-F]){6}$/.test(hexcolor1))) {
        let hexcolor = hexcolor1;

        // 如果是#号开始的颜色值，去掉#
        if (hexcolor.slice(0, 1) === '#') {
            hexcolor = hexcolor.slice(1);
        }

        // 如果是三位数的颜色值，转成6位
        if (hexcolor.length === 3) {
            hexcolor = hexcolor
                .split('')
                .map(function (hex) {
                    return hex + hex;
                })
                .join('');
        }

        // 转换为RGB值
        const r = parseInt(hexcolor.slice(0, 2), 16);
        const g = parseInt(hexcolor.slice(2, 4), 16);
        const b = parseInt(hexcolor.slice(4, 6), 16);

        // 获取YIQ比率
        const yiq = (r * 299 + g * 587 + b * 114) / 1000;

        // 返回对应的反差色值
        const isDark = yiq >= 185;
        const color = isDark ? dark : light;
        return { color, isDark };
    }

    return { color: dark, isDark: true };
};

// rgb -> hex
export const rgbToHex = (r: number, g: number, b: number) => {
    const hex = ((r << 16) | (g << 8) | b).toString(16);
    return '#' + new Array(Math.abs(hex.length - 7)).join('0') + hex;
};

// hex -> rgb
export const hexToRgb = (hex: string) => {
    const rgb: number[] = [];
    for (let i = 1; i < 7; i += 2) {
        rgb.push(parseInt('0x' + hex.slice(i, i + 2)));
    }
    return rgb;
};

/**
 * 计算渐变过渡色
 * @param {*} startColor 开始颜色
 * @param {*} endColor 结束颜色
 * @param {*} step 步进 0 - 100
 */
export const getGradientColor = (startColor: string, endColor: string, step: number) => {
    // 将 hex 转换为rgb
    const sColor = hexToRgb(startColor);
    const eColor = hexToRgb(endColor);

    // 计算R\G\B每一步的差值
    const rStep = (eColor[0] - sColor[0]) / step;
    const gStep = (eColor[1] - sColor[1]) / step;
    const bStep = (eColor[2] - sColor[2]) / step;

    const gradientColorArr: string[] = [];
    for (let i = 0; i < step; i++) {
        // 计算每一步的hex值
        gradientColorArr.push(
            rgbToHex(parseInt(`${rStep * i + sColor[0]}`), parseInt(`${gStep * i + sColor[1]}`), parseInt(`${bStep * i + sColor[2]}`)),
        );
    }
    return gradientColorArr[gradientColorArr.length - 1];
};
