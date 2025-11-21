import { useEffect, useLayoutEffect, useRef } from 'react';

import { useScrollBy } from './useScroll';

import type useTableState from '../useTableState';

type Props = {
	tableState: ReturnType<typeof useTableState>;
};

// 表格dom的ref 以及 对dom的监测【resize、scroll】
const useTableDomRef = ({ tableState }: Props) => {
	const scrollByTop = useScrollBy('scrollTop');
	const scrollByLeft = useScrollBy('scrollLeft');
	const headRef = useRef<HTMLDivElement>(null);
	const bodyRef = useRef<HTMLDivElement>(null);
	const bodyInnerRef = useRef<HTMLDivElement>(null);
	const vScrollbarRef = useRef<HTMLDivElement>(null);
	const hScrollbarRef = useRef<HTMLDivElement>(null);
	const { setV_scrollbar, setH_scrollbar } = tableState;

	useLayoutEffect(() => {
		if (bodyRef.current && bodyInnerRef.current) {
			const body = bodyRef.current;
			const bodyInner = bodyInnerRef.current;

			// === ob body content resize ===
			const calcScrollBar = (entries?: ResizeObserverEntry[]) => {
				const hScrollbarHave = body.scrollWidth > body.clientWidth;
				const vScrollbarHave = body.scrollHeight > body.clientHeight;
				if (!entries) {
					// 创建隐藏的div容器
					const outer = document.createElement('div');
					outer.style.width = '100px';
					outer.style.height = '100px';
					outer.style.visibility = 'hidden';
					outer.style.opacity = '0';
					outer.style.zIndex = '-1';
					outer.style.overflow = 'scroll';
					outer.style.position = 'absolute';
					outer.style.top = '0px';
					outer.style.left = '0px';
					body.appendChild(outer);
					// 创建内部元素并放置在容器中
					const inner = document.createElement('div');
					inner.style.width = '1000px';
					inner.style.height = '1000px';
					outer.appendChild(inner);
					// 保存宽度
					setV_scrollbar({
						have: vScrollbarHave,
						outSize: body.clientHeight,
						innerSize: body.scrollHeight,
						width: outer.offsetWidth - outer.clientWidth,
					});
					setH_scrollbar({
						have: hScrollbarHave,
						outSize: body.clientWidth,
						innerSize: body.scrollWidth,
						width: outer.offsetHeight - outer.clientHeight,
					});
					// 从DOM中移除临时元素
					outer.parentNode?.removeChild(outer);
				} else {
					setV_scrollbar((old) => ({
						...old,
						have: vScrollbarHave,
						outSize: body.clientHeight,
						innerSize: body.scrollHeight,
					}));
					setH_scrollbar((old) => ({
						...old,
						have: hScrollbarHave,
						outSize: body.clientWidth,
						innerSize: body.scrollWidth,
					}));
				}
			};
			const ob = new ResizeObserver(calcScrollBar);
			ob.observe(body, { box: 'border-box' });
			ob.observe(bodyInner, { box: 'border-box' });
			// 直接执行一次
			calcScrollBar();

			return () => {
				ob.disconnect();
			};
		}
	}, []);

	useEffect(() => {
		if (bodyRef.current) {
			const body = bodyRef.current;
			const handleWheel = (e: WheelEvent) => {
				const scrollCoefficient = -(((e as any).wheelDeltaY as number) ?? -e.deltaY) > 0 ? 1 : -1;
				const scrollDistance = scrollCoefficient * 150;
				if (e.shiftKey === true) {
					if (hScrollbarRef.current) {
						scrollByLeft({ el: hScrollbarRef.current, offset: scrollDistance, duration: 150 });
					}
				} else {
					if (vScrollbarRef.current) {
						scrollByTop({ el: vScrollbarRef.current, offset: scrollDistance, duration: 150 });
					}
				}
			};
			body.addEventListener('wheel', handleWheel, { passive: true });

			return () => {
				body.removeEventListener('wheel', handleWheel);
			};
		}
	}, []);

	useEffect(() => {
		if (headRef.current) {
			const head = headRef.current;
			const handleWheel = (e: WheelEvent) => {
				const scrollCoefficient = -(((e as any).wheelDeltaY as number) ?? -e.deltaY) > 0 ? 1 : -1;
				const scrollDistance = scrollCoefficient * 150;
				if (e.shiftKey === true) {
					if (hScrollbarRef.current) {
						scrollByLeft({ el: hScrollbarRef.current, offset: scrollDistance, duration: 150 });
					}
				} else {
					if (vScrollbarRef.current) {
						scrollByTop({ el: vScrollbarRef.current, offset: scrollDistance, duration: 150 });
					}
				}
			};
			head.addEventListener('wheel', handleWheel, { passive: true });

			return () => {
				head.removeEventListener('wheel', handleWheel);
			};
		}
	}, []);

	return { bodyRef, headRef, bodyInnerRef, vScrollbarRef, hScrollbarRef };
};

export default useTableDomRef;
