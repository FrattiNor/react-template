import styles from './index.module.less';
import classNames from 'classnames';
import BodyCellRender from '../BodyCellRender';
import type { TableInstance } from '../../../TableHooks/type';
import type { TableDataItem } from '../../../TableTypes/type';
import { memo } from 'react';

type Props<T extends TableDataItem> = {
	instance: TableInstance<T>;
	rowIndex: number;
	colIndex: number;
};

const BodyCell = <T extends TableDataItem>({ instance, colIndex, rowIndex }: Props<T>) => {
	const { getRowKeys } = instance.tableTools;
	const { getColShow } = instance.tableVirtual;
	const { getStickyStyleAndClassName } = instance.tableSticky;
	const { columnsFlat, data, bordered, rowHeight } = instance.tableProps;
	const { getBodyCellBg, bodyRowClick, bodyRowMouseEnter, bodyRowMouseLeave } = instance.tableCellBg;

	const rowData = data[rowIndex];
	const column = columnsFlat[colIndex];
	const { rowSpan = 1, colSpan = 1 } = column.onCell ? column.onCell(rowData, rowIndex) : {};

	if (rowSpan <= 0) return null;
	if (colSpan <= 0) return null;

	const forceRender = column.forceRender;
	const { stickyStyle, stickyClassName, sticky } = getStickyStyleAndClassName({ colIndexs: [colIndex, colIndex + colSpan - 1], type: 'body' });
	const colShow = getColShow([colIndex, colIndex + colSpan - 1]);
	if (!(colShow === true || forceRender === true || sticky === true)) return null;

	const colMaxIndex = columnsFlat.length - 1;
	const rowKeys = getRowKeys({ currentIndex: rowIndex, rowSpan, datasource: data });
	const bodyCellBg = getBodyCellBg({ rowKeys, colKey: column.key });

	return (
		<div
			key={column.key}
			data-col-index={colIndex}
			onClick={() => bodyRowClick({ rowKeys })}
			onMouseEnter={() => bodyRowMouseEnter({ rowKeys })}
			onMouseLeave={() => bodyRowMouseLeave({ rowKeys })}
			className={classNames(styles['body-cell'], stickyClassName, { [styles['bordered']]: bordered, [styles['first-col']]: colIndex === 0, [styles['last-col']]: colIndex === colMaxIndex })}
			style={{
				minHeight: rowHeight,
				backgroundColor: bodyCellBg,
				gridRow: `${rowIndex + 1}/${rowIndex + 1 + rowSpan}`,
				gridColumn: `${colIndex + 1}/${colIndex + 1 + colSpan}`,
				...stickyStyle,
			}}
		>
			<BodyCellRender rowIndex={rowIndex} colIndex={colIndex} instance={instance} />
		</div>
	);
};

export default memo(BodyCell) as typeof BodyCell;
