import { type CSSProperties, type ReactNode } from 'react';

import { type ValueTypeKeys } from '@type/tools';

export type VirtualTreeKey = string | number;

export type VirtualTreeFieldKeys<T, K> = {
	key: ValueTypeKeys<T, K>;
	label: ValueTypeKeys<T, string | number>;
	children: ValueTypeKeys<T, undefined | T[]>;
	disabled?: keyof T | ((v: T) => boolean);
};

export type HandledDataItem<T, K> = {
	data: T;
	key: K;
	label: string;
	level: number;
	isLeaf: boolean;
	visible: boolean;
	disabled: boolean;
	selected: boolean;
	indeterminate: boolean;
};

type OriginVirtualTreeProps<T, K> = {
	// 数据源
	data: T[] | undefined;
	// loading状态
	loading?: boolean;
	// 数据源字段
	fieldKeys?: VirtualTreeFieldKeys<T, K>;
	// 自定义渲染item
	renderLabel?: (item: T, handleData: HandledDataItem<T, K>, keyword?: string) => ReactNode;
	// 自定义渲染前缀
	renderPrefix?: (item: T) => ReactNode;
	// 自定义渲染后缀
	renderSuffix?: (item: T) => ReactNode;
	// 行高【最小高度】【默认为26】
	lineHeight?: number;
	// 显示checkbox
	showCheckbox?: boolean;
	// showCheckbox 状态下节点选择完全受控（父子节点选中状态不再关联）
	checkStrictly?: boolean;
	// 选择模式
	selectMode?: 'none' | 'single' | 'multiple';
	// 选中的keys
	selectedKeys?: K[];
	// 修改选中
	setSelectedKeys?: (keys: K[], other: { selectedItems: T[] }) => void;
	// 修改选中的前置
	shouldSelectedKeysChange?: (keys: K[], other: { selectedItems: T[] }) => boolean;
	// 搜索关键字
	keyword?: string;
	// 修改搜索关键字
	setKeyword?: (keyword: string) => void;
	// 展开
	visibles?: K[];
	// 修改展开
	setVisibles?: (keys: K[]) => void;
	// 默认展开【第一次从undefined变更后不再生效】
	defaultVisibles?: K[];
	// 默认展开层级
	defaultVisibleLevel?: number;

	// 显示搜索
	showSearch?: boolean;
	// 显示标题
	title?: ReactNode;

	// 宽度，默认300
	width?: number | string;
	// tree class
	treeClassName?: string;
	// tree style
	treeStyle?: CSSProperties;
	// wrapper class
	wrapperClassName?: string;
	// wrapper style
	wrapperStyle?: CSSProperties;
	// search class
	searchClassName?: string;
	// search style
	searchStyle?: CSSProperties;

	// padding top
	paddingTop?: number;
	// padding bottom
	paddingBottom?: number;
	// padding left
	paddingLeft?: number;
	// level padding left
	levelPaddingLeft?: number;
	// node 占据整行
	blockNode?: boolean;
};

// 不存在冲突的Props
type SameProps1<T, K> = Omit<OriginVirtualTreeProps<T, K>, 'defaultVisibles' | 'defaultVisibleLevel'>;

// 组合存在冲突的字段
// defaultVisibles和defaultVisibleLevel
type CustomProps1<T, K> = SameProps1<T, K> & {
	defaultVisibles?: OriginVirtualTreeProps<T, K>['defaultVisibles'];
	defaultVisibleLevel?: undefined;
};

type CustomProps2<T, K> = SameProps1<T, K> & {
	defaultVisibles?: undefined;
	defaultVisibleLevel?: OriginVirtualTreeProps<T, K>['defaultVisibleLevel'];
};

type VirtualTreeProps1<T, K> = CustomProps1<T, K> | CustomProps2<T, K>;

// 不存在冲突的Props
type SameProps2<T, K> = Omit<VirtualTreeProps1<T, K>, 'showCheckbox' | 'renderPrefix' | 'checkStrictly'>;

// 组合存在冲突的字段
// showCheckbox、renderPrefix和checkStrictly
type CustomProps3<T, K> = SameProps2<T, K> & {
	showCheckbox?: OriginVirtualTreeProps<T, K>['showCheckbox'];
	checkStrictly?: OriginVirtualTreeProps<T, K>['checkStrictly'];
	renderPrefix?: undefined;
};

type CustomProps4<T, K> = SameProps2<T, K> & {
	showCheckbox?: undefined;
	checkStrictly?: undefined;
	renderPrefix?: OriginVirtualTreeProps<T, K>['renderPrefix'];
};

export type VirtualTreeProps<T, K> = CustomProps3<T, K> | CustomProps4<T, K>;
