import type { Props } from './index';
import type { TableDataItem } from '../../../TableTypes/type';
import type { TableInstance } from '../../../TableHooks/type';

const judgeEach = [
	//
	(props: Readonly<Props<TableDataItem>>) => props.rowIndex,
];

export const judgeEach_Instance_obj = {
	'tableTools.getRowKey': (instance: Readonly<TableInstance<TableDataItem>>) => instance.tableTools.getRowKey,
	'tableProps.data': (instance: Readonly<TableInstance<TableDataItem>>) => instance.tableProps.data,
	'tableProps.columnsFlat': (instance: Readonly<TableInstance<TableDataItem>>) => instance.tableProps.columnsFlat,
	'tableCellBg.getBodyCellBg': (instance: Readonly<TableInstance<TableDataItem>>) => instance.tableCellBg.getBodyCellBg,
	'tableCellBg.bodyRowClick': (instance: Readonly<TableInstance<TableDataItem>>) => instance.tableCellBg.bodyRowClick,
	'tableCellBg.bodyRowMouseEnter': (instance: Readonly<TableInstance<TableDataItem>>) => instance.tableCellBg.bodyRowMouseEnter,
	'tableCellBg.bodyRowMouseLeave': (instance: Readonly<TableInstance<TableDataItem>>) => instance.tableCellBg.bodyRowMouseLeave,
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
