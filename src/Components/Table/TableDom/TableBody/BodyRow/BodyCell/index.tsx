import classNames from 'classnames';
import styles from './index.module.less';
import type { TableDataItem } from '../../../../TableTypes/type';
import type { TableInstance } from '../../../../useTableInstance';
import { memo } from 'react';

type Props = {
	rowIndex: number;
	colIndex: number;
};

const BodyCell = <T extends TableDataItem>(props: TableInstance<T> & Props) => {
	const { columns, bordered, data, rowIndex, colIndex } = props;
	if (props.logRender?.bodyCell) console.log(`BodyCell(${rowIndex}-${colIndex}) re-render`);
	const column = columns[colIndex];
	const dataItem = data?.[rowIndex] as T;
	return (
		<div
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
			{column.render(dataItem, { index: rowIndex })}
		</div>
	);
};

export default memo(BodyCell) as typeof BodyCell;
