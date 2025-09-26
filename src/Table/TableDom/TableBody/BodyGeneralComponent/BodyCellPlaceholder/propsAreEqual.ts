import { getPropsAreEqual } from '../../../../TableUtils';

import type { Props } from './index';
import type { TableDataItem } from '../../../../TableTypes/type';
import type { TableInstance } from '../../../../TableTypes/typeHooks';

export const getProps = <T extends TableDataItem>({ rowIndex }: Readonly<Props<T>>) => {
	return { rowIndex };
};

export const getInstanceProps = <T extends TableDataItem>({ instance }: Readonly<{ instance: Readonly<TableInstance<T>> }>) => {
	const { getRowKey } = instance.tableTools;
	const { datasource } = instance.tableData;
	const { columnsFlat } = instance.tableColumn;
	const { getRowShow } = instance.tableVirtual;
	const { getBodyCellBg, bodyRowClick, bodyRowMouseEnter, bodyRowMouseLeave } = instance.tableCellBg;
	return {
		getRowShow,
		getRowKey,
		columnsFlat,
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
