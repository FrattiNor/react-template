import { useState, type FC } from 'react';
import { columns1, columns2 } from './AppTable.columns';
import Table from './Table';
import { data1, data2 } from './AppTable.data';
import styles from './AppTable.module.less';

const AppTable: FC = () => {
	const [data, setData] = useState<typeof data1>(() => data1);
	const [columns, setColumns] = useState<typeof columns1>(() => columns1);

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
			<div style={{ display: 'flex', gap: 12 }}>
				<button className={styles['btn']} onClick={() => setData([])}>{`data(empty)`}</button>
				<button className={styles['btn']} onClick={() => setData(data2)}>{`data(less)`}</button>
				<button className={styles['btn']} onClick={() => setData(data1)}>{`data(lot)`}</button>
				<button className={styles['btn']} onClick={() => setColumns(columns2)}>{`columns(less)`}</button>
				<button className={styles['btn']} onClick={() => setColumns(columns1)}>{`columns(lot)`}</button>
			</div>
		</div>
	);
};

export default AppTable;
