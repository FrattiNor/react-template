import { getPropsAreEqual } from '../../../../TableUtils';
import { getTotalInstanceProps as BodyRowDraggable_getInstanceProps } from '../BodyRowDraggable/propsAreEqual';

import type { TableDataItem } from '../../../../TableTypes/type';
import type { TableInstance } from '../../../../TableTypes/typeHooks';

export const getInstanceProps = <T extends TableDataItem>({ instance }: Readonly<{ instance: Readonly<TableInstance<T>> }>) => {
	const { haveDraggable, setDragActiveItem, onDragEnd } = instance.tableDraggable;
	const { dataKeys } = instance.tableData;
	return {
		dataKeys,
		haveDraggable,
		setDragActiveItem,
		onDragEnd,
	};
};

export const getTotalInstanceProps = <T extends TableDataItem>({ instance }: Readonly<{ instance: Readonly<TableInstance<T>> }>) => {
	return {
		...getInstanceProps({ instance }),
		...BodyRowDraggable_getInstanceProps({ instance }),
	};
};

const propsAreEqual = getPropsAreEqual({
	getTotalInstanceProps,
});

export default propsAreEqual;
