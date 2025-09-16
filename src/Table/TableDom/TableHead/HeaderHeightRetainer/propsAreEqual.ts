import type { Props } from './index';
import type { TableDataItem } from '../../../TableTypes/type';
import type { TableInstance } from '../../../TableHooks/type';
import { getJudgeEachInstanceObj } from '../../../TableUtils';

export const judgeEach_Instance_obj = getJudgeEachInstanceObj([
	(instance: Readonly<TableInstance<TableDataItem>>) => instance.tableProps.rowHeight,
	(instance: Readonly<TableInstance<TableDataItem>>) => instance.tableProps.columnsFlat,
	(instance: Readonly<TableInstance<TableDataItem>>) => instance.tableProps.columnGroups,
]);

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
