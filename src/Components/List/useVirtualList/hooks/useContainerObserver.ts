import { useEffect, useRef } from 'react';

import type useVirtualProps from './useVirtualProps';
import type useVirtualState from './useVirtualState';

const useFrame = () => {
	const endCallbackRef = useRef<Record<string, () => void>>({});
	const ref = useRef<Record<string, ReturnType<typeof requestAnimationFrame>>>({});

	const oneFrame = (key: string, callback: () => void) => {
		if (ref.current[key] === undefined) {
			callback();
			ref.current[key] = requestAnimationFrame(() => {
				delete ref.current[key];
				if (endCallbackRef.current[key]) {
					endCallbackRef.current[key]();
					delete endCallbackRef.current[key];
				}
			});
		} else {
			endCallbackRef.current[key] = callback;
		}
	};

	return oneFrame;
};

type Props<T> = {
	state: ReturnType<typeof useVirtualState<T>>;
	getProps: ReturnType<typeof useVirtualProps<T>>;
	containerRef: React.RefObject<HTMLDivElement | null>;
	maybeRangeChange: (v: { sync: boolean; from: string }) => void;
};

const useContainerObserver = <T>(props: Props<T>) => {
	const { containerRef, getProps, state, maybeRangeChange } = props;
	const { getContainerSize, setContainerSize, getScrollOffset, setScrollOffset } = state;

	const oneFrame = useFrame();

	useEffect(() => {
		if (containerRef.current) {
			const ob = new ResizeObserver(() => {
				const newSize = getProps('direction') === 'h' ? (containerRef.current?.clientWidth ?? 0) : (containerRef.current?.clientHeight ?? 0);
				if (newSize !== getContainerSize()) {
					setContainerSize(newSize);
					maybeRangeChange({ sync: false, from: 'resize' });
				}
			});
			const handleScroll = () => {
				oneFrame('handleScroll', () => {
					const newOffset =
						getProps('direction') === 'h' ? (containerRef.current?.scrollLeft ?? 0) : (containerRef.current?.scrollTop ?? 0);
					if (newOffset !== getScrollOffset()) {
						setScrollOffset(newOffset);
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
};

export default useContainerObserver;
