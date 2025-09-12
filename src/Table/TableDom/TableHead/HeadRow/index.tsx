import type { FC } from 'react';
import styles from './index.module.less';
import { useTableContext } from '../../../TableContext';
import HeadCellPlaceholder from '../HeadCellPlaceholder';
import HeadCell from '../HeadCell';

type Props = {
	rowIndex: number;
};

const HeadRow: FC<Props> = ({ rowIndex }) => {
	const { tableProps } = useTableContext();

	return (
		<div className={styles['head-row']} data-row-index={rowIndex}>
			{tableProps.columnsFlat.map((column, colIndex) => (
				<HeadCell key={column.key} rowIndex={rowIndex} colIndex={colIndex} />
			))}
			<HeadCellPlaceholder rowIndex={rowIndex} />
		</div>
	);
};

export default HeadRow;
