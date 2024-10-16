import { type CSSProperties, type Dispatch, type ReactNode, type SetStateAction } from 'react';

// 任意对象，默认datasource的类型
export type AnyObj = Record<string, any>;

// 表格Fixed的属性值
export type TableFixed = 'left' | 'right' | 'default';

// 表格Align的属性值
export type TableAlign = 'left' | 'right' | 'center';

// 表格分页的参数
export type TablePagination = {
	total?: number; // 总数
	current?: number; // 当前页
	pageSize?: number; // 分页数量
	pageSizeOptions?: number[]; // 分页数量选项
	showTotal?: false | ((total: number) => ReactNode); // 显示总数
	onChange?: (current: number, pageSize: number) => void; // 变更回调函数
};

export type TableColumnFilter = {
	icon?: ReactNode;
	filtered: boolean; // 是否筛选过
	dropdown: (opt: { setVisible: (v: boolean) => void }) => ReactNode; // 筛选的下拉渲染函数
};

export type TableColumnEdit<T> = {
	enable: boolean | ((item: T, index: number) => boolean); // 编辑开启【开启编辑会触发强制渲染】
	saveEdit: (value: string, item: T, index: number) => Promise<any>; // 编辑保存
};

// 表格column的具体参数
export type TableColumn<T> = {
	inner?: boolean; // 内部的列【多选|展开】
	key: string; // 用于key，没有render时用于渲染取值
	width?: number; // 宽度，不填默认150
	title: ReactNode; // 标题
	resize?: boolean; // 是否能拖动大小
	flexGrow?: number; // 宽度多余时，自动填补
	fixed?: TableFixed; // 当前列是否Fixed，在group下无效
	align?: TableAlign; // 当前列的对齐选项
	forceRender?: boolean; // 当前列强制渲染，用于明确知道列高不定的情况
	onCell?: (item: T, index: number) => { title?: string; colSpan?: number; rowSpan?: number };
	onHeadCell?: () => { title?: string; colSpan?: number; rowSpan?: number };
	render?: (item: T, index: number, pagination?: { total: number; current: number; pageSize: number }) => ReactNode; //渲染函数
	summary?: (() => ReactNode) | (() => ReactNode)[]; // 总结栏
	edit?: TableColumnEdit<T>;
	filter?: TableColumnFilter;
	hidden?: boolean;
};

// 表格column组
export type TableColumnGroup<T> = {
	key: string;
	hidden?: boolean;
	title: ReactNode; // 组标题
	fixed?: TableFixed; // 当前列是否Fixed
	children: Array<Omit<TableColumnGroup<T>, 'fixed'> | Omit<TableColumn<T>, 'fixed'>>; // 子column项
};

// 表格column列表
export type TableColumns<T> = Array<TableColumn<T> | TableColumnGroup<T>>;

// 内部使用 被处理过的column
export type HandledColumn<T> = Omit<TableColumn<T>, 'width'> & {
	width: number;
	colIndex: number;
	underRowSpan: number;
};

export type HandledHeadGroupItem = {
	key: string;
	end: number;
	span: number;
	start: number;
	title: ReactNode;
};

// 行选择参数
export type TableRowSelection<T> = {
	width?: number;
	selectedRowKeys?: string[];
	onSelectedRowKeysChange?: Dispatch<SetStateAction<string[]>>;
	getCheckboxProps?: (item: T) => { disabled: boolean };
};

// 展开参数
export type TableExpandable = {
	width?: number;
	expandedRowKeys?: string[];
	childrenColumnName?: string;
	onExpandedRowKeysChange?: Dispatch<SetStateAction<string[]>>;
};

export type TableCoverConfItem = {
	width?: number;
	hidden?: boolean;
	flexGrow?: number;
	fixed?: TableFixed;
};

export type TableCoverConfRenderItem = {
	hidden: boolean;
	fixed: TableFixed;
	key: string;
	title: ReactNode;
};

// Table Ref
export type TableRef = {
	scrollTo: (options: { left?: number; top?: number; behavior?: 'auto' | 'instant' | 'smooth' }) => void;
	getSortedColumnsConf: () => TableCoverConfRenderItem[];
	getOriginColumnsConf: () => TableCoverConfRenderItem[];
};

// Table Props
export type TableProps<T> = {
	dataSource?: T[];
	loading?: boolean;
	rowHeight?: number;
	className?: string;
	style?: CSSProperties;
	columns: TableColumnsOut<T>;
	expandable?: TableExpandable | true;
	pagination?: TablePagination | true;
	rowSelection?: TableRowSelection<T> | true;
	rowKey: keyof T | ((v: T) => string); // 行key
	onResizeEnd?: (widths: Record<string, number>) => void; // 拖动修改大小的回调
	coverColumns?: (column: TableColumn<T>) => TableCoverConfItem; // 覆盖列配置【允许覆盖一些配置】
	coverColumnsSort?: (column: TableColumn<T>) => number; // 覆盖列配置的排序
	forceHiddenFilter?: Record<string, boolean> | 'all'; // 强制隐藏筛选项【不受column影响】
	forceHiddenColumn?: Record<string, boolean>; // 强制隐列选项【不受column的hidden影响】
};

// ======== 对外使用，限制key正确或者有render
export type TableColumnOut<T> =
	| (Omit<TableColumn<T>, 'key' | 'render' | 'inner'> & {
			key: string;
			render: (item: T, index: number, pagination?: { total: number; current: number; pageSize: number }) => ReactNode;
	  })
	| (Omit<TableColumn<T>, 'key' | 'render' | 'inner'> & {
			key: keyof T; // key限制为T的字段，避免没写render时无法校验字段是否存在
	  });

export type TableColumnGroupOut<T> = {
	key: string;
	hidden?: boolean;
	title: ReactNode;
	fixed?: TableFixed;
	children: Array<
		| Omit<TableColumnGroupOut<T>, 'fixed'>
		| (Omit<TableColumn<T>, 'key' | 'render' | 'inner' | 'fixed'> & {
				key: string;
				render: (item: T, index: number, pagination?: { total: number; current: number; pageSize: number }) => ReactNode;
		  })
		| (Omit<TableColumn<T>, 'key' | 'render' | 'inner' | 'fixed'> & {
				key: keyof T; // key限制为T的字段，避免没写render时无法校验字段是否存在
		  })
	>;
};

export type TableColumnsOut<T> = Array<TableColumnOut<T> | TableColumnGroupOut<T>>;
