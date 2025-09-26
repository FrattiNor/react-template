import { getPropsAreEqual } from '../../../../TableUtils';
import { getTotalInstanceProps as BodyCell_getInstanceProps } from '../../BodyGeneralComponent/BodyCell/propsAreEqual';
import { getTotalInstanceProps as BodyCellPlaceholder_getInstanceProps } from '../../BodyGeneralComponent/BodyCellPlaceholder/propsAreEqual';

import type { Props } from './index';
import type { TableDataItem } from '../../../../TableTypes/type';
import type { TableInstance } from '../../../../TableTypes/typeHooks';

export const getProps = <T extends TableDataItem>({ rowIndex }: Readonly<Props<T>>) => {
	return { rowIndex };
};

export const getInstanceProps = <T extends TableDataItem>({ instance }: Readonly<{ instance: Readonly<TableInstance<T>> }>) => {
	const { columnsFlat } = instance.tableColumn;
	const { rowHeight } = instance.tableProps;
	const { VV_measureElement } = instance.tableVirtual;
	return { columnsFlat, rowHeight, VV_measureElement };
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
