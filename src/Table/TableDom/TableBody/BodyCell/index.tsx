import type { FC } from 'react';
import { useTableContext } from '../../../TableContext';
import styles from './index.module.less';
import classNames from 'classnames';
import BodyCellRender from '../BodyCellRender';

type Props = {
	rowIndex: number;
	colIndex: number;
};

const BodyCell: FC<Props> = ({ rowIndex, colIndex }) => {
	const { tableProps, tableTools, tableCellBg, tableSticky, tableVirtual } = useTableContext();
	const { columnsFlat, data, bordered } = tableProps;
	const rowData = data[rowIndex];
	const column = columnsFlat[colIndex];
	const { rowSpan = 1, colSpan = 1 } = column.onCell ? column.onCell(rowData, rowIndex) : {};

	if (rowSpan <= 0) return null;
	if (colSpan <= 0) return null;

	const forceRender = column.forceRender;
	const { stickyStyle, stickyClassName, sticky } = tableSticky.getStickyStyleAndClassName({ colIndexs: [colIndex, colIndex + colSpan - 1], type: 'body' });
	const colShow = tableVirtual.getColShow([colIndex, colIndex + colSpan - 1]);
	if (!(colShow === true || forceRender === true || sticky === true)) return null;

	const colMaxIndex = columnsFlat.length - 1;
	const rowKeys = tableTools.getRowKeys({ currentIndex: rowIndex, rowSpan, datasource: data });
	const bodyCellBg = tableCellBg.getBodyCellBg({ rowKeys, colKey: column.key });

	return (
		<div
			key={column.key}
			data-col-index={colIndex}
			onClick={() => tableCellBg.bodyRowClick({ rowKeys })}
			onMouseEnter={() => tableCellBg.bodyRowMouseEnter({ rowKeys })}
			onMouseLeave={() => tableCellBg.bodyRowMouseLeave({ rowKeys })}
			className={classNames(styles['body-cell'], stickyClassName, { [styles['bordered']]: bordered, [styles['first-col']]: colIndex === 0, [styles['last-col']]: colIndex === colMaxIndex })}
			style={{
				backgroundColor: bodyCellBg,
				minHeight: tableProps.rowHeight,
				gridRow: `${rowIndex + 1}/${rowIndex + 1 + rowSpan}`,
				gridColumn: `${colIndex + 1}/${colIndex + 1 + colSpan}`,
				...stickyStyle,
			}}
		>
			<BodyCellRender rowIndex={rowIndex} colIndex={colIndex} />
		</div>
	);
};

export default BodyCell;
