import useTableHVirtual from './useTableHVirtual';
import useTableVVirtual from './useTableVVirtual';

import type { TableDataItem } from '../../TableTypes/type';
import type useTableColumn from '../useTableColumn';
import type useTableDomRef from '../useTableDomRef';
import type useTableProps from '../useTableProps';
import type useTableState from '../useTableState';
import type useTableTools from '../useTableTools';

type Props<T extends TableDataItem> = {
	tableProps: ReturnType<typeof useTableProps<T>>;
	tableDomRef: ReturnType<typeof useTableDomRef>;
	tableState: ReturnType<typeof useTableState>;
	tableTools: ReturnType<typeof useTableTools<T>>;
	tableColumn: ReturnType<typeof useTableColumn<T>>;
};

const useTableVirtual = <T extends TableDataItem>({ tableColumn, tableProps, tableDomRef, tableState, tableTools }: Props<T>) => {
	const { getColShow } = useTableHVirtual({ tableColumn, tableDomRef, tableState });
	const { VV_measureElement, VV_WrapperStyle, getRowShow } = useTableVVirtual({ tableProps, tableDomRef, tableTools });
	return { VV_measureElement, VV_WrapperStyle, getRowShow, getColShow };
};

export default useTableVirtual;
