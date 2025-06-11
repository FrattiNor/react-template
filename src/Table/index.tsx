import type { TableProps } from './type';
import useTable from './useTable';

const Table = <T,>(props: TableProps<T>) => {
	useTable(props);
	return <></>;
};

export default Table;
