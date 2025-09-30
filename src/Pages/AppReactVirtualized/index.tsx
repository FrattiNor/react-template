import { useState, type FC } from 'react';

import { Segmented } from 'antd';

import ReactVirtualizedCollection from './Collection';
import ReactVirtualizedGrid from './Grid';

const AppReactVirtualized: FC = () => {
	const [key, setKey] = useState('collection');

	return (
		<div
			style={{
				gap: 16,
				width: '100%',
				height: '100%',
				display: 'flex',
				alignItems: 'center',
				flexDirection: 'column',
				justifyContent: 'center',
			}}
		>
			<Segmented<string> value={key} onChange={setKey} options={['collection', 'grid']} />
			{key === 'grid' && <ReactVirtualizedGrid />}
			{key === 'collection' && <ReactVirtualizedCollection />}
		</div>
	);
};

export default AppReactVirtualized;
