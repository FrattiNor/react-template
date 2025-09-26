import { getPropsAreEqual } from '../../../../TableUtils';

import type { TableDataItem } from '../../../../TableTypes/type';
import type { TableInstance } from '../../../../TableTypes/typeHooks';

export const getInstanceProps = <T extends TableDataItem>({ instance }: Readonly<{ instance: Readonly<TableInstance<T>> }>) => {
	const { HTotalSize } = instance.tableSecondaryState;
	return { HTotalSize };
};

export const getTotalInstanceProps = getInstanceProps;

const propsAreEqual = getPropsAreEqual({ getTotalInstanceProps });

export default propsAreEqual;
