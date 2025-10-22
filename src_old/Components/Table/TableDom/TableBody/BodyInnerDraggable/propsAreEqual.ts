import { getTotalInstanceProps as BodyRowDraggable_getInstanceProps } from './BodyRowDraggable/propsAreEqual';
import { getTotalInstanceProps as DragContext_getInstanceProps } from './DragContext/propsAreEqual';
import { getPropsAreEqual } from '../../../TableUtils';

import type { TableDataItem, TableInstance } from '../../../TableTypes/type';

export const getInstanceProps = <T extends TableDataItem>({ instance }: Readonly<{ instance: Readonly<TableInstance<T>> }>) => {
	const { datasource } = instance.tableData;
	const { getRowKey } = instance.tableTools;
	const { bodyGridTemplateColumns } = instance.tableSecondaryState;
	const { VV_enabled, VV_wrapperStyle, virtualRowIndexs } = instance.tableVirtual;
	return {
		datasource,
		getRowKey,
		VV_enabled,
		VV_wrapperStyle,
		virtualRowIndexs,
		bodyGridTemplateColumns,
	};
};

export const getTotalInstanceProps = <T extends TableDataItem>({ instance }: Readonly<{ instance: Readonly<TableInstance<T>> }>) => {
	return {
		...getInstanceProps({ instance }),
		...DragContext_getInstanceProps({ instance }),
		...BodyRowDraggable_getInstanceProps({ instance }),
	};
};

const propsAreEqual = getPropsAreEqual({
	getTotalInstanceProps,
});

export default propsAreEqual;
