import type { FC } from 'react';
import styles from './index.module.less';
import { useTableContext } from '../../TableContext';
import MeasureColumnSize from './MeasureColumnSize';
import BodyRow from './BodyRow';
import BodyEmpty from './BodyEmpty';

const TableBody: FC = () => {
	const { tableProps, tableTools, tableSecondaryState, tableDomRef, tableVirtual, tableMeasureCol } = useTableContext();
	const gridTemplateColumns = tableSecondaryState.gridTemplateColumnsArr.join(' ');
	const notEmpty = Array.isArray(tableProps.data) && tableProps.data.length > 0;

	let rowKeysObj: Record<string, number> = {};
	rowKeysObj = {};

	return (
		<div className={styles['body']} ref={tableDomRef.bodyRef}>
			{tableMeasureCol.needMeasure && <MeasureColumnSize />}
			{!notEmpty && <BodyEmpty />}
			{notEmpty && (
				<div className={styles['body-inner']} style={{ gridTemplateColumns, ...tableVirtual.VWrapperStyle }}>
					{tableProps.data?.map((dataItem, rowIndex) => {
						const rowIndexs = tableTools.getRowIndexs(rowIndex);
						const rowKey = tableTools.getRowKey(dataItem, rowIndex);
						// 检测存在重复rowKey
						if (rowKeysObj[rowKey] === 1) console.error(`same row key: ${rowKey}`);
						rowKeysObj[rowKey] = (rowKeysObj[rowKey] ?? 0) + 1;
						// 检测存在重复rowKey
						if (tableVirtual.getRowShow(rowIndexs)) {
							return <BodyRow key={rowKey} rowIndex={rowIndex} />;
						}
					})}
				</div>
			)}
		</div>
	);
};

export default TableBody;
