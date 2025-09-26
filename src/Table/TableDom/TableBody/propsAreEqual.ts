import { getPropsAreEqual } from '../../TableUtils';
import { getTotalInstanceProps as BodyEmpty_getInstanceProps } from './BodyGeneralComponent/BodyEmpty/propsAreEqual';
import { getTotalInstanceProps as MeasureColumnSize_getInstanceProps } from './BodyGeneralComponent/MeasureColumnSize/propsAreEqual';
import { getTotalInstanceProps as BodyInner_getInstanceProps } from './BodyInner/propsAreEqual';
import { getTotalInstanceProps as BodyInnerDraggable_getInstanceProps } from './BodyInnerDraggable/propsAreEqual';

import type { TableDataItem } from '../../TableTypes/type';
import type { TableInstance } from '../../TableTypes/typeHooks';

export const getInstanceProps = <T extends TableDataItem>({ instance }: Readonly<{ instance: Readonly<TableInstance<T>> }>) => {
	const { datasource } = instance.tableData;
	const { bodyRef } = instance.tableDomRef;
	const { haveDraggable } = instance.tableDraggable;
	const { colMeasure } = instance.tableState;
	return {
		bodyRef,
		colMeasure,
		datasource,
		haveDraggable,
	};
};

export const getTotalInstanceProps = <T extends TableDataItem>({ instance }: Readonly<{ instance: Readonly<TableInstance<T>> }>) => {
	return {
		...getInstanceProps({ instance }),
		...BodyEmpty_getInstanceProps({ instance }),
		...BodyInner_getInstanceProps({ instance }),
		...MeasureColumnSize_getInstanceProps({ instance }),
		...BodyInnerDraggable_getInstanceProps({ instance }),
	};
};

const propsAreEqual = getPropsAreEqual({
	getTotalInstanceProps,
});

export default propsAreEqual;
