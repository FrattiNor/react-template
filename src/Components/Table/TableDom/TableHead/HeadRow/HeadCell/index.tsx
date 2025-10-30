import { memo } from 'react';

import classNames from 'classnames';

import styles from './index.module.less';
import { getCellTitle, isStrNum } from '../../../../TableUtils';

import type { InnerColumn } from '../../../../TableTypes/typeColumn';
import type { TableInstance } from '../../../../useTableInstance';

type Props<T> = Required<Pick<TableInstance<T>, 'splitColumnsArr' | 'deepLevel' | 'bordered'>> & {
	rowIndex: number;
	colIndex: number;
};

const HeadCell = <T,>(props: Props<T>) => {
	//  console.log(`HeadCell(${props.rowIndex}-${props.colIndex}) re-render`);
	const { splitColumnsArr, bordered, rowIndex, colIndex, deepLevel } = props;

	const column = splitColumnsArr[colIndex][deepLevel - rowIndex] as InnerColumn<T>;
	console.log('column', colIndex, rowIndex, column);
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
