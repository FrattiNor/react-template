import { useMemo } from 'react';

import type { TableDataItem, TableProps } from '../../TableTypes/type';
import type { InnerColumn, InnerColumnGroup, TableColumnGroup, TableColumn } from '../../TableTypes/typeColumn';
import type useTableProps from '../useTableProps';
import type useTableRowSelection from '../useTableRowSelection';

type Props<T extends TableDataItem> = {
	tableProps: ReturnType<typeof useTableProps<T>>;
	tableRowSelection: ReturnType<typeof useTableRowSelection<T>>;
};

// column处理
const useTableColumn = <T extends TableDataItem>({ tableProps, tableRowSelection }: Props<T>) => {
	// 内部使用，使用断言赋予类别
	const { columns } = tableProps as TableProps<T>;
	const { rowSelectionColumn } = tableRowSelection;

	// 遍历columns
	const { columnsFlat, columnGroups, columnsWidthKeys, columnsFixedKeys } = useMemo(() => {
		let colIndex = -1;
		let columnsWidthKeys = '';
		let columnsFixedKeys = '';
		const columnsFlat: Array<InnerColumn<T>> = [];
		const columnGroups: Array<Array<InnerColumnGroup<T>>> = [];
		const colKeysObj: Record<string, number> = {};

		// 检测重复的columnKey
		const judgeSameKey = (key: string) => {
			if (colKeysObj[key] === 1) console.error(`same column key: ${key}`);
			colKeysObj[key] = (colKeysObj[key] ?? 0) + 1;
		};

		// 根据level添加HeadGroup
		const addColumnGroup = (column: InnerColumnGroup<T>) => {
			if (columnGroups[column.level] === undefined) columnGroups[column.level] = [];
			delete (column as any)['children'];
			columnGroups[column.level].push(column);
		};

		// 添加column
		const addColumnFlat = (column: InnerColumn<T>) => {
			columnsFlat.push(column);
			columnsWidthKeys += `_${column.key}&${column.width ?? 'default'}_`;
			columnsFixedKeys += `_${column.key}&${column.fixed ?? 'default'}_`;
		};

		// 递归遍历columns
		const loopColumns = (columns: Array<TableColumnGroup<T> | TableColumn<T>>, cover: { fixed?: TableColumn<T>['fixed'] }, level: number) => {
			columns.forEach((_column) => {
				judgeSameKey(_column.key);
				const column = { ..._column, ...cover };
				// 存在children一定是group
				if (Array.isArray(column.children)) {
					const startIndex = colIndex + 1;
					loopColumns(column.children, { fixed: column.fixed ?? undefined }, level + 1);
					const endIndex = colIndex;
					addColumnGroup({ ...(column as TableColumnGroup<T>), level, startIndex, endIndex });
				} else {
					colIndex++;
					addColumnFlat({ ...(column as TableColumn<T>), level });
				}
			});
		};

		const totalColumns = [...columns];
		if (rowSelectionColumn) totalColumns.unshift(rowSelectionColumn);
		loopColumns(totalColumns, {}, 0);

		return { columnGroups, columnsFlat, columnsWidthKeys, columnsFixedKeys };
	}, [columns, rowSelectionColumn]);

	return {
		columnGroups,
		columnsFlat,
		columnsWidthKeys,
		columnsFixedKeys,
	};
};

export default useTableColumn;
