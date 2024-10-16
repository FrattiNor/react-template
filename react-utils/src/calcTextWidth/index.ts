type Opt = {
	fontSize: number;
	fontFamily: string;
};

const calcTextWidth = (text: string, opt: Opt) => {
	const ctx = document.createElement('canvas').getContext('2d');
	if (ctx) {
		const { fontSize, fontFamily } = opt || {};
		ctx.font = `${fontSize}px ${fontFamily}`;
		const metrics = ctx.measureText(text);
		const actual = Math.abs(metrics.actualBoundingBoxLeft) + Math.abs(metrics.actualBoundingBoxRight);
		return Math.max(metrics.width, actual);
	}
	return 0;
};

export default calcTextWidth;
