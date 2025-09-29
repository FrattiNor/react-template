import type { FC } from 'react';
import { List, useListRef } from 'react-window';

const AppReactWindow: FC = () => {
	const listRef = useListRef(null);

	console.log('listRef', listRef);

	return (
		<div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
			<List
				listRef={listRef}
				style={{ width: 300, height: '50%', flexGrow: 0, flexShrink: 1, border: '1px solid rgba(0,0,0,0.1)' }}
				rowProps={{}}
				rowHeight={50}
				rowCount={1000}
				overscanCount={0}
				onChange={() => console.log('onChange', listRef)}
				rowComponent={({ ariaAttributes, index, style }) => (
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
						Row {index}
					</div>
				)}
			/>
		</div>
	);
};

export default AppReactWindow;
