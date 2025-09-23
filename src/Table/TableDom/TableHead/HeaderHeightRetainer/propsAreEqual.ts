import { getPropsAreEqual } from '../../../TableUtils';

import type { TableDataItem } from '../../../TableTypes/type';
import type { TableInstance } from '../../../TableTypes/typeHooks';

export const getInstanceProps = <T extends TableDataItem>({ instance }: Readonly<{ instance: Readonly<TableInstance<T>> }>) => {
	const { rowHeight } = instance.tableProps;
	const { columnGroups, columnsFlat } = instance.tableColumn;
	return {
		columnGroups,
		columnsFlat,
		rowHeight,
	};
};

export const getTotalInstanceProps = getInstanceProps;

const propsAreEqual = getPropsAreEqual({ getTotalInstanceProps });

export default propsAreEqual;
