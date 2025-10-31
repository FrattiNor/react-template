import { memo } from 'react';

import classNames from 'classnames';

import useTableInstance from '../useTableInstance';
import styles from './index.module.less';
import TableBody from './TableBody';
import TableHead from './TableHead';

import type { TableComponent } from '../TableTypes/type';
import type { TableProps } from '../TableTypes/typeProps';

const Table = <T,>(props: TableProps<T>) => {
	// console.log('Table re-render');
	const instance = useTableInstance(props);

	return (
		<div className={classNames(styles['table'], { [styles['bordered']]: instance.bordered })}>
			<TableHead
				headRef={instance.headRef}
				bordered={instance.bordered}
				deepLevel={instance.deepLevel}
				rowHeight={instance.rowHeight}
				splitColumnsArr={instance.splitColumnsArr}
				v_ScrollbarWidth={instance.v_ScrollbarWidth}
				gridTemplateColumns={instance.gridTemplateColumns}
			/>
			<TableBody
				data={instance.data}
				rowKey={instance.rowKey}
				bodyRef={instance.bodyRef}
				bordered={instance.bordered}
				rowHeight={instance.rowHeight}
				splitColumnsArr={instance.splitColumnsArr}
				gridTemplateColumns={instance.gridTemplateColumns}
			/>
		</div>
	);
};

export default memo(Table) as TableComponent;
