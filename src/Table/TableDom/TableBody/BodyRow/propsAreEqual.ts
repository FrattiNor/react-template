import type { Props } from './index';
import type { TableDataItem } from '../../../TableTypes/type';
import type { TableInstance } from '../../../TableHooks/type';
import { getPropsAreEqual } from '../../../TableUtils';
import { getInstanceProps as BodyCell_getInstanceProps } from '../BodyCell/propsAreEqual';
import { getInstanceProps as BodyCellPlaceholder_getInstanceProps } from '../BodyCellPlaceholder/propsAreEqual';
import { getInstanceProps as BodyRowMeasure_getInstanceProps } from '../BodyRowMeasure/propsAreEqual';

export const getProps = <T extends TableDataItem>({ rowIndex }: Readonly<Props<T>>) => {
	return { rowIndex };
};

export const getInstanceProps = <T extends TableDataItem>({ instance }: Readonly<{ instance: Readonly<TableInstance<T>> }>) => {
	const { getRowKey } = instance.tableTools;
	const { columnsFlat, data } = instance.tableProps;
	return { getRowKey, columnsFlat, data };
};

const propsAreEqual = getPropsAreEqual({
	getProps,
	getInstanceProps: <T extends TableDataItem>({ instance }: Readonly<{ instance: Readonly<TableInstance<T>> }>) => {
		return {
			...getInstanceProps({ instance }),
			...BodyCell_getInstanceProps({ instance }),
			...BodyCellPlaceholder_getInstanceProps({ instance }),
			...BodyRowMeasure_getInstanceProps({ instance }),
		};
	},
});

export default propsAreEqual;
