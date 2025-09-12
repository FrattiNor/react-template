import type { ReactNode } from 'react';
import type { TableDataItem } from './type';

// onCell 的 colSpan 和 fixed 存在冲突
export type TableColumn<T extends TableDataItem> = {
	key: string;
	title: ReactNode;
	render: (item: T, index: number) => ReactNode;
	width: number | `${number}%`;
	flexGrow?: number;
	fixed?: 'left' | 'right';
	forceRender?: boolean;
	onCell?: (item: T, index: number) => { rowSpan?: number; colSpan?: number };
	// 融合group的字段
	children?: undefined;
};

// Group的fixed将会覆盖子节点，不论left|right|undefined
export type TableColumnGroup<T extends TableDataItem> = {
	key: string;
	title: ReactNode;
	fixed?: 'left' | 'right';
	children: Array<TableColumnGroup<T> | TableColumn<T>>;
	// 融合item的字段
	render?: undefined;
	width?: undefined;
	flexGrow?: undefined;
	onCell?: undefined;
	forceRender?: undefined;
};

export type TableColumns<T extends TableDataItem> = Array<TableColumnGroup<T> | TableColumn<T>>;
