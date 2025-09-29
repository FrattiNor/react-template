import { useMemo, useState, type FC } from 'react';

import List from '../../Components/List';

const AppList: FC = () => {
	const [gap, setGap] = useState(0);
	const [size, setSize] = useState(40);
	const [overscan, setOverscan] = useState<[number, number]>([0, 0]);
	const [dataType, setDataType] = useState(1);

	const data: Array<string> = useMemo(() => {
		return [...Array(100000)].map((_, i) => `${i + 1}_1`);
	}, []);

	const data2: Array<{ x: string }> = useMemo(() => {
		return [...Array(2)].map((_, i) => ({ x: `${i + 1}_2` }));
	}, []);

	return (
		<div
			style={{
				gap: 12,
				width: '100%',
				height: '100%',
				display: 'flex',
				alignItems: 'center',
				flexDirection: 'column',
				justifyContent: 'center',
			}}
		>
			<div>
				<span style={{ display: 'inline-block', width: 100, textAlign: 'right' }}>itemGap：</span>
				<input onChange={(e) => !isNaN(parseInt(e.target.value, 10)) && setGap(parseInt(e.target.value, 10))} />
			</div>
			<div>
				<span style={{ display: 'inline-block', width: 100, textAlign: 'right' }}>itemSize：</span>
				<input onChange={(e) => !isNaN(parseInt(e.target.value, 10)) && setSize(parseInt(e.target.value, 10))} />
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
				<span style={{ display: 'inline-block', width: 150, textAlign: 'right' }}>ChangeDataType：</span>
				<button onClick={() => setDataType((old) => (old === 1 ? 2 : 1))}>change</button>
			</div>
			<List
				gap={gap}
				direction="v"
				overscan={overscan}
				getItemSize={() => 40}
				style={{ width: 300, height: '70%', position: 'relative', maxHeight: '1000px', border: '1px solid rgba(0,0,0,0.1)' }}
				data={(dataType === 1 ? data : data2) as Array<string | { x: string }>}
				getItemKey={(item) => (typeof item === 'string' ? item : item.x)}
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
								background: index % 2 === 0 ? 'rgba(0,0,0,0.05)' : '#fff',
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

export default AppList;
