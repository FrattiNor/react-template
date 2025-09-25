import { memo } from 'react';

import styles from './index.module.less';
import BodyCell from '../BodyCell';
import BodyCellPlaceholder from '../BodyCellPlaceholder';
import BodyRowMeasure from '../BodyRowMeasure';
import propsAreEqual, { getInstanceProps, getProps } from './propsAreEqual';
import BodyRowDragTarget from '../BodyRowDragTarget';

import type { TableDataItem } from '../../../TableTypes/type';
import type { TableInstance } from '../../../TableTypes/typeHooks';

export type Props<T extends TableDataItem> = {
	instance: TableInstance<T>;
	rowIndex: number;
};

const BodyRow = <T extends TableDataItem>(props: Props<T>) => {
	const { rowIndex } = getProps(props);
	const { getRowKey, columnsFlat, datasource, rowHeight, VV_measureElement, haveDraggable } = getInstanceProps(props);

	const rowData = datasource[rowIndex];
	const rowKey = getRowKey(rowData, rowIndex);
	const colMaxIndex = columnsFlat.length - 1;

	return (
		<div data-row-index={rowIndex} className={styles['body-row']}>
			{columnsFlat.map((column, colIndex) => {
				return <BodyCell key={column.key} rowIndex={rowIndex} colIndex={colIndex} instance={props.instance} />;
			})}
			<BodyCellPlaceholder rowIndex={rowIndex} instance={props.instance} />
			<BodyRowMeasure rowIndex={rowIndex} VV_measureElement={VV_measureElement} rowHeight={rowHeight} colMaxIndex={colMaxIndex} />
			{haveDraggable && (
				<BodyRowDragTarget rowKey={rowKey} rowIndex={rowIndex} rowData={rowData} rowHeight={rowHeight} colMaxIndex={colMaxIndex} />
			)}
		</div>
	);
};

// export default BodyRow;
export default memo(BodyRow, propsAreEqual) as typeof BodyRow;
