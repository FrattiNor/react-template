import { useCallback } from 'react';

import type { TableDataItem } from '../../TableTypes/type';
import type useTableColumn from '../useTableColumn';
import type useTableProps from '../useTableProps';

type Props<T extends TableDataItem> = {
	tableProps: ReturnType<typeof useTableProps<T>>;
	tableColumn: ReturnType<typeof useTableColumn<T>>;
};

// 表格工具
const useTableTools = <T extends TableDataItem>({ tableColumn, tableProps }: Props<T>) => {
	const { columnsFlat } = tableColumn;
	const { rowKey, data } = tableProps;

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

	const getRowIndexs = useCallback(
		(rowIndex: number) => {
			const start = rowIndex;
			let end = rowIndex;
			const rowData = data[rowIndex];

			columnsFlat.forEach((column) => {
				const { rowSpan = 1 } = column.onCell ? column.onCell(rowData, rowIndex) : {};
				const nextEnd = rowIndex + rowSpan;
				if (nextEnd > end) end = nextEnd;
			});

			return [start, end] as [number, number];
		},
		[columnsFlat, data],
	);

	return { getRowKey, getRowKeys, getRowIndexs };
};

export default useTableTools;
