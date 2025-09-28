import { Fragment, memo } from 'react';

import BodyRow from './BodyRow';
import styles from './index.module.less';
import propsAreEqual, { getInstanceProps } from './propsAreEqual';

import type { TableDataItem } from '../../../TableTypes/type';
import type { TableInstance } from '../../../TableTypes/typeHooks';

export type Props<T extends TableDataItem> = {
	instance: TableInstance<T>;
};

const TableBody = <T extends TableDataItem>(props: Props<T>) => {
	const { datasource, getRowKey, VV_wrapperStyle, showRowIndexs, bodyGridTemplateColumns } = getInstanceProps(props);

	return (
		<Fragment>
			<div className={styles['body-inner']} style={{ gridTemplateColumns: bodyGridTemplateColumns, ...VV_wrapperStyle }}>
				{showRowIndexs.map(({ index: rowIndex }) => {
					const rowData = datasource[rowIndex];
					const rowKey = getRowKey(rowData, rowIndex);
					return <BodyRow key={rowKey} rowIndex={rowIndex} instance={props.instance} />;
				})}
			</div>
		</Fragment>
	);
};

export default memo(TableBody, propsAreEqual) as typeof TableBody;
