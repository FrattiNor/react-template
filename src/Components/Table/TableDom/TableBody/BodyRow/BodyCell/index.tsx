import { memo } from 'react';

import classNames from 'classnames';

import styles from './index.module.less';
import { getCellTitle, isStrNum } from '../../../../TableUtils';

import type { InnerColumn } from '../../../../TableTypes/typeColumn';
import type { TableInstance } from '../../../../useTableInstance';

type Props<T> = Required<Pick<TableInstance<T>, 'bordered' | 'rowHeight' | 'getStickyStyle'>> & {
	rowIndex: number;
	colIndex: number;
	column: InnerColumn<T>;
	dataItem: T;
};

const BodyCell = <T,>(props: Props<T>) => {
	//  console.log(`BodyCell(${props.rowIndex}-${props.colIndex}) re-render`);
	const { column, bordered, dataItem, rowIndex, colIndex, rowHeight, getStickyStyle } = props;

	const { rowSpan = 1, colSpan = 1 } = column.onCellSpan ? column.onCellSpan(dataItem, rowIndex) : {};
	// span为0
	if (rowSpan <= 0 || colSpan <= 0) return null;

	const rowIndexStart = rowIndex;
	const rowIndexEnd = rowIndex + rowSpan - 1;
	const colIndexStart = colIndex;
	const colIndexEnd = colIndex + colSpan - 1;

	const renderDom = column.render(dataItem, { index: rowIndex });
	const title = getCellTitle(renderDom);
	const canEllipsis = isStrNum(renderDom);
	const { stickyStyle } = getStickyStyle({ colIndexStart, colIndexEnd, type: 'body' });

	return (
		<div
			title={title}
			className={classNames(styles['body-cell'], {
				[styles['bordered']]: bordered,
				[styles['first-col']]: colIndex === 0,
				[styles['first-row']]: rowIndex === 0,
			})}
			style={{
				...stickyStyle,
				minHeight: rowHeight,
				gridRow: `${rowIndexStart + 1}/${rowIndexEnd + 2}`,
				gridColumn: `${colIndexStart + 1}/${colIndexEnd + 2}`,
			}}
		>
			<div
				className={styles['body-cell-inner']}
				style={{ justifyContent: column.align === 'center' ? 'center' : column.align === 'right' ? 'flex-end' : 'flex-start' }}
			>
				{!canEllipsis ? renderDom : <div className={styles['ellipsis-wrapper']}>{renderDom}</div>}
			</div>
		</div>
	);
};

export default memo(BodyCell) as typeof BodyCell;
