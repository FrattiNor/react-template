import { memo } from 'react';

import styles from './index.module.less';
import HeadCell from '../HeadCell';
import HeadCellPlaceholder from '../HeadCellPlaceholder';
import propsAreEqual, { getInstanceProps, getProps } from './propsAreEqual';
import HeaderHeightRetainer from '../HeaderHeightRetainer';

import type { TableDataItem, TableInstance } from '../../../TableTypes/type';

export type Props<T extends TableDataItem> = {
	instance: TableInstance<T>;
	rowIndex: number;
};

const HeadRow = <T extends TableDataItem>(props: Props<T>) => {
	const { rowIndex } = getProps(props);
	const { columnsFlat } = getInstanceProps(props);

	return (
		<div data-row-index={rowIndex} className={styles['head-row']}>
			{columnsFlat.map((column, colIndex) => (
				<HeadCell key={column.key} rowIndex={rowIndex} colIndex={colIndex} instance={props.instance} />
			))}
			<HeadCellPlaceholder rowIndex={rowIndex} instance={props.instance} />
			<HeaderHeightRetainer rowIndex={rowIndex} instance={props.instance} />
		</div>
	);
};

export default memo(HeadRow, propsAreEqual) as typeof HeadRow;
