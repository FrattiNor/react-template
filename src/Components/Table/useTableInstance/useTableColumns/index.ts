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

	// const { visible, order, width } = props.columnConf ?? {};

	const { gridTemplateColumns, deepIndex, splitColumns, leafColumns } = useMemo(() => {
		let index = -1;
		let deepIndex = -1;
		let gridTemplateColumns = '';
		const leafColumns: Array<InnerColumn<T>> = [];

		// 检测重复的columnKey
		const colKeysObj: Record<string, number> = {};
		const judgeSameKey = (key: string) => {
			if (colKeysObj[key] === 1) console.error(`same column key: ${key}`);
			colKeysObj[key] = (colKeysObj[key] ?? 0) + 1;
		};

		const addGridTemplateColumns = (column: TableColumn<T>) => {
			const width = (() => {
				const sizeCacheWidth = sizeCache.get(column.key);
				if (typeof sizeCacheWidth === 'number') return sizeCacheWidth;
				if (typeof column.width === 'number') return column.width;
				if (column.width === undefined) return 150;
				return 150;
			})();
			gridTemplateColumns += gridTemplateColumns === '' ? `${width}px` : ` ${width}px`;
		};

		const getSplitColumns = (c: TableProps<T>['columns'], opt?: { level: number; parents: Array<InnerColumnGroup<T>> }) => {
			const level = opt?.level ?? 0;
			const parents = opt?.parents ?? [];
			const splitColumns: Array<Array<InnerColumnGroup<T> | InnerColumn<T>>> = [];

			if (level > deepIndex) deepIndex = level;

			c.forEach((item) => {
				judgeSameKey(item.key);
				// isGroup
				if (Array.isArray(item.children)) {
					const current: InnerColumnGroup<T> = { ...(item as TableColumnGroup<T>), level };
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					delete (current as any)['children'];
					splitColumns.push(...getSplitColumns(item.children, { level: level + 1, parents: [...parents, current] }));
				}
				// isColumn
				else {
					index++;
					addGridTemplateColumns(item as TableColumn<T>);
					const current: InnerColumn<T> = { ...(item as TableColumn<T>), level, index };
					splitColumns.push([...parents, current]);
					leafColumns.push(current);
				}
			});
			return splitColumns;
		};

		const splitColumns = getSplitColumns(columns);

		console.log('leafColumns', leafColumns);

		return { gridTemplateColumns, deepIndex, splitColumns, leafColumns };
	}, [sizeCache, columns]);

	return { gridTemplateColumns, deepIndex, splitColumns, leafColumns };
};

export default useTableColumns;
