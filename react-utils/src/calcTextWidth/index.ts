type Opt = {
    fontSize: number;
    fontFamily: string;
};

const defaultFontFamily = `AlibabaPuHuiTi, -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji',
'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`;

const calcTextWidth = (text: string, opt?: Opt) => {
    const ctx = document.createElement('canvas').getContext('2d');
    if (ctx) {
        const { fontSize = 14, fontFamily = defaultFontFamily } = opt || {};
        ctx.font = `${fontSize}px ${fontFamily}`;
        const metrics = ctx.measureText(text);
        const actual = Math.abs(metrics.actualBoundingBoxLeft) + Math.abs(metrics.actualBoundingBoxRight);
        return Math.max(metrics.width, actual);
    }
    return 0;
};

export default calcTextWidth;
