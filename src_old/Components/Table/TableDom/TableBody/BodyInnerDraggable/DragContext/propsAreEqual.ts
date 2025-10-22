import { getPropsAreEqual } from '../../../../TableUtils';
import { getTotalInstanceProps as BodyRowDraggable_getInstanceProps } from '../BodyRowDraggable/propsAreEqual';
import { getTotalInstanceProps as DragOverlay_getInstanceProps } from './DragOverlay/propsAreEqual';

import type { TableDataItem, TableInstance } from '../../../../TableTypes/type';

export const getInstanceProps = <T extends TableDataItem>({ instance }: Readonly<{ instance: Readonly<TableInstance<T>> }>) => {
	const { haveDraggable, setDragActiveItem, onDragEnd } = instance.tableDraggable;
	const { dataKeys } = instance.tableData;
	const { bodyRef } = instance.tableDomRef;
	return {
		bodyRef,
		dataKeys,
		haveDraggable,
		setDragActiveItem,
		onDragEnd,
	};
};

export const getTotalInstanceProps = <T extends TableDataItem>({ instance }: Readonly<{ instance: Readonly<TableInstance<T>> }>) => {
	return {
		...getInstanceProps({ instance }),
		...DragOverlay_getInstanceProps({ instance }),
		...BodyRowDraggable_getInstanceProps({ instance }),
	};
};

const propsAreEqual = getPropsAreEqual({
	getTotalInstanceProps,
});

export default propsAreEqual;
