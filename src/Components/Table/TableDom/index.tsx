import type { TableDataItem } from '../TableTypes/type';
import type { TableProps } from '../TableTypes/typeProps';
import { memo } from 'react';
import useTableInstance from '../useTableInstance';
import classNames from 'classnames';
import TableHead from './TableHead';
import TableBody from './TableBody';
import styles from './index.module.less';

const Table = <T extends TableDataItem>(props: TableProps<T>) => {
	if (props.logRender?.table) console.log('Table re-render');
	const instance = useTableInstance(props);
	const { bordered } = instance;

	return (
		<div className={classNames(styles['table'], { [styles['bordered']]: bordered })}>
			<TableHead
				columns={instance.columns}
				headRef={instance.headRef}
				bordered={instance.bordered}
				logRender={instance.logRender}
				v_ScrollbarWidth={instance.v_ScrollbarWidth}
				gridTemplateColumns={instance.gridTemplateColumns}
			/>
			<TableBody
				data={instance.data}
				rowKey={instance.rowKey}
				bodyRef={instance.bodyRef}
				columns={instance.columns}
				bordered={instance.bordered}
				logRender={instance.logRender}
				gridTemplateColumns={instance.gridTemplateColumns}
			/>
		</div>
	);
};

export default memo(Table) as typeof Table;
