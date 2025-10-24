/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useEffectEvent, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { VirtualProps } from './Core/type';
import VirtualCore from './Core';
import { flushSync } from 'react-dom';

const horizontal = false;

type Props = Omit<VirtualProps, 'onRangeChange' | 'onTotalSizeChange'>;

const useVirtual = (props: Props) => {
	// enabled
	const enabled = props.enabled ?? true;
	// 容器
	const containerRef = useRef<HTMLDivElement | null>(null);
	// core
	const [virtualCore, setVirtualCore] = useState(() => new VirtualCore());
	// itemSize缓存
	const [sizeCacheMap, setSizeCacheMap] = useState(() => new Map<string, number>());
	// itemSize Observer
	const [itemSizeObserver] = useState(() => {
		return new ResizeObserver((entries) => {
			entries.forEach((item) => {
				const key = item.target.getAttribute('data-key');
				if (typeof key === 'string' && key !== '') {
					setSizeCacheMap((old) => {
						const nodeSize = item.contentRect[horizontal ? 'width' : 'height'];
						if (old.get(key) !== nodeSize) {
							old.set(key, nodeSize);
							return new Map(old);
						}
						return old;
					});
				}
			});
		});
	});

	// 清除itemSize Observer
	useEffect(() => {
		if (enabled === true) {
			return () => {
				itemSizeObserver.disconnect();
			};
		} else {
			itemSizeObserver.disconnect();
		}
	}, [enabled]);

	// 用于测量itemSize，在不定高情况使用
	const measureItemRef = (key: string, node: HTMLElement | null) => {
		if (node) {
			setSizeCacheMap((old) => {
				const nodeSize = node[horizontal ? 'clientWidth' : 'clientHeight'];
				if (old.get(key) !== nodeSize) {
					old.set(key, nodeSize);
					return new Map(old);
				}
				return old;
			});
			itemSizeObserver.observe(node);
			return () => {
				itemSizeObserver.unobserve(node);
			};
		}
	};

	// 重写getItemSize，优先使用size缓存
	const getItemSize = useCallback(
		(index: number) => {
			const key = props.getItemKey(index);
			const cacheSize = sizeCacheMap.get(key);
			if (typeof cacheSize === 'number') return cacheSize;
			return props.getItemSize(index);
		},
		[props.getItemKey, props.getItemSize, sizeCacheMap],
	);

	// 更新参数，并触state变更
	useEffect(() => {
		virtualCore.updateProps({
			...props,
			getItemSize,
			onTotalSizeChange: () => {
				setVirtualCore(new VirtualCore(virtualCore));
			},
			onRangeChange: ({ isScroll }) => {
				if (isScroll) {
					flushSync(() => setVirtualCore(new VirtualCore(virtualCore)));
				} else {
					setVirtualCore(new VirtualCore(virtualCore));
				}
			},
		});
	}, [props, getItemSize]);

	// useEffectEvent避免闭包问题
	const updateScrollOffset = useEffectEvent((offset: number | null) => virtualCore.updateScrollOffset(offset));
	// useEffectEvent避免闭包问题
	const updateContainerSize = useEffectEvent((size: number | null) => virtualCore.updateContainerSize(size));
	// 监听容器的size和scroll
	useLayoutEffect(() => {
		if (containerRef.current && enabled === true) {
			// observer resize
			const updateRect = () => updateContainerSize(containerRef.current?.[horizontal ? 'clientWidth' : 'clientHeight'] ?? null);
			const ob = new ResizeObserver(updateRect);
			ob.observe(containerRef.current);
			// observer scroll
			const onScroll = () => updateScrollOffset(containerRef.current?.[horizontal ? 'scrollLeft' : 'scrollTop'] ?? null);
			containerRef.current.addEventListener('scroll', onScroll, { passive: true });
			// 直接执行一次
			updateRect();
			onScroll();

			return () => {
				ob.disconnect();
				containerRef.current?.removeEventListener('scroll', onScroll);
			};
		}
	}, [enabled]);

	// 获取需要使用的state
	const { totalSize, virtualItems } = useMemo(() => {
		const totalSize = virtualCore.state.totalSize;
		const virtualItems = virtualCore.getVirtualItems();
		return { totalSize, virtualItems };
	}, [virtualCore]);

	return { totalSize, virtualItems, containerRef, measureItemRef };
};

export default useVirtual;
