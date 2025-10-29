import classNames from 'classnames';
import styles from './index.module.less';
import type { FC } from 'react';
import { useTableContext } from '../../../../TableContext';
import type { TableDataItem } from '../../../../TableTypes/type';

type Props = {
	rowIndex: number;
	colIndex: number;
};

const BodyCell: FC<Props> = ({ colIndex, rowIndex }) => {
	const { props } = useTableContext();
	if (props.logRender?.bodyCell) console.log(`BodyCell(${rowIndex}-${colIndex}) re-render`);
	const { columns, bordered, data } = props;
	const column = columns[colIndex];
	const dataItem = data?.[rowIndex] as TableDataItem;
	return (
		<div
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

export default BodyCell;
