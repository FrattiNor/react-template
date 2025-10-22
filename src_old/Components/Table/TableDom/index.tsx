import { memo } from 'react';

import classNames from 'classnames';

import styles from './index.module.less';
import themeStyles from './index.theme.module.less';
import TableBody from './TableBody';
import TableHead from './TableHead';
import TableLoading from '../TableComponent/TableLoading';

import type { TableDataItem, TableInstance } from '../TableTypes/type';

type Props<T extends TableDataItem> = {
	instance: TableInstance<T>;
};

const TableDom = <T extends TableDataItem>({ instance }: Props<T>) => {
	const { tableRef } = instance.tableDomRef;
	const { H_ScrollbarWidth } = instance.tableState;
	const { loading, theme, bordered } = instance.tableProps;

	return (
		<TableLoading
			loading={loading}
			wrapperRef={tableRef}
			className={classNames(styles['table'], {
				[styles['bordered']]: bordered,
				[themeStyles['table-theme-dark']]: theme === 'dark',
				[themeStyles['table-theme-light']]: theme === 'light',
				[styles['not-bordered-and-have-h-scrollbar']]: bordered !== true && H_ScrollbarWidth > 0,
			})}
		>
			<TableHead instance={instance} />
			<TableBody instance={instance} />
		</TableLoading>
	);
};

export default memo(TableDom) as typeof TableDom;
