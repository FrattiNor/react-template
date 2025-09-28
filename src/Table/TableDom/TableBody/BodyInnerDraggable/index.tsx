import { memo } from 'react';

import BodyRowDraggable from './BodyRowDraggable';
import DragContext from './DragContext';
import styles from './index.module.less';
import propsAreEqual, { getInstanceProps } from './propsAreEqual';

import type { TableDataItem } from '../../../TableTypes/type';
import type { TableInstance } from '../../../TableTypes/typeHooks';

export type Props<T extends TableDataItem> = {
	instance: TableInstance<T>;
};

const TableBodyDraggable = <T extends TableDataItem>(props: Props<T>) => {
	const { datasource, getRowKey, VV_wrapperStyle, showRowIndexs, bodyGridTemplateColumns } = getInstanceProps(props);

	return (
		<DragContext instance={props.instance}>
			<div className={styles['body-inner']} style={{ gridTemplateColumns: bodyGridTemplateColumns, ...VV_wrapperStyle }}>
				{showRowIndexs.map(({ index: rowIndex }) => {
					const rowData = datasource[rowIndex];
					const rowKey = getRowKey(rowData, rowIndex);
					return <BodyRowDraggable key={rowKey} rowIndex={rowIndex} instance={props.instance} />;
				})}
			</div>
		</DragContext>
	);
};

export default memo(TableBodyDraggable, propsAreEqual) as typeof TableBodyDraggable;
