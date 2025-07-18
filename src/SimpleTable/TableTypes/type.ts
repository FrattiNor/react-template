/* eslint-disable @typescript-eslint/no-explicit-any */
import type { TableColumns } from './type_column';

export type TableDataItem = Record<string, any>;

export type TableProps<T extends TableDataItem> = {
	data: Array<T>;
	columns: TableColumns<T>;
	rowKey: keyof T | ((item: T, index: number) => string);
};
