import { memo } from 'react';

import classNames from 'classnames';

import styles from './index.module.less';
import { getCellTitle, isStrNum } from '../../../../TableUtils';

import type { InnerColumn } from '../../../../TableTypes/typeColumn';
import type { TableInstance } from '../../../../useTableInstance';

type Props<T> = Required<Pick<TableInstance<T>, 'bordered' | 'data' | 'rowHeight'>> & {
	rowIndex: number;
	colIndex: number;
	column: InnerColumn<T>;
};

const BodyCell = <T,>(props: Props<T>) => {
	//  console.log(`BodyCell(${props.rowIndex}-${props.colIndex}) re-render`);
	const { column, bordered, data, rowIndex, colIndex, rowHeight } = props;

	const dataItem = data[rowIndex];
	const renderDom = column.render(dataItem, { index: rowIndex });
	const title = getCellTitle(renderDom);
	const canEllipsis = isStrNum(renderDom);

	return (
		<div
			title={title}
			data-col={colIndex + 1}
			className={styles['body-cell']}
			style={{ minHeight: rowHeight, gridRow: `${rowIndex + 1}/${rowIndex + 2}`, gridColumn: `${colIndex + 1}/${colIndex + 2}` }}
		>
			<div
				className={classNames(styles['body-cell-inner'], {
					[styles['bordered']]: bordered,
					[styles['first-col']]: colIndex === 0,
					[styles['first-row']]: rowIndex === 0,
				})}
			>
				{!canEllipsis ? renderDom : <div className={styles['ellipsis-wrapper']}>{renderDom}</div>}
			</div>
		</div>
	);
};

export default memo(BodyCell) as typeof BodyCell;
