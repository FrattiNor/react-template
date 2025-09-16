import type { CSSProperties } from 'react';
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

	const VV_Range = VV.calculateRange();

	// 虚拟容器style
	const VVWrapperStyle: CSSProperties = {
		boxSizing: 'border-box',
		minHeight: VV.getTotalSize(),
		paddingTop: VV.getVirtualItems()?.[0]?.start ?? 0,
	};

	// row是否显示
	const getRowShow = (indexs: [number] | [number, number]) => {
		if (VV_Range) {
			const start = indexs[0];
			const end = indexs[indexs.length - 1];
			const { startIndex, endIndex } = VV_Range;
			return (start <= endIndex && start >= startIndex) || (end <= endIndex && end >= startIndex);
		}
		return false;
	};

	return { VV, VVWrapperStyle, getRowShow };
};

export default useTableVVirtual;
