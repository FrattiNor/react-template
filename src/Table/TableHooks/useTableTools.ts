import { useCallback } from 'react';
import type { TableDataItem } from '../TableTypes/type';
import type useTableProps from './useTableProps';

type Props<T extends TableDataItem> = {
	tableProps: ReturnType<typeof useTableProps<T>>;
};

// 表格工具
const useTableTools = <T extends TableDataItem>({ tableProps }: Props<T>) => {
	const getRowKey = useCallback(
		(item: T, index: number) => {
			if (typeof tableProps.rowKey === 'function') {
				return tableProps.rowKey(item, index);
			}
			return item[tableProps.rowKey] as string;
		},
		[tableProps.rowKey],
	);

	return { getRowKey };
};

export default useTableTools;
