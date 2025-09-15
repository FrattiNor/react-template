import type { FC } from 'react';
import styles from './index.module.less';
import { useTableContext } from '../../TableContext';
import MeasureColumnSize from './MeasureColumnSize';
import BodyRow from './BodyRow';

const TableBody: FC = () => {
	const { tableProps, tableTools, tableSecondaryState, tableDomRef, tableVirtual } = useTableContext();
	const gridTemplateColumns = tableSecondaryState.gridTemplateColumnsArr.join(' ');

	return (
		<div className={styles['body']} ref={tableDomRef.bodyRef}>
			<MeasureColumnSize />
			<div className={styles['body-inner']} style={{ gridTemplateColumns, ...tableVirtual.VWrapperStyle }}>
				{tableProps.data?.map((dataItem, rowIndex) => {
					const rowIndexs = tableTools.getRowIndexs(rowIndex);
					const rowKey = tableTools.getRowKey(dataItem, rowIndex);
					if (tableVirtual.getRowShow(rowIndexs)) {
						return <BodyRow key={rowKey} rowIndex={rowIndex} />;
					}
				})}
			</div>
		</div>
	);
};

export default TableBody;
