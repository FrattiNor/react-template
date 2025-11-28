import { memo, useMemo } from 'react';

import classNames from 'classnames';

import styles from './index.module.less';
import { getCellTitle, getColKeys, getRowKeys, isStrNum } from '../../../../../TableUtils';

import type { TableColumn } from '../../../../../TableTypes/typeColumn';
import type { TableInstance } from '../../../../../useTableInstance';

type Props<T> = Required<
	Pick<
		TableInstance<T>,
		| 'splitColumnsArr'
		| 'bordered'
		| 'rowHeight'
		| 'getBodyStickyStyle'
		| 'getBodyCellBg'
		| 'rowKey'
		| 'data'
		| 'bodyRowClick'
		| 'bodyRowMouseEnter'
		| 'bodyRowMouseLeave'
	>
> & {
	dataItem: T;
	colIndexStart: number;
	colIndexEnd: number;
	rowIndexStart: number;
	rowIndexEnd: number;
	leafColumn: TableColumn<T>;
};

const BodyCell = <T,>(props: Props<T>) => {
	const {
		data,
		rowKey,
		leafColumn,
		splitColumnsArr,
		bordered,
		dataItem,
		colIndexStart,
		colIndexEnd,
		rowIndexStart,
		rowIndexEnd,
		rowHeight,
		getBodyStickyStyle,
		getBodyCellBg,
		bodyRowClick,
		bodyRowMouseEnter,
		bodyRowMouseLeave,
	} = props;

	const rowKeys = useMemo(() => getRowKeys(rowKey, data, rowIndexStart, rowIndexEnd), [rowKey, data, rowIndexStart, rowIndexEnd]);
	const colKeys = useMemo(() => getColKeys(splitColumnsArr, colIndexStart, colIndexEnd), [splitColumnsArr, colIndexStart, colIndexEnd]);

	const renderDom = leafColumn.render(dataItem, { index: rowIndexStart });
	const title = getCellTitle(renderDom);
	const canEllipsis = isStrNum(renderDom);
	const backgroundColor = getBodyCellBg({ rowKeys, colKeys });
	const { stickyStyle, rightLastPinged, leftFirstPinged, leftLastPinged } = getBodyStickyStyle({ colKeys });

	return (
		<div
			title={title}
			onClick={bodyRowClick ? () => bodyRowClick({ rowKeys }) : undefined}
			onMouseEnter={bodyRowMouseEnter ? () => bodyRowMouseEnter({ rowKeys }) : undefined}
			onMouseLeave={bodyRowMouseLeave ? () => bodyRowMouseLeave({ rowKeys }) : undefined}
			className={classNames(styles['body-cell'], {
				[styles['left-last-pinged']]: leftLastPinged,
				[styles['right-last-pinged']]: rightLastPinged,
			})}
			style={{
				...stickyStyle,
				backgroundColor,
				minHeight: rowHeight,
				gridRow: `${rowIndexStart + 1}/${rowIndexEnd + 2}`,
				gridColumn: `${colIndexStart + 1}/${colIndexEnd + 2}`,
			}}
		>
			<div
				style={{ justifyContent: leafColumn.align === 'center' ? 'center' : leafColumn.align === 'right' ? 'flex-end' : 'flex-start' }}
				className={classNames(styles['body-cell-inner'], {
					[styles['bordered']]: bordered,
					[styles['first-col']]: colIndexStart === 0,
					[styles['first-row']]: rowIndexStart === 0,
					[styles['not-first-col-and-left-first-pinged']]: colIndexStart !== 0 && leftFirstPinged,
					[styles['not-first-col-and-right-last-pinged']]: colIndexStart !== 0 && rightLastPinged,
				})}
			>
				{!canEllipsis ? renderDom : <div className={styles['ellipsis-wrapper']}>{renderDom}</div>}
			</div>
		</div>
	);
};

export default memo(BodyCell) as typeof BodyCell;
