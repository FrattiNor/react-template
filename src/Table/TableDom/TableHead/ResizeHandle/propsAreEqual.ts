import type { Props } from './index';
import type { TableDataItem } from '../../../TableTypes/type';
import type { TableInstance } from '../../../TableHooks/type';
import { getPropsAreEqual } from '../../../TableUtils';

export const getProps = <T extends TableDataItem>({ colKey, colIndexs }: Readonly<Props<T>>) => {
	return { colKey, colIndexs };
};

export const getInstanceProps = <T extends TableDataItem>({ instance }: Readonly<{ instance: Readonly<TableInstance<T>> }>) => {
	const { resizeFlag } = instance.tableState;
	const { startResize } = instance.tableResize;
	return {
		resizeFlag,
		startResize,
	};
};

export const getTotalInstanceProps = getInstanceProps;

const propsAreEqual = getPropsAreEqual({ getProps, getTotalInstanceProps });

export default propsAreEqual;
