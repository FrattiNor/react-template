/* eslint-disable react-compiler/react-compiler */
import { useCallback } from 'react';

import useV from '../useV/useV';

import type { TableDataItem } from '../../../TableTypes/type';
import type useTableDomRef from '../../useTableDomRef';
import type useTableProps from '../../useTableProps';
import type useTableState from '../../useTableState';

type Props<T extends TableDataItem> = {
	tableProps: ReturnType<typeof useTableProps<T>>;
	tableDomRef: ReturnType<typeof useTableDomRef>;
	tableState: ReturnType<typeof useTableState>;
};

const useTableHVirtual = <T extends TableDataItem>({ tableProps, tableDomRef, tableState }: Props<T>) => {
	'use no memo';
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

	const HV_items = HV.getVirtualItems();
	const startIndex = HV_items?.[0]?.index;
	const endIndex = HV_items?.[HV_items.length - 1]?.index;

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
