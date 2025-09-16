import type { Props } from './index';
import type { TableDataItem } from '../../../TableTypes/type';
import type { TableInstance } from '../../../TableHooks/type';
import { judgeEach_Instance_obj as BodyCell_judgeEach_Instance_obj } from '../BodyCell/propsAreEqual';
import { judgeEach_Instance_obj as BodyCellPlaceholder_judgeEach_Instance_obj } from '../BodyCellPlaceholder/propsAreEqual';
import { judgeEach_Instance_obj as BodyRowMeasure_judgeEach_Instance_obj } from '../BodyRowMeasure/propsAreEqual';
import { getJudgeEachInstanceObj } from '../../../TableUtils';

const judgeEach = [
	//
	(props: Readonly<Props<TableDataItem>>) => props.rowIndex,
];

export const judgeEach_Instance_obj = {
	...getJudgeEachInstanceObj([
		(instance: Readonly<TableInstance<TableDataItem>>) => instance.tableTools.getRowKey,
		(instance: Readonly<TableInstance<TableDataItem>>) => instance.tableProps.columnsFlat,
		(instance: Readonly<TableInstance<TableDataItem>>) => instance.tableProps.data,
	]),
	...BodyCell_judgeEach_Instance_obj,
	...BodyCellPlaceholder_judgeEach_Instance_obj,
	...BodyRowMeasure_judgeEach_Instance_obj,
};

const judgeEach_Instance = Object.values(judgeEach_Instance_obj);

const propsAreEqual = (prevProps: Readonly<Props<TableDataItem>>, nextProps: Readonly<Props<TableDataItem>>): boolean => {
	for (let i = 0; i < judgeEach.length; i++) {
		const fun = judgeEach[i];
		if (fun(prevProps) !== fun(nextProps)) {
			return false;
		}
	}

	for (let i = 0; i < judgeEach_Instance.length; i++) {
		const fun = judgeEach_Instance[i];
		if (fun(prevProps.instance) !== fun(nextProps.instance)) {
			return false;
		}
	}

	return true;
};

export default propsAreEqual;
