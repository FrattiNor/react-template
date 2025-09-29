/* eslint-disable react-compiler/react-compiler */
import { useCallback, useMemo, useRef, type CSSProperties } from 'react';

import { type useTableTools_1 } from '../../useTableTools';
import useV from '../useV/useV';
import { useVirtualConf } from '../utils';

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
	const { virtual } = tableProps;
	const { bodyRef } = tableDomRef;
	const { rowHeight } = tableProps;
	const { datasource } = tableData;
	const { getRowKey } = tableTools_1;
	const { columnsFlatWidthOnCell } = tableColumn;

	const count = datasource?.length ?? 0;
	const { enabled, virtualFlushSync, shouldClearSizeCache } = useVirtualConf('v', virtual, count);

	// 竖向虚拟
	const VV = useV({
		count,
		enabled,
		overscan: 0,
		virtualFlushSync,
		estimateSize: () => rowHeight,
		getScrollElement: () => bodyRef.current,
		useAnimationFrameWithResizeObserver: true,
		getItemKey: (index) => getRowKey(datasource?.[index], index),
	});

	// 数据源改变，清除size缓存
	const datasourceRef = useRef(datasource);
	if (datasource !== datasourceRef.current) {
		const needClearSizeCache = typeof shouldClearSizeCache === 'function' ? shouldClearSizeCache(datasourceRef.current, datasource) : false;
		datasourceRef.current = datasource;
		if (needClearSizeCache && ((VV as any).itemSizeCache as Map<string, number>).size !== 0) {
			((VV as any).itemSizeCache as Map<string, number>).clear();
		}
	}

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
			// 未启用
			if (enabled === false) return true;
			// 启用
			if (typeof VV_endIndex === 'number' && typeof VV_startIndex === 'number') {
				const start = indexs[0];
				const end = indexs[indexs.length - 1];
				return (start <= VV_endIndex && start >= VV_startIndex) || (end <= VV_endIndex && end >= VV_startIndex);
			}
			return false;
		},
		[enabled, VV_startIndex, VV_endIndex],
	);

	// 虚拟显示行
	const virtualRowIndexs = useMemo(() => {
		// 未启用
		if (enabled === false) return undefined;
		// 启用
		const rowKeysObj: Record<string, number> = {};
		const columnRowIndexs: Array<Array<{ start: number; end: number; span: number }>> = [];
		const virtualRowIndexs: Array<number> = [];

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
				virtualRowIndexs.push(rowIndex);
			}
		});

		return virtualRowIndexs;
	}, [enabled, datasource, columnsFlatWidthOnCell, getRowShow, getRowKey]);

	// 外部容器相关样式
	const VV_wrapperStyle = useMemo(() => {
		// 未启用
		if (enabled === false) return {};
		// 启用
		const style: CSSProperties = {
			minHeight: VV_totalSize + 0.5,
			paddingTop: VV_measurementsCache?.[(virtualRowIndexs as Array<number>)?.[0]]?.start ?? 0,
		};
		return style;
	}, [enabled, virtualRowIndexs, VV_totalSize, VV_measurementsCache]);

	return { VV_measureElement, VV_wrapperStyle, getRowShow, virtualRowIndexs, VV_enabled: enabled };
};

export default useTableVVirtual;
