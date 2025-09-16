import { useCallback } from 'react';
import type { TableDataItem } from '../../../TableTypes/type';
import type useTableDomRef from '../../useTableDomRef';
import type useTableProps from '../../useTableProps';
import type useTableState from '../../useTableState';
import useV from '../useV/useV';

type Props<T extends TableDataItem> = {
	tableProps: ReturnType<typeof useTableProps<T>>;
	tableDomRef: ReturnType<typeof useTableDomRef>;
	tableState: ReturnType<typeof useTableState>;
};

const useTableHVirtual = <T extends TableDataItem>({ tableProps, tableDomRef, tableState }: Props<T>) => {
	const { bodyRef } = tableDomRef;
	const { columnsFlat } = tableProps;
	const { getColumnSize } = tableState;

	// 横向虚拟
	const HV = useV({
		overscan: 0,
		horizontal: true,
		count: columnsFlat.length,
		getScrollElement: () => bodyRef.current,
		getItemKey: (index) => columnsFlat[index].key,
		estimateSize: (index) => getColumnSize(columnsFlat[index].key),
	});

	const HV_Range = HV.calculateRange();
	const endIndex = HV_Range?.endIndex;
	const startIndex = HV_Range?.startIndex;

	// col是否显示
	const getColShow = useCallback(
		(indexs: [number] | [number, number]) => {
			if (typeof endIndex === 'number' && typeof startIndex === 'number') {
				const start = indexs[0];
				const end = indexs[indexs.length - 1];
				return (start <= endIndex && start >= startIndex) || (end <= endIndex && end >= startIndex);
			}
			return false;
		},
		[endIndex, startIndex],
	);

	return { getColShow };
};

export default useTableHVirtual;
