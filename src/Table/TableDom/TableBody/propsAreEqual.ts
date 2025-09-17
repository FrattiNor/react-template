import type { TableDataItem } from '../../TableTypes/type';
import type { TableInstance } from '../../TableHooks/type';
import { getPropsAreEqual } from '../../TableUtils';
import { getTotalInstanceProps as BodyEmpty_getInstanceProps } from './BodyEmpty/propsAreEqual';
import { getTotalInstanceProps as BodyRow_getInstanceProps } from './BodyRow/propsAreEqual';
import { getTotalInstanceProps as MeasureColumnSize_getInstanceProps } from './MeasureColumnSize/propsAreEqual';

export const getInstanceProps = <T extends TableDataItem>({ instance }: Readonly<{ instance: Readonly<TableInstance<T>> }>) => {
	const { data } = instance.tableProps;
	const { bodyRef } = instance.tableDomRef;
	const { colMeasure } = instance.tableState;
	const { getRowIndexs, getRowKey } = instance.tableTools;
	const { VV_WrapperStyle, getRowShow } = instance.tableVirtual;
	const { gridTemplateColumnsArr } = instance.tableSecondaryState;
	return { data, bodyRef, colMeasure, getRowIndexs, getRowKey, VV_WrapperStyle, getRowShow, gridTemplateColumnsArr };
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
