import type { Props } from './index';
import type { TableDataItem } from '../../TableTypes/type';
import type { TableInstance } from '../../TableHooks/type';
import { judgeEach_Instance as BodyEmpty_judgeEach_Instance } from './BodyEmpty/propsAreEqual';
import { judgeEach_Instance as BodyRow_judgeEach_Instance } from './BodyRow/propsAreEqual';
import { judgeEach_Instance as MeasureColumnSize_judgeEach_Instance } from './MeasureColumnSize/propsAreEqual';

export const judgeEach_Instance = [
	(instance: Readonly<TableInstance<TableDataItem>>) => instance.tableProps.data,
	(instance: Readonly<TableInstance<TableDataItem>>) => instance.tableDomRef.bodyRef,
	(instance: Readonly<TableInstance<TableDataItem>>) => instance.tableMeasureCol.needMeasure,
	(instance: Readonly<TableInstance<TableDataItem>>) => instance.tableTools.getRowIndexs,
	(instance: Readonly<TableInstance<TableDataItem>>) => instance.tableTools.getRowKey,
	(instance: Readonly<TableInstance<TableDataItem>>) => instance.tableVirtual.VV_WrapperStyle,
	(instance: Readonly<TableInstance<TableDataItem>>) => instance.tableVirtual.getRowShow,
	(instance: Readonly<TableInstance<TableDataItem>>) => instance.tableSecondaryState.gridTemplateColumnsArr,
	...BodyEmpty_judgeEach_Instance,
	...BodyRow_judgeEach_Instance,
	...MeasureColumnSize_judgeEach_Instance,
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
