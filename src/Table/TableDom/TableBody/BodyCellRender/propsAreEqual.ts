import type { Props } from './index';
import type { TableDataItem } from '../../../TableTypes/type';
import type { TableInstance } from '../../../TableTypes/typeHooks';
import { getPropsAreEqual } from '../../../TableUtils';

export const getProps = <T extends TableDataItem>({ rowIndex, colIndex, align }: Readonly<Props<T>>) => {
	return { rowIndex, colIndex, align };
};

export const getInstanceProps = <T extends TableDataItem>({ instance }: Readonly<{ instance: Readonly<TableInstance<T>> }>) => {
	const { columnsFlat, data } = instance.tableProps;
	return { columnsFlat, data };
};

export const getTotalInstanceProps = getInstanceProps;

const propsAreEqual = getPropsAreEqual({ getProps, getTotalInstanceProps });

export default propsAreEqual;
