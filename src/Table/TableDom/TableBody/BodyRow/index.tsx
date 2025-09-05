import type { FC } from 'react';
import styles from './index.module.less';
import { useTableContext } from '../../../TableContext';
import BodyCell from '../BodyCell';
import BodyCellPlaceholder from '../BodyCellPlaceholder';

type Props = {
	rowIndex: number;
};

const BodyRow: FC<Props> = ({ rowIndex }) => {
	const { tableProps, tableTools } = useTableContext();
	const { columns, data } = tableProps;
	const rowData = data[rowIndex];
	const rowKey = tableTools.getRowKey(rowData, rowIndex);

	return (
		<div key={rowKey} className={styles['body-row']}>
			{columns.map((column, colIndex) => {
				return <BodyCell key={column.key} rowIndex={rowIndex} colIndex={colIndex} />;
			})}
			<BodyCellPlaceholder rowIndex={rowIndex} />
		</div>
	);
};

export default BodyRow;
