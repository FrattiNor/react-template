import { useEffect, useState, type FC } from 'react';

import { canMove, consoleData, initData, keyDownUp } from './utils';

import type { Data } from './type';

const App2048: FC = () => {
	const [end, setEnd] = useState(false);
	const [score, setScore] = useState(0);
	const [data, setData] = useState<Data>(initData);

	// 监听
	useEffect(() => {
		if (end === false) {
			const keydown = (e: KeyboardEvent) => {
				switch (e.key) {
					case 'w':
					case 'ArrowUp':
						setData((oldData) => {
							console.clear();
							consoleData(oldData);
							console.log('up');
							const { data, addScore } = keyDownUp(oldData, 'up');
							setScore((old) => old + addScore);
							return [...data];
						});
						break;
					case 's':
					case 'ArrowDown':
						setData((oldData) => {
							console.clear();
							consoleData(oldData);
							console.log('down');
							const { data, addScore } = keyDownUp(oldData, 'down');
							setScore((old) => old + addScore);
							return [...data];
						});
						break;
					case 'a':
					case 'ArrowLeft':
						setData((oldData) => {
							console.clear();
							consoleData(oldData);
							console.log('left');
							const { data, addScore } = keyDownUp(oldData, 'left');
							setScore((old) => old + addScore);
							return [...data];
						});
						break;
					case 'd':
					case 'ArrowRight':
						setData((oldData) => {
							console.clear();
							consoleData(oldData);
							console.log('right');
							const { data, addScore } = keyDownUp(oldData, 'right');
							setScore((old) => old + addScore);
							return [...data];
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
		console.log(`score: ${score}`);
		setEnd(!canMove(data));
	}, [data]);

	useEffect(() => {
		(window as any).resetGame = () => {
			console.clear();
			setScore(0);
			setData(initData);
		};
	}, []);

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
