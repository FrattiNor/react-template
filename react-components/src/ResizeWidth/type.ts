import { type CSSProperties, type PropsWithChildren } from 'react';

export type ResizeWidthProps = PropsWithChildren<{
	// 最小宽度
	minWidth?: number;
	// 最大宽度
	maxWidth?: number;
	// 默认宽度
	defaultWidth?: number;
	// 宽度变化回调
	onResize?: (width: number) => void;
	// 宽度变化结束回调
	onResizeEnd?: (width: number) => void;
	// 样式
	className?: string;
	// 样式
	style?: CSSProperties;
	// 拖拽手柄样式
	handleClassName?: string;
	// 拖拽手柄样式
	handlerStyle?: CSSProperties;
	// 是否加载中
	loading?: boolean;
}>;
