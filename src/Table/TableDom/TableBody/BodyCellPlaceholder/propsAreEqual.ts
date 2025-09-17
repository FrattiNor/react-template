import type { Props } from './index';
import type { TableDataItem } from '../../../TableTypes/type';
import type { TableInstance } from '../../../TableHooks/type';
import { getPropsAreEqual } from '../../../TableUtils';

export const getProps = <T extends TableDataItem>({ rowIndex }: Readonly<Props<T>>) => {
	return { rowIndex };
};

export const getInstanceProps = <T extends TableDataItem>({ instance }: Readonly<{ instance: Readonly<TableInstance<T>> }>) => {
	const { getRowKey } = instance.tableTools;
	const { columnsFlat, data } = instance.tableProps;
	const { getBodyCellBg, bodyRowClick, bodyRowMouseEnter, bodyRowMouseLeave } = instance.tableCellBg;
	return {
		getRowKey,
		columnsFlat,
		data,
		getBodyCellBg,
		bodyRowClick,
		bodyRowMouseEnter,
		bodyRowMouseLeave,
	};
};

const propsAreEqual = getPropsAreEqual({ getProps, getInstanceProps });

export default propsAreEqual;
