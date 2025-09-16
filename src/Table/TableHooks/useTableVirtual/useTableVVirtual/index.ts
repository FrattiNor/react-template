import { useCallback, useMemo, type CSSProperties } from 'react';
import type { TableDataItem } from '../../../TableTypes/type';
import type useTableDomRef from '../../useTableDomRef';
import type useTableProps from '../../useTableProps';
import type useTableTools from '../../useTableTools';
import useV from '../useV/useV';

type Props<T extends TableDataItem> = {
	tableProps: ReturnType<typeof useTableProps<T>>;
	tableDomRef: ReturnType<typeof useTableDomRef>;
	tableTools: ReturnType<typeof useTableTools<T>>;
};

const useTableVVirtual = <T extends TableDataItem>({ tableProps, tableDomRef, tableTools }: Props<T>) => {
	const { data } = tableProps;

	// 竖向虚拟
	const VV = useV({
		overscan: 0,
		count: data?.length ?? 0,
		estimateSize: () => tableProps.rowHeight,
		getScrollElement: () => tableDomRef.bodyRef.current,
		getItemKey: (index) => tableTools.getRowKey(data?.[index], index),
	});

	const VV_measureElement = VV.measureElement;
	const VV_totalSize = VV.getTotalSize();
	const VV_paddingTop = VV.getVirtualItems()?.[0]?.start ?? 0;

	// 虚拟容器style
	const VV_WrapperStyle: CSSProperties = useMemo(
		() => ({
			boxSizing: 'border-box',
			minHeight: VV_totalSize,
			paddingTop: VV_paddingTop,
		}),
		[VV_totalSize, VV_paddingTop],
	);

	const VV_Range = VV.calculateRange();
	const endIndex = VV_Range?.endIndex;
	const startIndex = VV_Range?.startIndex;

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
