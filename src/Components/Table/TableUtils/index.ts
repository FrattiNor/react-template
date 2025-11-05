/* eslint-disable @typescript-eslint/no-explicit-any */
import { isValidElement, type ReactNode } from 'react';

import type { InnerColumnGroup, InnerColumn } from '../TableTypes/typeColumn';
import type { TableProps } from '../TableTypes/typeProps';

// 根据参数rowKey，获取【rowKey】
export const getRowKey = <T>(rowKey: TableProps<T>['rowKey'], item: T, index: number) => {
	if (typeof rowKey === 'function') return rowKey(item, index);
	return item[rowKey] as string;
};

// 是否为str或number
export const isStrNum = (element: ReactNode) => {
	return typeof element === 'string' || typeof element === 'number';
};

// 获取ReactNode标题，
export const getCellTitle = (element: ReactNode) => {
	if (isStrNum(element)) {
		return element.toString();
	} else if (isValidElement(element) && isStrNum((element.props as any).children)) {
		return String((element.props as any).children);
	}
	return undefined;
};

// 获取叶子column
export const getLeafColumn = <T>(splitColumns: Array<InnerColumnGroup<T> | InnerColumn<T> | null>) => {
	return splitColumns[splitColumns.length - 1] as InnerColumn<T>;
};

// 填充splitColumns，在叶子节点之前插入null
export const fillSplitColumns = <T>(splitColumns: Array<InnerColumnGroup<T> | InnerColumn<T> | null>, deepLevel: number) => {
	while (splitColumns.length < deepLevel + 1) {
		splitColumns.splice(splitColumns.length - 1, 0, null);
	}
};

// 获取Group的合成key，根据children的key合成
export const getGroupColumnMergeKey = <T>(
	splitColumnsArr: Array<Array<InnerColumnGroup<T> | InnerColumn<T> | null>>, // splitColumnsArr配置
	rowIndex: number, // 当前行
	deepLevel: number, // 最高行
	colIndexStart: number, // 当前列[start]
	colIndexEnd: number, // 当前列[end]
) => {
	const mergeKeyList = [];
	for (let row = rowIndex; row <= deepLevel; row++) {
		for (let col = colIndexStart; col <= colIndexEnd; col++) {
			const column = splitColumnsArr[col][row];
			if (column?.key) mergeKeyList.push(column.key);
		}
	}
	const mergeKey = mergeKeyList.join('_');
	return mergeKey;
};

// 将数字精度置为2
export const FixedTwo = (v: number) => {
	return Number(v.toFixed(2));
};
