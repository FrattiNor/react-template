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

	// 横向虚拟
	const HV = useV({
		overscan: 0,
		horizontal: true,
		count: columnsFlat.length,
		getItemKey: (index) => columnsFlat[index].key,
		getScrollElement: () => tableDomRef.bodyRef.current,
		// TODO estimateSize不接受小数
		estimateSize: (index) => Math.round(tableState.getColumnSize(columnsFlat[index].key)),
	});

	// 竖向虚拟
	const VV = useV({
		overscan: 0,
		count: data?.length ?? 0,
		estimateSize: () => tableProps.rowHeight,
		getScrollElement: () => tableDomRef.bodyRef.current,
		getItemKey: (index) => tableTools.getRowKey(data?.[index], index),
	});

	const VWrapperStyle: CSSProperties = {
		boxSizing: 'border-box',
		minHeight: VV.getTotalSize(),
		paddingTop: VV.getVirtualItems()?.[0]?.start ?? 0,
	};

	return { HV, VV, VWrapperStyle };
};

export default useTableVirtual;
