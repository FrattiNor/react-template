/* eslint-disable react-compiler/react-compiler */
import { useCallback, useMemo, type CSSProperties } from 'react';

import { type useTableTools_1 } from '../../useTableTools';
import useV from '../useV/useV';

import type { TableDataItem } from '../../../TableTypes/type';
import type useTableColumn from '../../useTableColumn';
import type useTableData from '../../useTableData';
import type useTableDomRef from '../../useTableDomRef';
import type useTableProps from '../../useTableProps';

type Props<T extends TableDataItem> = {
	tableProps: ReturnType<typeof useTableProps<T>>;
	tableDomRef: ReturnType<typeof useTableDomRef>;
	tableData: ReturnType<typeof useTableData<T>>;
	tableTools_1: ReturnType<typeof useTableTools_1<T>>;
	tableColumn: ReturnType<typeof useTableColumn<T>>;
};

const useTableVVirtual = <T extends TableDataItem>({ tableColumn, tableData, tableProps, tableDomRef, tableTools_1 }: Props<T>) => {
	'use no memo';
	const { bodyRef } = tableDomRef;
	const { rowHeight } = tableProps;
	const { datasource } = tableData;
	const { getRowKey } = tableTools_1;
	const { virtualFlushSync } = tableProps;
	const { columnsFlatWidthOnCell } = tableColumn;

	// 竖向虚拟
	const VV = useV({
		overscan: 0,
		count: datasource?.length ?? 0,
		estimateSize: () => rowHeight,
		getScrollElement: () => bodyRef.current,
		getItemKey: (index) => getRowKey(datasource?.[index], index),
		virtualFlushSync,
	});

	const VV_totalSize = VV.getTotalSize();
	const VV_measureElement = VV.measureElement;
	const VV_items = VV.getVirtualItems();
	const VV_startIndex = VV_items?.[0]?.index;
	const VV_endIndex = VV_items?.[VV_items.length - 1]?.index;

	// VV_measurementsCache
	const _VV_measurementsCache = VV.measurementsCache;
	const VV_measurementsCache = useMemo(
		() => _VV_measurementsCache,
		[
			_VV_measurementsCache[0]?.start,
			_VV_measurementsCache[0]?.index,
			_VV_measurementsCache[_VV_measurementsCache.length - 1]?.end,
			_VV_measurementsCache[_VV_measurementsCache.length - 1]?.index,
		],
	);

	// row是否显示
	const getRowShow = useCallback(
		(indexs: [number] | [number, number]) => {
			if (typeof VV_endIndex === 'number' && typeof VV_startIndex === 'number') {
				const start = indexs[0];
				const end = indexs[indexs.length - 1];
				return (start <= VV_endIndex && start >= VV_startIndex) || (end <= VV_endIndex && end >= VV_startIndex);
			}
			return false;
		},
		[VV_startIndex, VV_endIndex],
	);

	const showRowIndexs = useMemo(() => {
		const rowKeysObj: Record<string, number> = {};
		const columnRowIndexs: Array<Array<{ start: number; end: number; span: number }>> = [];
		const showRowIndexs: Array<{ index: number; start: number; end: number; span: number }> = [];

		datasource.forEach((rowData, rowIndex) => {
			// 检测存在重复rowKey
			const rowKey = getRowKey(rowData, rowIndex);
			if (rowKeysObj[rowKey] === 1) console.error(`same row key: ${rowKey}`);
			rowKeysObj[rowKey] = (rowKeysObj[rowKey] ?? 0) + 1;
			// 逻辑
			let rowEnd = rowIndex;
			let rowStart = rowIndex;
			const currentRowColumnIndexs: Array<{ start: number; end: number; span: number }> = [];
			columnsFlatWidthOnCell.forEach((column, colIndex) => {
				let columnIndexs = { start: -1, end: -1, span: 0 };
				const { start = -1, end = -1, span = 0 } = columnRowIndexs[rowIndex - 1]?.[colIndex] ?? {};
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
			columnRowIndexs.push(currentRowColumnIndexs);
			if (getRowShow([rowStart, rowEnd])) {
				showRowIndexs.push({ index: rowIndex, start: rowStart, end: rowEnd, span: rowEnd - rowStart + 1 });
			}
		});

		return showRowIndexs;
	}, [datasource, columnsFlatWidthOnCell, getRowShow, getRowKey]);

	const VV_wrapperStyle = useMemo(() => {
		const minHeight = VV_totalSize + 0.5;
		const paddingTop = VV_measurementsCache?.[showRowIndexs?.[0]?.index]?.start ?? 0;
		const style: CSSProperties = { minHeight, paddingTop };
		return style;
	}, [showRowIndexs, VV_totalSize, VV_measurementsCache]);

	return { VV_measureElement, VV_wrapperStyle, getRowShow, showRowIndexs };
};

export default useTableVVirtual;
