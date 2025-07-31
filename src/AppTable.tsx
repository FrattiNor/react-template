import type { FC } from 'react';
import columns from './AppTable.columns';
import Table from './Table';
import data from './AppTable.data';

const AppTable: FC = () => {
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
			}}
		>
			<div style={{ width: '80vw', height: 500, flexShrink: 0, padding: 8 }}>
				<Table data={data} columns={columns} rowKey="userId" bordered />
			</div>
		</div>
	);
};

export default AppTable;
