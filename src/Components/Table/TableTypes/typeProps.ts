import type { TableColumnWidth, TableDataItem } from './type';
import type { TableColumns } from './typeColumn';
import type { ValueTypeKeys } from './typeUtil';

type TableRowKey<T> = ValueTypeKeys<T, string> | ((item: T, index: number) => string);

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
	data: Array<T>;
	// 列配置
	columns: TableColumns<T>;
	// 行key
	rowKey: TableRowKey<T>;
	// 边框样式
	bordered?: boolean;
	//
	columnsConf?: {
		order?: Record<string, number>;
		visible?: Record<string, boolean>;
		width?: Record<string, TableColumnWidth>;
	};
};
