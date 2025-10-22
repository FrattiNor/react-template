import { getPropsAreEqual } from '../../../../TableUtils';

import type { TableDataItem, TableInstance } from '../../../../TableTypes/type';

export const getInstanceProps = <T extends TableDataItem>({ instance }: Readonly<{ instance: Readonly<TableInstance<T>> }>) => {
	const { columnsFlat } = instance.tableColumn;
	const { getMeasureStyle } = instance.tableMeasureCol;
	const { setColumnSizes, setColMeasure } = instance.tableState;
	return { setColumnSizes, setColMeasure, getMeasureStyle, columnsFlat };
};

export const getTotalInstanceProps = getInstanceProps;

const propsAreEqual = getPropsAreEqual({ getTotalInstanceProps });

export default propsAreEqual;
