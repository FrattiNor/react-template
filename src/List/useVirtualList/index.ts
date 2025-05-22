/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useReducer, useRef } from 'react';
import { binarySearch } from './utils';
import useFrame from './useFrame';
import { flushSync } from 'react-dom';

type Props<T> = {
	data: T[];
	overscan?: [number, number];
	getItemKey: (item: T) => string; // 不接受动态变更
	getItemSize: (item: T) => number; // 不接受动态变更
	containerRef: React.RefObject<HTMLDivElement | null>;
	gap?: number;
};

type SizeItem<T> = {
	size: number;
	index: number;
	start: number;
	end: number;
	key: string;
	data: T;
};

const useVirtualList = <T>(props: Props<T>) => {
	const { data, overscan = [0, 0], getItemKey, getItemSize, gap = 0, containerRef } = props;

	// 一帧执行一次
	const oneFrame = useFrame();
	// overscan用ref存储避免闭包获取不到
	const propsRef = useRef({ overscan });
	// range变更触发重渲染
	const rerender = useReducer(() => ({}), {})[1];
	// 滚动距离
	const scrollOffsetRef = useRef<number>(0);
	// 容器size
	const containerSizeRef = useRef<null | number>(null);
	// 虚拟列表显示部分
	const rangeRef = useRef<null | [number, number]>(null);
	// 当前显示item的Map
	const showItemElementMapRef = useRef<Map<string, HTMLElement>>(new Map());
	// item的动态SizeMap
	const itemSizeMapRef = useRef<Map<string, number>>(new Map());
	//
	const itemSizeListRef = useRef<null | SizeItem<T>[]>(null);

	// 监听容器
	useEffect(() => {
		if (containerRef.current) {
			// 监听 容器size触发更新range
			const ob = new ResizeObserver(() => {
				const newSize = containerRef.current?.clientHeight ?? 0;
				if (newSize !== containerSizeRef.current) {
					containerSizeRef.current = newSize;
					maybeRangeChange({ sync: false, from: 'resize' });
				}
			});
			// 监听 容器滚动触发更新range
			const handleScroll = () => {
				oneFrame('handleScroll', () => {
					const newOffset = containerRef.current?.scrollTop ?? 0;
					if (newOffset !== scrollOffsetRef.current) {
						scrollOffsetRef.current = newOffset;
						maybeRangeChange({ sync: true, from: 'scroll' });
					}
				});
			};

			ob.observe(containerRef.current);
			containerRef.current.addEventListener('scroll', handleScroll, { passive: true });

			return () => {
				ob.disconnect();
				containerRef.current?.removeEventListener('scroll', handleScroll);
			};
		}
	}, []);

	const itemSizeListChange = () => {
		const list: SizeItem<T>[] = [];
		data.forEach((item, index) => {
			const key = getItemKey(item);
			const size = itemSizeMapRef.current.get(key) ?? getItemSize(item);
			const start = typeof list[index - 1]?.end === 'number' ? list[index - 1].end + gap : 0;
			const end = start + size;
			list.push({ index, size, start, end, key, data: item });
		});
		itemSizeListRef.current = list;
		maybeRangeChange({ sync: false, from: 'itemSizeListChange' });
	};

	// 用于触发更新range，如果range变更触发重渲染
	const maybeRangeChange = ({ sync, from }: { sync: boolean; from: string }) => {
		if (containerSizeRef.current === null || itemSizeListRef.current === null || itemSizeListRef.current.length === 0) {
			if (rangeRef.current !== null) {
				rangeRef.current = null;
				rerender();
			}
		} else {
			console.log('maybeRangeChange', from);
			const _startIndex = binarySearch({
				startIndex: 0,
				endIndex: data.length - 1,
				getSize: (i) => (itemSizeListRef.current as SizeItem<T>[])[i].start,
				target: scrollOffsetRef.current,
			})[0];
			const _endIndex = binarySearch({
				startIndex: _startIndex,
				endIndex: data.length - 1,
				getSize: (i) => (itemSizeListRef.current as SizeItem<T>[])[i].end,
				target: scrollOffsetRef.current + containerSizeRef.current,
			})[1];
			const startIndex = Math.max(0, _startIndex - propsRef.current.overscan[0]);
			const endIndex = Math.min(data.length - 1, _endIndex + propsRef.current.overscan[1]);

			if (rangeRef.current?.[0] !== startIndex || rangeRef.current?.[1] !== endIndex) {
				rangeRef.current = [startIndex, endIndex];
				if (sync === true) {
					flushSync(rerender);
				} else {
					rerender();
				}
			}
		}
	};

	// 获取data的每一个item的size情况
	useMemo(() => {
		itemSizeListChange();
	}, [data, gap]);

	// itemSize变更或者overscan变更触发更新range
	useMemo(() => {
		propsRef.current = { overscan };
		maybeRangeChange({ sync: false, from: 'overscan' });
	}, [overscan[0], overscan[1]]);

	// 使用range生成，用于遍历渲染dom
	const virtualItems = (() => {
		if (itemSizeListRef.current === null || itemSizeListRef.current.length === 0 || rangeRef.current === null) return [];
		return itemSizeListRef.current.slice(rangeRef.current[0], rangeRef.current[1] + 1);
	})();

	// 隐藏item的size
	const paddingStart = (() => {
		if (itemSizeListRef.current === null || itemSizeListRef.current.length === 0) return 0;
		if (virtualItems.length === 0) return 0;
		return itemSizeListRef.current[virtualItems[0].index].start;
	})();

	// 总item的size
	const totalSize = (() => {
		if (itemSizeListRef.current === null || itemSizeListRef.current.length === 0) return 0;
		return itemSizeListRef.current[itemSizeListRef.current.length - 1].end;
	})();

	// 监听item变更
	const measureElement = (element: HTMLDivElement | null, item: T) => {
		const key = getItemKey(item);
		if (element !== null) {
			showItemElementMapRef.current.set(key, element);
			const itemNewSize = element.clientHeight;
			const itemDefaultSize = getItemSize(item);
			const itemOldSize = itemSizeMapRef.current.get(key) ?? itemDefaultSize;
			if (itemNewSize !== itemOldSize) {
				if (itemNewSize !== itemDefaultSize) {
					itemSizeMapRef.current.set(key, itemNewSize);
					console.log('measureElement', key, itemNewSize);
					itemSizeListChange();
					// startTransition(rerender);
				} else {
					itemSizeMapRef.current.delete(key);
					itemSizeListChange();
					// startTransition(rerender);
				}
			}
		} else {
			showItemElementMapRef.current.delete(key);
		}
	};

	return { virtualItems, paddingStart, totalSize, measureElement };
};

export default useVirtualList;
