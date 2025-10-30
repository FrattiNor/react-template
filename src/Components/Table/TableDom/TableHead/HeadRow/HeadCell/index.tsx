import { memo } from 'react';

import classNames from 'classnames';

import styles from './index.module.less';
import { getCellTitle, isStrNum } from '../../../../TableUtils';

import type { TableDataItem } from '../../../../TableTypes/type';
import type { TableInstance } from '../../../../useTableInstance';

type Props<T extends TableDataItem> = Required<Pick<TableInstance<T>, 'flatColumns' | 'bordered' | 'logRender'>> & {
	rowIndex: number;
	colIndex: number;
};

const HeadCell = <T extends TableDataItem>(props: Props<T>) => {
	if (props.logRender?.headCell) console.log(`HeadCell(${props.rowIndex}-${props.colIndex}) re-render`);
	const { flatColumns, bordered, rowIndex, colIndex } = props;

	const column = flatColumns[colIndex];
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
