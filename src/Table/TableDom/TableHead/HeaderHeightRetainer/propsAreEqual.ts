import type { TableDataItem } from '../../../TableTypes/type';
import type { TableInstance } from '../../../TableTypes/typeHooks';
import { getPropsAreEqual } from '../../../TableUtils';

export const getInstanceProps = <T extends TableDataItem>({ instance }: Readonly<{ instance: Readonly<TableInstance<T>> }>) => {
	const { columnGroups, columnsFlat, rowHeight } = instance.tableProps;
	return {
		columnGroups,
		columnsFlat,
		rowHeight,
	};
};

export const getTotalInstanceProps = getInstanceProps;

const propsAreEqual = getPropsAreEqual({ getTotalInstanceProps });

export default propsAreEqual;
