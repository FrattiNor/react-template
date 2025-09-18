import type { TableDataItem } from '../../TableTypes/type';
import type { TableInstance } from '../../TableTypes/typeHooks';
import { getPropsAreEqual } from '../../TableUtils';
import { getTotalInstanceProps as HeaderHeightRetainer_getInstanceProps } from './HeaderHeightRetainer/propsAreEqual';
import { getTotalInstanceProps as HeadRow_getInstanceProps } from './HeadRow/propsAreEqual';

export const getInstanceProps = <T extends TableDataItem>({ instance }: Readonly<{ instance: Readonly<TableInstance<T>> }>) => {
	const { headRef } = instance.tableDomRef;
	const { columnGroups } = instance.tableProps;
	const { V_ScrollbarWidth } = instance.tableState;
	const { gridTemplateColumnsArr } = instance.tableSecondaryState;
	return {
		headRef,
		columnGroups,
		V_ScrollbarWidth,
		gridTemplateColumnsArr,
	};
};

export const getTotalInstanceProps = <T extends TableDataItem>({ instance }: Readonly<{ instance: Readonly<TableInstance<T>> }>) => {
	return {
		...getInstanceProps({ instance }),
		...HeaderHeightRetainer_getInstanceProps({ instance }),
		...HeadRow_getInstanceProps({ instance }),
	};
};

const propsAreEqual = getPropsAreEqual({
	getTotalInstanceProps,
});

export default propsAreEqual;
