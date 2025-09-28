import type { Dispatch, ReactNode, SetStateAction } from 'react';

export type ValueTypeKeys<T, Type> = { [K in keyof T]: T[K] extends Type ? K : never }[keyof T];

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

export type TableDraggable = {
	onDragEnd: (params: { activeId: string; overId: string; arrayMove: <T>(array: T[], from: number, to: number) => T[] }) => void;
};

export type TableVirtualEnable = boolean | number;

export type TableVirtualConfig = {
	// 启用
	enabled?: TableVirtualEnable;
	// 启用flushSync
	virtualFlushSync?: boolean;
};
