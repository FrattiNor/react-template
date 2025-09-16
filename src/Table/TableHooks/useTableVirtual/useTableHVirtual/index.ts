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
	const { columnsFlat } = tableProps;

	// 横向虚拟
	const HV = useV({
		overscan: 0,
		horizontal: true,
		count: columnsFlat.length,
		getItemKey: (index) => columnsFlat[index].key,
		getScrollElement: () => tableDomRef.bodyRef.current,
		estimateSize: (index) => tableState.getColumnSize(columnsFlat[index].key),
	});

	const HV_Range = HV.calculateRange();

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

	return { HV, getColShow };
};

export default useTableHVirtual;
