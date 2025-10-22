import type { FC } from 'react';
import { Collection, type CollectionProps } from 'react-virtualized';

import CELLS from './data';

const cellSizeAndPositionGetter: CollectionProps['cellSizeAndPositionGetter'] = ({ index }) => {
	return CELLS[index % CELLS.length];
};

const cellRenderer: CollectionProps['cellRenderer'] = ({ index, key, style }) => {
	const { color, gap } = CELLS[index];
	return (
		<div key={key} style={{ ...style, padding: `0 ${gap}px ${gap}px 0`, boxSizing: 'border-box' }}>
			<div style={{ backgroundColor: color, color: '#fff', borderRadius: 4, width: '100%', height: '100%', textAlign: 'center' }}>
				{`cell:${index + 1}`}
			</div>
		</div>
	);
};

const ReactVirtualizedCollection: FC = () => {
	return (
		<Collection
			width={1000}
			height={500}
			cellCount={CELLS.length}
			cellRenderer={cellRenderer}
			cellSizeAndPositionGetter={cellSizeAndPositionGetter}
			style={{ flexGrow: 0, flexShrink: 0, border: '1px solid rgba(0,0,0,0.1)', outline: 'none' }}
		/>
	);
};

export default ReactVirtualizedCollection;
