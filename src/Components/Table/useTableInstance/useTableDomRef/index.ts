import { useLayoutEffect, useRef } from 'react';

import type useTableState from '../useTableState';

type Props = {
	tableState: ReturnType<typeof useTableState>;
};

// 表格dom的ref
const useTableDomRef = ({ tableState }: Props) => {
	const { setV_ScrollbarWidth } = tableState;
	const bodyRef = useRef<HTMLDivElement>(null);
	const headRef = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		if (bodyRef.current && headRef.current) {
			const body = bodyRef.current;
			const head = headRef.current;

			// === ob body content resize ===
			const calcV_ScrollBarWidth = () => {
				setV_ScrollbarWidth(body.offsetWidth - body.clientWidth);
			};
			const ob = new ResizeObserver(calcV_ScrollBarWidth);
			ob.observe(body, { box: 'content-box' });
			// 直接执行一次
			calcV_ScrollBarWidth();

			// === ob body scroll ===
			const handleBodyScroll = () => {
				if (head.scrollLeft !== body.scrollLeft) head.scrollLeft = body.scrollLeft;
			};
			body.addEventListener('scroll', handleBodyScroll, { passive: true });

			// === ob head scroll ===
			const handleHeadScroll = () => {
				if (head.scrollLeft !== body.scrollLeft) body.scrollLeft = head.scrollLeft;
			};
			head.addEventListener('scroll', handleHeadScroll, { passive: true });

			return () => {
				ob.disconnect();
				body.removeEventListener('scroll', handleBodyScroll);
				head.removeEventListener('scroll', handleHeadScroll);
			};
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return { bodyRef, headRef };
};

export default useTableDomRef;
