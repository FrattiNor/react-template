import { useCallback, useMemo, useState } from 'react';
import type { TableDataItem, TableProps } from '../TableTypes/type';
import useTableDomRef from './useTableDomRef';

const useTableInstance = <T extends TableDataItem>(props: TableProps<T>) => {
	const tableDomRef = useTableDomRef();

	const [widthSize, setWidthSize] = useState<Record<string, number>>({});

	const gridTemplateColumns = useMemo(() => {
		return props.columns
			.map(({ key, width }) => {
				if (typeof widthSize[key] === 'number') return `${widthSize[key]}px`;
				return typeof width === 'number' ? `${width}px` : width;
			})
			.join(' ');
	}, [props.columns, widthSize]);

	const getRowKey = useCallback(
		(item: T, index: number) => {
			if (typeof props.rowKey === 'function') {
				return props.rowKey(item, index);
			}
			return item[props.rowKey] as string;
		},
		[props.rowKey],
	);

	return { props, tableDomRef, gridTemplateColumns, getRowKey, widthSize, setWidthSize };
};

export default useTableInstance;
