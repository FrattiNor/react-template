import type { FC } from 'react';
import { List, Grid, useListRef, type CellComponentProps, type RowComponentProps } from 'react-window';

const CellComponent = ({ ariaAttributes, columnIndex, rowIndex, style }: CellComponentProps) => {
	let bgLevel = 0;
	if (rowIndex % 2 !== 0) bgLevel++;
	if (columnIndex % 2 !== 0) bgLevel++;
	const text = `cell ${rowIndex + 1}-${columnIndex + 1}`;
	return (
		<div
			{...ariaAttributes}
			style={{
				...style,
				padding: '0 16px',
				lineHeight: '50px',
				boxSizing: 'border-box',
				backgroundColor: bgLevel === 0 ? 'rgba(0,0,0,0)' : bgLevel === 1 ? 'rgba(0,0,0,0.05)' : 'rgba(0,0,0,0)',
			}}
		>
			{text}
		</div>
	);
};

const RowComponent = ({ ariaAttributes, index, style }: RowComponentProps) => {
	return (
		<div
			{...ariaAttributes}
			style={{
				...style,
				padding: '0 16px',
				lineHeight: '50px',
				boxSizing: 'border-box',
				backgroundColor: index % 2 === 0 ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,0.05)',
			}}
		>
			Row {index + 1}
		</div>
	);
};

const AppReactWindow: FC = () => {
	const listRef = useListRef(null);

	return (
		<div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 50 }}>
			<Grid
				cellProps={{}}
				rowHeight={50}
				rowCount={10000}
				overscanCount={0}
				columnCount={10000}
				columnWidth={() => 200}
				cellComponent={CellComponent}
				style={{ width: 1000, height: '50%', flexGrow: 0, flexShrink: 1, border: '1px solid rgba(0,0,0,0.1)' }}
			/>
			<List
				rowProps={{}}
				rowHeight={50}
				listRef={listRef}
				rowCount={100000}
				overscanCount={0}
				rowComponent={RowComponent}
				style={{ width: 300, height: '50%', flexGrow: 0, flexShrink: 1, border: '1px solid rgba(0,0,0,0.1)' }}
			/>
		</div>
	);
};

export default AppReactWindow;
