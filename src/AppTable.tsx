import { useState, type FC } from 'react';
import Table from './Table';
import { data_empty, data1, data2, data3, data4 } from './AppTable.data';
import styles from './AppTable.module.less';
import useAppTableColumns from './useAppTable.columns';

const AppTable: FC = () => {
	const { columns, setLongColumns } = useAppTableColumns();
	const [data, setData] = useState<typeof data1>(() => data4);

	return (
		<div
			style={{
				gap: 16,
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
			<div style={{ display: 'flex', gap: 16 }}>
				<button className={styles['btn']} onClick={() => setLongColumns(false)}>{`columns(less)`}</button>
				<button className={styles['btn']} onClick={() => setLongColumns(true)}>{`columns(lot)`}</button>
			</div>
			<div style={{ display: 'flex', gap: 16 }}>
				<button className={styles['btn']} onClick={() => setData(data_empty)}>{`data(empty)`}</button>
				<button className={styles['btn']} onClick={() => setData(data1)}>{`data(level1)`}</button>
				<button className={styles['btn']} onClick={() => setData(data2)}>{`data(level2)`}</button>
				<button className={styles['btn']} onClick={() => setData(data3)}>{`data(level3)`}</button>
				<button className={styles['btn']} onClick={() => setData(data4)}>{`data(level4)`}</button>
			</div>
		</div>
	);
};

export default AppTable;
