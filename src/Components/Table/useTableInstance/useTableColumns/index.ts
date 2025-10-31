import { useMemo } from 'react';

import type { InnerColumn, InnerColumnGroup, TableColumn, TableColumnGroup } from '../../TableTypes/typeColumn';
import type { TableProps } from '../../TableTypes/typeProps';
import type useTableState from '../useTableState';

type Props<T> = {
	tableState: ReturnType<typeof useTableState>;
	props: TableProps<T>;
};

const useTableColumns = <T>({ props, tableState }: Props<T>) => {
	const columns = props.columns;
	const { sizeCache } = tableState;
	const { visibleConf, sortConf, widthConf } = props.columnConf ?? {};

	const { gridTemplateColumns, deepLevel, splitColumnsArr, leafColumns } = useMemo(() => {
		// 检测重复的columnKey
		const colKeysObj: Record<string, number> = {};
		const judgeSameKey = (key: string) => {
			if (colKeysObj[key] === 1) console.error(`same column key: ${key}`);
			colKeysObj[key] = (colKeysObj[key] ?? 0) + 1;
		};

		// colIndex
		let index = -1;
		// columns深度
		let deepLevel = -1;
		// 叶子节点
		const leafColumns: Array<InnerColumn<T>> = [];
		// gridTemplateColumns
		let gridTemplateColumns = '';
		const addGridTemplateColumns = (column: TableColumn<T>) => {
			const width = (() => {
				const sizeCacheWidth = sizeCache.get(column.key);
				if (typeof sizeCacheWidth === 'number') return sizeCacheWidth;
				const width = widthConf?.[column.key] ?? column.width;
				if (typeof width === 'number') return width;
				if (width === undefined) return 150;
				return 150;
			})();
			gridTemplateColumns += gridTemplateColumns === '' ? `${width}px` : ` ${width}px`;
		};

		// 遍历columns
		const getSplitColumns = (c: TableProps<T>['columns'], opt?: { level: number; parents: Array<InnerColumnGroup<T>> }) => {
			const level = opt?.level ?? 0;
			const parents = opt?.parents ?? [];
			const splitColumnsArr: Array<Array<InnerColumnGroup<T> | InnerColumn<T>>> = [];

			if (level > deepLevel) deepLevel = level;

			c.forEach((column) => {
				judgeSameKey(column.key);
				// isGroup
				if (Array.isArray(column.children)) {
					const current: InnerColumnGroup<T> = { ...(column as TableColumnGroup<T>), level };
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					delete (current as any)['children'];
					splitColumnsArr.push(...getSplitColumns(column.children, { level: level + 1, parents: [...parents, current] }));
				}
				// isColumn
				// 增加判断visible
				else if (visibleConf?.[column.key] === undefined || visibleConf?.[column.key] === true) {
					index++;
					addGridTemplateColumns(column as TableColumn<T>);
					const current: InnerColumn<T> = { ...(column as TableColumn<T>), level, index };
					splitColumnsArr.push([...parents, current].reverse());
					leafColumns.push(current);
				}
			});
			return splitColumnsArr;
		};

		let splitColumnsArr = getSplitColumns(columns);

		// 增加判断order
		if (sortConf) {
			splitColumnsArr = splitColumnsArr.sort((a, b) => {
				const aLeaf = a[0] as InnerColumn<T>;
				const bLeaf = b[0] as InnerColumn<T>;
				const aIndex = sortConf[aLeaf.key] ?? aLeaf.index;
				const bIndex = sortConf[bLeaf.key] ?? bLeaf.index;
				return aIndex - bIndex;
			});
		}

		return { gridTemplateColumns, deepLevel, splitColumnsArr, leafColumns };
	}, [sizeCache, visibleConf, sortConf, widthConf, columns]);

	return { gridTemplateColumns, deepLevel, splitColumnsArr, leafColumns };
};

export default useTableColumns;
