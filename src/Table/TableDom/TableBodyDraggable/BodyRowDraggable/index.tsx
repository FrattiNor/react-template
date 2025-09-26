import { memo } from 'react';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import styles from './index.module.less';
import propsAreEqual, { getInstanceProps, getProps } from './propsAreEqual';
import BodyCell from '../../TableBodyGeneral/BodyCell';
import BodyCellPlaceholder from '../../TableBodyGeneral/BodyCellPlaceholder';

import type { TableDataItem } from '../../../TableTypes/type';
import type { TableInstance } from '../../../TableTypes/typeHooks';

export type Props<T extends TableDataItem> = {
	instance: TableInstance<T>;
	rowIndex: number;
};

const BodyRowDraggable = <T extends TableDataItem>(props: Props<T>) => {
	const { rowIndex } = getProps(props);
	const { getRowKey, columnsFlat, datasource, VV_measureElement } = getInstanceProps(props);

	const rowData = datasource[rowIndex];
	const rowKey = getRowKey(rowData, rowIndex);
	const colMaxIndex = columnsFlat.length - 1;
	const { attributes, setNodeRef, transform, transition, isDragging } = useSortable({ id: rowKey, data: { rowKey, rowData, rowIndex } });

	const _style: React.CSSProperties = {
		transition,
		opacity: isDragging ? 0 : undefined,
		transform: CSS.Translate.toString(transform),
	};

	return (
		<div
			{...attributes}
			data-index={rowIndex}
			data-row-index={rowIndex}
			className={styles['body-row']}
			style={{ gridRow: `${rowIndex + 1}/${rowIndex + 2}`, gridColumn: `1/${colMaxIndex + 2}`, ..._style }}
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
