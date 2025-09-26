import { getPropsAreEqual } from '../../../../TableUtils';
import { getTotalInstanceProps as BodyCellRender_getInstanceProps } from '../BodyCellRender/propsAreEqual';

import type { Props } from './index';
import type { TableDataItem } from '../../../../TableTypes/type';
import type { TableInstance } from '../../../../TableTypes/typeHooks';

export const getProps = <T extends TableDataItem>({ rowIndex, colIndex, forceRender }: Readonly<Props<T>>) => {
	return { colIndex, rowIndex, forceRender };
};

export const getInstanceProps = <T extends TableDataItem>({ instance }: Readonly<{ instance: Readonly<TableInstance<T>> }>) => {
	const { getRowKeys } = instance.tableTools;
	const { getColShow, getRowShow } = instance.tableVirtual;
	const { getStickyStyleAndClassName } = instance.tableSticky;
	const { bordered, rowHeight } = instance.tableProps;
	const { getBodyCellBg, bodyRowClick, bodyRowMouseEnter, bodyRowMouseLeave } = instance.tableCellBg;
	const { columnsFlat } = instance.tableColumn;
	const { datasource } = instance.tableData;
	return {
		getRowKeys,
		getRowShow,
		getColShow,
		getStickyStyleAndClassName,
		columnsFlat,
		datasource,
		bordered,
		rowHeight,
		getBodyCellBg,
		bodyRowClick,
		bodyRowMouseEnter,
		bodyRowMouseLeave,
	};
};

export const getTotalInstanceProps = <T extends TableDataItem>({ instance }: Readonly<{ instance: Readonly<TableInstance<T>> }>) => {
	return {
		...getInstanceProps({ instance }),
		...BodyCellRender_getInstanceProps({ instance }),
	};
};

const propsAreEqual = getPropsAreEqual({
	getProps,
	getTotalInstanceProps,
});

export default propsAreEqual;
