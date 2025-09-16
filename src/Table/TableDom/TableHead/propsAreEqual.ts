import type { Props } from './index';
import type { TableDataItem } from '../../TableTypes/type';

const judgeEach = [
	(props: Readonly<Props<TableDataItem>>) => props.instance.tableDomRef.headRef,
	(props: Readonly<Props<TableDataItem>>) => props.instance.tableProps.columnGroups,
	(props: Readonly<Props<TableDataItem>>) => props.instance.tableState.V_ScrollbarWidth,
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
