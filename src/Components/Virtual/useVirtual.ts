/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useEffectEvent, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { VirtualProps } from './type';
import Virtual from './Virtual';
import { flushSync } from 'react-dom';

const useVirtual = (props: Omit<VirtualProps, 'onRangeChange' | 'onTotalSizeChange'>) => {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const [virtual, setVirtual] = useState(() => new Virtual());

	useEffect(() => {
		virtual.updateProps({
			...props,
			onTotalSizeChange: () => {
				setVirtual(new Virtual(virtual));
			},
			onRangeChange: ({ isScroll }) => {
				if (isScroll) {
					flushSync(() => setVirtual(new Virtual(virtual)));
				} else {
					setVirtual(new Virtual(virtual));
				}
			},
		});
	}, [props]);

	const updateScrollOffset = useEffectEvent((offset: number | null) => virtual.updateScrollOffset(offset));

	const updateContainerSize = useEffectEvent((size: number | null) => virtual.updateContainerSize(size));

	useLayoutEffect(() => {
		if (containerRef.current && (props.enabled ?? true) === true) {
			// observer resize
			const updateRect = () => updateContainerSize(containerRef.current?.clientHeight ?? null);
			const ob = new ResizeObserver(updateRect);
			ob.observe(containerRef.current);
			// observer scroll
			const onScroll = () => updateScrollOffset(containerRef.current?.scrollTop ?? null);
			containerRef.current.addEventListener('scroll', onScroll, { passive: true });
			// 直接执行一次
			updateRect();
			onScroll();

			return () => {
				ob.disconnect();
				containerRef.current?.removeEventListener('scroll', onScroll);
			};
		}
	}, [props.enabled]);

	const { totalSize, virtualItems } = useMemo(() => {
		const totalSize = virtual.state.totalSize;
		const virtualItems = virtual.getVirtualItems();
		return { totalSize, virtualItems };
	}, [virtual]);

	return { totalSize, virtualItems, containerRef };
};

export default useVirtual;
