/* eslint-disable @typescript-eslint/no-explicit-any */
import type { TableColumns } from './typeColumn';

type ValueTypeKeys<T, Type> = { [K in keyof T]: T[K] extends Type ? K : never }[keyof T];

export type TableDataItem = Record<string, any>;

export type TableProps<T extends TableDataItem> = {
	// 数据源
	data: Array<T>;
	// 列配置
	columns: TableColumns<T>;
	// 行key
	rowKey: ValueTypeKeys<T, string> | ((item: T, index: number) => string);
	// 边框样式
	bordered?: boolean;
	// 行高
	rowHeight?: number;
	// TODO 全局高亮关键字
	highlightKeywords?: string[];
	// TODO 拖动修改大小的回调，用于保存列宽配置
	onResizeEnd?: (widths: Record<string, number>) => void;
	// TODO 表格loading状态
	loading?: boolean;
	// TODO 表格可展开
	expandable?: undefined;
	// TODO 表格可选中
	rowSelection?: undefined;
};
