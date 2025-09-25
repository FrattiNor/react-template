import classNames from 'classnames';

import styles from './index.module.less';
import TableBody from './TableBody';
import TableHead from './TableHead';
import TableLoading from '../TableComponent/TableLoading';

import type { TableDataItem } from '../TableTypes/type';
import type { TableInstance } from '../TableTypes/typeHooks';

type Props<T extends TableDataItem> = {
	instance: TableInstance<T>;
};

// TODO bordered 样式需要优化
const TableDom = <T extends TableDataItem>({ instance }: Props<T>) => {
	const { tableRef } = instance.tableDomRef;
	const { bordered, loading, theme } = instance.tableProps;
	const { V_ScrollbarWidth, H_ScrollbarWidth } = instance.tableState;

	return (
		<TableLoading
			loading={loading}
			wrapperRef={tableRef}
			className={classNames(styles['table'], {
				[styles['table-theme-dark']]: theme === 'dark',
				[styles['table-theme-light']]: theme === 'light',
				[styles['bordered']]: bordered,
				[styles['have-scroll-v']]: V_ScrollbarWidth > 0,
				[styles['not-have-scroll-v']]: V_ScrollbarWidth <= 0,
				[styles['have-scroll-h']]: H_ScrollbarWidth > 0,
				[styles['not-have-scroll-h']]: H_ScrollbarWidth <= 0,
			})}
		>
			<TableHead instance={instance} />
			<TableBody instance={instance} />
		</TableLoading>
	);
};

export default TableDom;
