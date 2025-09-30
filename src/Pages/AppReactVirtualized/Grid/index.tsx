import type { FC } from 'react';
import { Grid, type GridProps } from 'react-virtualized';

const cellRenderer: GridProps['cellRenderer'] = ({ columnIndex, isVisible, key, rowIndex, style }) => {
	let bgLevel = 0;
	if (rowIndex % 2 !== 0) bgLevel++;
	if (columnIndex % 2 !== 0) bgLevel++;
	const backgroundColor = bgLevel === 0 ? 'rgba(0,0,0,0)' : bgLevel === 1 ? 'rgba(0,0,0,0.05)' : 'rgba(0,0,0,0)';

	if (isVisible === false) return <div key={key} style={{ ...style, backgroundColor }} />;

	return (
		<div
			key={key}
			style={{
				...style,
				backgroundColor,
				padding: '0 16px',
				lineHeight: '50px',
				boxSizing: 'border-box',
			}}
		>
			{`cell:${rowIndex + 1}-${columnIndex + 1}`}
		</div>
	);
};

const ReactVirtualizedGrid: FC = () => {
	return (
		<Grid
			height={500}
			width={1000}
			rowHeight={50}
			rowCount={1000}
			columnCount={1000}
			columnWidth={200}
			cellRenderer={cellRenderer}
			style={{ flexGrow: 0, flexShrink: 0, border: '1px solid rgba(0,0,0,0.1)', outline: 'none' }}
		/>
	);
};

export default ReactVirtualizedGrid;
