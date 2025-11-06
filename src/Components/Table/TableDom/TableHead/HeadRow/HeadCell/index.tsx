import { memo } from 'react';

import classNames from 'classnames';

import styles from './index.module.less';
import { getCellTitle, isStrNum } from '../../../../TableUtils';

import type { InnerColumn, InnerColumnGroup } from '../../../../TableTypes/typeColumn';
import type { TableInstance } from '../../../../useTableInstance';

type Props<T> = Required<Pick<TableInstance<T>, 'bordered' | 'rowHeight' | 'getStickyStyle'>> & {
	rowIndexStart: number;
	rowIndexEnd: number;
	colIndexStart: number;
	colIndexEnd: number;
	column: InnerColumn<T> | InnerColumnGroup<T>;
};

const HeadCell = <T,>(props: Props<T>) => {
	//  console.log(`HeadCell(${props.rowIndex}-${props.colIndex}) re-render`);
	const { column, bordered, rowIndexStart, rowIndexEnd, colIndexStart, colIndexEnd, rowHeight, getStickyStyle } = props;

	const renderDom = column.title;
	const title = getCellTitle(renderDom);
	const canEllipsis = isStrNum(renderDom);
	const { stickyStyle } = getStickyStyle({ colIndexStart, colIndexEnd, type: 'head' });

	return (
		<div
			title={title}
			className={classNames(styles['head-cell'], {
				[styles['bordered']]: bordered,
				[styles['first-col']]: colIndexStart === 0,
			})}
			style={{
				...stickyStyle,
				minHeight: (rowIndexEnd - rowIndexStart + 1) * rowHeight,
				gridRow: `${rowIndexStart + 1}/${rowIndexEnd + 2}`,
				gridColumn: `${colIndexStart + 1}/${colIndexEnd + 2}`,
			}}
		>
			<div
				className={styles['head-cell-inner']}
				style={{ justifyContent: column.align === 'center' ? 'center' : column.align === 'right' ? 'flex-end' : 'flex-start' }}
			>
				{!canEllipsis ? renderDom : <div className={styles['ellipsis-wrapper']}>{renderDom}</div>}
			</div>
		</div>
	);
};

export default memo(HeadCell) as typeof HeadCell;
