import useTableCellBg from './useTableCellBg';
import useTableColumns from './useTableColumns';
import useTableDomRef from './useTableDomRef';
import useTableRequiredProps from './useTableRequiredProps';
import useTableResize from './useTableResize';
import useTableState from './useTableState';
import useTableSticky from './useTableSticky';

import type { TableProps } from '../TableTypes/typeProps';

const useTableInstance = <T>(props: TableProps<T>) => {
	const tableState = useTableState();
	const tableRequiredProps = useTableRequiredProps(props);
	const tableColumns = useTableColumns({ tableState, props });
	const tableDomRef = useTableDomRef({ tableState });
	const tableSticky = useTableSticky({ tableState, tableColumns });
	const tableResize = useTableResize({ tableState, tableRequiredProps, tableColumns });
	const tableCellBg = useTableCellBg({ tableState, tableRequiredProps });
	return { ...tableState, ...tableRequiredProps, ...tableDomRef, ...tableColumns, ...tableSticky, ...tableResize, ...tableCellBg };
};

export type TableInstance<T> = ReturnType<typeof useTableInstance<T>>;
export default useTableInstance;
