import styles from './index.module.less';

import classNames from 'classnames';
import HeadCellRender from '../HeadCellRender';
import ResizeHandle from '../ResizeHandle';
import type { TableInstance } from '../../../TableHooks/type';
import type { TableDataItem } from '../../../TableTypes/type';
import { memo, useMemo } from 'react';
import propsAreEqual from './propsAreEqual';

export type Props<T extends TableDataItem> = {
	instance: TableInstance<T>;
	rowIndex: number;
	colIndex: number;
};

const HeadGroupCell = <T extends TableDataItem>({ instance, rowIndex, colIndex }: Props<T>) => {
	const { getColShow } = instance.tableVirtual;
	const { getHeadCellBg } = instance.tableCellBg;
	const { getStickyStyleAndClassName } = instance.tableSticky;
	const { columnsFlat, columnGroups, bordered, rowHeight } = instance.tableProps;

	const column = columnGroups[rowIndex][colIndex];
	const colIndexs = useMemo(() => [column.startIndex, column.endIndex] as [number, number], [column.startIndex, column.endIndex]);
	const { stickyStyle, stickyClassName, sticky } = getStickyStyleAndClassName({ colIndexs, type: 'head' });
	const colShow = getColShow(colIndexs);
	if (!(colShow === true || sticky === true)) return null;

	const colMaxIndex = columnsFlat.length - 1;
	const headCellBg = getHeadCellBg({ colKey: column.key });

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
				minHeight: rowHeight,
				backgroundColor: headCellBg,
				gridRow: `${rowIndex + 1}/${rowIndex + 2}`,
				gridColumn: `${column.startIndex + 1}/${column.endIndex + 2}`,
				...stickyStyle,
			}}
		>
			<HeadCellRender content={column.title} align="center" />
			<ResizeHandle colKey={column.key} colIndexs={colIndexs} instance={instance} />
		</div>
	);
};

export default memo(HeadGroupCell, propsAreEqual) as typeof HeadGroupCell;
