import { useLayoutEffect, useRef } from 'react';
import { useAppDispatch } from '../../../TableState';
import { setV_ScrollBarWidth } from '../../../TableState/counterSlice';

// 表格dom的ref
const useTableDomRef = () => {
	const dispatch = useAppDispatch();
	const bodyRef = useRef<HTMLDivElement>(null);
	const headRef = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		if (bodyRef.current && headRef.current) {
			const body = bodyRef.current;
			const head = headRef.current;

			// === ob content resize ===
			const calcV_ScrollBarWidth = () => {
				console.log(body.offsetWidth - body.clientWidth);
				dispatch(setV_ScrollBarWidth(body.offsetWidth - body.clientWidth));
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
			};
			body.addEventListener('scroll', handleBodyScroll, { passive: true });

			return () => {
				ob.disconnect();
				body.removeEventListener('scroll', handleBodyScroll);
			};
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return { bodyRef, headRef };
};

export default useTableDomRef;
