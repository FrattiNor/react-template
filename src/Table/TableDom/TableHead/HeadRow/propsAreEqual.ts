import { getPropsAreEqual } from '../../../TableUtils';
import { getTotalInstanceProps as HeadCell_getInstanceProps } from '../HeadCell/propsAreEqual';
import { getTotalInstanceProps as HeadCellPlaceholder_getInstanceProps } from '../HeadCellPlaceholder/propsAreEqual';
import { getTotalInstanceProps as HeaderHeightRetainer_getInstanceProps } from '../HeaderHeightRetainer/propsAreEqual';

import type { Props } from './index';
import type { TableDataItem, TableInstance } from '../../../TableTypes/type';

export const getProps = <T extends TableDataItem>({ rowIndex }: Readonly<Props<T>>) => {
	return { rowIndex };
};

export const getInstanceProps = <T extends TableDataItem>({ instance }: Readonly<{ instance: Readonly<TableInstance<T>> }>) => {
	const { columnsFlat } = instance.tableColumn;
	return {
		columnsFlat,
	};
};

export const getTotalInstanceProps = <T extends TableDataItem>({ instance }: Readonly<{ instance: Readonly<TableInstance<T>> }>) => {
	return {
		...getInstanceProps({ instance }),
		...HeadCell_getInstanceProps({ instance }),
		...HeadCellPlaceholder_getInstanceProps({ instance }),
		...HeaderHeightRetainer_getInstanceProps({ instance }),
	};
};

const propsAreEqual = getPropsAreEqual({
	getProps,
	getTotalInstanceProps,
});

export default propsAreEqual;
