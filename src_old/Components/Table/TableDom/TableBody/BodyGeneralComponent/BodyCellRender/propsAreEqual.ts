import { getTotalInstanceProps as HighlightText_getInstanceProps } from './HighlightText/propsAreEqual';
import { getPropsAreEqual } from '../../../../TableUtils';

import type { Props } from './index';
import type { TableDataItem, TableInstance } from '../../../../TableTypes/type';

export const getProps = <T extends TableDataItem>({ onCellTitle, rowIndex, colIndex, align }: Readonly<Props<T>>) => {
	return { onCellTitle, rowIndex, colIndex, align };
};

export const getInstanceProps = <T extends TableDataItem>({ instance }: Readonly<{ instance: Readonly<TableInstance<T>> }>) => {
	const { datasource } = instance.tableData;
	const { columnsFlat } = instance.tableColumn;
	return { columnsFlat, datasource };
};

export const getTotalInstanceProps = <T extends TableDataItem>({ instance }: Readonly<{ instance: Readonly<TableInstance<T>> }>) => {
	return {
		...getInstanceProps({ instance }),
		...HighlightText_getInstanceProps({ instance }),
	};
};

const propsAreEqual = getPropsAreEqual({ getProps, getTotalInstanceProps });

export default propsAreEqual;
