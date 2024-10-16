import { type CSSProperties, type ReactNode } from 'react';

export type TableBlocPagination = {
	total?: number;
	current?: number;
	pageSize?: number;
	pageSizeOptions?: number[];
	showTotal?: false | ((total: number) => ReactNode);
	onChange?: (current: number, pageSize: number) => void;
};

export type TableBlockProps<T> = {
	colCount: number; // 一行几个，不能小于1
	dataSource?: T[]; // 数据源
	loading?: boolean; // loading
	pagination?: TableBlocPagination | true; // 分页
	rowKey: keyof T | ((v: T) => string); // rowKey
	renderItem: (item: T, index: number) => ReactNode; // 渲染函数

	className?: string;
	style?: CSSProperties;
	extendToTheRight?: number; // 向右延伸 距离
	paddingStart?: number; // 开始填充
	paddingEnd?: number; // 尾部填充
};

export type TableBlockRef = {
	scrollTo: (options: { left?: number; top?: number; behavior?: 'auto' | 'instant' | 'smooth' }) => void;
};
