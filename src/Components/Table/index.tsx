import TableDom from './TableDom';
import useTableInstance from './TableHooks/useTableInstance';

import type { TableDataItem } from './TableTypes/type';
import type { TableProps } from './TableTypes/typeProps';

const Table = <T extends TableDataItem>(props: TableProps<T>) => {
	const instance = useTableInstance<T>(props);
	return <TableDom instance={instance} />;
};

export default Table;
