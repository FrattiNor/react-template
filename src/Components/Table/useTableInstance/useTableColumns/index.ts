import { useMemo } from 'react';

import { fillSplitColumns, getLeafColumn } from '../../TableUtils';

import type { InnerColumn, InnerColumnGroup, TableColumn, TableColumnGroup } from '../../TableTypes/typeColumn';
import type { TableProps } from '../../TableTypes/typeProps';
import type useTableState from '../useTableState';

type Props<T> = {
	tableState: ReturnType<typeof useTableState>;
	props: TableProps<T>;
};

const useTableColumns = <T>({ props, tableState }: Props<T>) => {
	const { columns, bordered } = props;
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

		// colIndex
		let index = -1;
		// columns深度
		let deepLevel = -1;
		// 遍历columns
		const getSplitColumnsArr = (c: TableProps<T>['columns'], opt?: { level: number; parents: Array<InnerColumnGroup<T>> }) => {
			const level = opt?.level ?? 0;
			const parents = opt?.parents ?? [];
			const splitColumnsArrInner: Array<Array<InnerColumnGroup<T> | InnerColumn<T> | null>> = [];
			if (level > deepLevel) deepLevel = level;
			c.forEach((column) => {
				judgeSameKey(column.key);
				// isGroup
				if (Array.isArray(column.children)) {
					const current: InnerColumnGroup<T> = { ...(column as TableColumnGroup<T>) };
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					delete (current as any)['children'];
					splitColumnsArrInner.push(...getSplitColumnsArr(column.children, { level: level + 1, parents: [...parents, current] }));
				}
				// isColumn
				// 增加判断visible
				else if (visibleConf?.[column.key] === undefined || visibleConf?.[column.key] === true) {
					index++;
					const current: InnerColumn<T> = {
						...(column as TableColumn<T>),
						width: widthConf?.[column.key] ?? column.width ?? 150,
						level,
						index,
					};
					splitColumnsArrInner.push([...parents, current]);
				}
			});
			return splitColumnsArrInner;
		};
		// 获取splitColumnsArr
		const splitColumnsArr_01 = getSplitColumnsArr(columns);
		return { splitColumnsArr_01, deepLevel };
	}, [columns, widthConf, visibleConf]);
	// ======================================== part1 ========================================

	// ======================================== part2 ========================================
	const splitColumnsArr_02 = useMemo(() => {
		// 增加判断order
		if (sortConf) {
			return splitColumnsArr_01.sort((a, b) => {
				fillSplitColumns(a, deepLevel);
				fillSplitColumns(b, deepLevel);
				const aLeaf = getLeafColumn(a);
				const bLeaf = getLeafColumn(b);
				const aIndex = sortConf?.[aLeaf.key] ?? aLeaf.index;
				const bIndex = sortConf?.[bLeaf.key] ?? bLeaf.index;
				return aIndex - bIndex;
			});
		}
		return splitColumnsArr_01;
	}, [deepLevel, sortConf, splitColumnsArr_01]);
	// ======================================== part2 ========================================

	// ======================================== part3 ========================================
	const splitColumnsArr = useMemo(() => {
		if (sizeCacheMap.size === 0) {
			return [];
		}
		return splitColumnsArr_02;
	}, [sizeCacheMap, splitColumnsArr_02]);
	// ======================================== part3 ========================================

	// ======================================== part4 ========================================
	const { gridTemplateColumns, fixedLeftObj, fixedRightObj, fixedLeftArr, fixedRightArr } = useMemo(() => {
		// gridTemplateColumns
		let gridTemplateColumns = '';
		// index，当前column所在index
		// size，当前column的宽度
		// stickySize，sticky时left，right的数值
		// pingedSize，参与scroll计算pinged使用的size
		// leftTotalSize，作为中转的参数，对外无用
		const fixedLeftArr: { index: number; size: number; stickySize: number; pingedSize: number }[] = [];
		const fixedRightArr: { index: number; size: number; stickySize: number; pingedSize: number; leftTotalSize: number }[] = [];
		const fixedLeftObj: Record<string, { index: number; size: number; stickySize: number; pingedSize: number }> = {};
		const fixedRightObj: Record<string, { index: number; size: number; stickySize: number; pingedSize: number; leftTotalSize: number }> = {};
		//
		let totalSize = 0;
		let leftCalcSize = bordered === true ? -1 : 0;
		let leftPingedSize = leftCalcSize;
		//
		splitColumnsArr_02.forEach((splitColumns) => {
			const column = getLeafColumn(splitColumns);
			const sizeCache = sizeCacheMap.get(column.key);
			if (typeof sizeCache === 'number') {
				totalSize += sizeCache;
				gridTemplateColumns += gridTemplateColumns === '' ? `${sizeCache}px` : ` ${sizeCache}px`;

				if (column.fixed === 'left') {
					const fixedValue = {
						size: sizeCache,
						index: column.index,
						stickySize: leftCalcSize,
						pingedSize: leftPingedSize,
					};
					fixedLeftArr.push(fixedValue);
					fixedLeftObj[column.index] = fixedValue;
					leftCalcSize += sizeCache;
				} else {
					leftPingedSize += sizeCache;
				}

				if (column.fixed === 'right') {
					// stickySize, pingedSize 占位，避免ts报错
					fixedRightArr.unshift({
						size: sizeCache,
						stickySize: 0,
						pingedSize: 0,
						index: column.index,
						leftTotalSize: totalSize,
					});
				}
			}
		});

		let rightCalcSize = 0;
		fixedRightArr.forEach(({ size, leftTotalSize, index }, i) => {
			const stickySize = rightCalcSize;
			const pingedSize = totalSize - leftTotalSize - rightCalcSize;
			fixedRightArr[i].stickySize = stickySize;
			fixedRightArr[i].pingedSize = pingedSize;
			fixedRightObj[index] = fixedRightArr[i];
			rightCalcSize += size;
		});

		return { gridTemplateColumns, fixedLeftObj, fixedRightObj, fixedLeftArr, fixedRightArr };
	}, [bordered, splitColumnsArr_02, sizeCacheMap]);
	// ======================================== part4 ========================================

	return { splitColumnsArr_01, splitColumnsArr, gridTemplateColumns, deepLevel, fixedLeftObj, fixedRightObj, fixedLeftArr, fixedRightArr };
};

export default useTableColumns;
