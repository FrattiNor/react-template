import type { TableDataItem, ValueTypeKeys } from './type';
import type { TableColumns } from './typeColumn';

export type TableProps<T extends TableDataItem> = {
	//
	logRender?: {
		table?: boolean;
		tableDom?: boolean;
		body?: boolean;
		bodyRow?: boolean;
		bodyCell?: boolean;
		head?: boolean;
		headRow?: boolean;
		headCell?: boolean;
	};
	// 数据源
	data?: Array<T>;
	// 列配置
	columns: TableColumns<T>;
	// 行key
	rowKey: ValueTypeKeys<T, string> | ((item: T, index: number) => string);
	// 边框样式
	bordered?: boolean;
};
