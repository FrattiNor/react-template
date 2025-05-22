import { useMemo, useState } from 'react';
import List from './List';

const App = () => {
	const [gap, setGap] = useState(0);
	const [overscan, setOverscan] = useState<[number, number]>([0, 0]);

	const data = useMemo(() => {
		return [...Array(1000)].map((_, i) => `${i}`);
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
				background: 'rgba(0,0,0,0.5)',
			}}
		>
			<div>
				<span style={{ display: 'inline-block', width: 100, textAlign: 'right' }}>Gap：</span>
				<input onChange={(e) => !isNaN(parseInt(e.target.value)) && setGap(parseInt(e.target.value))} />
			</div>
			<div>
				<span style={{ display: 'inline-block', width: 100, textAlign: 'right' }}>Overscan1：</span>
				<input onChange={(e) => !isNaN(parseInt(e.target.value)) && setOverscan((old) => [parseInt(e.target.value), old[1]])} />
			</div>
			<div>
				<span style={{ display: 'inline-block', width: 100, textAlign: 'right' }}>Overscan2：</span>
				<input onChange={(e) => !isNaN(parseInt(e.target.value)) && setOverscan((old) => [old[0], parseInt(e.target.value)])} />
			</div>
			<List
				gap={gap}
				data={data}
				overscan={overscan}
				getItemSize={() => 40}
				getItemKey={(item) => item}
				style={{ width: 400, height: '80vh' }}
				renderData={(item, { index, measureElement }) => (
					<div
						data-index={index}
						ref={(e) => measureElement(e, item)}
						style={{ height: 30, lineHeight: '30px', padding: '0 12px', background: index % 2 === 0 ? '#dcdcdc' : '#fff' }}
					>
						{item}
					</div>
				)}
			/>
		</div>
	);
};

export default App;
