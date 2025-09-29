import { getPropsAreEqual } from '../../TableUtils';
import { getTotalInstanceProps as HeadRow_getInstanceProps } from './HeadRow/propsAreEqual';

import type { TableDataItem, TableInstance } from '../../TableTypes/type';

export const getInstanceProps = <T extends TableDataItem>({ instance }: Readonly<{ instance: Readonly<TableInstance<T>> }>) => {
	const { headRef } = instance.tableDomRef;
	const { columnGroups } = instance.tableColumn;
	const { headGridTemplateColumns } = instance.tableSecondaryState;
	return {
		headRef,
		columnGroups,
		headGridTemplateColumns,
	};
};

export const getTotalInstanceProps = <T extends TableDataItem>({ instance }: Readonly<{ instance: Readonly<TableInstance<T>> }>) => {
	return {
		...getInstanceProps({ instance }),
		...HeadRow_getInstanceProps({ instance }),
	};
};

const propsAreEqual = getPropsAreEqual({
	getTotalInstanceProps,
});

export default propsAreEqual;
