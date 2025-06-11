import type { TableProps } from '../type';
import useTableDomRef from './useTableDomRef';

const useTable = <T>(props: TableProps<T>) => {
	const tableDomRef = useTableDomRef();
	return { tableDomRef };
};

export default useTable;
