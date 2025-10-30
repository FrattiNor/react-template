import type { TableDataItem } from '../TableTypes/type';
import type { TableProps } from '../TableTypes/typeProps';
import useTableColumns from './useTableColumns';
import useTableDomRef from './useTableDomRef';
import useTableRequiredProps from './useTableRequiredProps';

const useTableInstance = <T extends TableDataItem>(props: TableProps<T>) => {
	const tableDomRef = useTableDomRef();
	const tableColumns = useTableColumns(props);
	const tableRequiredProps = useTableRequiredProps(props);
	return { ...tableRequiredProps, ...tableDomRef, ...tableColumns };
};

export type TableInstance<T extends TableDataItem> = ReturnType<typeof useTableInstance<T>>;
export default useTableInstance;
