import { useEffect, useState } from 'react';

import { canMove, consoleData, getAnEmptyBlock, getAnInitData, keyDownUp } from './utils';

import type { Data } from './type';

const initData: Data = [
	[0, 0, 0, 0],
	[0, 0, 0, 0],
	[0, 0, 0, 0],
	[0, 0, 0, 0],
];

const App2048 = () => {
	const [end, setEnd] = useState(false);

	const [data, setData] = useState<Data>(() => {
		const nextData: Data = initData;
		const firstData = 2;
		const emptyBlock1 = getAnEmptyBlock(nextData);
		if (emptyBlock1) nextData[emptyBlock1.row][emptyBlock1.col] = firstData;
		const secondData = getAnInitData();
		const emptyBlock2 = getAnEmptyBlock(nextData);
		if (emptyBlock2) nextData[emptyBlock2.row][emptyBlock2.col] = secondData;
		return nextData;
	});

	// 监听
	useEffect(() => {
		if (end === false) {
			const keydown = (e: KeyboardEvent) => {
				switch (e.key) {
					case 'ArrowUp':
						setData((oldData) => {
							console.clear();
							consoleData(oldData);
							console.log('up');
							return [...keyDownUp(oldData, 'up')];
						});
						break;
					case 'ArrowDown':
						setData((oldData) => {
							console.clear();
							consoleData(oldData);
							console.log('down');
							return [...keyDownUp(oldData, 'down')];
						});
						break;
					case 'ArrowLeft':
						setData((oldData) => {
							console.clear();
							consoleData(oldData);
							console.log('left');
							return [...keyDownUp(oldData, 'left')];
						});
						break;
					case 'ArrowRight':
						setData((oldData) => {
							console.clear();
							consoleData(oldData);
							console.log('right');
							return [...keyDownUp(oldData, 'right')];
						});
						break;
				}
			};
			document.addEventListener('keydown', keydown);
			return () => {
				document.removeEventListener('keydown', keydown);
			};
		} else {
			console.error('game over');
		}
	}, [end]);

	useEffect(() => {
		consoleData(data);
		setEnd(!canMove(data));
	}, [data]);

	return (
		<div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
			<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid rgba(0,0,0,0.1)' }}>
				{/* {data.map((row, rowIndex) => (
					<div key={rowIndex} style={{ display: 'flex', alignItems: 'center' }}>
						{row.map((_, colIndex) => {
							let bgLevel = 0;
							if (rowIndex % 2 !== 0) bgLevel++;
							if (colIndex % 2 !== 0) bgLevel++;
							const backgroundColor = bgLevel === 0 ? 'rgba(0,0,0,0)' : bgLevel === 1 ? 'rgba(0,0,0,0.05)' : 'rgba(0,0,0,0)';
							return (
								<div key={colIndex} style={{ width: 50, height: 50, lineHeight: '50px', textAlign: 'center', backgroundColor }}>
									{toStr(data[rowIndex][colIndex])}
								</div>
							);
						})}
					</div>
				))} */}
			</div>
		</div>
	);
};

export default App2048;
