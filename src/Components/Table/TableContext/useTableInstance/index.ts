import type { TableDataItem } from '../../TableTypes/type';
import type { TableProps } from '../../TableTypes/typeProps';
import useTableColumns from './useTableColumns';
import useTableData from './useTableData';
import useTableDomRef from './useTableDomRef';

const useTableInstance = <T extends TableDataItem>(props: TableProps<T>) => {
	const tableDomRef = useTableDomRef();
	const tableColumns = useTableColumns(props);
	const tableData = useTableData(props);
	return { props, tableDomRef, tableColumns, tableData };
};

export default useTableInstance;
