import { Fragment, memo } from 'react';

import BodyRow from './BodyRow';
import styles from './index.module.less';
import propsAreEqual, { getInstanceProps } from './propsAreEqual';

import type { TableDataItem, TableInstance } from '../../../TableTypes/type';

export type Props<T extends TableDataItem> = {
	instance: TableInstance<T>;
};

const TableBody = <T extends TableDataItem>(props: Props<T>) => {
	const { datasource, getRowKey, VV_enabled, VV_wrapperStyle, virtualRowIndexs, bodyGridTemplateColumns } = getInstanceProps(props);

	const renderRow = (rowIndex: number) => {
		const rowData = datasource[rowIndex];
		const rowKey = getRowKey(rowData, rowIndex);
		return <BodyRow key={rowKey} rowIndex={rowIndex} instance={props.instance} />;
	};

	return (
		<Fragment>
			<div className={styles['body-inner']} style={{ gridTemplateColumns: bodyGridTemplateColumns, ...VV_wrapperStyle }}>
				{VV_enabled === true && virtualRowIndexs?.map((rowIndex) => renderRow(rowIndex))}
				{VV_enabled !== true && datasource?.map((_, rowIndex) => renderRow(rowIndex))}
			</div>
		</Fragment>
	);
};

export default memo(TableBody, propsAreEqual) as typeof TableBody;
