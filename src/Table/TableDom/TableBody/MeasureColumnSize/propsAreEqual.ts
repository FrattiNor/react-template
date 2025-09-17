import type { TableDataItem } from '../../../TableTypes/type';
import type { TableInstance } from '../../../TableHooks/type';
import { getPropsAreEqual } from '../../../TableUtils';

export const getInstanceProps = <T extends TableDataItem>({ instance }: Readonly<{ instance: Readonly<TableInstance<T>> }>) => {
	const { columnsFlat } = instance.tableProps;
	const { getMeasureStyle } = instance.tableMeasureCol;
	const { setColumnSizes, setColMeasure } = instance.tableState;
	return { setColumnSizes, setColMeasure, getMeasureStyle, columnsFlat };
};

const propsAreEqual = getPropsAreEqual({ getInstanceProps });

export default propsAreEqual;
