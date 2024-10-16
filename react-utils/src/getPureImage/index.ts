type Props = {
	width: number;
	height: number;
	color: string;
};

// 获取纯色图片
const getPureImage = ({ width, height, color }: Props) => {
	const canvas = document.createElement('canvas');
	canvas.width = width;
	canvas.height = height;
	const ctx = canvas.getContext('2d');
	if (ctx) {
		ctx.fillStyle = color;
		ctx.fillRect(0, 0, width, height);
	}
	return canvas.toDataURL('image/png');
};

export default getPureImage;
