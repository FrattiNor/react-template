import { memo } from 'react';

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
// TODO V_ScrollbarWidth head body border对不齐
const TableDom = <T extends TableDataItem>({ instance }: Props<T>) => {
	const { tableRef } = instance.tableDomRef;
	const { bordered, loading, theme } = instance.tableProps;

	return (
		<TableLoading
			loading={loading}
			wrapperRef={tableRef}
			className={classNames(styles['table'], {
				[styles['bordered']]: bordered,
				[styles['table-theme-dark']]: theme === 'dark',
				[styles['table-theme-light']]: theme === 'light',
			})}
		>
			<TableHead instance={instance} />
			<TableBody instance={instance} />
		</TableLoading>
	);
};

export default memo(TableDom) as typeof TableDom;
