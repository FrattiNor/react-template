import type { FC } from 'react';
import styles from './index.module.less';
import { useTableContext } from '../../../TableContext';
import HeadGroupCell from '../HeadGroupCell';

type Props = {
	rowIndex: number;
};

const HeadGroupRow: FC<Props> = ({ rowIndex }) => {
	const { tableProps } = useTableContext();
	const headerColumnGroup = tableProps.columnGroups[rowIndex];

	return (
		<div className={styles['head-row']}>
			{headerColumnGroup.map((column, colIndex) => (
				<HeadGroupCell key={column.key} rowIndex={rowIndex} colIndex={colIndex} />
			))}
		</div>
	);
};

export default HeadGroupRow;
