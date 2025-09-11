import { useMemo } from 'react';
import type { TableDataItem, TableProps } from '../../TableTypes/type';
import type { TableColumn, TableColumnGroup } from '../../TableTypes/typeColumn';

type Props<T extends TableDataItem> = {
	props: TableProps<T>;
};

// table props处理
const useTableProps = <T extends TableDataItem>({ props }: Props<T>) => {
	const { columns, ...restProps } = props;

	const { columnsFlat } = useMemo(() => {
		const columnsFlat: Array<TableColumn<T>> = [];
		const columnGroups: Array<Array<TableColumnGroup<T>>> = [];

		const addColumnGroup = (column: TableColumnGroup<T>, level: number) => {
			if (columnGroups[level] === undefined) columnGroups[level] = [];
			columnGroups[level].push(column);
		};

		const loopColumns = (columns: Array<TableColumnGroup<T> | TableColumn<T>>, cover: { fixed?: TableColumn<T>['fixed'] }, level: number) => {
			columns.forEach((_column) => {
				const column = { ..._column, ...cover };
				// 存在children一定是group
				if (Array.isArray(column.children)) {
					addColumnGroup(column as TableColumnGroup<T>, level);
					loopColumns(column.children, { fixed: column.fixed ?? undefined }, level + 1);
				} else {
					columnsFlat.push(column as TableColumn<T>);
				}
			});
		};
		loopColumns(columns, {}, 0);
		console.log('columnsFlat', columnsFlat);
		console.log('columnGroups', columnGroups);
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
		columnsFlat,
		columnsKeys,
		columnsFixedKeys,
	};
};

export default useTableProps;
