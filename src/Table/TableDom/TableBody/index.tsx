import { memo } from 'react';

import BodyEmpty from './BodyEmpty';
import BodyRow from './BodyRow';
import styles from './index.module.less';
import MeasureColumnSize from './MeasureColumnSize';
import propsAreEqual, { getInstanceProps } from './propsAreEqual';

import type { TableDataItem } from '../../TableTypes/type';
import type { TableInstance } from '../../TableTypes/typeHooks';

export type Props<T extends TableDataItem> = {
	instance: TableInstance<T>;
};

const TableBody = <T extends TableDataItem>(props: Props<T>) => {
	const { datasource, bodyRef, colMeasure, getRowKey, VV_wrapperStyle, showRowIndexs, gridTemplateColumnsArr } = getInstanceProps(props);
	const gridTemplateColumns = gridTemplateColumnsArr.join(' ');
	const notEmpty = Array.isArray(datasource) && datasource.length > 0;

	return (
		<div className={styles['body']} ref={bodyRef}>
			{colMeasure.measure && <MeasureColumnSize instance={props.instance} />}
			{!notEmpty && <BodyEmpty instance={props.instance} />}
			{notEmpty && (
				<div className={styles['body-inner']} style={{ gridTemplateColumns, ...VV_wrapperStyle }}>
					{showRowIndexs.map(({ index: rowIndex }) => {
						const rowData = datasource[rowIndex];
						const rowKey = getRowKey(rowData, rowIndex);
						return <BodyRow key={rowKey} rowIndex={rowIndex} instance={props.instance} />;
					})}
				</div>
			)}
		</div>
	);
};

// export default TableBody;
export default memo(TableBody, propsAreEqual) as typeof TableBody;
