import { getPropsAreEqual } from '../../../../../../TableUtils';
import { getTotalInstanceProps as BodyCell_getInstanceProps } from '../../../../BodyGeneralComponent/BodyCell/propsAreEqual';
import { getTotalInstanceProps as BodyCellPlaceholder_getInstanceProps } from '../../../../BodyGeneralComponent/BodyCellPlaceholder/propsAreEqual';

import type { Props } from './index';
import type { TableDataItem, TableInstance } from '../../../../../../TableTypes/type';

export const getProps = <T extends TableDataItem>({ rowIndex }: Readonly<Props<T>>) => {
	return { rowIndex };
};

export const getInstanceProps = <T extends TableDataItem>({ instance }: Readonly<{ instance: Readonly<TableInstance<T>> }>) => {
	const { columnsFlat } = instance.tableColumn;
	const { bodyRef } = instance.tableDomRef;
	const { bodyGridTemplateColumns } = instance.tableSecondaryState;
	return { bodyGridTemplateColumns, columnsFlat, bodyRef };
};

export const getTotalInstanceProps = <T extends TableDataItem>({ instance }: Readonly<{ instance: Readonly<TableInstance<T>> }>) => {
	return {
		...getInstanceProps({ instance }),
		...BodyCell_getInstanceProps({ instance }),
		...BodyCellPlaceholder_getInstanceProps({ instance }),
	};
};

const propsAreEqual = getPropsAreEqual({
	getProps,
	getTotalInstanceProps,
});

export default propsAreEqual;
