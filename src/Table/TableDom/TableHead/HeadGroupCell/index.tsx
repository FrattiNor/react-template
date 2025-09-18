import { useMemo } from 'react';

import classNames from 'classnames';

import styles from './index.module.less';
import HeadCellRender from '../HeadCellRender';
import ResizeHandle from '../ResizeHandle';
import { getInstanceProps, getProps } from './propsAreEqual';

import type { TableDataItem } from '../../../TableTypes/type';
import type { TableInstance } from '../../../TableTypes/typeHooks';

export type Props<T extends TableDataItem> = {
	instance: TableInstance<T>;
	rowIndex: number;
	colIndex: number;
};

const HeadGroupCell = <T extends TableDataItem>(props: Props<T>) => {
	const { colIndex, rowIndex } = getProps(props);
	const { getHeadCellBg, getColShow, getStickyStyleAndClassName, columnsFlat, bordered, rowHeight, columnGroups } = getInstanceProps(props);

	const column = columnGroups[rowIndex][colIndex];
	const colIndexs = useMemo(() => [column.startIndex, column.endIndex] as [number, number], [column.startIndex, column.endIndex]);
	const { stickyStyle, stickyClassName, sticky } = getStickyStyleAndClassName({ colIndexs, type: 'head' });
	const colShow = getColShow(colIndexs);
	if (!(colShow === true || sticky === true)) return null;

	const colMaxIndex = columnsFlat.length - 1;
	const headCellBg = getHeadCellBg({ colIndexs });

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
			<HeadCellRender column={column} align="center" tableRef={props.instance.tableDomRef.tableRef} />
			<ResizeHandle colKey={column.key} colIndexs={colIndexs} instance={props.instance} />
		</div>
	);
};

export default HeadGroupCell;
// export default memo(HeadGroupCell, propsAreEqual) as typeof HeadGroupCell;
