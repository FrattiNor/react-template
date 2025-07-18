import type { TableDataItem, TableProps } from '../TableTypes/type';
import useTableDomRef from './useTableDomRef';
import useTableColumns from './useTableColumns';

const useTableInstance = <T extends TableDataItem>(props: TableProps<T>) => {
	const tableDomRef = useTableDomRef();
	const tableColumns = useTableColumns({ columns: props.columns });
	return { props, tableDomRef, tableColumns };
};

export default useTableInstance;
