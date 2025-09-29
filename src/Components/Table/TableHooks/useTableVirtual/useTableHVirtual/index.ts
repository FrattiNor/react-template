/* eslint-disable react-compiler/react-compiler */
import { useCallback } from 'react';

import useV from '../useV/useV';
import { useVirtualConf } from '../utils';

import type { TableDataItem } from '../../../TableTypes/type';
import type useTableColumn from '../../useTableColumn';
import type useTableDomRef from '../../useTableDomRef';
import type useTableProps from '../../useTableProps';
import type useTableState from '../../useTableState';

type Props<T extends TableDataItem> = {
	tableProps: ReturnType<typeof useTableProps<T>>;
	tableColumn: ReturnType<typeof useTableColumn<T>>;
	tableDomRef: ReturnType<typeof useTableDomRef>;
	tableState: ReturnType<typeof useTableState>;
};

const useTableHVirtual = <T extends TableDataItem>({ tableProps, tableColumn, tableDomRef, tableState }: Props<T>) => {
	'use no memo';
	const { virtual } = tableProps;
	const { bodyRef } = tableDomRef;
	const { columnsFlat } = tableColumn;
	const { getColumnSize } = tableState;

	const count = columnsFlat.length;
	const { enabled, virtualFlushSync } = useVirtualConf('h', virtual, count);

	// 横向虚拟
	const HV = useV({
		count,
		enabled,
		overscan: 0,
		horizontal: true,
		virtualFlushSync,
		getScrollElement: () => bodyRef.current,
		useAnimationFrameWithResizeObserver: true,
		getItemKey: (index) => columnsFlat[index].key,
		estimateSize: (index) => getColumnSize(columnsFlat[index].key),
	});

	const HV_items = HV.getVirtualItems();
	const HV_startIndex = HV_items?.[0]?.index;
	const HV_endIndex = HV_items?.[HV_items.length - 1]?.index;

	// col是否显示
	const getColShow = useCallback(
		(indexs: [number] | [number, number]) => {
			// 未启用
			if (enabled === false) return true;
			// 启用
			if (typeof HV_endIndex === 'number' && typeof HV_startIndex === 'number') {
				const start = indexs[0];
				const end = indexs[indexs.length - 1];
				return (start <= HV_endIndex && start >= HV_startIndex) || (end <= HV_endIndex && end >= HV_startIndex);
			}
			return false;
		},
		[enabled, HV_endIndex, HV_startIndex],
	);

	return { getColShow };
};

export default useTableHVirtual;
