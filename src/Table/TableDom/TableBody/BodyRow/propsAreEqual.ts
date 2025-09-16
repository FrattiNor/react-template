import type { Props } from './index';
import type { TableDataItem } from '../../../TableTypes/type';
import type { TableInstance } from '../../../TableHooks/type';
import { judgeEach_Instance as BodyCell_judgeEach_Instance } from '../BodyCell/propsAreEqual';
import { judgeEach_Instance as BodyCellPlaceholder_judgeEach_Instance } from '../BodyCellPlaceholder/propsAreEqual';
import { judgeEach_Instance as BodyRowMeasure_judgeEach_Instance } from '../BodyRowMeasure/propsAreEqual';

const judgeEach = [
	//
	(props: Readonly<Props<TableDataItem>>) => props.rowIndex,
];

export const judgeEach_Instance = [
	(instance: Readonly<TableInstance<TableDataItem>>) => instance.tableTools.getRowKey,
	(instance: Readonly<TableInstance<TableDataItem>>) => instance.tableProps.columnsFlat,
	(instance: Readonly<TableInstance<TableDataItem>>) => instance.tableProps.data,
	...BodyCell_judgeEach_Instance,
	...BodyCellPlaceholder_judgeEach_Instance,
	...BodyRowMeasure_judgeEach_Instance,
];

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
