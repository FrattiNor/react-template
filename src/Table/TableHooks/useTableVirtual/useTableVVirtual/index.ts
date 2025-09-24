/* eslint-disable react-compiler/react-compiler */
import { useCallback, useMemo } from 'react';

import { type useTableTools_1 } from '../../useTableTools';
import useV from '../useV/useV';

import type { TableDataItem } from '../../../TableTypes/type';
import type useTableData from '../../useTableData';
import type useTableDomRef from '../../useTableDomRef';
import type useTableProps from '../../useTableProps';

type Props<T extends TableDataItem> = {
	tableProps: ReturnType<typeof useTableProps<T>>;
	tableDomRef: ReturnType<typeof useTableDomRef>;
	tableData: ReturnType<typeof useTableData<T>>;
	tableTools_1: ReturnType<typeof useTableTools_1<T>>;
};

const useTableVVirtual = <T extends TableDataItem>({ tableData, tableProps, tableDomRef, tableTools_1 }: Props<T>) => {
	'use no memo';
	const { bodyRef } = tableDomRef;
	const { rowHeight } = tableProps;
	const { datasource } = tableData;
	const { getRowKey } = tableTools_1;

	// 竖向虚拟
	const VV = useV({
		overscan: 0,
		count: datasource?.length ?? 0,
		estimateSize: () => rowHeight,
		getScrollElement: () => bodyRef.current,
		getItemKey: (index) => getRowKey(datasource?.[index], index),
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

	return { VV_measureElement, VV_totalSize, VV_measurementsCache, getRowShow };
};

export default useTableVVirtual;
