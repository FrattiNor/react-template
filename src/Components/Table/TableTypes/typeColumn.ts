import { type ReactNode } from 'react';

import type { TableColumnAlign, TableColumnFixed, TableColumnOnCellSpan, TableColumnRender, TableColumnWidth } from './type';
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
	// 配置span
	onCellSpan?: TableColumnOnCellSpan<T>;
	// 左右对齐
	align?: TableColumnAlign;
	// 左右固定【和colSpan有冲突】
	fixed?: TableColumnFixed;
	// TODO 无法影响父节点是否可以拖拽
	// 是否可以拖拽修改列宽
	resize?: boolean;
} & {
	// 兼容group
	children?: undefined;
};

// Group的fixed将会覆盖子节点，不论left|right|undefined
export type TableColumnGroup<T> = Partial2Undefined<Omit<TableColumn<T>, 'key' | 'title' | 'children' | 'align'>> & {
	// 列key
	key: string;
	// 列标题
	title: ReactNode;
	// 左右对齐
	align?: TableColumnAlign;
	// group下的列配置
	children: Array<TableColumnGroup<T> | TableColumn<T>>;
};

export type TableColumns<T> = Array<TableColumnGroup<T> | TableColumn<T>>;
