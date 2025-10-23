export type Props = {
	// 启用
	enabled?: boolean;
	// 数量
	count: number;
	// 上下冗余【注意Memo】
	overscan?: [number, number];
	// 间隔
	gap?: { itemGap?: number; startGap?: number; endGap?: number };
	// 【注意Memo】
	getItemKey: (index: number) => string;
	// 【注意Memo】
	getItemSize: (index: number) => number;

	// range变更【isScroll判断是否需要flushSync】
	onRangeChange?: (p: { start: number | null; end: number | null; isScroll: boolean; getVirtualItems: () => SizeList }) => void;
	// totalSize变更
	onTotalSizeChange?: (size: number | null) => void;
	// debugger
	debugger?: boolean;
};

export type SizeList = Array<{ key: string; index: number; start: number; end: number; size: number; nextStart: number }>;

export type State = {
	totalSize: number | null;
	scrollOffset: number | null;
	containerSize: number | null;
	sizeList: SizeList | null;
	rangeStart: number | null;
	rangeEnd: number | null;
};
