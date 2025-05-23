import { useMemo, useState } from 'react';
import List from './List';

const App = () => {
	const [gap, setGap] = useState(0);
	const [size, setSize] = useState(30);
	const [overscan, setOverscan] = useState<[number, number]>([0, 0]);
	const [dataType, setDataType] = useState(1);

	const data: Array<string> = useMemo(() => {
		return [...Array(1000)].map((_, i) => `${i}_1`);
	}, []);

	const data2: Array<{ x: string }> = useMemo(() => {
		return [...Array(100)].map((_, i) => ({ x: `${i}_2` }));
	}, []);

	return (
		<div
			style={{
				gap: 12,
				width: '100vw',
				height: '100vh',
				display: 'flex',
				alignItems: 'center',
				flexDirection: 'column',
				justifyContent: 'center',
				background: 'rgba(0,0,0,0.25)',
			}}
		>
			<div>
				<span style={{ display: 'inline-block', width: 100, textAlign: 'right' }}>Gap：</span>
				<input onChange={(e) => !isNaN(parseInt(e.target.value, 10)) && setGap(parseInt(e.target.value, 10))} />
			</div>
			<div>
				<span style={{ display: 'inline-block', width: 100, textAlign: 'right' }}>Overscan1：</span>
				<input onChange={(e) => !isNaN(parseInt(e.target.value, 10)) && setOverscan((old) => [parseInt(e.target.value, 10), old[1]])} />
			</div>
			<div>
				<span style={{ display: 'inline-block', width: 100, textAlign: 'right' }}>Overscan2：</span>
				<input onChange={(e) => !isNaN(parseInt(e.target.value, 10)) && setOverscan((old) => [old[0], parseInt(e.target.value, 10)])} />
			</div>
			<div>
				<span style={{ display: 'inline-block', width: 100, textAlign: 'right' }}>Size：</span>
				<input onChange={(e) => !isNaN(parseInt(e.target.value, 10)) && setSize(parseInt(e.target.value, 10))} />
			</div>
			<div>
				<span style={{ display: 'inline-block', width: 100, textAlign: 'right' }}>DataType：</span>
				<button onClick={() => setDataType((old) => (old === 1 ? 2 : 1))}>change</button>
			</div>
			<List
				gap={gap}
				overscan={overscan}
				getItemSize={() => 40}
				data={(dataType === 1 ? data : data2) as Array<string | { x: string }>}
				getItemKey={(item) => (typeof item === 'string' ? item : item.x)}
				style={{ width: 400, height: '70vh' }}
				renderData={(item, { index, key, measureElement }) => {
					return (
						<div
							data-key={key}
							data-index={index}
							ref={(e) => measureElement(e, item)}
							style={{
								padding: '0 12px',
								height: Math.max(20, size),
								lineHeight: `${Math.max(20, size)}px`,
								background: index % 2 === 0 ? '#dcdcdc' : '#fff',
							}}
						>
							{typeof item === 'string' ? item : item.x}
						</div>
					);
				}}
			/>
		</div>
	);
};

export default App;
