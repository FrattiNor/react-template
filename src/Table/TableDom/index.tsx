import { memo } from 'react';

import classNames from 'classnames';

import DragContext from './DragContext';
import DragOverlay from './DragOverlay';
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
	const { haveDraggable } = instance.tableDraggable;
	const { bordered, loading, theme } = instance.tableProps;
	const { V_ScrollbarWidth, H_ScrollbarWidth } = instance.tableState;

	return (
		<DragContext instance={instance}>
			<TableLoading
				loading={loading}
				wrapperRef={tableRef}
				className={classNames(styles['table'], {
					[styles['bordered']]: bordered,
					[styles['table-theme-dark']]: theme === 'dark',
					[styles['table-theme-light']]: theme === 'light',
					[styles['have-scroll-v']]: V_ScrollbarWidth > 0,
					[styles['have-scroll-h']]: H_ScrollbarWidth > 0,
					[styles['not-have-scroll-v']]: V_ScrollbarWidth <= 0,
					[styles['not-have-scroll-h']]: H_ScrollbarWidth <= 0,
				})}
			>
				<TableHead instance={instance} />
				<TableBody instance={instance} />
			</TableLoading>

			{haveDraggable && <DragOverlay instance={instance} />}
		</DragContext>
	);
};

export default memo(TableDom) as typeof TableDom;
