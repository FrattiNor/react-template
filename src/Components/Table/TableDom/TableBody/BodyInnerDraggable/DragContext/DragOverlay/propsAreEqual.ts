import { getTotalInstanceProps as BodyRowOverlay_getInstanceProps } from './BodyRowOverlay/propsAreEqual';
import { getPropsAreEqual } from '../../../../../TableUtils';

import type { TableDataItem, TableInstance } from '../../../../../TableTypes/type';

export const getInstanceProps = <T extends TableDataItem>({ instance }: Readonly<{ instance: Readonly<TableInstance<T>> }>) => {
	const { dragActiveItem } = instance.tableDraggable;
	const { bodyClientWidth } = instance.tableState;
	return { dragActiveItem, bodyClientWidth };
};

export const getTotalInstanceProps = <T extends TableDataItem>({ instance }: Readonly<{ instance: Readonly<TableInstance<T>> }>) => {
	return {
		...getInstanceProps({ instance }),
		...BodyRowOverlay_getInstanceProps({ instance }),
	};
};

const propsAreEqual = getPropsAreEqual({
	getTotalInstanceProps,
});

export default propsAreEqual;
