import type { Props } from './index';
import type { TableDataItem } from '../../TableTypes/type';
import type { TableInstance } from '../../TableHooks/type';
import { judgeEach_Instance_obj as HeaderHeightRetainer_judgeEach_Instance_obj } from './HeaderHeightRetainer/propsAreEqual';
import { judgeEach_Instance_obj as HeadRow_judgeEach_Instance_obj } from './HeadRow/propsAreEqual';

export const judgeEach_Instance_obj = {
	...HeaderHeightRetainer_judgeEach_Instance_obj,
	...HeadRow_judgeEach_Instance_obj,
	'tableProps.columnGroups': (instance: Readonly<TableInstance<TableDataItem>>) => instance.tableProps.columnGroups,
	'tableState.V_ScrollbarWidth': (instance: Readonly<TableInstance<TableDataItem>>) => instance.tableState.V_ScrollbarWidth,
	'tableSecondaryState.gridTemplateColumnsArr': (instance: Readonly<TableInstance<TableDataItem>>) => instance.tableSecondaryState.gridTemplateColumnsArr,
};

const judgeEach_Instance = Object.values(judgeEach_Instance_obj);

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
