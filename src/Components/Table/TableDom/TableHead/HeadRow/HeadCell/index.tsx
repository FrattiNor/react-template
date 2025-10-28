import classNames from 'classnames';
import styles from './index.module.less';
import type { FC } from 'react';
import { useTableContext } from '../../../../TableContext';

type Props = {
	rowIndex: number;
	colIndex: number;
};

const HeadCell: FC<Props> = ({ colIndex, rowIndex }) => {
	console.log(`HeadCell(${rowIndex}-${colIndex}) re-render`);
	const { props } = useTableContext();
	const { columns, bordered } = props;
	const column = columns[colIndex];
	return (
		<div
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

export default HeadCell;
