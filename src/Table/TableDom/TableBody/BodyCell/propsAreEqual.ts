import { getPropsAreEqual } from '../../../TableUtils';
import { getTotalInstanceProps as BodyCellRender_getInstanceProps } from '../BodyCellRender/propsAreEqual';

import type { Props } from './index';
import type { TableDataItem } from '../../../TableTypes/type';
import type { TableInstance } from '../../../TableTypes/typeHooks';

export const getProps = <T extends TableDataItem>({ rowIndex, colIndex }: Readonly<Props<T>>) => {
	return { colIndex, rowIndex };
};

export const getInstanceProps = <T extends TableDataItem>({ instance }: Readonly<{ instance: Readonly<TableInstance<T>> }>) => {
	const { getRowKeys } = instance.tableTools;
	const { getColShow } = instance.tableVirtual;
	const { getStickyStyleAndClassName } = instance.tableSticky;
	const { data, bordered, rowHeight } = instance.tableProps;
	const { getBodyCellBg, bodyRowClick, bodyRowMouseEnter, bodyRowMouseLeave } = instance.tableCellBg;
	const { columnsFlat } = instance.tableColumn;
	return {
		getRowKeys,
		getColShow,
		getStickyStyleAndClassName,
		columnsFlat,
		data,
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
