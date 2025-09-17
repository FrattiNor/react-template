import type { Props } from './index';
import type { TableDataItem } from '../../../TableTypes/type';
import type { TableInstance } from '../../../TableHooks/type';
import { getPropsAreEqual } from '../../../TableUtils';
import { getInstanceProps as HeadCell_getInstanceProps } from '../HeadCell/propsAreEqual';
import { getInstanceProps as HeadCellPlaceholder_getInstanceProps } from '../HeadCellPlaceholder/propsAreEqual';

export const getProps = <T extends TableDataItem>({ rowIndex }: Readonly<Props<T>>) => {
	return { rowIndex };
};

export const getInstanceProps = <T extends TableDataItem>({ instance }: Readonly<{ instance: Readonly<TableInstance<T>> }>) => {
	const { columnsFlat } = instance.tableProps;
	return {
		columnsFlat,
	};
};

const propsAreEqual = getPropsAreEqual({
	getProps,
	getInstanceProps: <T extends TableDataItem>({ instance }: Readonly<{ instance: Readonly<TableInstance<T>> }>) => {
		return {
			...getInstanceProps({ instance }),
			...HeadCell_getInstanceProps({ instance }),
			...HeadCellPlaceholder_getInstanceProps({ instance }),
		};
	},
});

export default propsAreEqual;
