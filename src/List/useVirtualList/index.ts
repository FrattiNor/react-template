/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useReducer, useRef, useState } from 'react';
import { binarySearch } from './utils';
import useFrame from './useFrame';
import { flushSync } from 'react-dom';

type Props<T> = {
	data: T[];
	overscan?: [number, number];
	getItemKey: (item: T) => string; // 不接受动态变更
	getItemSize: (key: string) => number; // 不接受动态变更
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
	const { containerRef } = props;

	// 一帧执行一次
	const oneFrame = useFrame();
	// overscan用ref存储避免闭包获取不到
	const propsRef = useRef({
		data: props.data,
		gap: props.gap ?? 0,
		getItemKey: props.getItemKey,
		getItemSize: props.getItemSize,
		overscan: props.overscan ?? [0, 0],
	});
	propsRef.current = {
		data: props.data,
		gap: props.gap ?? 0,
		getItemKey: props.getItemKey,
		getItemSize: props.getItemSize,
		overscan: props.overscan ?? [0, 0],
	};
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
	// itemSizeObserver
	const [itemOb] = useState(() => {
		return new ResizeObserver((entries) => {
			entries.forEach((item) => {
				const key = item.target.getAttribute('data-key');
				if (typeof key === 'string') {
					const itemNewSize = item.borderBoxSize[0].blockSize;
					const itemDefaultSize = propsRef.current.getItemSize(key);
					const itemOldSize = itemSizeMapRef.current.get(key) ?? itemDefaultSize;
					if (itemNewSize !== itemOldSize) {
						if (itemNewSize !== itemDefaultSize) {
							itemSizeMapRef.current.set(key, itemNewSize);
							itemSizeListChange();
						} else {
							itemSizeMapRef.current.delete(key);
							itemSizeListChange();
						}
					}
				}
			});
		});
	});

	useEffect(() => {
		return () => {
			itemOb.disconnect();
		};
	}, []);

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
						maybeRangeChange({ sync: true, from: `scroll ${newOffset}` });
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

	// data变更或者itemSize变更
	const itemSizeListChange = () => {
		const list: SizeItem<T>[] = [];
		propsRef.current.data.forEach((item, index) => {
			const key = propsRef.current.getItemKey(item);
			const size = itemSizeMapRef.current.get(key) ?? propsRef.current.getItemSize(key);
			const start = typeof list[index - 1]?.end === 'number' ? list[index - 1].end + propsRef.current.gap : 0;
			const end = start + size;
			list.push({ index, size, start, end, key, data: item });
		});
		itemSizeListRef.current = list;
		maybeRangeChange({ sync: false, from: 'itemSizeListChange' });
	};

	// 用于触发更新range，如果range变更触发重渲染
	const maybeRangeChange = ({ sync }: { sync: boolean; from: string }) => {
		if (containerSizeRef.current === null || itemSizeListRef.current === null || itemSizeListRef.current.length === 0) {
			if (rangeRef.current !== null) {
				rangeRef.current = null;
				totalSizeRef.current = 0;
				paddingStartRef.current = 0;
				rerender();
			}
		} else {
			const _startIndex = binarySearch({
				startIndex: 0,
				endIndex: propsRef.current.data.length - 1,
				getSize: (i) => (itemSizeListRef.current as SizeItem<T>[])[i].start,
				target: scrollOffsetRef.current,
			})[0];
			const _endIndex = binarySearch({
				startIndex: _startIndex,
				endIndex: propsRef.current.data.length - 1,
				getSize: (i) => (itemSizeListRef.current as SizeItem<T>[])[i].end,
				target: scrollOffsetRef.current + containerSizeRef.current,
			})[1];
			const startIndex = Math.max(0, _startIndex - propsRef.current.overscan[0]);
			const endIndex = Math.min(propsRef.current.data.length - 1, _endIndex + propsRef.current.overscan[1]);
			const paddingStart = itemSizeListRef.current[startIndex].start;
			const totalSize = itemSizeListRef.current[itemSizeListRef.current.length - 1].end;

			if (
				rangeRef.current?.[0] !== startIndex ||
				rangeRef.current?.[1] !== endIndex ||
				totalSizeRef.current !== totalSize ||
				paddingStartRef.current !== paddingStart
			) {
				totalSizeRef.current = totalSize;
				paddingStartRef.current = paddingStart;
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
	useEffect(() => {
		itemSizeMapRef.current = new Map();
		itemSizeListChange();
	}, [props.data]);

	// 获取data的每一个item的size情况
	useEffect(() => {
		itemSizeListChange();
	}, [props.gap]);

	// itemSize变更或者overscan变更触发更新range
	useEffect(() => {
		maybeRangeChange({ sync: false, from: 'overscan' });
	}, [props.overscan?.[0], props.overscan?.[1]]);

	// 使用range生成，用于遍历渲染dom
	const virtualItems = (() => {
		if (itemSizeListRef.current === null || itemSizeListRef.current.length === 0 || rangeRef.current === null) return [];
		return itemSizeListRef.current.slice(rangeRef.current[0], rangeRef.current[1] + 1);
	})();

	// 监听item变更
	const measureElement = (element: HTMLDivElement | null, item: T) => {
		const key = propsRef.current.getItemKey(item);
		if (element !== null && element.isConnected) {
			const itemNewSize = element.clientHeight;
			const itemDefaultSize = propsRef.current.getItemSize(key);
			const itemOldSize = itemSizeMapRef.current.get(key) ?? itemDefaultSize;
			if (itemNewSize !== itemOldSize) {
				if (itemNewSize !== itemDefaultSize) {
					itemSizeMapRef.current.set(key, itemNewSize);
					itemSizeListChange();
				} else {
					itemSizeMapRef.current.delete(key);
					itemSizeListChange();
				}
			}

			const oldElement = itemElementMapRef.current.get(key);
			if (oldElement !== element) {
				itemElementMapRef.current.set(key, element);
				itemOb.observe(element);
			}
		} else {
			const oldElement = itemElementMapRef.current.get(key);
			if (oldElement) itemOb.unobserve(oldElement);
			itemElementMapRef.current.delete(key);
		}
	};

	return { virtualItems, paddingStart: paddingStartRef.current, totalSize: totalSizeRef.current, measureElement };
};

export default useVirtualList;
