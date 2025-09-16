import type { Props } from './index';
import type { TableDataItem } from '../../../TableTypes/type';

const judgeEach = [
	(props: Readonly<Props<TableDataItem>>) => props.rowIndex,
	(props: Readonly<Props<TableDataItem>>) => props.colIndex,
	(props: Readonly<Props<TableDataItem>>) => props.instance.tableVirtual.getColShow,
	(props: Readonly<Props<TableDataItem>>) => props.instance.tableCellBg.getHeadCellBg,
	(props: Readonly<Props<TableDataItem>>) => props.instance.tableSticky.getStickyStyleAndClassName,
	(props: Readonly<Props<TableDataItem>>) => props.instance.tableProps.columnsFlat,
	(props: Readonly<Props<TableDataItem>>) => props.instance.tableProps.columnGroups,
	(props: Readonly<Props<TableDataItem>>) => props.instance.tableProps.bordered,
	(props: Readonly<Props<TableDataItem>>) => props.instance.tableProps.rowHeight,
];

const propsAreEqual = (prevProps: Readonly<Props<TableDataItem>>, nextProps: Readonly<Props<TableDataItem>>): boolean => {
	for (let i = 0; i < judgeEach.length; i++) {
		const fun = judgeEach[i];
		if (fun(prevProps) !== fun(nextProps)) {
			return false;
		}
	}

	return true;
};

export default propsAreEqual;
