/* eslint-disable @typescript-eslint/no-explicit-any */
import type { TableColumns } from './typeColumn';

type ValueTypeKeys<T, Type> = { [K in keyof T]: T[K] extends Type ? K : never }[keyof T];

export type TableDataItem = Record<string, any>;

export type TableProps<T extends TableDataItem> = {
	data: Array<T>;
	columns: TableColumns<T>;
	rowKey: ValueTypeKeys<T, string> | ((item: T, index: number) => string);
	bordered?: boolean;
};
