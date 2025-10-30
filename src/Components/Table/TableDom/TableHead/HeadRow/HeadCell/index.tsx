import { memo } from 'react';

import classNames from 'classnames';

import styles from './index.module.less';
import { getCellTitle, isStrNum } from '../../../../TableUtils';

import type { TableInstance } from '../../../../useTableInstance';

type Props<T> = Required<Pick<TableInstance<T>, 'leafColumns' | 'bordered' | 'logRender'>> & {
	rowIndex: number;
	colIndex: number;
};

const HeadCell = <T,>(props: Props<T>) => {
	if (props.logRender?.headCell) console.log(`HeadCell(${props.rowIndex}-${props.colIndex}) re-render`);
	const { leafColumns, bordered, rowIndex, colIndex } = props;

	const column = leafColumns[colIndex];
	const renderDom = column.title;
	const title = getCellTitle(renderDom);
	const canEllipsis = isStrNum(renderDom);

	return (
		<div
			title={title}
			data-col={colIndex + 1}
			className={classNames(styles['head-cell'], {
				[styles['bordered']]: bordered,
				[styles['first-col']]: colIndex === 0,
			})}
			style={{
				minHeight: 46,
				gridRow: `${rowIndex + 1}/${rowIndex + 2}`,
				gridColumn: `${colIndex + 1}/${colIndex + 2}`,
			}}
		>
			{!canEllipsis ? renderDom : <div className={styles['ellipsis-wrapper']}>{renderDom}</div>}
		</div>
	);
};

export default memo(HeadCell) as typeof HeadCell;
