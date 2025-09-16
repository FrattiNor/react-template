import type { Props } from './index';
import type { TableDataItem } from '../../TableTypes/type';
import type { TableInstance } from '../../TableHooks/type';
import { judgeEach_Instance as HeaderHeightRetainer_judgeEach_Instance } from './HeaderHeightRetainer/propsAreEqual';
import { judgeEach_Instance as HeadRow_judgeEach_Instance } from './HeadRow/propsAreEqual';

export const judgeEach_Instance = [
	(instance: Readonly<TableInstance<TableDataItem>>) => instance.tableDomRef.headRef,
	(instance: Readonly<TableInstance<TableDataItem>>) => instance.tableProps.columnGroups,
	(instance: Readonly<TableInstance<TableDataItem>>) => instance.tableState.V_ScrollbarWidth,
	(instance: Readonly<TableInstance<TableDataItem>>) => instance.tableSecondaryState.gridTemplateColumnsArr,
	...HeaderHeightRetainer_judgeEach_Instance,
	...HeadRow_judgeEach_Instance,
];

const propsAreEqual = (prevProps: Readonly<Props<TableDataItem>>, nextProps: Readonly<Props<TableDataItem>>): boolean => {
	for (let i = 0; i < judgeEach_Instance.length; i++) {
		const fun = judgeEach_Instance[i];
		if (fun(prevProps.instance) !== fun(nextProps.instance)) {
			return false;
		}
	}

	return true;
};

export default propsAreEqual;
