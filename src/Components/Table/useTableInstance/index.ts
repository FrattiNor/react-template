import useTableColumns from './useTableColumns';
import useTableDomRef from './useTableDomRef';
import useTableRequiredProps from './useTableRequiredProps';
import useTableState from './useTableState';
import useTableSticky from './useTableSticky';

import type { TableProps } from '../TableTypes/typeProps';

const useTableInstance = <T>(props: TableProps<T>) => {
	const tableState = useTableState();
	const tableRequiredProps = useTableRequiredProps(props);
	const tableColumns = useTableColumns({ tableState, props });
	const tableDomRef = useTableDomRef({ tableState, tableColumns });
	const tableSticky = useTableSticky({ tableState, tableColumns });
	return { ...tableState, ...tableRequiredProps, ...tableDomRef, ...tableColumns, ...tableSticky };
};

export type TableInstance<T> = ReturnType<typeof useTableInstance<T>>;
export default useTableInstance;
