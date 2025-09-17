import styles from './index.module.less';
import HeadCellPlaceholder from '../HeadCellPlaceholder';
import HeadCell from '../HeadCell';
import type { TableInstance } from '../../../TableHooks/type';
import type { TableDataItem } from '../../../TableTypes/type';
import { memo } from 'react';
import propsAreEqual, { getInstanceProps, getProps } from './propsAreEqual';

export type Props<T extends TableDataItem> = {
	instance: TableInstance<T>;
	rowIndex: number;
};

const HeadRow = <T extends TableDataItem>(props: Props<T>) => {
	const { rowIndex } = getProps(props);
	const { columnsFlat } = getInstanceProps(props);

	return (
		<div className={styles['head-row']} data-row-index={rowIndex}>
			{columnsFlat.map((column, colIndex) => (
				<HeadCell key={column.key} rowIndex={rowIndex} colIndex={colIndex} instance={props.instance} />
			))}
			<HeadCellPlaceholder rowIndex={rowIndex} instance={props.instance} />
		</div>
	);
};

export default memo(HeadRow, propsAreEqual) as typeof HeadRow;
