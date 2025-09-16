import type { Props } from './index';
import type { TableDataItem } from '../../../TableTypes/type';
import type { TableInstance } from '../../../TableHooks/type';
import { judgeEach_Instance as ResizeHandle_judgeEach_Instance } from '../ResizeHandle/propsAreEqual';

const judgeEach = [
	//
	(props: Readonly<Props<TableDataItem>>) => props.rowIndex,
	(props: Readonly<Props<TableDataItem>>) => props.colIndex,
];

export const judgeEach_Instance = [
	(instance: Readonly<TableInstance<TableDataItem>>) => instance.tableVirtual.getColShow,
	(instance: Readonly<TableInstance<TableDataItem>>) => instance.tableCellBg.getHeadCellBg,
	(instance: Readonly<TableInstance<TableDataItem>>) => instance.tableSticky.getStickyStyleAndClassName,
	(instance: Readonly<TableInstance<TableDataItem>>) => instance.tableProps.columnsFlat,
	(instance: Readonly<TableInstance<TableDataItem>>) => instance.tableProps.columnGroups,
	(instance: Readonly<TableInstance<TableDataItem>>) => instance.tableProps.bordered,
	(instance: Readonly<TableInstance<TableDataItem>>) => instance.tableProps.rowHeight,
	...ResizeHandle_judgeEach_Instance,
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
