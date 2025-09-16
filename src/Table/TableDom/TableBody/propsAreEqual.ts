import type { Props } from './index';
import type { TableDataItem } from '../../TableTypes/type';
import type { TableInstance } from '../../TableHooks/type';
import { judgeEach_Instance_obj as BodyEmpty_judgeEach_Instance_obj } from './BodyEmpty/propsAreEqual';
import { judgeEach_Instance_obj as BodyRow_judgeEach_Instance_obj } from './BodyRow/propsAreEqual';
import { judgeEach_Instance_obj as MeasureColumnSize_judgeEach_Instance_obj } from './MeasureColumnSize/propsAreEqual';
import { getJudgeEachInstanceObj } from '../../TableUtils';

export const judgeEach_Instance_obj = {
	...getJudgeEachInstanceObj([
		(instance: Readonly<TableInstance<TableDataItem>>) => instance.tableProps.data,
		(instance: Readonly<TableInstance<TableDataItem>>) => instance.tableDomRef.bodyRef,
		(instance: Readonly<TableInstance<TableDataItem>>) => instance.tableMeasureCol.needMeasure,
		(instance: Readonly<TableInstance<TableDataItem>>) => instance.tableTools.getRowIndexs,
		(instance: Readonly<TableInstance<TableDataItem>>) => instance.tableTools.getRowKey,
		(instance: Readonly<TableInstance<TableDataItem>>) => instance.tableVirtual.VV_WrapperStyle,
		(instance: Readonly<TableInstance<TableDataItem>>) => instance.tableVirtual.getRowShow,
		(instance: Readonly<TableInstance<TableDataItem>>) => instance.tableSecondaryState.gridTemplateColumnsArr,
	]),
	...BodyEmpty_judgeEach_Instance_obj,
	...BodyRow_judgeEach_Instance_obj,
	...MeasureColumnSize_judgeEach_Instance_obj,
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
