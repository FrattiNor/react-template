import { getPropsAreEqual } from '../../../../TableUtils';
import { getTotalInstanceProps as BodyRowOverlay_getInstanceProps } from '../BodyRowOverlay/propsAreEqual';

import type { TableDataItem } from '../../../../TableTypes/type';
import type { TableInstance } from '../../../../TableTypes/typeHooks';

export const getInstanceProps = <T extends TableDataItem>({ instance }: Readonly<{ instance: Readonly<TableInstance<T>> }>) => {
	const { dragActiveItem } = instance.tableDraggable;
	return { dragActiveItem };
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
