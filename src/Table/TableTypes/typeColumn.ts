import type { ReactNode } from 'react';

import type { TableDataItem, TableColumnFilter, TableColumnSort, TableColumnOnCell, TableColumnRender } from './type';

// onCell 的 colSpan 和 fixed 存在冲突
export type TableColumn<T extends TableDataItem> = {
	// 列key
	key: string;
	// 列标题
	title: ReactNode;
	// 列单元格渲染
	render: TableColumnRender<T>;
	// 列宽
	width: number | `${number}%`;
	// 未resize的情况下，自动填充【默认1】
	flexGrow?: number;
	// 左右固定【和colSpan有冲突】
	fixed?: 'left' | 'right';
	// 左右对齐
	align?: 'left' | 'right' | 'center';
	// 强制渲染，避免虚拟列表导致单元格未渲染，造成高度塌陷
	forceRender?: boolean;
	// 单元格属性
	onCell?: TableColumnOnCell<T>;
	// 列筛选
	filter?: (colKey: string) => TableColumnFilter;
	// TODO 列排序
	sort?: TableColumnSort;
	// 允许拖拽修改宽度
	resize?: boolean;
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
	resize?: undefined;
};

export type TableColumns<T extends TableDataItem> = Array<TableColumnGroup<T> | TableColumn<T>>;

// 内部使用的columnGroup类型
export type InnerColumnGroup<T extends TableDataItem> = Omit<
	TableColumnGroup<T> & { level: number; startIndex: number; endIndex: number },
	'children'
>;

// 内部使用的column类型
export type InnerColumn<T extends TableDataItem> = Omit<TableColumn<T> & { level: number; index: number }, 'children'>;
