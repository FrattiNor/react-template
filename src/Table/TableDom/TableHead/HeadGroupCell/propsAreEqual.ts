import type { Props } from './index';
import type { TableDataItem } from '../../../TableTypes/type';
import type { TableInstance } from '../../../TableHooks/type';
import { getPropsAreEqual } from '../../../TableUtils';
import { getInstanceProps as ResizeHandle_getInstanceProps } from '../ResizeHandle/propsAreEqual';

export const getProps = <T extends TableDataItem>({ rowIndex, colIndex }: Readonly<Props<T>>) => {
	return { colIndex, rowIndex };
};

export const getInstanceProps = <T extends TableDataItem>({ instance }: Readonly<{ instance: Readonly<TableInstance<T>> }>) => {
	const { getColShow } = instance.tableVirtual;
	const { getHeadCellBg } = instance.tableCellBg;
	const { getStickyStyleAndClassName } = instance.tableSticky;
	const { columnsFlat, columnGroups, bordered, rowHeight } = instance.tableProps;
	return {
		getHeadCellBg,
		getColShow,
		getStickyStyleAndClassName,
		columnsFlat,
		bordered,
		rowHeight,
		columnGroups,
	};
};

const propsAreEqual = getPropsAreEqual({
	getProps,
	getInstanceProps: <T extends TableDataItem>({ instance }: Readonly<{ instance: Readonly<TableInstance<T>> }>) => {
		return {
			...getInstanceProps({ instance }),
			...ResizeHandle_getInstanceProps({ instance }),
		};
	},
});

export default propsAreEqual;
