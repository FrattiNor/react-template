import { memo, useMemo } from 'react';

import classNames from 'classnames';

import styles from './index.module.less';
import BodyCellRender from '../BodyCellRender';
import propsAreEqual, { getInstanceProps, getProps } from './propsAreEqual';

import type { TableDataItem } from '../../../TableTypes/type';
import type { TableInstance } from '../../../TableTypes/typeHooks';

export type Props<T extends TableDataItem> = {
	instance: TableInstance<T>;
	rowIndex: number;
	colIndex: number;
};

const BodyCell = <T extends TableDataItem>(props: Props<T>) => {
	const { colIndex, rowIndex } = getProps(props);

	const {
		datasource,
		bordered,
		rowHeight,
		columnsFlat,
		getRowKeys,
		getColShow,
		getBodyCellBg,
		bodyRowClick,
		bodyRowMouseEnter,
		bodyRowMouseLeave,
		getStickyStyleAndClassName,
	} = getInstanceProps(props);

	const rowData = datasource[rowIndex];
	const column = columnsFlat[colIndex];
	const { rowSpan = 1, colSpan = 1, title: onCellTitle = undefined } = column.onCell ? column.onCell(rowData, rowIndex) : {};
	const colIndexs = useMemo(() => [colIndex, colIndex + colSpan - 1] as [number, number], [colIndex, colSpan]);

	if (rowSpan <= 0) return null;
	if (colSpan <= 0) return null;

	const colShow = getColShow(colIndexs);
	const forceRender = column.forceRender;
	const { stickyStyle, stickyClassName, sticky } = getStickyStyleAndClassName({ colIndexs, type: 'body' });
	if (!(colShow === true || forceRender === true || sticky === true)) return null;

	const colMaxIndex = columnsFlat.length - 1;
	const rowKeys = getRowKeys({ currentIndex: rowIndex, rowSpan, datasource });
	const bodyCellBg = getBodyCellBg({ rowKeys, colIndexs });

	return (
		<div
			key={column.key}
			data-col-index={colIndex}
			onClick={() => bodyRowClick({ rowKeys })}
			onMouseEnter={() => bodyRowMouseEnter({ rowKeys })}
			onMouseLeave={() => bodyRowMouseLeave({ rowKeys })}
			className={classNames(styles['body-cell'], stickyClassName, {
				[styles['bordered']]: bordered,
				[styles['first-col']]: colIndex === 0,
				[styles['last-col']]: colIndex === colMaxIndex,
			})}
			style={{
				minHeight: rowHeight,
				backgroundColor: bodyCellBg,
				gridRow: `${rowIndex + 1}/${rowIndex + 1 + rowSpan}`,
				gridColumn: `${colIndex + 1}/${colIndex + 1 + colSpan}`,
				...stickyStyle,
			}}
		>
			<BodyCellRender rowIndex={rowIndex} colIndex={colIndex} onCellTitle={onCellTitle} instance={props.instance} align={column.align} />
		</div>
	);
};

// export default BodyCell;
export default memo(BodyCell, propsAreEqual) as typeof BodyCell;
