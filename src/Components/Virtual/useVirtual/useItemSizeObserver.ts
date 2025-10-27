import { useRef, useEffect } from 'react';
import type useSizeCacheMap from './useSizeCacheMap';

type Props = {
	horizontal: boolean;
	sizeCache: ReturnType<typeof useSizeCacheMap>;
};

const useItemSizeObserver = ({ sizeCache, horizontal }: Props) => {
	const itemSizeObserverRef = useRef<ResizeObserver | null>(null);

	// 避免闭包问题
	const updateItemSizeRef = useRef(sizeCache.updateItemSize);
	// eslint-disable-next-line react-hooks/refs
	if (updateItemSizeRef.current !== sizeCache.updateItemSize) updateItemSizeRef.current = sizeCache.updateItemSize;

	const getItemSizeObserver = () => {
		if (itemSizeObserverRef.current === null) {
			itemSizeObserverRef.current = new ResizeObserver((entries) => {
				entries.forEach((item) => {
					const index = parseInt(item.target.getAttribute('data-index') ?? '');
					if (!isNaN(index)) {
						const size = item.contentRect[horizontal ? 'width' : 'height'];
						updateItemSizeRef.current({ index, size, from: 'resize' });
					}
				});
			});
		}
		return itemSizeObserverRef.current;
	};

	// 清除itemSize Observer
	useEffect(() => {
		return () => {
			if (itemSizeObserverRef.current) itemSizeObserverRef.current.disconnect();
		};
	}, []);

	// 用于测量itemSize，在不定高情况使用
	// warning 【StrictMode会影响此运行，导致动态监测高度失效】
	const measureItemRef = (index: number, node: HTMLElement | null) => {
		if (node) {
			const size = node[horizontal ? 'clientWidth' : 'clientHeight'];
			updateItemSizeRef.current({ index, size, from: 'ref' });
			getItemSizeObserver().observe(node);
			return () => {
				getItemSizeObserver().unobserve(node);
			};
		}
	};

	return { measureItemRef };
};

export default useItemSizeObserver;
