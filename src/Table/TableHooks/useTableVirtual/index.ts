import type { TableDataItem } from '../../TableTypes/type';
import type useTableDomRef from '../useTableDomRef';
import type useTableProps from '../useTableProps';
import type useTableState from '../useTableState';
import type useTableTools from '../useTableTools';
import useTableVVirtual from './useTableVVirtual';
import useTableHVirtual from './useTableHVirtual';

type Props<T extends TableDataItem> = {
	tableProps: ReturnType<typeof useTableProps<T>>;
	tableDomRef: ReturnType<typeof useTableDomRef>;
	tableState: ReturnType<typeof useTableState>;
	tableTools: ReturnType<typeof useTableTools<T>>;
};

const useTableVirtual = <T extends TableDataItem>({ tableProps, tableDomRef, tableState, tableTools }: Props<T>) => {
	const { HV, getColShow } = useTableHVirtual({ tableProps, tableDomRef, tableState });
	const { VV, VVWrapperStyle, getRowShow } = useTableVVirtual({ tableProps, tableDomRef, tableTools });
	return { HV, VV, VVWrapperStyle, getRowShow, getColShow };
};

export default useTableVirtual;
