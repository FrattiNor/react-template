import type { TableDataItem, ValueTypeKeys } from './type';
import type { TableColumns } from './typeColumn';

export type TableProps<T extends TableDataItem> = {
	// 数据源
	data?: Array<T>;
	// 列配置
	columns: TableColumns<T>;
	// 行key
	rowKey: ValueTypeKeys<T, string> | ((item: T, index: number) => string);
};
