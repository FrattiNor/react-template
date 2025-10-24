import { useState } from 'react';
import type { VirtualProps } from '../Core/type';
import useItemSizeObserver from './useItemSizeObserver';
import useObserverContainer from './useObserverContainer';
import useVirtualCore from './useVirtualCore';

type Props = Omit<VirtualProps, 'onRangeChange' | 'onTotalSizeChange'> & {
	horizontal?: boolean;
};

const useVirtual = (props: Props) => {
	// enabled
	const enabled = props.enabled ?? true;
	// horizontal
	const horizontal = props.horizontal ?? false;
	// itemSize缓存
	const [sizeCacheMap, setSizeCacheMap] = useState(() => new Map<string, number>());
	//
	const { totalSize, virtualItems, virtualCore } = useVirtualCore({ props, sizeCacheMap });
	// itemSize Observer
	const { getItemSizeObserver } = useItemSizeObserver({ setSizeCacheMap, horizontal });
	//
	const { containerRef } = useObserverContainer({ enabled, horizontal, virtualCore });

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
			getItemSizeObserver().observe(node);
			return () => {
				getItemSizeObserver().unobserve(node);
			};
		}
	};

	return { totalSize, virtualItems, containerRef, measureItemRef };
};

export default useVirtual;
