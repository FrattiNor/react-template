import { memo } from 'react';

import classNames from 'classnames';

import styles from './index.module.less';
import { getCellTitle, isStrNum } from '../../../../TableUtils';

import type { InnerColumn, InnerColumnGroup } from '../../../../TableTypes/typeColumn';
import type { TableInstance } from '../../../../useTableInstance';

type Props<T> = Required<Pick<TableInstance<T>, 'bordered' | 'rowHeight'>> & {
	rowIndexStart: number;
	rowIndexEnd: number;
	colIndexStart: number;
	colIndexEnd: number;
	column: InnerColumn<T> | InnerColumnGroup<T>;
};

const HeadCell = <T,>(props: Props<T>) => {
	//  console.log(`HeadCell(${props.rowIndex}-${props.colIndex}) re-render`);
	const { column, bordered, rowIndexStart, rowIndexEnd, colIndexStart, colIndexEnd, rowHeight } = props;

	const renderDom = column.title;
	const title = getCellTitle(renderDom);
	const canEllipsis = isStrNum(renderDom);

	return (
		<div
			title={title}
			data-col={colIndexStart + 1}
			className={styles['head-cell']}
			style={{
				minHeight: rowHeight,
				gridRow: `${rowIndexStart + 1}/${rowIndexEnd + 2}`,
				gridColumn: `${colIndexStart + 1}/${colIndexEnd + 2}`,
			}}
		>
			<div className={classNames(styles['head-cell-inner'], { [styles['bordered']]: bordered, [styles['first-col']]: colIndexStart === 0 })}>
				{!canEllipsis ? renderDom : <div className={styles['ellipsis-wrapper']}>{renderDom}</div>}
			</div>
		</div>
	);
};

export default memo(HeadCell) as typeof HeadCell;
