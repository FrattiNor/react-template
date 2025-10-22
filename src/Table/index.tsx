import useTableInstance from './TableHooks';
import type { TableDataItem } from './TableTypes/type';
import type { TableProps } from './TableTypes/typeProps';

const Table = <T extends TableDataItem>(props: TableProps<T>) => {
	useTableInstance(props);
	return <></>;
};

export default Table;
