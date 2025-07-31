import { useEffect, useRef, useState } from 'react';

const useTableDomRef = () => {
	const bodyRef = useRef<HTMLDivElement | null>(null);
	const headRef = useRef<HTMLDivElement | null>(null);
	const [rightScrollBarWidth, setRightScrollBarWidth] = useState(0);

	useEffect(() => {
		if (bodyRef.current && headRef.current) {
			const bodyScroll = () => {
				const bodyScrollLeft = bodyRef.current?.scrollLeft;
				const headScrollLeft = headRef.current?.scrollLeft;
				if (typeof bodyScrollLeft === 'number' && typeof headScrollLeft === 'number' && bodyScrollLeft !== headScrollLeft) {
					if (headRef.current) {
						headRef.current.scrollLeft = bodyScrollLeft;
					}
				}
			};

			bodyRef.current.addEventListener('scroll', bodyScroll, { passive: true });

			return () => {
				bodyRef.current?.removeEventListener('scroll', bodyScroll);
			};
		}
	}, []);

	useEffect(() => {
		if (bodyRef.current) {
			const ob = new ResizeObserver((entries) => {
				const scrollBarWidth = entries[0].borderBoxSize[0].inlineSize - entries[0].contentBoxSize[0].inlineSize;
				setRightScrollBarWidth(scrollBarWidth);
			});
			ob.observe(bodyRef.current);

			return () => {
				ob.disconnect();
			};
		}
	}, []);

	return { bodyRef, headRef, rightScrollBarWidth };
};

export default useTableDomRef;
