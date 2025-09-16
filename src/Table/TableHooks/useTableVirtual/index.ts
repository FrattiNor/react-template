import type { CSSProperties } from 'react';
import type { TableDataItem } from '../../TableTypes/type';
import type useTableDomRef from '../useTableDomRef';
import type useTableProps from '../useTableProps';
import type useTableState from '../useTableState';
import type useTableTools from '../useTableTools';
import useV from './useV/useV';

type Props<T extends TableDataItem> = {
	tableProps: ReturnType<typeof useTableProps<T>>;
	tableDomRef: ReturnType<typeof useTableDomRef>;
	tableState: ReturnType<typeof useTableState>;
	tableTools: ReturnType<typeof useTableTools<T>>;
};

const useTableVirtual = <T extends TableDataItem>({ tableProps, tableDomRef, tableState, tableTools }: Props<T>) => {
	const { columnsFlat, data } = tableProps;

	// 竖向虚拟
	const VV = useV({
		overscan: 0,
		count: data?.length ?? 0,
		estimateSize: () => tableProps.rowHeight,
		getScrollElement: () => tableDomRef.bodyRef.current,
		getItemKey: (index) => tableTools.getRowKey(data?.[index], index),
	});

	const VV_Range = VV.calculateRange();

	// 横向虚拟
	const HV = useV({
		overscan: 0,
		horizontal: true,
		count: columnsFlat.length,
		getItemKey: (index) => columnsFlat[index].key,
		getScrollElement: () => tableDomRef.bodyRef.current,
		// TODO estimateSize不接受小数
		estimateSize: (index) => tableState.getColumnSize(columnsFlat[index].key),
	});

	const HV_Range = HV.calculateRange();

	// 虚拟容器style
	const VWrapperStyle: CSSProperties = {
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

	// col是否显示
	const getColShow = (indexs: [number] | [number, number]) => {
		if (HV_Range) {
			const start = indexs[0];
			const end = indexs[indexs.length - 1];
			const { startIndex, endIndex } = HV_Range;
			return (start <= endIndex && start >= startIndex) || (end <= endIndex && end >= startIndex);
		}
		return false;
	};

	return { HV, VV, VWrapperStyle, getRowShow, getColShow };
};

export default useTableVirtual;
