import type { Data, MoveType } from './type';

export const initData = () => {
	const nextData: Data = [
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
	];
	const firstData = 2;
	const emptyBlock1 = getAnEmptyBlock(nextData);
	if (emptyBlock1) nextData[emptyBlock1.row][emptyBlock1.col] = firstData;
	const secondData = getAnInitData();
	const emptyBlock2 = getAnEmptyBlock(nextData);
	if (emptyBlock2) nextData[emptyBlock2.row][emptyBlock2.col] = secondData;
	return nextData;
};

// 获取一个初始值
const getAnInitData = () => {
	return Math.random() >= 0.5 ? 2 : 4;
};

export const toStr = (v: number) => {
	if (typeof v === 'number' && v !== 0) return `${v}`;
	return '';
};

export const consoleData = (_data: Data) => {
	const maxSize = (() => {
		let size = 1;
		_data.forEach((row) => {
			row.forEach((item) => {
				const nextSize = String(item).length;
				if (nextSize > size) size = nextSize;
			});
		});
		return size;
	})();

	const getItemStr = (item: number) => {
		const str = item === 0 ? '_' : String(item);
		const needEmpty = maxSize - str.length;
		const needStr = Array(needEmpty).fill(' ').join('');
		return `${str}${needStr}`;
	};

	let text = '';
	for (let rowIndex = 0; rowIndex <= 3; rowIndex++) {
		if (rowIndex !== 0) text += `  `;
		text += `[ `;
		for (let colIndex = 0; colIndex <= 3; colIndex++) {
			text += ` ${getItemStr(_data[rowIndex][colIndex])} `;
		}
		text += ` ]\n`;
	}
	console.warn(text);
};

const getTotal = (_data: Data) => {
	let total = 0;
	_data.forEach((row) => {
		row.forEach((item) => {
			total += item;
		});
	});
	return total;
};

// 获取一个空格子
const getAnEmptyBlock = (_data: Data) => {
	const datasource = _data;
	const emptyBlocks: Array<{ row: number; col: number }> = [];
	datasource.forEach((row, rowIndex) => {
		row.forEach((_, colIndex) => {
			const item = datasource[rowIndex][colIndex];
			if (item === 0) emptyBlocks.push({ row: rowIndex, col: colIndex });
		});
	});
	if (emptyBlocks.length <= 0) return undefined;
	return emptyBlocks[Math.floor(Math.random() * emptyBlocks.length)];
};

const Up = (data: Data) => {
	let changed = false;
	for (let col = 0; col <= 3; col++) {
		for (let row = 1; row <= 3; row++) {
			let merged = false;
			if (data[row][col] !== 0) {
				let curRow = row;
				while (curRow > 0) {
					const curData = data[curRow][col];
					const upRow = curRow - 1;
					const upData = data[upRow][col];
					if (upData === 0) {
						changed = true;
						data[upRow][col] = curData;
						data[curRow][col] = 0;
						curRow--;
						continue;
					}
					if (!merged && upData === curData) {
						changed = true;
						data[upRow][col] = curData * 2;
						data[curRow][col] = 0;
						merged = true;
						curRow--;
						continue;
					}
					break;
				}
			}
		}
	}
	return changed;
};

const Down = (data: Data) => {
	let changed = false;
	for (let col = 0; col <= 3; col++) {
		for (let row = 2; row >= 0; row--) {
			let merged = false;
			if (data[row][col] !== 0) {
				let curRow = row;
				while (curRow < 3) {
					const curData = data[curRow][col];
					const upRow = curRow + 1;
					const downData = data[upRow][col];
					if (downData === 0) {
						changed = true;
						data[upRow][col] = curData;
						data[curRow][col] = 0;
						curRow++;
						continue;
					}
					if (!merged && downData === curData) {
						changed = true;
						data[upRow][col] = curData * 2;
						data[curRow][col] = 0;
						merged = true;
						curRow++;
						continue;
					}
					break;
				}
			}
		}
	}
	return changed;
};

const Left = (data: Data) => {
	let changed = false;
	for (let row = 0; row <= 3; row++) {
		for (let col = 1; col <= 3; col++) {
			let merged = false;
			if (data[row][col] !== 0) {
				let curCol = col;
				while (curCol > 0) {
					const curData = data[row][curCol];
					const leftCol = curCol - 1;
					const leftData = data[row][leftCol];
					if (leftData === 0) {
						changed = true;
						data[row][leftCol] = curData;
						data[row][curCol] = 0;
						curCol--;
						continue;
					}
					if (!merged && leftData === curData) {
						changed = true;
						data[row][leftCol] = curData * 2;
						data[row][curCol] = 0;
						merged = true;
						curCol--;
						continue;
					}
					break;
				}
			}
		}
	}
	return changed;
};

const Right = (data: Data) => {
	let changed = false;
	for (let row = 0; row <= 3; row++) {
		for (let col = 2; col >= 0; col--) {
			let merged = false;
			if (data[row][col] !== 0) {
				let curCol = col;
				while (curCol < 3) {
					const curData = data[row][curCol];
					const rightCol = curCol + 1;
					const rightData = data[row][rightCol];
					if (rightData === 0) {
						changed = true;
						data[row][rightCol] = curData;
						data[row][curCol] = 0;
						curCol++;
						continue;
					}
					if (!merged && rightData === curData) {
						changed = true;
						data[row][rightCol] = curData * 2;
						data[row][curCol] = 0;
						merged = true;
						curCol++;
						continue;
					}
					break;
				}
			}
		}
	}
	return changed;
};

export const keyDownUp = (data: Data, type: MoveType) => {
	const AddEmpty = (changed: boolean) => {
		if (changed) {
			const nextData = getAnInitData();
			const emptyBlock2 = getAnEmptyBlock(data);
			if (emptyBlock2) {
				data[emptyBlock2.row][emptyBlock2.col] = nextData;
			} else {
				console.error('no empty');
			}
		} else {
			console.info('not changed');
		}
	};

	const calcScore = (changed: boolean) => {
		if (changed) {
			return getTotal(data);
		} else {
			return 0;
		}
	};

	let addScore = 0;

	switch (type) {
		case 'up': {
			const changed = Up(data);
			AddEmpty(changed);
			addScore += calcScore(changed);
			break;
		}
		case 'down': {
			const changed = Down(data);
			AddEmpty(changed);
			addScore += calcScore(changed);
			break;
		}
		case 'left': {
			const changed = Left(data);
			AddEmpty(changed);
			addScore += calcScore(changed);
			break;
		}
		case 'right': {
			const changed = Right(data);
			AddEmpty(changed);
			addScore += calcScore(changed);
			break;
		}
	}

	return { data, addScore };
};

export const canMove = (data: Data) => {
	const copyData = JSON.parse(JSON.stringify(data));
	if (Up(copyData)) return true;
	if (Down(copyData)) return true;
	if (Left(copyData)) return true;
	if (Right(copyData)) return true;
	return false;
};
