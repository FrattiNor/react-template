import styles from './index.module.less';
import MeasureColumnSize from './MeasureColumnSize';
import BodyRow from './BodyRow';
import BodyEmpty from './BodyEmpty';
import type { TableInstance } from '../../TableHooks/type';
import type { TableDataItem } from '../../TableTypes/type';
import { memo } from 'react';
import propsAreEqual from './propsAreEqual';

export type Props<T extends TableDataItem> = {
	instance: TableInstance<T>;
};

const TableBody = <T extends TableDataItem>({ instance }: Props<T>) => {
	const { data } = instance.tableProps;
	const { bodyRef } = instance.tableDomRef;
	const { colMeasure } = instance.tableState;
	const { getRowIndexs, getRowKey } = instance.tableTools;
	const { VV_WrapperStyle, getRowShow } = instance.tableVirtual;
	const { gridTemplateColumnsArr } = instance.tableSecondaryState;

	const gridTemplateColumns = gridTemplateColumnsArr.join(' ');
	const notEmpty = Array.isArray(data) && data.length > 0;

	let rowKeysObj: Record<string, number> = {};
	rowKeysObj = {};

	return (
		<div className={styles['body']} ref={bodyRef}>
			{colMeasure.measure && <MeasureColumnSize instance={instance} />}
			{!notEmpty && <BodyEmpty instance={instance} />}
			{notEmpty && (
				<div className={styles['body-inner']} style={{ gridTemplateColumns, ...VV_WrapperStyle }}>
					{data?.map((dataItem, rowIndex) => {
						const rowIndexs = getRowIndexs(rowIndex);
						const rowKey = getRowKey(dataItem, rowIndex);
						// 检测存在重复rowKey
						if (rowKeysObj[rowKey] === 1) console.error(`same row key: ${rowKey}`);
						rowKeysObj[rowKey] = (rowKeysObj[rowKey] ?? 0) + 1;
						// 检测存在重复rowKey
						if (getRowShow(rowIndexs)) {
							return <BodyRow key={rowKey} rowIndex={rowIndex} instance={instance} />;
						}
					})}
				</div>
			)}
		</div>
	);
};

export default memo(TableBody, propsAreEqual) as typeof TableBody;
