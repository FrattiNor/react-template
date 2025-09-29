import { getPropsAreEqual } from '../../../../TableUtils';

import type { TableDataItem, TableInstance } from '../../../../TableTypes/type';

export const getInstanceProps = <T extends TableDataItem>({ instance }: Readonly<{ instance: Readonly<TableInstance<T>> }>) => {
	const { HTotalSize } = instance.tableSecondaryState;
	return { HTotalSize };
};

export const getTotalInstanceProps = getInstanceProps;

const propsAreEqual = getPropsAreEqual({ getTotalInstanceProps });

export default propsAreEqual;
