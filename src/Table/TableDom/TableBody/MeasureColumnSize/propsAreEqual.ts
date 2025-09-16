import type { Props } from './index';
import type { TableDataItem } from '../../../TableTypes/type';

const judgeEach = [
	(props: Readonly<Props<TableDataItem>>) => props.instance.tableProps.columnsFlat,
	(props: Readonly<Props<TableDataItem>>) => props.instance.tableState.setColumnSizes,
	(props: Readonly<Props<TableDataItem>>) => props.instance.tableMeasureCol.setNeedMeasure,
	(props: Readonly<Props<TableDataItem>>) => props.instance.tableMeasureCol.getMeasureStyle,
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
