import { memo } from 'react';

import classNames from 'classnames';

import styles from './index.module.less';
import propsAreEqual, { getInstanceProps, getProps } from './propsAreEqual';

import type { TableDataItem, TableInstance } from '../../../../TableTypes/type';

export type Props<T extends TableDataItem> = {
	instance: TableInstance<T>;
	rowIndex: number;
	isOverlay?: boolean; // draggable overlay
};

const BodyCellPlaceholder = <T extends TableDataItem>(props: Props<T>) => {
	const { rowIndex, isOverlay } = getProps(props);
	const { colMaxIndex, bordered, datasource, getRowKey, getRowShow, getBodyCellBg, bodyRowClick, bodyRowMouseEnter, bodyRowMouseLeave } =
		getInstanceProps(props);

	const forceRender = isOverlay;
	if (forceRender !== true && getRowShow([rowIndex]) === false) return null;

	const rowData = datasource[rowIndex];
	const rowKey = getRowKey(rowData, rowIndex);
	const bodyCellBg = getBodyCellBg({ rowKeys: [rowKey], colIndexs: [-1], defaultBgLevel: isOverlay ? 1 : 0 });

	return (
		<div
			onClick={() => bodyRowClick({ rowKeys: [rowKey] })}
			onMouseEnter={() => bodyRowMouseEnter({ rowKeys: [rowKey] })}
			onMouseLeave={() => bodyRowMouseLeave({ rowKeys: [rowKey] })}
			className={classNames(styles['body-cell-placeholder'], {
				[styles['bordered']]: bordered,
				[styles['first-row']]: rowIndex === 0,
				[styles['is-overlay']]: isOverlay === true,
			})}
			style={{
				backgroundColor: bodyCellBg,
				gridRow: `${rowIndex + 1}/${rowIndex + 2}`,
				gridColumn: `${colMaxIndex + 2}/${colMaxIndex + 3}`,
			}}
		/>
	);
};

export default memo(BodyCellPlaceholder, propsAreEqual) as typeof BodyCellPlaceholder;
