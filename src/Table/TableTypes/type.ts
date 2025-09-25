import type { Dispatch, ReactNode, SetStateAction } from 'react';

import type { TableColumns } from './typeColumn';

type ValueTypeKeys<T, Type> = { [K in keyof T]: T[K] extends Type ? K : never }[keyof T];

export type TableDataItem = Record<string, any>;

export type TableHighlightConfig = {
	// 清除首尾空格【默认false】
	trim?: boolean;
	// 自动转义【默认false】
	autoEscape?: boolean;
	// 大小写敏感【默认false】
	caseSensitive?: boolean;
};

export type TableFilter = {
	// 已筛选，对应icon高亮
	filtered: boolean;
	// 列高亮关键字
	highlightKeywords?: string[];
	// 渲染筛选组件
	renderFilter: ({ close }: { close: () => void }) => ReactNode;
};

export type TableRowSelection<T extends TableDataItem> = {
	// 外置选中key
	selectedRowKeys?: string[];
	// 外置选中key变更回调
	onSelectedRowKeysChange?: Dispatch<SetStateAction<string[]>>;
	// 获取checkbox的参数
	getCheckboxProps?: (item: T) => { disabled?: boolean };
	// TODO 主动清理选中key【data变更时自动删除不存在的key】
	autoCleanByData?: boolean;
};

export type TableRowBgHighlight = {
	// hover
	rowHover?: boolean;
	// click
	rowClick?: boolean;
	// select
	rowSelect?: boolean;
};

export type TableProps<T extends TableDataItem> = {
	// TODO 主题 dark需优化
	theme?: 'light' | 'dark';
	// 数据源
	data?: Array<T>;
	// 列配置
	columns: TableColumns<T>;
	// 行key
	rowKey: ValueTypeKeys<T, string> | ((item: T, index: number) => string);
	// 边框样式
	bordered?: boolean;
	// 行高
	rowHeight?: number;
	// 拖动修改大小的回调，用于保存列宽配置
	onResizeEnd?: (widths: Record<string, number>) => void;
	// 表格loading状态
	loading?: boolean;
	// 表格可选中
	rowSelection?: TableRowSelection<T>;
	// 全局高亮关键字
	highlightKeywords?: string[];
	// 文本高亮配置
	highlightConfig?: TableHighlightConfig;
	// 虚拟滚动是否需要flushSync
	virtualFlushSync?: boolean;
	// 行背景高亮
	rowBgHighlight?: TableRowBgHighlight;
	// TODO 表格可展开【和onCell的rowSpan冲突】
	expandable?: undefined;
	// TODO 可拖拽排序【和onCell的rowSpan冲突】【和expandable冲突】
	draggable?: undefined;
};
