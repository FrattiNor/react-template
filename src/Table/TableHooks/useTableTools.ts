import { useCallback } from 'react';
import type { TableDataItem, TableProps } from '../TableTypes/type';

type Props<T extends TableDataItem> = {
	props: TableProps<T>;
};

// 表格工具
const useTableTools = <T extends TableDataItem>({ props }: Props<T>) => {
	const getRowKey = useCallback(
		(item: T, index: number) => {
			if (typeof props.rowKey === 'function') {
				return props.rowKey(item, index);
			}
			return item[props.rowKey] as string;
		},
		[props.rowKey],
	);

	return { getRowKey };
};

export default useTableTools;
