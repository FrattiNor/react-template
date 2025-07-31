import { useCallback, useMemo } from 'react';
import type { TableDataItem, TableProps } from '../TableTypes/type';
import useTableDomRef from './useTableDomRef';

const useTableInstance = <T extends TableDataItem>(props: TableProps<T>) => {
	const tableDomRef = useTableDomRef();

	const gridTemplateColumns = useMemo(() => props.columns.map(({ width }) => (typeof width === 'number' ? `${width}px` : width)).join(' '), [props.columns]);

	const getRowKey = useCallback(
		(item: T, index: number) => {
			if (typeof props.rowKey === 'function') {
				return props.rowKey(item, index);
			}
			return item[props.rowKey] as string;
		},
		[props.rowKey],
	);

	return { props, tableDomRef, gridTemplateColumns, getRowKey };
};

export default useTableInstance;
