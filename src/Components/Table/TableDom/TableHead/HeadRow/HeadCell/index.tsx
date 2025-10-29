import classNames from 'classnames';
import styles from './index.module.less';
import type { TableDataItem } from '../../../../TableTypes/type';
import type { TableInstance } from '../../../../useTableInstance';
import { memo } from 'react';

type Props = {
	rowIndex: number;
	colIndex: number;
};

const HeadCell = <T extends TableDataItem>(props: TableInstance<T> & Props) => {
	const { columns, bordered, rowIndex, colIndex } = props;
	if (props.logRender?.headCell) console.log(`HeadCell(${rowIndex}-${colIndex}) re-render`);
	const column = columns[colIndex];
	return (
		<div
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
			{column.title}
		</div>
	);
};

export default memo(HeadCell) as typeof HeadCell;
