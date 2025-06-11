import type { ReactNode } from 'react';

type TableFixed = 'left' | 'right' | 'default';

type TableAlign = 'left' | 'right' | 'center';

type ColumnRender<T> = (
	item: T,
	other: { index: number; highlightKeywords?: string[]; pagination?: { total: number; current: number; pageSize: number } },
) => ReactNode;

type ColumnOnCell<T> = (item: T, index: number) => { title?: string; rowSpan?: number; colSpan?: number };

type ColumnFilter = {
	icon?: ReactNode;
	filtered: boolean; // 是否筛选过
	highlightKeyword?: string; // 列搜索高亮关键词
	dropdown: (opt: { setVisible: (v: boolean) => void }) => ReactNode; // 筛选的下拉渲染函数
};

export type TableColumn<T> = {
	type: 'column';
	resize?: boolean;
	fixed?: TableFixed;
	align?: TableAlign;
	forceRender?: boolean;
	hidden?: boolean;
	filter?: ColumnFilter;
	key: string;
	title: ReactNode;
	flexGrow?: number;
	width?: number | string;
	onCell?: ColumnOnCell<T>;
	render?: ColumnRender<T>;
};

export type TableColumnGroup<T> = {
	type: 'columnGroup';
	fixed?: TableFixed;
	title: ReactNode;
	hidden?: boolean;
	children: TableColumns<T>;
};

export type TableColumns<T> = Array<TableColumn<T> | TableColumnGroup<T>>;

export type TableProps<T> = {
	dataSource: T[];
	columns: TableColumns<T>;
	rowKey: (item: T, index: number) => string;
};
