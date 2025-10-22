import { memo } from 'react';

import BodyRowMeasure from './BodyRowMeasure';
import styles from './index.module.less';
import propsAreEqual, { getInstanceProps, getProps } from './propsAreEqual';
import BodyCell from '../../BodyGeneralComponent/BodyCell';
import BodyCellPlaceholder from '../../BodyGeneralComponent/BodyCellPlaceholder';

import type { TableDataItem, TableInstance } from '../../../../TableTypes/type';

export type Props<T extends TableDataItem> = {
	instance: TableInstance<T>;
	rowIndex: number;
};

const BodyRow = <T extends TableDataItem>(props: Props<T>) => {
	const { rowIndex } = getProps(props);
	const { columnsFlat, colMaxIndex, rowHeight, VV_measureElement } = getInstanceProps(props);

	return (
		<div data-row-index={rowIndex} className={styles['body-row']}>
			{columnsFlat.map((column, colIndex) => {
				return <BodyCell key={column.key} rowIndex={rowIndex} colIndex={colIndex} instance={props.instance} />;
			})}
			<BodyCellPlaceholder rowIndex={rowIndex} instance={props.instance} />
			<BodyRowMeasure rowIndex={rowIndex} VV_measureElement={VV_measureElement} rowHeight={rowHeight} colMaxIndex={colMaxIndex} />
		</div>
	);
};

export default memo(BodyRow, propsAreEqual) as typeof BodyRow;
