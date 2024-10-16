import { type CSSProperties, type ReactNode } from 'react';

import { type ValueTypeKeys } from '@type/tools';

export type VirtualListKey = string | number;

export type VirtualListFieldKeys<T, K> = {
	key: ValueTypeKeys<T, K>;
	label: ValueTypeKeys<T, string | number>;
	disabled?: keyof T | ((v: T) => boolean);
};

export type HandledDataItem<T, K> = {
	data: T;
	key: K;
	label: string;
	disabled: boolean;
	selected: boolean;
};

type OriginVirtualListProps<T, K> = {
	// 数据源
	data: T[] | undefined;
	// loading状态
	loading?: boolean;
	// 数据源字段
	fieldKeys?: VirtualListFieldKeys<T, K>;
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

	// 显示搜索
	showSearch?: boolean;
	// 搜索后缀
	renderSearchSuffix?: () => ReactNode;
	// 显示标题
	title?: ReactNode;

	// 宽度，默认300
	width?: number | string;
	// list class
	listClassName?: string;
	// list style
	listStyle?: CSSProperties;
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
	//
	blockNode?: boolean;
};

// 不存在冲突的Props
type SameProps<T, K> = Omit<OriginVirtualListProps<T, K>, 'showCheckbox' | 'renderPrefix'>;

// 组合存在冲突的字段
// showCheckbox、renderPrefix
type CustomProps1<T, K> = SameProps<T, K> & {
	showCheckbox?: OriginVirtualListProps<T, K>['showCheckbox'];
	renderPrefix?: undefined;
};

type CustomProps2<T, K> = SameProps<T, K> & {
	showCheckbox?: undefined;
	renderPrefix?: OriginVirtualListProps<T, K>['renderPrefix'];
};

export type VirtualListProps<T, K> = CustomProps1<T, K> | CustomProps2<T, K>;
