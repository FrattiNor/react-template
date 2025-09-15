import type { FC } from 'react';
import styles from './index.module.less';
import TableHead from './TableHead';
import TableBody from './TableBody';
import { useTableContext } from '../TableContext';
import classNames from 'classnames';

const TableDom: FC = () => {
	const { tableProps, tableState } = useTableContext();
	const { bordered } = tableProps;

	return (
		<div
			className={classNames(styles['table'], {
				[styles['bordered']]: bordered,
				[styles['have-scroll-v']]: tableState.rightScrollBarWidth > 0,
				[styles['not-have-scroll-v']]: tableState.rightScrollBarWidth <= 0,
				[styles['have-scroll-h']]: tableState.bottomScrollBarWidth > 0,
				[styles['not-have-scroll-h']]: tableState.bottomScrollBarWidth <= 0,
			})}
		>
			<TableHead />
			<TableBody />
		</div>
	);
};

export default TableDom;
