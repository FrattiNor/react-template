// import type { TableDataItem } from '../TableTypes/type';
// import type { TableColumns, TableColumn, TableColumnGroup } from '../TableTypes/typeColumn';

// type HandledColumn<T extends TableDataItem> = {
// 	level: number;
// 	start: number;
// 	end: number;
// 	column: TableColumn<T> | TableColumnGroup<T> | undefined;
// };

// 获取平铺的columns
// 同时验证columnKey是否存在和重复
// const getFlatColumns = <T extends TableDataItem>(columns: TableColumns<T>) => {
// const columnsRecordKeys: Record<string, true> = {};
// const loop = (columns: TableColumns<T>, start: number, level: number) => {
// 	const handledColumns: HandledColumn<T>[] = [];
// 	columns.forEach((column, index) => {
// 		if (column.type === 'group' && Array.isArray(column.children) && column.children.length > 0) {
// 			loop(column.children);
// 		}
// 		if (column.type === 'column' || column.type === undefined) {
// 			handledColumns.push({
// 				level,
// 				start: start + index,
// 				end: start + index + 1,
// 				column: column,
// 			});
// 		}
// 		// 判断columnKey是否未填或重复
// 		// const columnKey = column.key as string;
// 		// if (typeof columnKey !== 'string') {
// 		// 	console.warn(`column key is ${columnKey}`);
// 		// } else {
// 		// 	if (columnsRecordKeys[columnKey] === true) console.warn(`same column key ${columnKey}`);
// 		// 	columnsRecordKeys[columnKey] = true;
// 		// }
// 	});
// };
// loop(columns, 0, 0);
// return handledColumns;
// };

// export default getFlatColumns;
