import type { FC } from 'react';
import styles from './index.module.less';
import TableHead from './TableHead';
import TableBody from './TableBody';
import { useTableContext } from '../TableContext';

const TableDom: FC = () => {
	const { gridTemplateColumns, tableDomRef } = useTableContext();

	return (
		<div className={styles['table']} style={{ gridTemplateColumns }} ref={tableDomRef.tableRef}>
			<TableHead />
			<TableBody />
		</div>
	);
};

export default TableDom;
