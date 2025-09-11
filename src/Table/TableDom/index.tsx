import type { FC } from 'react';
import styles from './index.module.less';
import TableHead from './TableHead';
import TableBody from './TableBody';
import { useTableContext } from '../TableContext';
import classNames from 'classnames';

const TableDom: FC = () => {
	const { tableProps } = useTableContext();
	const { bordered } = tableProps;

	return (
		<div className={classNames(styles['table'], { [styles['bordered']]: bordered })}>
			<TableHead />
			<TableBody />
		</div>
	);
};

export default TableDom;
