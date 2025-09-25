import { useMemo } from 'react';

import type { TableDataItem } from '../../TableTypes/type';
import type useTableColumn from '../useTableColumn';
import type useTableData from '../useTableData';

type Props<T extends TableDataItem> = {
	tableColumn: ReturnType<typeof useTableColumn<T>>;
	tableData: ReturnType<typeof useTableData<T>>;
};

const useTableRowIndexs = <T extends TableDataItem>({ tableColumn, tableData }: Props<T>) => {
	const { datasource } = tableData;
	const { columnsFlatWidthOnCell } = tableColumn;

	const rowIndexsRecord = useMemo(() => {
		// 记录行indexs
		const rowIndexsRecord: Array<{ start: number; end: number; span: number }> = [];
		// 记录行每列的indexs
		const rowColumnIndexs: Array<Array<{ start: number; end: number; span: number }>> = [];

		datasource.forEach((rowData, rowIndex) => {
			let rowEnd = rowIndex;
			let rowStart = rowIndex;
			const currentRowColumnIndexs: Array<{ start: number; end: number; span: number }> = [];
			columnsFlatWidthOnCell.forEach((column, colIndex) => {
				let columnIndexs = { start: -1, end: -1, span: 0 };
				const { start = -1, end = -1, span = 0 } = rowColumnIndexs[rowIndex - 1]?.[colIndex] ?? {};
				if (start <= rowIndex && end >= rowIndex) {
					columnIndexs = { start, end, span };
				} else {
					const { rowSpan = 1 } = typeof column.onCell === 'function' ? column.onCell(rowData, rowIndex) : {};
					columnIndexs = { start: rowIndex, end: rowIndex + rowSpan - 1, span: rowSpan };
				}
				currentRowColumnIndexs.push(columnIndexs);
				if (columnIndexs.start < rowStart) rowStart = columnIndexs.start;
				if (columnIndexs.end > rowEnd) rowEnd = columnIndexs.end;
			});
			rowColumnIndexs.push(currentRowColumnIndexs);
			rowIndexsRecord.push({ start: rowStart, end: rowEnd, span: rowEnd - rowStart + 1 });
		});

		return rowIndexsRecord;
	}, [datasource, columnsFlatWidthOnCell]);

	return { rowIndexsRecord };
};

export default useTableRowIndexs;
