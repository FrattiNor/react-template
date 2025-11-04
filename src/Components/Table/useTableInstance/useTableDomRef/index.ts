import { useEffectEvent, useLayoutEffect, useRef } from 'react';

import type useTableColumns from '../useTableColumns';
import type useTableState from '../useTableState';

type Props<T> = {
	tableState: ReturnType<typeof useTableState>;
	tableColumns: ReturnType<typeof useTableColumns<T>>;
};

// 表格dom的ref 以及 对dom的监测【resize、scroll】
const useTableDomRef = <T>({ tableState, tableColumns }: Props<T>) => {
	const bodyRef = useRef<HTMLDivElement>(null);
	const headRef = useRef<HTMLDivElement>(null);
	const { fixedLeftArr, fixedRightArr } = tableColumns;
	const { setV_ScrollbarWidth, setH_ScrollbarWidth, setPingedLeftEnd, setPingedRightEnd } = tableState;

	// 计算固定的index
	const calcPingedIndex = useEffectEvent(() => {
		const bodyScrollLeft = bodyRef.current?.scrollLeft;
		const bodyScrollWidth = bodyRef.current?.scrollWidth;
		const bodyClientWidth = bodyRef.current?.clientWidth;
		if (typeof bodyScrollLeft === 'number' && typeof bodyScrollWidth === 'number' && typeof bodyClientWidth === 'number') {
			const scrollLeft = bodyScrollLeft;
			const scrollRight = bodyScrollWidth - bodyClientWidth - bodyScrollLeft;
			// 计算固定的index
			let leftPingedEnd: number | undefined = undefined;
			let rightPingedEnd: number | undefined = undefined;

			for (let i = 0; i < fixedLeftArr.length; i++) {
				const { pingedSize, index } = fixedLeftArr[i];
				if (scrollLeft > pingedSize) {
					if (leftPingedEnd === undefined || leftPingedEnd < index) leftPingedEnd = index;
				} else {
					break;
				}
			}

			for (let i = 0; i < fixedRightArr.length; i++) {
				const { pingedSize, index } = fixedRightArr[i];
				if (scrollRight > pingedSize) {
					if (rightPingedEnd === undefined || rightPingedEnd > index) rightPingedEnd = index;
				} else {
					break;
				}
			}

			setPingedLeftEnd(leftPingedEnd);
			setPingedRightEnd(rightPingedEnd);
		}
	});

	useLayoutEffect(() => {
		if (bodyRef.current && headRef.current) {
			const body = bodyRef.current;
			const head = headRef.current;

			// === ob body content resize ===
			const calcV_ScrollBarWidth = () => {
				setV_ScrollbarWidth(body.offsetWidth - body.clientWidth);
				setH_ScrollbarWidth(body.offsetHeight - body.clientHeight);
			};
			const ob = new ResizeObserver(calcV_ScrollBarWidth);
			ob.observe(body, { box: 'content-box' });
			// 直接执行一次
			calcV_ScrollBarWidth();

			// === ob body scroll ===
			const handleBodyScroll = () => {
				if (head.scrollLeft !== body.scrollLeft) {
					head.scrollLeft = body.scrollLeft;
					calcPingedIndex();
				}
			};
			body.addEventListener('scroll', handleBodyScroll, { passive: true });

			// === ob head scroll ===
			const handleHeadScroll = () => {
				if (head.scrollLeft !== body.scrollLeft) {
					body.scrollLeft = head.scrollLeft;
					calcPingedIndex();
				}
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
