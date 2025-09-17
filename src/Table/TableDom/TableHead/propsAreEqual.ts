import type { TableDataItem } from '../../TableTypes/type';
import type { TableInstance } from '../../TableHooks/type';
import { getPropsAreEqual } from '../../TableUtils';
import { getInstanceProps as HeaderHeightRetainer_getInstanceProps } from './HeaderHeightRetainer/propsAreEqual';
import { getInstanceProps as HeadRow_getInstanceProps } from './HeadRow/propsAreEqual';

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

const propsAreEqual = getPropsAreEqual({
	getInstanceProps: <T extends TableDataItem>({ instance }: Readonly<{ instance: Readonly<TableInstance<T>> }>) => {
		return {
			...getInstanceProps({ instance }),
			...HeaderHeightRetainer_getInstanceProps({ instance }),
			...HeadRow_getInstanceProps({ instance }),
		};
	},
});

export default propsAreEqual;
