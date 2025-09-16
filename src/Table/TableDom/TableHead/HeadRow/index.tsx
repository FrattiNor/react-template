import styles from './index.module.less';
import HeadCellPlaceholder from '../HeadCellPlaceholder';
import HeadCell from '../HeadCell';
import type { TableInstance } from '../../../TableHooks/type';
import type { TableDataItem } from '../../../TableTypes/type';
import { memo } from 'react';

type Props<T extends TableDataItem> = {
	instance: TableInstance<T>;
	rowIndex: number;
};

const HeadRow = <T extends TableDataItem>({ instance, rowIndex }: Props<T>) => {
	const { columnsFlat } = instance.tableProps;

	return (
		<div className={styles['head-row']} data-row-index={rowIndex}>
			{columnsFlat.map((column, colIndex) => (
				<HeadCell key={column.key} rowIndex={rowIndex} colIndex={colIndex} instance={instance} />
			))}
			<HeadCellPlaceholder rowIndex={rowIndex} instance={instance} />
		</div>
	);
};

export default memo(HeadRow) as typeof HeadRow;
