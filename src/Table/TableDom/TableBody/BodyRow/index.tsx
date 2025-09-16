import styles from './index.module.less';
import BodyCell from '../BodyCell';
import BodyCellPlaceholder from '../BodyCellPlaceholder';
import BodyRowMeasure from '../BodyRowMeasure';
import type { TableInstance } from '../../../TableHooks/type';
import type { TableDataItem } from '../../../TableTypes/type';

type Props<T extends TableDataItem> = {
	instance: TableInstance<T>;
	rowIndex: number;
};

const BodyRow = <T extends TableDataItem>({ instance, rowIndex }: Props<T>) => {
	const { getRowKey } = instance.tableTools;
	const { columnsFlat, data } = instance.tableProps;
	const rowData = data[rowIndex];
	const rowKey = getRowKey(rowData, rowIndex);

	return (
		<div key={rowKey} className={styles['body-row']} data-row-index={rowIndex}>
			{columnsFlat.map((column, colIndex) => {
				return <BodyCell key={column.key} rowIndex={rowIndex} colIndex={colIndex} instance={instance} />;
			})}
			<BodyCellPlaceholder rowIndex={rowIndex} instance={instance} />
			<BodyRowMeasure rowIndex={rowIndex} instance={instance} />
		</div>
	);
};

export default BodyRow;
