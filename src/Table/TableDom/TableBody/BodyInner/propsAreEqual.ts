import { getTotalInstanceProps as BodyRow_getInstanceProps } from './BodyRow/propsAreEqual';
import { getPropsAreEqual } from '../../../TableUtils';

import type { TableDataItem } from '../../../TableTypes/type';
import type { TableInstance } from '../../../TableTypes/typeHooks';

export const getInstanceProps = <T extends TableDataItem>({ instance }: Readonly<{ instance: Readonly<TableInstance<T>> }>) => {
	const { datasource } = instance.tableData;
	const { getRowKey } = instance.tableTools;
	const { bodyGridTemplateColumns } = instance.tableSecondaryState;
	const { VV_wrapperStyle, showRowIndexs } = instance.tableVirtual;
	return {
		datasource,
		getRowKey,
		VV_wrapperStyle,
		showRowIndexs,
		bodyGridTemplateColumns,
	};
};

export const getTotalInstanceProps = <T extends TableDataItem>({ instance }: Readonly<{ instance: Readonly<TableInstance<T>> }>) => {
	return {
		...getInstanceProps({ instance }),
		...BodyRow_getInstanceProps({ instance }),
	};
};

const propsAreEqual = getPropsAreEqual({
	getTotalInstanceProps,
});

export default propsAreEqual;
