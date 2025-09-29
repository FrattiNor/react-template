import { useCallback } from 'react';

import type { TableDataItem } from '../../TableTypes/type';
import type useTableProps from '../useTableProps';

type Props<T extends TableDataItem> = {
	tableProps: ReturnType<typeof useTableProps<T>>;
};

// 表格工具
const useTableTools_1 = <T extends TableDataItem>({ tableProps }: Props<T>) => {
	const { rowKey } = tableProps;

	const getRowKey = useCallback(
		(item: T, index: number) => {
			if (typeof rowKey === 'function') {
				return rowKey(item, index);
			}
			if (!item) return undefined as unknown as string;
			return item[rowKey] as string;
		},
		[rowKey],
	);

	const getRowKeys = useCallback(
		({ currentIndex, rowSpan, datasource }: { currentIndex: number; rowSpan: number; datasource: T[] }) => {
			const keys = [];
			for (let i = 0; i < rowSpan; i++) {
				const index = currentIndex + i;
				const rowData = datasource[index];
				const rowKey = getRowKey(rowData, index);
				keys.push(rowKey);
			}
			return keys;
		},
		[getRowKey],
	);

	return { getRowKey, getRowKeys };
};

export default useTableTools_1;
