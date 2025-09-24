import { useCallback } from 'react';

import type { TableDataItem } from '../../TableTypes/type';
import type useTableColumn from '../useTableColumn';
import type useTableData from '../useTableData';

type Props<T extends TableDataItem> = {
	tableData: ReturnType<typeof useTableData<T>>;
	tableColumn: ReturnType<typeof useTableColumn<T>>;
};

// 表格工具
const useTableTools_2 = <T extends TableDataItem>({ tableColumn, tableData }: Props<T>) => {
	const { columnsFlat } = tableColumn;
	const { datasource } = tableData;

	const getRowIndexs = useCallback(
		(rowIndex: number) => {
			const start = rowIndex;
			let end = rowIndex;
			const rowData = datasource[rowIndex] as T | undefined;
			if (rowData) {
				columnsFlat.forEach((column) => {
					const { rowSpan = 1 } = column.onCell ? column.onCell(rowData, rowIndex) : {};
					const nextEnd = rowIndex + rowSpan - 1;
					if (nextEnd > end) end = nextEnd;
				});
			}

			return [start, end] as [number, number];
		},
		[columnsFlat, datasource],
	);

	return { getRowIndexs };
};

export default useTableTools_2;
