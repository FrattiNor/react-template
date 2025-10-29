import { useLayoutEffect, useRef, useState } from 'react';

// 表格dom的ref
const useTableDomRef = () => {
	const bodyRef = useRef<HTMLDivElement>(null);
	const headRef = useRef<HTMLDivElement>(null);
	const [v_ScrollbarWidth, setV_ScrollbarWidth] = useState(0);

	useLayoutEffect(() => {
		if (bodyRef.current && headRef.current) {
			const body = bodyRef.current;
			const head = headRef.current;

			// === ob content resize ===
			const calcV_ScrollBarWidth = () => {
				setV_ScrollbarWidth(body.offsetWidth - body.clientWidth);
			};
			// 直接执行一次
			calcV_ScrollBarWidth();
			const ob = new ResizeObserver(calcV_ScrollBarWidth);
			ob.observe(body, { box: 'content-box' });

			// === ob scroll ===
			const handleBodyScroll = () => {
				if (head.scrollLeft !== body.scrollLeft) {
					head.scrollLeft = body.scrollLeft;
				}
				if (head.scrollLeft !== body.scrollLeft) {
					head.scrollLeft = body.scrollLeft;
				}
			};
			body.addEventListener('scroll', handleBodyScroll, { passive: true });

			return () => {
				ob.disconnect();
				body.removeEventListener('scroll', handleBodyScroll);
			};
		}
	}, []);

	return { v_ScrollbarWidth, bodyRef, headRef };
};

export default useTableDomRef;
