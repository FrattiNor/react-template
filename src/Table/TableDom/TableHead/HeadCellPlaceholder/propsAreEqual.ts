import { getPropsAreEqual } from '../../../TableUtils';

import type { Props } from './index';
import type { TableDataItem } from '../../../TableTypes/type';
import type { TableInstance } from '../../../TableTypes/typeHooks';

export const getProps = <T extends TableDataItem>({ rowIndex }: Readonly<Props<T>>) => {
	return { rowIndex };
};

export const getInstanceProps = <T extends TableDataItem>({ instance }: Readonly<{ instance: Readonly<TableInstance<T>> }>) => {
	const { bordered } = instance.tableProps;
	const { columnsFlat } = instance.tableColumn;
	return { columnsFlat, bordered };
};

export const getTotalInstanceProps = getInstanceProps;

const propsAreEqual = getPropsAreEqual({ getProps, getTotalInstanceProps });

export default propsAreEqual;
