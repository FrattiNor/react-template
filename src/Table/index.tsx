import TableDom from './TableDom';
import useTableInstance from './TableHooks/useTableInstance';

import type { TableDataItem, TableProps } from './TableTypes/type';

const Table = <T extends TableDataItem>(props: TableProps<T>) => {
	const instance = useTableInstance<T>(props);
	return <TableDom instance={instance} />;
};

export default Table;
