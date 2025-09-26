import { getPropsAreEqual } from '../../TableUtils';
import { getTotalInstanceProps as BodyRowDraggable_getInstanceProps } from './BodyRowDraggable/propsAreEqual';
import { getTotalInstanceProps as DragContext_getInstanceProps } from './DragContext/propsAreEqual';
import { getTotalInstanceProps as DragOverlay_getInstanceProps } from './DragOverlay/propsAreEqual';
import { getTotalInstanceProps as BodyEmpty_getInstanceProps } from '../TableBodyGeneral/BodyEmpty/propsAreEqual';
import { getTotalInstanceProps as MeasureColumnSize_getInstanceProps } from '../TableBodyGeneral/MeasureColumnSize/propsAreEqual';

import type { TableDataItem } from '../../TableTypes/type';
import type { TableInstance } from '../../TableTypes/typeHooks';

export const getInstanceProps = <T extends TableDataItem>({ instance }: Readonly<{ instance: Readonly<TableInstance<T>> }>) => {
	const { datasource } = instance.tableData;
	const { bodyRef } = instance.tableDomRef;
	const { colMeasure } = instance.tableState;
	const { getRowKey } = instance.tableTools;
	const { gridTemplateColumnsArr } = instance.tableSecondaryState;
	const { VV_wrapperStyle, showRowIndexs } = instance.tableVirtual;
	return {
		datasource,
		bodyRef,
		colMeasure,
		getRowKey,
		VV_wrapperStyle,
		showRowIndexs,
		gridTemplateColumnsArr,
	};
};

export const getTotalInstanceProps = <T extends TableDataItem>({ instance }: Readonly<{ instance: Readonly<TableInstance<T>> }>) => {
	return {
		...getInstanceProps({ instance }),
		...BodyEmpty_getInstanceProps({ instance }),
		...DragContext_getInstanceProps({ instance }),
		...DragOverlay_getInstanceProps({ instance }),
		...BodyRowDraggable_getInstanceProps({ instance }),
		...MeasureColumnSize_getInstanceProps({ instance }),
	};
};

const propsAreEqual = getPropsAreEqual({
	getTotalInstanceProps,
});

export default propsAreEqual;
