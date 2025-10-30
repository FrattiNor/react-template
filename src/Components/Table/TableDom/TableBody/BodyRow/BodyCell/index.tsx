import classNames from 'classnames';
import styles from './index.module.less';
import type { TableDataItem } from '../../../../TableTypes/type';
import type { TableInstance } from '../../../../useTableInstance';
import { memo } from 'react';
import { getCellTitle, isStrNum } from '../../../../TableUtils';

type Props<T extends TableDataItem> = Required<Pick<TableInstance<T>, 'columns' | 'bordered' | 'logRender' | 'data'>> & {
	rowIndex: number;
	colIndex: number;
};

const BodyCell = <T extends TableDataItem>(props: Props<T>) => {
	if (props.logRender?.bodyCell) console.log(`BodyCell(${props.rowIndex}-${props.colIndex}) re-render`);
	const { columns, bordered, data, rowIndex, colIndex } = props;

	const dataItem = data[rowIndex];
	const column = columns[colIndex];
	const renderDom = column.render(dataItem, { index: rowIndex });
	const title = getCellTitle(renderDom);
	const canEllipsis = isStrNum(renderDom);

	return (
		<div
			title={title}
			data-col={colIndex + 1}
			className={classNames(styles['body-cell'], {
				[styles['bordered']]: bordered,
				[styles['first-col']]: colIndex === 0,
				[styles['first-row']]: rowIndex === 0,
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

export default memo(BodyCell) as typeof BodyCell;
