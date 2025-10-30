import { useEffectEvent, useLayoutEffect, useRef } from 'react';

import VirtualCore from '../Core';

type Props = {
	enabled: boolean;
	horizontal: boolean;
	virtualCore: VirtualCore;
};

const useObserverContainer = ({ virtualCore, horizontal, enabled }: Props) => {
	// 容器
	const containerRef = useRef<HTMLDivElement | null>(null);
	// useEffectEvent避免闭包问题
	const updateScrollOffset = useEffectEvent((offset: number | null, opt: { isScroll: boolean }) => virtualCore.updateScrollOffset(offset, opt));
	// useEffectEvent避免闭包问题
	const updateContainerSize = useEffectEvent((size: number | null) => virtualCore.updateContainerSize(size));
	// 监听容器的size和scroll
	useLayoutEffect(() => {
		if (containerRef.current && enabled === true) {
			const container = containerRef.current;
			// observer resize
			const updateRect = () => updateContainerSize(container[horizontal ? 'clientWidth' : 'clientHeight'] ?? null);
			const ob = new ResizeObserver(updateRect);
			ob.observe(container);
			// observer scroll
			const onScroll = () => updateScrollOffset(container[horizontal ? 'scrollLeft' : 'scrollTop'] ?? null, { isScroll: true });
			container.addEventListener('scroll', onScroll, { passive: true });
			// 直接更新一次size和offset
			updateContainerSize(container[horizontal ? 'clientWidth' : 'clientHeight'] ?? null);
			updateScrollOffset(container[horizontal ? 'scrollLeft' : 'scrollTop'] ?? null, { isScroll: false });

			return () => {
				ob.disconnect();
				container.removeEventListener('scroll', onScroll);
			};
		}
	}, [enabled, horizontal]);

	return { containerRef };
};

export default useObserverContainer;
