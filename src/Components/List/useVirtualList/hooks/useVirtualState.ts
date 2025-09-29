import { useReducer, useRef } from 'react';

export type SizeItem<T> = {
	size: number;
	index: number;
	start: number;
	end: number;
	key: string;
	data: T;
};

const useVirtualState = <T>() => {
	// range变更触发重渲染
	const rerender = useReducer(() => ({}), {})[1];
	// 滚动距离
	const scrollOffsetRef = useRef<number>(0);
	// 容器size
	const containerSizeRef = useRef<null | number>(null);
	// 虚拟列表显示部分
	const rangeRef = useRef<null | [number, number]>(null);
	// 当前显示item的Map
	const itemElementMapRef = useRef<Map<string, HTMLElement>>(new Map());
	// item的动态SizeMap
	const itemSizeMapRef = useRef<Map<string, number>>(new Map());
	// 根据data获取的SizeList
	const itemSizeListRef = useRef<null | SizeItem<T>[]>(null);
	// 总Size
	const totalSizeRef = useRef(0);
	// 顶部隐藏的Size
	const paddingStartRef = useRef(0);

	const setScrollOffset = (v: number) => (scrollOffsetRef.current = v);
	const getScrollOffset = () => scrollOffsetRef.current;

	const setContainerSize = (v: number) => (containerSizeRef.current = v);
	const getContainerSize = () => containerSizeRef.current;

	const setRange = (v: null | [number, number]) => (rangeRef.current = v);
	const getRange = () => rangeRef.current;

	const getItemElementMap = () => itemElementMapRef.current;

	const getItemSizeMap = () => itemSizeMapRef.current;

	const setItemSizeList = (v: SizeItem<T>[]) => (itemSizeListRef.current = v);
	const getItemSizeList = () => itemSizeListRef.current;

	const setTotalSize = (v: number) => (totalSizeRef.current = v);
	const getTotalSize = () => totalSizeRef.current;

	const setPaddingStart = (v: number) => (paddingStartRef.current = v);
	const getPaddingStart = () => paddingStartRef.current;

	return {
		rerender,
		setScrollOffset,
		getScrollOffset,
		setContainerSize,
		getContainerSize,
		setRange,
		getRange,
		getItemElementMap,
		getItemSizeMap,
		setItemSizeList,
		getItemSizeList,
		setTotalSize,
		getTotalSize,
		setPaddingStart,
		getPaddingStart,
	};
};

export default useVirtualState;
