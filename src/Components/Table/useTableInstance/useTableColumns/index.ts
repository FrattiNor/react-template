import { useMemo } from 'react';

import type { TableColumnWidth, TableDataItem } from '../../TableTypes/type';
import type { InnerColumn, InnerColumnGroup, TableColumn, TableColumnGroup } from '../../TableTypes/typeColumn';
import type { TableProps } from '../../TableTypes/typeProps';

const colKeysObj: Record<string, number> = {};
// 检测重复的columnKey
const judgeSameKey = (key: string) => {
	if (colKeysObj[key] === 1) console.error(`same column key: ${key}`);
	colKeysObj[key] = (colKeysObj[key] ?? 0) + 1;
};

const getWidth = (width?: TableColumnWidth) => {
	if (width === undefined) return 150;
	if (typeof width === 'number') return width;
	return 150;
};

const useTableColumns = <T extends TableDataItem>(props: TableProps<T>) => {
	const columns = props.columns;
	// const { visible, order, width } = props.columnsConf ?? {};

	const { gridTemplateColumns, flatColumns, groupColumns } = useMemo(() => {
		let index = -1;
		let gridTemplateColumns = '';
		const flatColumns: Array<InnerColumn<T>> = [];
		const groupColumns: Array<Array<InnerColumnGroup<T>>> = [];

		const addGroup = (item: InnerColumnGroup<T>) => {
			if (groupColumns[item.level] === undefined) groupColumns[item.level] = [];
			groupColumns[item.level].push(item);
		};

		const addFlat = (item: InnerColumn<T>) => {
			flatColumns.push(item);
		};

		const addGridTemplateColumns = (width: number) => {
			gridTemplateColumns += gridTemplateColumns === '' ? `${width}px` : ` ${width}px`;
		};

		const loopColumns = (c: TableProps<T>['columns'], level: number = 0) => {
			c.forEach((item) => {
				judgeSameKey(item.key);
				// isGroup
				if (Array.isArray(item.children)) {
					const startIndex = index + 1;
					loopColumns(item.children);
					const endIndex = index;
					addGroup({ ...(item as TableColumnGroup<T>), startIndex, endIndex, level });
				}
				// isColumn
				else {
					index++;
					addGridTemplateColumns(getWidth(item.width));
					addFlat({ ...(item as TableColumn<T>), index, level });
				}
			});
		};

		loopColumns(columns);

		return { gridTemplateColumns, flatColumns, groupColumns };
	}, [columns]);

	return { gridTemplateColumns, flatColumns, groupColumns };
};

export default useTableColumns;
