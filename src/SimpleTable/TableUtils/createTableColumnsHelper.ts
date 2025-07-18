import type { TableDataItem } from '../TableTypes/type';
import type { TableColumn, TableColumnGroup } from '../TableTypes/typeColumn';

// 帮助创建TableColumns
const createTableColumnsHelper = <T extends TableDataItem>() => {
	const createColumn = (column: Omit<TableColumn<T>, 'type'>) => ({ type: 'column', ...column }) as TableColumn<T>;
	const createGroup = (group: Omit<TableColumnGroup<T>, 'type'>) => ({ type: 'group', ...group }) as TableColumnGroup<T>;
	return { createColumn, createGroup };
};

export default createTableColumnsHelper;
