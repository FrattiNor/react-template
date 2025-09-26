import { getTotalInstanceProps as BodyRowDraggable_getInstanceProps } from './BodyRowDraggable/propsAreEqual';
import { getTotalInstanceProps as DragContext_getInstanceProps } from './DragContext/propsAreEqual';
import { getTotalInstanceProps as DragOverlay_getInstanceProps } from './DragOverlay/propsAreEqual';
import { getPropsAreEqual } from '../../../TableUtils';

import type { TableDataItem } from '../../../TableTypes/type';
import type { TableInstance } from '../../../TableTypes/typeHooks';

export const getInstanceProps = <T extends TableDataItem>({ instance }: Readonly<{ instance: Readonly<TableInstance<T>> }>) => {
	const { datasource } = instance.tableData;
	const { getRowKey } = instance.tableTools;
	const { gridTemplateColumnsArr } = instance.tableSecondaryState;
	const { VV_wrapperStyle, showRowIndexs } = instance.tableVirtual;
	return {
		datasource,
		getRowKey,
		VV_wrapperStyle,
		showRowIndexs,
		gridTemplateColumnsArr,
	};
};

export const getTotalInstanceProps = <T extends TableDataItem>({ instance }: Readonly<{ instance: Readonly<TableInstance<T>> }>) => {
	return {
		...getInstanceProps({ instance }),
		...DragContext_getInstanceProps({ instance }),
		...DragOverlay_getInstanceProps({ instance }),
		...BodyRowDraggable_getInstanceProps({ instance }),
	};
};

const propsAreEqual = getPropsAreEqual({
	getTotalInstanceProps,
});

export default propsAreEqual;
