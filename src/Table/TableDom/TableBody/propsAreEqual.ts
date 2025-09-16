import type { Props } from './index';
import type { TableDataItem } from '../../TableTypes/type';

const judgeEach = [
	(props: Readonly<Props<TableDataItem>>) => props.instance.tableProps.data,
	(props: Readonly<Props<TableDataItem>>) => props.instance.tableDomRef.bodyRef,
	(props: Readonly<Props<TableDataItem>>) => props.instance.tableMeasureCol.needMeasure,
	(props: Readonly<Props<TableDataItem>>) => props.instance.tableTools.getRowIndexs,
	(props: Readonly<Props<TableDataItem>>) => props.instance.tableTools.getRowKey,
	(props: Readonly<Props<TableDataItem>>) => props.instance.tableVirtual.VV_WrapperStyle,
	(props: Readonly<Props<TableDataItem>>) => props.instance.tableVirtual.getRowShow,
	(props: Readonly<Props<TableDataItem>>) => props.instance.tableSecondaryState.gridTemplateColumnsArr,
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
