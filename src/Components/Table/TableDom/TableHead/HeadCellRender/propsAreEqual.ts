import { getPropsAreEqual } from '../../../TableUtils';

import type { Props } from './index';
import type { TableDataItem, TableInstance } from '../../../TableTypes/type';

export const getProps = <T extends TableDataItem>({ column, align }: Readonly<Props<T>>) => {
	return { column, align };
};

export const getInstanceProps = <T extends TableDataItem>({ instance }: Readonly<{ instance: Readonly<TableInstance<T>> }>) => {
	const { tableRef } = instance.tableDomRef;
	const { filterOpenKey, setFilterOpenKey } = instance.tableState;

	return {
		tableRef,
		filterOpenKey,
		setFilterOpenKey,
	};
};

export const getTotalInstanceProps = getInstanceProps;

const propsAreEqual = getPropsAreEqual({ getProps, getTotalInstanceProps });

export default propsAreEqual;
