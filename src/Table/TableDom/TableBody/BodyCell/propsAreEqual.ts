import type { Props } from './index';
import type { TableDataItem } from '../../../TableTypes/type';
import type { TableInstance } from '../../../TableHooks/type';
import { judgeEach_Instance_obj as BodyCellRender_judgeEach_Instance_obj } from '../BodyCellRender/propsAreEqual';

const judgeEach = [
	//
	(props: Readonly<Props<TableDataItem>>) => props.rowIndex,
	(props: Readonly<Props<TableDataItem>>) => props.colIndex,
];

export const judgeEach_Instance_obj = {
	...BodyCellRender_judgeEach_Instance_obj,
	'tableTools.getRowKeys': (instance: Readonly<TableInstance<TableDataItem>>) => instance.tableTools.getRowKeys,
	'tableVirtual.getColShow': (instance: Readonly<TableInstance<TableDataItem>>) => instance.tableVirtual.getColShow,
	'tableSticky.getStickyStyleAndClassName': (instance: Readonly<TableInstance<TableDataItem>>) => instance.tableSticky.getStickyStyleAndClassName,
	'tableProps.columnsFlat': (instance: Readonly<TableInstance<TableDataItem>>) => instance.tableProps.columnsFlat,
	'tableProps.data': (instance: Readonly<TableInstance<TableDataItem>>) => instance.tableProps.data,
	'tableProps.bordered': (instance: Readonly<TableInstance<TableDataItem>>) => instance.tableProps.bordered,
	'tableProps.rowHeight': (instance: Readonly<TableInstance<TableDataItem>>) => instance.tableProps.rowHeight,
	'tableC ellBg.getBodyCellBg': (instance: Readonly<TableInstance<TableDataItem>>) => instance.tableCellBg.getBodyCellBg,
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
