import type { ReactNode } from 'react';
import type { TableDataItem } from './type';

// onCell 的 colSpan 和 fixed 存在冲突
export type TableColumn<T extends TableDataItem> = {
	// 列key
	key: string;
	// 列标题
	title: ReactNode;
	// 列单元格渲染
	render: (item: T, otherData: { index: number; highlightKeywords?: string[] }) => ReactNode;
	// 列宽
	width: number | `${number}%`;
	// 未resize的情况下，自动填充【默认1】
	flexGrow?: number;
	// 左右固定
	fixed?: 'left' | 'right';
	// TODO 左右对齐
	align?: 'left' | 'right' | 'center';
	// 强制渲染，避免虚拟列表导致单元格未渲染，造成高度塌陷
	forceRender?: boolean;
	// 单元格属性
	onCell?: (
		item: T,
		index: number,
	) => {
		// 行占据几格，用于合并单元格
		rowSpan?: number;
		// 列占据几格，用于合并单元格
		colSpan?: number;
	};
	// TODO 列筛选
	filter?: {
		// 已筛选，对应icon高亮
		filtered: boolean;
		// 列高亮关键字
		highlightKeywords?: string[];
	};
	// TODO 列排序
	sort?: {
		// 已排序，对应icon高亮
		sorted: 'ascend' | 'descend' | undefined;
		// 支持的排序方式
		sortDirections?: Array<'ascend' | 'descend'>;
	};
	// 融合group的字段
	children?: undefined;
};

// Group的fixed将会覆盖子节点，不论left|right|undefined
export type TableColumnGroup<T extends TableDataItem> = {
	key: string;
	title: ReactNode;
	// group的fixed会覆盖所有子列，哪怕不填
	fixed?: 'left' | 'right';
	// group下的列配置
	children: Array<TableColumnGroup<T> | TableColumn<T>>;
	// 融合item的字段
	render?: undefined;
	width?: undefined;
	flexGrow?: undefined;
	onCell?: undefined;
	forceRender?: undefined;
	filter?: undefined;
	sort?: undefined;
	align?: undefined;
};

export type TableColumns<T extends TableDataItem> = Array<TableColumnGroup<T> | TableColumn<T>>;

// 内部使用的columnGroup类型
export type InnerColumnGroup<T extends TableDataItem> = Omit<
	TableColumnGroup<T> & { level: number; startIndex: number; endIndex: number },
	'children'
>;

// 内部使用的column类型
export type InnerColumn<T extends TableDataItem> = Omit<TableColumn<T> & { level: number }, 'children'>;
