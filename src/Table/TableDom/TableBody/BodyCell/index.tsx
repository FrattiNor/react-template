import type { FC } from 'react';
import { useTableContext } from '../../../TableContext';
import styles from './index.module.less';
import classNames from 'classnames';
import BodyCellRender from './CellRender';

type Props = {
	rowIndex: number;
	colIndex: number;
};

const BodyCell: FC<Props> = ({ rowIndex, colIndex }) => {
	const { tableProps, tableTools, tableCellBg, tableSticky } = useTableContext();
	const { columns, data, bordered } = tableProps;
	const rowData = data[rowIndex];
	const column = columns[colIndex];
	const { rowSpan = 1, colSpan = 1 } = column.onCell ? column.onCell(rowData, rowIndex) : {};

	if (rowSpan <= 0) return null;
	if (colSpan <= 0) return null;

	const rowKeys = tableTools.getRowKeys({ currentIndex: rowIndex, rowSpan, datasource: data });
	const bodyCellBg = tableCellBg.getBodyCellBg({ rowKeys, colKey: column.key });
	const { stickyStyle, stickyClassName } = tableSticky.getStickyStyleAndClassName({ colKey: column.key, type: 'body' });

	return (
		<div
			key={column.key}
			onClick={() => tableCellBg.bodyRowClick({ rowKeys })}
			onMouseEnter={() => tableCellBg.bodyRowMouseEnter({ rowKeys })}
			onMouseLeave={() => tableCellBg.bodyRowMouseLeave({ rowKeys })}
			className={classNames(styles['body-cell'], stickyClassName, { [styles['bordered']]: bordered })}
			style={{
				backgroundColor: bodyCellBg,
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
