import type { FC } from 'react';
import styles from './index.module.less';
import { useTableContext } from '../../../TableContext';

import classNames from 'classnames';
import HeadCellRender from '../HeadCellRender';
import ResizeHandle from '../ResizeHandle';

type Props = {
	rowIndex: number;
	colIndex: number;
};

const HeadGroupCell: FC<Props> = ({ rowIndex, colIndex }) => {
	const { tableProps, tableCellBg, tableSticky, tableVirtual } = useTableContext();
	const { columnsFlat, columnGroups, bordered } = tableProps;
	const column = columnGroups[rowIndex][colIndex];

	const colIndexs = [column.startIndex, column.endIndex] as [number, number];
	const { stickyStyle, stickyClassName, sticky } = tableSticky.getStickyStyleAndClassName({ colIndexs, type: 'head' });
	const colShow = tableVirtual.getColShow(colIndexs);
	if (!(colShow === true || sticky === true)) return null;

	const colMaxIndex = columnsFlat.length - 1;
	const headCellBg = tableCellBg.getHeadCellBg({ colKey: column.key });

	return (
		<div
			key={column.key}
			data-col-index={`${column.startIndex}-${column.endIndex}`}
			className={classNames(styles['head-group-cell'], stickyClassName, {
				[styles['bordered']]: bordered,
				[styles['first-col']]: column.startIndex === 0,
				[styles['last-col']]: column.endIndex === colMaxIndex,
			})}
			style={{
				backgroundColor: headCellBg,
				minHeight: tableProps.rowHeight,
				gridRow: `${rowIndex + 1}/${rowIndex + 2}`,
				gridColumn: `${column.startIndex + 1}/${column.endIndex + 2}`,
				...stickyStyle,
			}}
		>
			<HeadCellRender content={column.title} align="center" />
			<ResizeHandle colKey={column.key} colIndexs={colIndexs} />
		</div>
	);
};

export default HeadGroupCell;
