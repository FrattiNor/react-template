/* eslint-disable react-hooks/exhaustive-deps */
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

	return { containerRef };
};

export default useObserverContainer;
