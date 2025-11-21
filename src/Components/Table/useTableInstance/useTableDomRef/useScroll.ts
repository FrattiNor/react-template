import { useRef } from 'react';

export const useScrollBy = (direction: 'scrollTop' | 'scrollLeft') => {
	const dateValueRef = useRef(0);
	const beforeRef = useRef<{ target: number; positive: boolean } | null>(null);
	const requestIdRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(null);

	const scrollBy = ({ el, offset, duration = 500 }: { el: HTMLElement; offset: number; duration: number }) => {
		const positive = offset > 0;
		const start = el[direction];
		let change = start + offset - start;
		dateValueRef.current = new Date().valueOf();

		if (requestIdRef.current) {
			cancelAnimationFrame(requestIdRef.current);
			if (beforeRef.current && beforeRef.current.positive === positive) {
				change = beforeRef.current.target + offset - start;
				beforeRef.current = { positive, target: beforeRef.current.target + offset };
			} else {
				beforeRef.current = { positive, target: start + offset };
			}
		} else {
			beforeRef.current = { positive, target: start + offset };
		}

		const animateScroll = () => {
			const per = (new Date().valueOf() - dateValueRef.current) / duration;
			const nextValue = start + Math.min(1, per) * change;
			el[direction] = nextValue;
			if (per <= 1) {
				requestIdRef.current = requestAnimationFrame(animateScroll);
			} else {
				beforeRef.current = null;
				requestIdRef.current = null;
			}
		};

		animateScroll();
	};

	return scrollBy;
};
