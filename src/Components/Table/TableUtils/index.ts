import type { TableDataItem } from '../TableTypes/type';
import type { TableProps } from '../TableTypes/typeProps';

export const getRowKey = <T extends TableDataItem>(rowKey: TableProps<T>['rowKey'], item: T, index: number) => {
	if (typeof rowKey === 'function') return rowKey(item, index);
	return item[rowKey] as string;
};
