import type { ReactNode } from 'react';

import type { TableColumnRender, TableColumnWidth } from './type';
import type { Partial2Undefined } from './typeUtil';

// onCell 的 colSpan 和 fixed 存在冲突
export type TableColumn<T> = {
	// 列key
	key: string;
	// 列标题
	title: ReactNode;
	// 列单元格渲染
	render: TableColumnRender<T>;
	// 列宽
	width?: TableColumnWidth;
	// 未resize的情况下，自动填充【默认1】
	flexGrow?: number;
} & {
	// 兼容group
	children?: undefined;
};

// Group的fixed将会覆盖子节点，不论left|right|undefined
export type TableColumnGroup<T> = Partial2Undefined<Omit<TableColumn<T>, 'key' | 'title' | 'children'>> & {
	// 列key
	key: string;
	// 列标题
	title: ReactNode;
	// group下的列配置
	children: Array<TableColumnGroup<T> | TableColumn<T>>;
};

export type TableColumns<T> = Array<TableColumnGroup<T> | TableColumn<T>>;

// 内部使用的columnGroup类型
export type InnerColumnGroup<T> = Omit<TableColumnGroup<T> & { mergeKey?: string }, 'children'>;

// 内部使用的column类型
export type InnerColumn<T> = Omit<TableColumn<T> & { level: number; index: number }, 'children'>;
