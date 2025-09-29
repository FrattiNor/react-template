import { memo, useMemo } from 'react';

import classNames from 'classnames';

import styles from './index.module.less';
import BodyCellRender from '../BodyCellRender';
import propsAreEqual, { getInstanceProps, getProps } from './propsAreEqual';

import type { TableDataItem, TableInstance } from '../../../../TableTypes/type';

export type Props<T extends TableDataItem> = {
	instance: TableInstance<T>;
	rowIndex: number;
	colIndex: number;
	isOverlay?: boolean; // draggable overlay
};

const BodyCell = <T extends TableDataItem>(props: Props<T>) => {
	const { colIndex, rowIndex, isOverlay } = getProps(props);

	const {
		datasource,
		bordered,
		rowHeight,
		columnsFlat,
		getRowKeys,
		getRowShow,
		getColShow,
		getBodyCellBg,
		bodyRowClick,
		bodyRowMouseEnter,
		bodyRowMouseLeave,
		getStickyStyleAndClassName,
	} = getInstanceProps(props);

	const rowData = datasource[rowIndex];
	const column = columnsFlat[colIndex];
	const columnForceRender = column.forceRender;
	const forceRender = isOverlay || columnForceRender;
	const { rowSpan = 1, colSpan = 1, title: onCellTitle = undefined } = column.onCell ? column.onCell(rowData, rowIndex) : {};
	const colIndexs = useMemo(() => [colIndex, colIndex + colSpan - 1] as [number, number], [colIndex, colSpan]);

	// span为0
	if (rowSpan <= 0) return null;
	if (colSpan <= 0) return null;
	// 非forceRender，并且当前rowSpan为1，并且当前row不显示
	if (forceRender !== true && rowSpan === 1 && getRowShow([rowIndex]) !== true) return null;
	// 非forceRender，并且非sticky，并且当前col不显示
	const { stickyStyle, stickyClassName, sticky } = getStickyStyleAndClassName({ colIndexs, type: 'body' });
	if (forceRender !== true && sticky !== true && getColShow(colIndexs) !== true) return null;

	const rowKeys = getRowKeys({ currentIndex: rowIndex, rowSpan, datasource });
	const bodyCellBg = getBodyCellBg({ rowKeys, colIndexs, defaultBgLevel: isOverlay ? 1 : 0 });

	return (
		<div
			key={column.key}
			data-col-index={colIndex}
			onClick={() => bodyRowClick({ rowKeys })}
			onMouseEnter={() => bodyRowMouseEnter({ rowKeys })}
			onMouseLeave={() => bodyRowMouseLeave({ rowKeys })}
			className={classNames(styles['body-cell'], stickyClassName, {
				[styles['bordered']]: bordered,
				[styles['first-row']]: rowIndex === 0,
				[styles['first-col']]: colIndex === 0,
				[styles['is-overlay']]: isOverlay === true,
			})}
			style={{
				minHeight: rowHeight,
				backgroundColor: bodyCellBg,
				gridRow: `${rowIndex + 1}/${rowIndex + 1 + rowSpan}`,
				gridColumn: `${colIndex + 1}/${colIndex + 1 + colSpan}`,
				...stickyStyle,
			}}
		>
			<BodyCellRender rowIndex={rowIndex} colIndex={colIndex} align={column.align} onCellTitle={onCellTitle} instance={props.instance} />
		</div>
	);
};

export default memo(BodyCell, propsAreEqual) as typeof BodyCell;
