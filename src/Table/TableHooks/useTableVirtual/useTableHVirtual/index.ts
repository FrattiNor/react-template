/* eslint-disable react-compiler/react-compiler */
import { useCallback } from 'react';

import useV from '../useV/useV';

import type { TableDataItem } from '../../../TableTypes/type';
import type useTableColumn from '../../useTableColumn';
import type useTableDomRef from '../../useTableDomRef';
import type useTableState from '../../useTableState';

type Props<T extends TableDataItem> = {
	tableColumn: ReturnType<typeof useTableColumn<T>>;
	tableDomRef: ReturnType<typeof useTableDomRef>;
	tableState: ReturnType<typeof useTableState>;
};

const useTableHVirtual = <T extends TableDataItem>({ tableColumn, tableDomRef, tableState }: Props<T>) => {
	'use no memo';
	const { bodyRef } = tableDomRef;
	const { columnsFlat } = tableColumn;
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
	const HV_startIndex = HV_items?.[0]?.index;
	const HV_endIndex = HV_items?.[HV_items.length - 1]?.index;

	// col是否显示
	const getColShow = useCallback(
		(indexs: [number] | [number, number]) => {
			if (typeof HV_endIndex === 'number' && typeof HV_startIndex === 'number') {
				const start = indexs[0];
				const end = indexs[indexs.length - 1];
				return (start <= HV_endIndex && start >= HV_startIndex) || (end <= HV_endIndex && end >= HV_startIndex);
			}
			return false;
		},
		[HV_endIndex, HV_startIndex],
	);

	return { getColShow };
};

export default useTableHVirtual;
