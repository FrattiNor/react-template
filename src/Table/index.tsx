import type { TableDataItem, TableProps } from './TableTypes/type';
import TableDom from './TableDom';
import { TableContext } from './TableContext';
import useTableInstance from './TableHooks/useTableInstance';
import type { TableInstance } from './TableHooks/type';

const Table = <T extends TableDataItem>(props: TableProps<T>) => {
	const tableInstance = useTableInstance<T>(props);

	return (
		<TableContext value={tableInstance as TableInstance<TableDataItem>}>
			<TableDom />
		</TableContext>
	);
};

export default Table;
