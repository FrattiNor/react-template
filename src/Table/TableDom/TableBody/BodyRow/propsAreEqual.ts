import type { Props } from './index';
import type { TableDataItem } from '../../../TableTypes/type';

const judgeEach = [
	(props: Readonly<Props<TableDataItem>>) => props.rowIndex,
	(props: Readonly<Props<TableDataItem>>) => props.instance.tableTools.getRowKey,
	(props: Readonly<Props<TableDataItem>>) => props.instance.tableProps.columnsFlat,
	(props: Readonly<Props<TableDataItem>>) => props.instance.tableProps.data,
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
