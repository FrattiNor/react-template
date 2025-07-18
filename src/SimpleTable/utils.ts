import type { TableDataItem } from './TableTypes/type';
import type { TableColumn, TableColumns } from './TableTypes/type_column';

export const getFlatColumns = <T extends TableDataItem>(columns: TableColumns<T>) => {
	const flatColumns: TableColumn<T>[] = [];
	const columnsRecordKeys: Record<string, true> = {};
	const loop = (columns: TableColumns<T>) => {
		columns.forEach((column) => {
			if (column.type === 'group' && Array.isArray(column.children) && column.children.length > 0) {
				loop(column.children);
			}
			if (column.type === 'column') {
				flatColumns.push(column);
			}
			// 判断columnKey是否未填或重复
			const columnKey = column.key as string;
			if (typeof columnKey !== 'string') {
				console.warn(`column key is ${columnKey}`);
			} else {
				if (columnsRecordKeys[columnKey] === true) console.warn(`same column key ${columnKey}`);
				columnsRecordKeys[columnKey] = true;
			}
		});
	};
	loop(columns);
	return flatColumns;
};
