import { memo } from 'react';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import styles from './index.module.less';
import propsAreEqual, { getInstanceProps, getProps } from './propsAreEqual';
import BodyCell from '../../BodyGeneralComponent/BodyCell';
import BodyCellPlaceholder from '../../BodyGeneralComponent/BodyCellPlaceholder';

import type { TableDataItem, TableInstance } from '../../../../TableTypes/type';

export type Props<T extends TableDataItem> = {
	instance: TableInstance<T>;
	rowIndex: number;
};

const BodyRowDraggable = <T extends TableDataItem>(props: Props<T>) => {
	const { rowIndex } = getProps(props);
	const { colMaxIndex, getRowKey, columnsFlat, datasource, VV_measureElement } = getInstanceProps(props);

	const rowData = datasource[rowIndex];
	const rowKey = getRowKey(rowData, rowIndex);
	const { attributes, setNodeRef, transform, transition, isDragging } = useSortable({ id: rowKey, data: { rowIndex } });

	const _style: React.CSSProperties = {
		transition,
		opacity: isDragging ? 0 : 1,
		transform: CSS.Translate.toString(transform ? { ...transform, x: 0 } : null),
	};

	return (
		<div
			{...attributes}
			data-index={rowIndex}
			data-row-index={rowIndex}
			className={styles['body-row']}
			style={{ gridRow: `${rowIndex + 1}/${rowIndex + 2}`, gridColumn: `1/${colMaxIndex + 3}`, ..._style }}
			ref={(node) => {
				setNodeRef(node);
				VV_measureElement(node);
			}}
		>
			{columnsFlat.map((column, colIndex) => {
				return <BodyCell key={column.key} rowIndex={rowIndex} colIndex={colIndex} instance={props.instance} />;
			})}
			<BodyCellPlaceholder rowIndex={rowIndex} instance={props.instance} />
		</div>
	);
};

export default memo(BodyRowDraggable, propsAreEqual) as typeof BodyRowDraggable;
