import styles from './index.module.less';
import TableHead from './TableHead';
import TableBody from './TableBody';
import classNames from 'classnames';
import type { TableInstance } from '../TableTypes/typeHooks';
import type { TableDataItem } from '../TableTypes/type';

type Props<T extends TableDataItem> = {
	instance: TableInstance<T>;
};

const TableDom = <T extends TableDataItem>({ instance }: Props<T>) => {
	const { bordered } = instance.tableProps;
	const { tableRef } = instance.tableDomRef;
	const { V_ScrollbarWidth, H_ScrollbarWidth } = instance.tableState;

	return (
		<div
			ref={tableRef}
			className={classNames(styles['table'], {
				[styles['bordered']]: bordered,
				[styles['have-scroll-v']]: V_ScrollbarWidth > 0,
				[styles['not-have-scroll-v']]: V_ScrollbarWidth <= 0,
				[styles['have-scroll-h']]: H_ScrollbarWidth > 0,
				[styles['not-have-scroll-h']]: H_ScrollbarWidth <= 0,
			})}
		>
			<TableHead instance={instance} />
			<TableBody instance={instance} />
		</div>
	);
};

export default TableDom;
