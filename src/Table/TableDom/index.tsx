import type { FC } from 'react';
import styles from './index.module.less';
import TableHead from './TableHead';
import TableBody from './TableBody';

const TableDom: FC = () => {
	return (
		<div className={styles['table']}>
			<TableHead />
			<TableBody />
		</div>
	);
};

export default TableDom;
