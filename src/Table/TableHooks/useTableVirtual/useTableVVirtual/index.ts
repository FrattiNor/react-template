/* eslint-disable react-compiler/react-compiler */
import { useCallback, useMemo, type CSSProperties } from 'react';

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
	const VV_paddingTop = VV_items?.[0]?.start ?? 0;
	const startIndex = VV_items?.[0]?.index;
	const endIndex = VV_items?.[VV_items.length - 1]?.index;

	// 虚拟容器style
	const VV_WrapperStyle: CSSProperties = useMemo(
		() => ({
			boxSizing: 'border-box',
			minHeight: VV_totalSize,
			paddingTop: VV_paddingTop,
		}),
		[VV_totalSize, VV_paddingTop],
	);

	// row是否显示
	const getRowShow = useCallback(
		(indexs: [number] | [number, number]) => {
			if (typeof endIndex === 'number' && typeof startIndex === 'number') {
				const start = indexs[0];
				const end = indexs[indexs.length - 1];
				return (start <= endIndex && start >= startIndex) || (end <= endIndex && end >= startIndex);
			}
			return false;
		},
		[startIndex, endIndex],
	);

	return { VV_measureElement, VV_WrapperStyle, getRowShow };
};

export default useTableVVirtual;
