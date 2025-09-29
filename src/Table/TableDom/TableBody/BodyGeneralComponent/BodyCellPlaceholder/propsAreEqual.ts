import { getPropsAreEqual } from '../../../../TableUtils';

import type { Props } from './index';
import type { TableDataItem, TableInstance } from '../../../../TableTypes/type';

export const getProps = <T extends TableDataItem>({ rowIndex, isOverlay }: Readonly<Props<T>>) => {
	return { rowIndex, isOverlay };
};

export const getInstanceProps = <T extends TableDataItem>({ instance }: Readonly<{ instance: Readonly<TableInstance<T>> }>) => {
	const { getRowKey } = instance.tableTools;
	const { datasource } = instance.tableData;
	const { bordered } = instance.tableProps;
	const { colMaxIndex } = instance.tableColumn;
	const { getRowShow } = instance.tableVirtual;
	const { getBodyCellBg, bodyRowClick, bodyRowMouseEnter, bodyRowMouseLeave } = instance.tableCellBg;
	return {
		bordered,
		getRowShow,
		getRowKey,
		colMaxIndex,
		datasource,
		getBodyCellBg,
		bodyRowClick,
		bodyRowMouseEnter,
		bodyRowMouseLeave,
	};
};

export const getTotalInstanceProps = getInstanceProps;

const propsAreEqual = getPropsAreEqual({ getProps, getTotalInstanceProps });

export default propsAreEqual;
