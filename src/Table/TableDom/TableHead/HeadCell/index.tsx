import { memo, useMemo } from 'react';

import classNames from 'classnames';

import styles from './index.module.less';
import HeadCellRender from '../HeadCellRender';
import ResizeHandle from '../ResizeHandle';
import propsAreEqual, { getInstanceProps, getProps } from './propsAreEqual';

import type { TableDataItem } from '../../../TableTypes/type';
import type { TableInstance } from '../../../TableTypes/typeHooks';

export type Props<T extends TableDataItem> = {
	instance: TableInstance<T>;
	rowIndex: number;
	colIndex: number;
};

const HeadCell = <T extends TableDataItem>(props: Props<T>) => {
	const { colIndex, rowIndex } = getProps(props);
	const { getHeadCellBg, getColShow, getStickyStyleAndClassName, columnsFlat, bordered, rowHeight } = getInstanceProps(props);

	const column = columnsFlat[colIndex];
	const colShow = getColShow([colIndex]);
	const forceRender = column.forceRender;
	const colIndexs = useMemo(() => [colIndex] as [number], [colIndex]);
	const { stickyStyle, stickyClassName, sticky } = getStickyStyleAndClassName({ colIndexs: [colIndex], type: 'head' });
	if (!(colShow === true || forceRender === true || sticky === true)) return null;

	const colMaxIndex = columnsFlat.length - 1;
	const headCellBg = getHeadCellBg({ colIndexs: [colIndex] });

	return (
		<div
			key={column.key}
			data-col-index={colIndex}
			className={classNames(styles['head-cell'], stickyClassName, {
				[styles['bordered']]: bordered,
				[styles['first-col']]: colIndex === 0,
				[styles['last-col']]: colIndex === colMaxIndex,
			})}
			style={{
				minHeight: rowHeight,
				backgroundColor: headCellBg,
				gridRow: `${column.level + 1}/${rowIndex + 2}`,
				gridColumn: `${colIndex + 1}/${colIndex + 2}`,
				...stickyStyle,
			}}
		>
			<HeadCellRender column={column} tableRef={props.instance.tableDomRef.tableRef} />
			<ResizeHandle colKey={column.key} colIndexs={colIndexs} instance={props.instance} />
		</div>
	);
};

// export default HeadCell;
export default memo(HeadCell, propsAreEqual) as typeof HeadCell;
