import type { TableDataItem, TableProps } from '../TableTypes/type';
import useTableDomRef from './useTableDomRef';

const useTableInstance = <T extends TableDataItem>(props: TableProps<T>) => {
	const tableDomRef = useTableDomRef();
	return { props, tableDomRef };
};

export default useTableInstance;
