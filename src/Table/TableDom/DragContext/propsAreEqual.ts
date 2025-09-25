import { getPropsAreEqual } from '../../TableUtils';
import { getTotalInstanceProps as DragOverlay_getInstanceProps } from '../DragOverlay/propsAreEqual';
import { getTotalInstanceProps as TableBody_getInstanceProps } from '../TableBody/propsAreEqual';
import { getTotalInstanceProps as TableHead_getInstanceProps } from '../TableHead/propsAreEqual';

import type { TableDataItem } from '../../TableTypes/type';
import type { TableInstance } from '../../TableTypes/typeHooks';

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
		...DragOverlay_getInstanceProps({ instance }),
		...TableBody_getInstanceProps({ instance }),
		...TableHead_getInstanceProps({ instance }),
	};
};

const propsAreEqual = getPropsAreEqual({
	getTotalInstanceProps,
});

export default propsAreEqual;
