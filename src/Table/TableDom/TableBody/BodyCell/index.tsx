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
	const rowKey = tableTools.getRowKey(rowData, rowIndex);
	const bodyCellBg = tableCellBg.getBodyCellBg({ rowKey, colKey: column.key });
	const { stickyStyle, stickyClassName } = tableSticky.getStickyStyleAndClassName({ colKey: column.key, type: 'body' });

	return (
		<div
			key={column.key}
			onClick={() => tableCellBg.bodyRowClick({ rowKey })}
			onMouseEnter={() => tableCellBg.bodyRowMouseEnter({ rowKey })}
			onMouseLeave={() => tableCellBg.bodyRowMouseLeave({ rowKey })}
			className={classNames(styles['body-cell'], stickyClassName, { [styles['bordered']]: bordered })}
			style={{
				backgroundColor: bodyCellBg,
				gridRow: `${rowIndex + 1}/${rowIndex + 2}`,
				gridColumn: `${colIndex + 1}/${colIndex + 2}`,
				...stickyStyle,
			}}
		>
			<BodyCellRender rowIndex={rowIndex} colIndex={colIndex} />
		</div>
	);
};

export default BodyCell;
