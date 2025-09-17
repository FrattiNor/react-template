import type { Props } from './index';
import type { TableDataItem } from '../../../TableTypes/type';
import type { TableInstance } from '../../../TableHooks/type';

const judgeEach = [
	//
	(props: Readonly<Props<TableDataItem>>) => props.rowIndex,
	(props: Readonly<Props<TableDataItem>>) => props.colIndex,
	(props: Readonly<Props<TableDataItem>>) => props.align,
];

export const judgeEach_Instance_obj = {
	'tableProps.columnsFlat': (instance: Readonly<TableInstance<TableDataItem>>) => instance.tableProps.columnsFlat,
	'tableProps.data': (instance: Readonly<TableInstance<TableDataItem>>) => instance.tableProps.data,
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
