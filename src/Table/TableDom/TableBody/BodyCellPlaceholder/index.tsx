import styles from './index.module.less';
import type { TableInstance } from '../../../TableTypes/typeHooks';
import type { TableDataItem } from '../../../TableTypes/type';
import { memo } from 'react';
import propsAreEqual, { getInstanceProps, getProps } from './propsAreEqual';

export type Props<T extends TableDataItem> = {
	instance: TableInstance<T>;
	rowIndex: number;
};

const BodyCellPlaceholder = <T extends TableDataItem>(props: Props<T>) => {
	const { rowIndex } = getProps(props);
	const { data, columnsFlat, getRowKey, getBodyCellBg, bodyRowClick, bodyRowMouseEnter, bodyRowMouseLeave } = getInstanceProps(props);

	const rowData = data[rowIndex];
	const colMaxIndex = columnsFlat.length - 1;
	const rowKey = getRowKey(rowData, rowIndex);
	const bodyCellBg = getBodyCellBg({ rowKeys: [rowKey], colIndexs: [-1] });

	return (
		<div
			onClick={() => bodyRowClick({ rowKeys: [rowKey] })}
			onMouseEnter={() => bodyRowMouseEnter({ rowKeys: [rowKey] })}
			onMouseLeave={() => bodyRowMouseLeave({ rowKeys: [rowKey] })}
			className={styles['body-cell-placeholder']}
			style={{
				backgroundColor: bodyCellBg,
				gridRow: `${rowIndex + 1}/${rowIndex + 2}`,
				gridColumn: `${colMaxIndex + 2}/${colMaxIndex + 3}`,
			}}
		/>
	);
};

export default memo(BodyCellPlaceholder, propsAreEqual) as typeof BodyCellPlaceholder;
