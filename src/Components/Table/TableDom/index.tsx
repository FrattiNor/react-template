import { memo } from 'react';

import classNames from 'classnames';

import useTableInstance from '../useTableInstance';
import styles from './index.module.less';
import TableBody from './TableBody';
import TableHead from './TableHead';

import type { TableComponent } from '../TableTypes/type';
import type { TableProps } from '../TableTypes/typeProps';

const Table = <T,>(props: TableProps<T>) => {
	if (props.logRender?.table) console.log('Table re-render');
	const instance = useTableInstance(props);
	const { bordered } = instance;

	return (
		<div className={classNames(styles['table'], { [styles['bordered']]: bordered })}>
			<TableHead
				headRef={instance.headRef}
				bordered={instance.bordered}
				logRender={instance.logRender}
				leafColumns={instance.leafColumns}
				v_ScrollbarWidth={instance.v_ScrollbarWidth}
				gridTemplateColumns={instance.gridTemplateColumns}
			/>
			<TableBody
				data={instance.data}
				rowKey={instance.rowKey}
				bodyRef={instance.bodyRef}
				bordered={instance.bordered}
				logRender={instance.logRender}
				leafColumns={instance.leafColumns}
				gridTemplateColumns={instance.gridTemplateColumns}
			/>
		</div>
	);
};

export default memo(Table) as TableComponent;
