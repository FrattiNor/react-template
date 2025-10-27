import type { TableDataItem } from './TableTypes/type';
import type { TableProps } from './TableTypes/typeProps';

const Table = <T extends TableDataItem>(props: TableProps<T>) => {
	return <div />;
};

export default Table;
