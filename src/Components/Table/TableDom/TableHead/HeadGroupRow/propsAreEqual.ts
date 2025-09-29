import { getPropsAreEqual } from '../../../TableUtils';
import { getTotalInstanceProps as HeaderHeightRetainer_getInstanceProps } from '../HeaderHeightRetainer/propsAreEqual';
import { getTotalInstanceProps as HeadGroupCell_getInstanceProps } from '../HeadGroupCell/propsAreEqual';

import type { Props } from './index';
import type { TableDataItem, TableInstance } from '../../../TableTypes/type';

export const getProps = <T extends TableDataItem>({ rowIndex }: Readonly<Props<T>>) => {
	return { rowIndex };
};

export const getInstanceProps = <T extends TableDataItem>({ instance }: Readonly<{ instance: Readonly<TableInstance<T>> }>) => {
	const { columnGroups } = instance.tableColumn;
	return {
		columnGroups,
	};
};

export const getTotalInstanceProps = <T extends TableDataItem>({ instance }: Readonly<{ instance: Readonly<TableInstance<T>> }>) => {
	return {
		...getInstanceProps({ instance }),
		...HeadGroupCell_getInstanceProps({ instance }),
		...HeaderHeightRetainer_getInstanceProps({ instance }),
	};
};

const propsAreEqual = getPropsAreEqual({
	getProps,
	getTotalInstanceProps,
});

export default propsAreEqual;
