import type { Props } from './index';
import type { TableDataItem } from '../../../TableTypes/type';
import type { TableInstance } from '../../../TableHooks/type';

const judgeEach = [
	//
	(props: Readonly<Props<TableDataItem>>) => props.colKey,
	(props: Readonly<Props<TableDataItem>>) => props.colIndexs,
];

export const judgeEach_Instance_obj = {
	'tableState.resizeFlag': (instance: Readonly<TableInstance<TableDataItem>>) => instance.tableState.resizeFlag,
	'tableResize.startResize': (instance: Readonly<TableInstance<TableDataItem>>) => instance.tableResize.startResize,
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
