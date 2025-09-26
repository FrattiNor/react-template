import { memo } from 'react';

import styles from './index.module.less';
import propsAreEqual, { getInstanceProps, getProps } from './propsAreEqual';

import type { TableDataItem } from '../../../../TableTypes/type';
import type { TableInstance } from '../../../../TableTypes/typeHooks';

export type Props<T extends TableDataItem> = {
	instance: TableInstance<T>;
	rowIndex: number;
	forceRender?: boolean; // 提供给overlay强制渲染
	defaultBgLevel?: number; // 提供给overlay, 增加bgColor等级
};

const BodyCellPlaceholder = <T extends TableDataItem>(props: Props<T>) => {
	const { rowIndex, forceRender, defaultBgLevel } = getProps(props);
	const { datasource, columnsFlat, getRowKey, getRowShow, getBodyCellBg, bodyRowClick, bodyRowMouseEnter, bodyRowMouseLeave } =
		getInstanceProps(props);

	if (forceRender !== true && getRowShow([rowIndex]) === false) return null;

	const rowData = datasource[rowIndex];
	const colMaxIndex = columnsFlat.length - 1;
	const rowKey = getRowKey(rowData, rowIndex);
	const bodyCellBg = getBodyCellBg({ rowKeys: [rowKey], colIndexs: [-1], defaultBgLevel });

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
