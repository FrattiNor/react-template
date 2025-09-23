import { getPropsAreEqual } from '../../../TableUtils';
import { getTotalInstanceProps as BodyCell_getInstanceProps } from '../BodyCell/propsAreEqual';
import { getTotalInstanceProps as BodyCellPlaceholder_getInstanceProps } from '../BodyCellPlaceholder/propsAreEqual';
import { getTotalInstanceProps as BodyRowMeasure_getInstanceProps } from '../BodyRowMeasure/propsAreEqual';

import type { Props } from './index';
import type { TableDataItem } from '../../../TableTypes/type';
import type { TableInstance } from '../../../TableTypes/typeHooks';

export const getProps = <T extends TableDataItem>({ rowIndex }: Readonly<Props<T>>) => {
	return { rowIndex };
};

export const getInstanceProps = <T extends TableDataItem>({ instance }: Readonly<{ instance: Readonly<TableInstance<T>> }>) => {
	const { getRowKey } = instance.tableTools;
	const { datasource } = instance.tableData;
	const { columnsFlat } = instance.tableColumn;
	return { getRowKey, columnsFlat, datasource };
};

export const getTotalInstanceProps = <T extends TableDataItem>({ instance }: Readonly<{ instance: Readonly<TableInstance<T>> }>) => {
	return {
		...getInstanceProps({ instance }),
		...BodyCell_getInstanceProps({ instance }),
		...BodyCellPlaceholder_getInstanceProps({ instance }),
		...BodyRowMeasure_getInstanceProps({ instance }),
	};
};

const propsAreEqual = getPropsAreEqual({
	getProps,
	getTotalInstanceProps,
});

export default propsAreEqual;
