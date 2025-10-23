export type Props<T> = {
	// 启用
	enabled?: boolean;
	// 数据源
	data: T[];
	// 上下冗余【注意Memo】
	overscan?: [number, number];
	// 横向
	horizontal?: boolean;
	// 【注意Memo】
	getItemKey: (item: T, index: number) => string;
	// 【注意Memo】
	getItemSize: (item: T, index: number) => number;
	// 【注意Memo】
	updateItemSize?: (key: string) => number;
	//
	containerSize: number;
	//
	getContainer: () => HTMLElement | null;
	//
	onRangeChange?: (p: { start: number; end: number }) => void;
	//
	onTotalSizeChange?: (size: number) => void;
};

export type SizeList = Array<{ index: number; start: number; end: number; key: string }>;

export type State = {
	totalSize: number;
	scrollOffset: number;
	sizeList: SizeList | null;
	rangeStart: number | null;
	rangeEnd: number | null;
};
