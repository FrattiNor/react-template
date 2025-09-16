import type { Props } from './index';
import type { TableDataItem } from '../../../TableTypes/type';

const judgeEach = [
	(props: Readonly<Props<TableDataItem>>) => props.colKey,
	(props: Readonly<Props<TableDataItem>>) => props.colIndexs,
	(props: Readonly<Props<TableDataItem>>) => props.instance.tableState.resizeFlag,
	(props: Readonly<Props<TableDataItem>>) => props.instance.tableResize.startResize,
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
