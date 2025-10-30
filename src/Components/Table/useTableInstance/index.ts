import useTableColumns from './useTableColumns';
import useTableDomRef from './useTableDomRef';
import useTableRequiredProps from './useTableRequiredProps';
import useTableState from './useTableState';

import type { TableProps } from '../TableTypes/typeProps';

const useTableInstance = <T>(props: TableProps<T>) => {
	const tableState = useTableState();
	const tableDomRef = useTableDomRef({ tableState });
	const tableColumns = useTableColumns({ tableState, props });
	const tableRequiredProps = useTableRequiredProps(props);
	return { ...tableState, ...tableRequiredProps, ...tableDomRef, ...tableColumns };
};

export type TableInstance<T> = ReturnType<typeof useTableInstance<T>>;
export default useTableInstance;
