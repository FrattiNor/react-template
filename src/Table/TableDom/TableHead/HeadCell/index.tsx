import styles from './index.module.less';
import ResizeHandle from '../ResizeHandle';
import classNames from 'classnames';
import HeadCellRender from '../HeadCellRender';
import type { TableInstance } from '../../../TableHooks/type';
import type { TableDataItem } from '../../../TableTypes/type';
import { memo, useMemo } from 'react';
import propsAreEqual from './propsAreEqual';

export type Props<T extends TableDataItem> = {
	instance: TableInstance<T>;
	rowIndex: number;
	colIndex: number;
};

const HeadCell = <T extends TableDataItem>({ instance, rowIndex, colIndex }: Props<T>) => {
	const { getColShow } = instance.tableVirtual;
	const { getHeadCellBg } = instance.tableCellBg;
	const { getStickyStyleAndClassName } = instance.tableSticky;
	const { columnsFlat, bordered, rowHeight } = instance.tableProps;

	const column = columnsFlat[colIndex];
	const colShow = getColShow([colIndex]);
	const forceRender = column.forceRender;
	const colIndexs = useMemo(() => [colIndex] as [number], [colIndex]);
	const { stickyStyle, stickyClassName, sticky } = getStickyStyleAndClassName({ colIndexs: [colIndex], type: 'head' });
	if (!(colShow === true || forceRender === true || sticky === true)) return null;

	const colMaxIndex = columnsFlat.length - 1;
	const headCellBg = getHeadCellBg({ colKey: column.key });

	return (
		<div
			key={column.key}
			data-col-index={colIndex}
			className={classNames(styles['head-cell'], stickyClassName, { [styles['bordered']]: bordered, [styles['first-col']]: colIndex === 0, [styles['last-col']]: colIndex === colMaxIndex })}
			style={{
				minHeight: rowHeight,
				backgroundColor: headCellBg,
				gridRow: `${column.level + 1}/${rowIndex + 2}`,
				gridColumn: `${colIndex + 1}/${colIndex + 2}`,
				...stickyStyle,
			}}
		>
			<HeadCellRender content={column.title} />
			<ResizeHandle colKey={column.key} colIndexs={colIndexs} instance={instance} />
		</div>
	);
};

export default memo(HeadCell, propsAreEqual) as typeof HeadCell;
