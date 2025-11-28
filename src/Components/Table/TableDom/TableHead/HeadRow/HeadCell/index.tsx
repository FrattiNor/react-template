import { memo, useMemo } from 'react';

import classNames from 'classnames';

import styles from './index.module.less';
import ResizeHandle from './ResizeHandle';
import { getCellTitle, getColKeys, isStrNum } from '../../../../TableUtils';

import type { TableColumn, TableColumnGroup } from '../../../../TableTypes/typeColumn';
import type { TableInstance } from '../../../../useTableInstance';

type Props<T> = Required<
	Pick<TableInstance<T>, 'splitColumnsArr' | 'bordered' | 'rowHeight' | 'getHeadStickyStyle' | 'startResize' | 'resizeFlag' | 'getHeadCellBg'>
> & {
	rowIndexStart: number;
	rowIndexEnd: number;
	colIndexStart: number;
	colIndexEnd: number;
	column: TableColumn<T> | TableColumnGroup<T>;
};

const HeadCell = <T,>(props: Props<T>) => {
	const {
		column,
		splitColumnsArr,
		bordered,
		rowIndexStart,
		rowIndexEnd,
		colIndexStart,
		colIndexEnd,
		rowHeight,
		getHeadStickyStyle,
		getHeadCellBg,
	} = props;

	const colKeys = useMemo(() => getColKeys(splitColumnsArr, colIndexStart, colIndexEnd), [splitColumnsArr, colIndexStart, colIndexEnd]);

	const renderDom = column.title;
	const resize = column.resize ?? true;
	const title = getCellTitle(renderDom);
	const canEllipsis = isStrNum(renderDom);
	const backgroundColor = getHeadCellBg({ colKeys });
	const { stickyStyle, rightLastPinged, leftFirstPinged, leftLastPinged } = getHeadStickyStyle({ colKeys });

	return (
		<div
			title={title}
			className={classNames(styles['head-cell'], {
				[styles['left-last-pinged']]: leftLastPinged,
				[styles['right-last-pinged']]: rightLastPinged,
			})}
			style={{
				...stickyStyle,
				backgroundColor,
				minHeight: (rowIndexEnd - rowIndexStart + 1) * rowHeight,
				gridRow: `${rowIndexStart + 1}/${rowIndexEnd + 2}`,
				gridColumn: `${colIndexStart + 1}/${colIndexEnd + 2}`,
			}}
		>
			<div
				style={{ justifyContent: column.align === 'center' ? 'center' : column.align === 'right' ? 'flex-end' : 'flex-start' }}
				className={classNames(styles['head-cell-inner'], {
					[styles['bordered']]: bordered,
					[styles['first-col']]: colIndexStart === 0,
					[styles['not-first-col-and-left-first-pinged']]: colIndexStart !== 0 && leftFirstPinged,
					[styles['not-first-col-and-right-last-pinged']]: colIndexStart !== 0 && rightLastPinged,
				})}
			>
				{!canEllipsis ? renderDom : <div className={styles['ellipsis-wrapper']}>{renderDom}</div>}
			</div>
			{resize === true && (
				<ResizeHandle
					columnKey={column.key}
					colIndexEnd={colIndexEnd}
					colIndexStart={colIndexStart}
					resizeFlag={props.resizeFlag}
					startResize={props.startResize}
				/>
			)}
		</div>
	);
};

export default memo(HeadCell) as typeof HeadCell;
