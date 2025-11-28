import { useMemo } from 'react';

import { getLeafColumn } from '../../TableUtils';

import type { TableColumn, TableColumnGroup } from '../../TableTypes/typeColumn';
import type { TableProps } from '../../TableTypes/typeProps';
import type useTableState from '../useTableState';

type Props<T> = {
	tableState: ReturnType<typeof useTableState>;
	props: TableProps<T>;
};

const useTableColumns = <T>({ props, tableState }: Props<T>) => {
	const { columns } = props;
	const { sizeCacheMap } = tableState;
	const { visibleConf, sortConf, widthConf } = props.columnConf ?? {};

	// ======================================== part1 ========================================
	const { splitColumnsArr_01, deepLevel } = useMemo(() => {
		// 检测重复的columnKey
		const colKeysObj: Record<string, number> = {};
		const judgeSameKey = (key: string) => {
			if (colKeysObj[key] === 1) console.error(`same column key: ${key}`);
			colKeysObj[key] = (colKeysObj[key] ?? 0) + 1;
		};

		//
		let index = 0;
		// columns深度
		let deepLevel = 0;
		//
		const keyIndexMap = new Map<string, number>();
		// 遍历columns
		const getSplitColumnsArr = (c: TableProps<T>['columns'], opt?: { parents: Array<TableColumnGroup<T>> }) => {
			const parents = opt?.parents ?? [];
			const splitColumnsArrInner: Array<Array<TableColumnGroup<T> | TableColumn<T>>> = [];
			if (parents.length > deepLevel) deepLevel = parents.length;
			c.forEach((column) => {
				judgeSameKey(column.key);
				// isGroup
				if (Array.isArray(column.children)) {
					const current: TableColumnGroup<T> = { ...(column as TableColumnGroup<T>) };
					delete (current as any)['children'];
					splitColumnsArrInner.push(...getSplitColumnsArr(column.children, { parents: [current, ...parents] }));
				}
				// isColumn
				// 判断visible & 覆盖width
				else if (visibleConf?.[column.key] === undefined || visibleConf?.[column.key] === true) {
					const current: TableColumn<T> = {
						...(column as TableColumn<T>),
						width: widthConf?.[column.key] ?? column.width ?? 150,
					};
					splitColumnsArrInner.push([current, ...parents]);
					keyIndexMap.set(column.key, index);
					index++;
				}
			});
			return splitColumnsArrInner;
		};

		// 获取splitColumnsArr
		let splitColumnsArr_01 = getSplitColumnsArr(columns);

		// 增加判断order
		if (sortConf) {
			splitColumnsArr_01 = splitColumnsArr_01.sort((a, b) => {
				const aLeaf = getLeafColumn(a);
				const bLeaf = getLeafColumn(b);
				const aIndex = sortConf?.[aLeaf.key] ?? keyIndexMap.get(aLeaf.key) ?? Infinity;
				const bIndex = sortConf?.[bLeaf.key] ?? keyIndexMap.get(bLeaf.key) ?? Infinity;
				return aIndex - bIndex;
			});
		}

		return { splitColumnsArr_01, deepLevel };
	}, [columns, widthConf, visibleConf, sortConf]);
	// ======================================== part1 ========================================

	// ======================================== part2 ========================================
	const { splitColumnsArr, gridTemplateColumns, fixedLeftMap, fixedRightMap, columnsKeyIndexMap } = useMemo(() => {
		// gridTemplateColumns
		let gridTemplateColumns = '';
		// index，当前column所在index
		// size，当前column的宽度
		// stickySize，sticky时left，right的数值
		// pingedSize，参与scroll计算pinged使用的size
		// leftTotalSize，作为中转的参数，对外无用
		type FixedLeftItem = { key: string; index: number; size: number; stickySize: number; pingedSize: number };
		type FixedRightItem = { key: string; index: number; size: number; stickySize: number; pingedSize: number; leftTotalSize: number };
		const fixedRightArr: FixedRightItem[] = [];
		const fixedLeftMap = new Map<string, FixedLeftItem>();
		const fixedRightMap = new Map<string, FixedRightItem>();
		//
		let totalSize = 0;
		let leftCalcSize = 0;
		let leftPingedSize = leftCalcSize;
		//
		let index = 0;
		const columnsKeyIndexMap = new Map<string, number>();
		const splitColumnsArr: Array<Array<TableColumnGroup<T> | TableColumn<T>>> = [];
		splitColumnsArr_01.forEach((splitColumns) => {
			const leafColumn = getLeafColumn(splitColumns);
			const sizeCache = sizeCacheMap.get(leafColumn.key);
			if (typeof sizeCache === 'number') {
				totalSize += sizeCache;
				splitColumnsArr.push(splitColumns);
				gridTemplateColumns += gridTemplateColumns === '' ? `${sizeCache}px` : ` ${sizeCache}px`;

				if (leafColumn.fixed === 'left') {
					fixedLeftMap.set(leafColumn.key, {
						index,
						key: leafColumn.key,
						size: sizeCache,
						stickySize: leftCalcSize,
						pingedSize: leftPingedSize,
					});
					leftCalcSize += sizeCache;
				} else {
					leftPingedSize += sizeCache;
				}

				if (leafColumn.fixed === 'right') {
					// stickySize, pingedSize 占位，避免ts报错
					fixedRightArr.unshift({
						index,
						stickySize: 0,
						pingedSize: 0,
						size: sizeCache,
						key: leafColumn.key,
						leftTotalSize: totalSize,
					});
				}

				columnsKeyIndexMap.set(leafColumn.key, index);
				index++;
			}
		});

		let rightCalcSize = 0;
		fixedRightArr.forEach(({ key, size, leftTotalSize }, i) => {
			const stickySize = rightCalcSize;
			const pingedSize = totalSize - leftTotalSize - rightCalcSize;
			fixedRightArr[i].stickySize = stickySize;
			fixedRightArr[i].pingedSize = pingedSize;
			fixedRightMap.set(key, fixedRightArr[i]);
			rightCalcSize += size;
		});

		return { splitColumnsArr, gridTemplateColumns, fixedLeftMap, fixedRightMap, columnsKeyIndexMap };
	}, [splitColumnsArr_01, sizeCacheMap]);
	// ======================================== part2 ========================================

	return { splitColumnsArr_01, splitColumnsArr, gridTemplateColumns, deepLevel, fixedLeftMap, fixedRightMap, columnsKeyIndexMap };
};

export default useTableColumns;
