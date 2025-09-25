import { getPropsAreEqual } from '../../TableUtils';
import { getTotalInstanceProps as BodyEmpty_getInstanceProps } from './BodyEmpty/propsAreEqual';
import { getTotalInstanceProps as BodyRow_getInstanceProps } from './BodyRow/propsAreEqual';
import { getTotalInstanceProps as MeasureColumnSize_getInstanceProps } from './MeasureColumnSize/propsAreEqual';

import type { TableDataItem } from '../../TableTypes/type';
import type { TableInstance } from '../../TableTypes/typeHooks';

export const getInstanceProps = <T extends TableDataItem>({ instance }: Readonly<{ instance: Readonly<TableInstance<T>> }>) => {
	const { datasource } = instance.tableData;
	const { bodyRef } = instance.tableDomRef;
	const { colMeasure } = instance.tableState;
	const { rowIndexsRecord } = instance.tableRowIndexs;
	const { getRowKey } = instance.tableTools;
	const { gridTemplateColumnsArr } = instance.tableSecondaryState;
	const { VV_measurementsCache, VV_totalSize, getRowShow } = instance.tableVirtual;
	return {
		datasource,
		bodyRef,
		colMeasure,
		getRowKey,
		VV_measurementsCache,
		VV_totalSize,
		getRowShow,
		gridTemplateColumnsArr,
		rowIndexsRecord,
	};
};

export const getTotalInstanceProps = <T extends TableDataItem>({ instance }: Readonly<{ instance: Readonly<TableInstance<T>> }>) => {
	return {
		...getInstanceProps({ instance }),
		...BodyEmpty_getInstanceProps({ instance }),
		...BodyRow_getInstanceProps({ instance }),
		...MeasureColumnSize_getInstanceProps({ instance }),
	};
};

const propsAreEqual = getPropsAreEqual({
	getTotalInstanceProps,
});

export default propsAreEqual;
