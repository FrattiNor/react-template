import styles from './index.module.less';
import BodyCell from '../BodyCell';
import BodyCellPlaceholder from '../BodyCellPlaceholder';
import BodyRowMeasure from '../BodyRowMeasure';
import { getInstanceProps, getProps } from './propsAreEqual';

import type { TableDataItem } from '../../../TableTypes/type';
import type { TableInstance } from '../../../TableTypes/typeHooks';

export type Props<T extends TableDataItem> = {
	instance: TableInstance<T>;
	rowIndex: number;
};

const BodyRow = <T extends TableDataItem>(props: Props<T>) => {
	const { rowIndex } = getProps(props);
	const { getRowKey, columnsFlat, data } = getInstanceProps(props);

	const rowData = data[rowIndex];
	const rowKey = getRowKey(rowData, rowIndex);

	return (
		<div key={rowKey} className={styles['body-row']} data-row-index={rowIndex}>
			{columnsFlat.map((column, colIndex) => {
				return <BodyCell key={column.key} rowIndex={rowIndex} colIndex={colIndex} instance={props.instance} />;
			})}
			<BodyCellPlaceholder rowIndex={rowIndex} instance={props.instance} />
			<BodyRowMeasure rowIndex={rowIndex} instance={props.instance} />
		</div>
	);
};

export default BodyRow;
// export default memo(BodyRow, propsAreEqual) as typeof BodyRow;
