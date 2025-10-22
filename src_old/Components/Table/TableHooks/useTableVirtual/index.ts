import useTableHVirtual from './useTableHVirtual';
import useTableVVirtual from './useTableVVirtual';
import { type useTableTools_1 } from '../useTableTools';

import type { TableDataItem } from '../../TableTypes/type';
import type useTableColumn from '../useTableColumn';
import type useTableData from '../useTableData';
import type useTableDomRef from '../useTableDomRef';
import type useTableProps from '../useTableProps';
import type useTableState from '../useTableState';

type Props<T extends TableDataItem> = {
	tableProps: ReturnType<typeof useTableProps<T>>;
	tableDomRef: ReturnType<typeof useTableDomRef>;
	tableState: ReturnType<typeof useTableState>;
	tableTools_1: ReturnType<typeof useTableTools_1<T>>;
	tableColumn: ReturnType<typeof useTableColumn<T>>;
	tableData: ReturnType<typeof useTableData<T>>;
};

const useTableVirtual = <T extends TableDataItem>({ tableColumn, tableProps, tableDomRef, tableState, tableData, tableTools_1 }: Props<T>) => {
	const { getColShow } = useTableHVirtual({ tableProps, tableColumn, tableDomRef, tableState });
	const { VV_enabled, VV_measureElement, VV_wrapperStyle, getRowShow, virtualRowIndexs } = useTableVVirtual({
		tableData,
		tableProps,
		tableDomRef,
		tableColumn,
		tableTools_1,
	});
	return { VV_enabled, VV_measureElement, VV_wrapperStyle, getRowShow, virtualRowIndexs, getColShow };
};

export default useTableVirtual;
