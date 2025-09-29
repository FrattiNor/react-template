import type { Dispatch, ReactNode, SetStateAction } from 'react';

import type useTableInstance from '../TableHooks/useTableInstance';

// Table实例
export type TableInstance<T extends TableDataItem> = ReturnType<typeof useTableInstance<T>>;

// Table Resize标记
export type ResizeFlag = {
	activeKey: string;
	pageX: number;
	children: {
		key: string;
		index: number;
		clientWidth: number;
	}[];
};

// Table 数据源 的基础类型
export type TableDataItem = Record<string, any>;

// Table 列render配置
export type TableColumnRender<T extends TableDataItem> = (
	item: T,
	otherData: { index: number; renderHighlightText: (text: string) => ReactNode },
) => ReactNode;

// Table 列筛选配置
export type TableColumnFilter = {
	// 已筛选，对应icon高亮
	filtered: boolean;
	// 列高亮关键字
	highlightKeywords?: string[];
	// 渲染筛选组件
	renderFilter: ({ close }: { close: () => void }) => ReactNode;
};

// Table 列排序配置
export type TableColumnSort = {
	// 已排序，对应icon高亮
	sorted: 'ascend' | 'descend' | undefined;
	// 支持的排序方式
	sortDirections?: Array<'ascend' | 'descend'>;
};

// Table 列属性配置
export type TableColumnOnCell<T extends TableDataItem> = (
	item: T,
	index: number,
) => {
	// 行占据几格，用于合并单元格
	rowSpan?: number;
	// 列占据几格，用于合并单元格
	colSpan?: number;
	// 覆盖cell的title属性
	title?: string;
};

// 取对象对应value的key
export type ValueTypeKeys<T, Type> = { [K in keyof T]: T[K] extends Type ? K : never }[keyof T];

// Table 文本高亮配置
export type TableHighlightConfig = {
	// 清除首尾空格【默认false】
	trim?: boolean;
	// 自动转义【默认false】
	autoEscape?: boolean;
	// 大小写敏感【默认false】
	caseSensitive?: boolean;
};

// Table 行选择配置
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

// Table 行背景高亮配置
export type TableRowBgHighlight = {
	// hover
	rowHover?: boolean;
	// click
	rowClick?: boolean;
	// select
	rowSelect?: boolean;
};

// Table 拖拽配置
export type TableDraggable = {
	onDragEnd: (params: { activeId: string; overId: string; arrayMove: <T>(array: T[], from: number, to: number) => T[] }) => void;
};

// Table 虚拟化enable配置
export type TableVirtualEnable = boolean | number;

// Table 虚拟化方向配置
export type TableVirtualDirectionConfig = {
	// 启用
	enabled?: TableVirtualEnable;
	// 启用flushSync
	virtualFlushSync?: boolean;
};

// Table 虚拟化配置
export type TableVirtualConfig<T extends TableDataItem> = {
	// 启用flushSync
	virtualFlushSync?: boolean;
	// 启用纵向虚拟，可设置到达多少数量后自动启用
	verticalVirtual?: TableVirtualEnable | TableVirtualDirectionConfig;
	// 启用横向虚拟，可设置到达多少数量后自动启用
	horizontalVirtual?: TableVirtualEnable | TableVirtualDirectionConfig;
	// 是否应该清除虚拟size缓存【纵向】
	shouldClearSizeCache?: (prevDatasource: T[], nextDatasource: T[]) => boolean;
};
