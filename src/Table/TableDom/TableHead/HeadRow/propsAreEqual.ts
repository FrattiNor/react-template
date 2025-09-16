import type { Props } from './index';
import type { TableDataItem } from '../../../TableTypes/type';
import type { TableInstance } from '../../../TableHooks/type';
import { judgeEach_Instance as HeadCell_judgeEach_Instance } from '../HeadCell/propsAreEqual';
import { judgeEach_Instance as HeadCellPlaceholder_judgeEach_Instance } from '../HeadCellPlaceholder/propsAreEqual';

const judgeEach = [
	//
	(props: Readonly<Props<TableDataItem>>) => props.rowIndex,
];

export const judgeEach_Instance = [
	//
	(instance: Readonly<TableInstance<TableDataItem>>) => instance.tableProps.columnsFlat,
	...HeadCell_judgeEach_Instance,
	...HeadCellPlaceholder_judgeEach_Instance,
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
