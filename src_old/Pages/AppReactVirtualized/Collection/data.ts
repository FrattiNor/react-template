const gap = 4;
const cellWidth = 75 + gap;
const rowCount = 100;
const colCount = 100;
const colors = ['#f5222d', '#fa541c', '#fa8c16', '#a0d911', '#faad14', '#d4b106', '#52c41a', '#13c2c2', '#1677ff', '#2f54eb', '#722ed1', '#eb2f96'];

const getColor = () => {
	const length = colors.length;
	const index = Math.floor(Math.random() * length);
	return colors[index];
};

const getHeight = () => {
	return 50 + 10 * Math.floor(Math.random() * 5) + gap;
};

type CellItem = { x: number; y: number; width: number; height: number; color: string; gap: number };

const CELLS2: Array<Array<CellItem>> = [];
const CELLS: Array<CellItem> = [];

for (let r = 0; r < rowCount; r++) {
	if (CELLS2[r] === undefined) CELLS2[r] = [];
	for (let c = 0; c < colCount; c++) {
		const leftItem = CELLS2?.[r]?.[c - 1] as CellItem | undefined;
		const topItem = CELLS2?.[r - 1]?.[c] as CellItem | undefined;
		const color = getColor();
		const height = getHeight();
		let x = (leftItem?.x ?? 0) + (leftItem?.width ?? 0);
		let y = (topItem?.y ?? 0) + (topItem?.height ?? 0);
		if (x === 0) x += gap;
		if (y === 0) y += gap;
		CELLS2[r][c] = { x, y, height, color, gap, width: cellWidth };
	}
	CELLS.push(...CELLS2[r]);
}

export default CELLS;
