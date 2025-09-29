import { getPropsAreEqual } from '../../../TableUtils';
import { getTotalInstanceProps as HeadCellRender_getInstanceProps } from '../HeadCellRender/propsAreEqual';
import { getTotalInstanceProps as ResizeHandle_getInstanceProps } from '../ResizeHandle/propsAreEqual';

import type { Props } from './index';
import type { TableDataItem, TableInstance } from '../../../TableTypes/type';

export const getProps = <T extends TableDataItem>({ rowIndex, colIndex }: Readonly<Props<T>>) => {
	return { colIndex, rowIndex };
};

export const getInstanceProps = <T extends TableDataItem>({ instance }: Readonly<{ instance: Readonly<TableInstance<T>> }>) => {
	const { getColShow } = instance.tableVirtual;
	const { getHeadCellBg } = instance.tableCellBg;
	const { getStickyStyleAndClassName } = instance.tableSticky;
	const { bordered, rowHeight } = instance.tableProps;
	const { columnsFlat } = instance.tableColumn;
	return {
		getHeadCellBg,
		getColShow,
		getStickyStyleAndClassName,
		columnsFlat,
		bordered,
		rowHeight,
	};
};

export const getTotalInstanceProps = <T extends TableDataItem>({ instance }: Readonly<{ instance: Readonly<TableInstance<T>> }>) => {
	return {
		...getInstanceProps({ instance }),
		...ResizeHandle_getInstanceProps({ instance }),
		...HeadCellRender_getInstanceProps({ instance }),
	};
};

const propsAreEqual = getPropsAreEqual({
	getProps,
	getTotalInstanceProps,
});

export default propsAreEqual;
