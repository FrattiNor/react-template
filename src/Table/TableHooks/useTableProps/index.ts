/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from 'react';
import type { TableDataItem, TableProps } from '../../TableTypes/type';
import type { TableColumn, TableColumnGroup } from '../../TableTypes/typeColumn';
import { FixedTwo } from '../../TableUtils';

type HeaderColumnGroup<T extends TableDataItem> = Omit<TableColumnGroup<T> & { level: number; startIndex: number; endIndex: number }, 'children'>;
type HeaderColumn<T extends TableDataItem> = Omit<TableColumn<T> & { level: number }, 'children'>;

type Props<T extends TableDataItem> = {
	props: TableProps<T>;
};

// table props处理
const useTableProps = <T extends TableDataItem>({ props }: Props<T>) => {
	const { columns, ...restProps } = props;

	const { columnsFlat, columnGroups } = useMemo(() => {
		let colIndex = -1;
		const columnsFlat: Array<HeaderColumn<T>> = [];
		const columnGroups: Array<Array<HeaderColumnGroup<T>>> = [];
		const keys: Record<string, boolean> = {};

		// 校验重复的columnKey
		const judgeSameKey = (key: string) => {
			if (keys[key] === true) console.error(`same key: ${key}`);
			keys[key] = true;
		};

		// 根据level添加HeadGroup
		const addColumnGroup = (column: HeaderColumnGroup<T>) => {
			if (columnGroups[column.level] === undefined) columnGroups[column.level] = [];
			delete (column as any)['children'];
			columnGroups[column.level].push(column);
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
					columnsFlat.push({ ...(column as TableColumn<T>), level });
				}
			});
		};

		loopColumns(columns, {}, 0);

		return { columnGroups, columnsFlat };
	}, [columns]);

	const { columnsKeys, columnsFixedKeys } = useMemo(() => {
		let columnsKeys = '';
		let columnsFixedKeys = '';
		columnsFlat.forEach((item) => {
			columnsKeys += `_${item.key}`;
			columnsFixedKeys += `_${item.key}&${item.fixed ?? 'default'}`;
		});
		return { columnsKeys, columnsFixedKeys };
	}, [columnsFlat]);

	return {
		...restProps,
		columnGroups,
		columnsFlat,
		columnsKeys,
		columnsFixedKeys,
		rowHeight: restProps.rowHeight ? FixedTwo(restProps.rowHeight) : 46,
	};
};

export default useTableProps;
