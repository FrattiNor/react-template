import type { FC } from 'react';
import { useTableContext } from '../../../TableContext';
import styles from './index.module.less';

type Props = {
	rowIndex: number;
};

const BodyCellPlaceholder: FC<Props> = ({ rowIndex }) => {
	const { tableProps, tableCellBg, tableTools } = useTableContext();
	const { columns, data } = tableProps;
	const rowData = data[rowIndex];
	const colMaxIndex = columns.length - 1;
	const rowKey = tableTools.getRowKey(rowData, rowIndex);
	const bodyCellBg = tableCellBg.getBodyCellBg({ rowKey, colKey: 'body-cell-placeholder' });

	return (
		<div
			className={styles['body-cell-placeholder']}
			style={{
				backgroundColor: bodyCellBg,
				gridRow: `${rowIndex + 1}/${rowIndex + 2}`,
				gridColumn: `${colMaxIndex + 2}/${colMaxIndex + 3}`,
			}}
		/>
	);
};

export default BodyCellPlaceholder;
