/* eslint-disable @typescript-eslint/no-explicit-any */
import { isValidElement, type ReactNode } from 'react';

import type { TableDataItem } from '../TableTypes/type';
import type { TableProps } from '../TableTypes/typeProps';

export const getRowKey = <T extends TableDataItem>(rowKey: TableProps<T>['rowKey'], item: T, index: number) => {
	if (typeof rowKey === 'function') return rowKey(item, index);
	return item[rowKey] as string;
};

export const isStrNum = (element: ReactNode) => {
	return typeof element === 'string' || typeof element === 'number';
};

export const getCellTitle = (element: ReactNode) => {
	if (isStrNum(element)) {
		return element.toString();
	} else if (isValidElement(element) && isStrNum((element.props as any).children)) {
		return String((element.props as any).children);
	}
	return undefined;
};
