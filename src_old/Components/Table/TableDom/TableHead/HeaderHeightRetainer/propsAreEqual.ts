import { getPropsAreEqual } from '../../../TableUtils';

import type { Props } from './index';
import type { TableDataItem, TableInstance } from '../../../TableTypes/type';

export const getProps = <T extends TableDataItem>({ rowIndex }: Readonly<Props<T>>) => {
	return { rowIndex };
};

export const getInstanceProps = <T extends TableDataItem>({ instance }: Readonly<{ instance: Readonly<TableInstance<T>> }>) => {
	const { VV_measureElement } = instance.tableVirtual;
	const { colMaxIndex } = instance.tableColumn;
	const { rowHeight } = instance.tableProps;
	return { VV_measureElement, colMaxIndex, rowHeight };
};

export const getTotalInstanceProps = getInstanceProps;

const propsAreEqual = getPropsAreEqual({ getProps, getTotalInstanceProps });

export default propsAreEqual;
