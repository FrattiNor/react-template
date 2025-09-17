import type { TableDataItem } from '../../../TableTypes/type';
import type { TableInstance } from '../../../TableHooks/type';
import { getPropsAreEqual } from '../../../TableUtils';

export const getInstanceProps = <T extends TableDataItem>({ instance }: Readonly<{ instance: Readonly<TableInstance<T>> }>) => {
	const { columnGroups, columnsFlat, rowHeight } = instance.tableProps;
	return {
		columnGroups,
		columnsFlat,
		rowHeight,
	};
};

const propsAreEqual = getPropsAreEqual({ getInstanceProps });

export default propsAreEqual;
