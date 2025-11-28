import { startTransition, useEffect, useLayoutEffect, useRef } from 'react';

import { useScrollBy } from './useScroll';
import useDebounce from '../../TableHooks/useDebounce';
import calcBorderWidth from '../../TableUtils/calcBorderWidth';

import type useTableState from '../useTableState';

type Props = {
	tableState: ReturnType<typeof useTableState>;
};

// 表格dom的ref 以及 对dom的监测【resize、scroll】
const useTableDomRef = ({ tableState }: Props) => {
	const { debounce } = useDebounce();
	const scrollByTop = useScrollBy('scrollTop');
	const scrollByLeft = useScrollBy('scrollLeft');
	const headRef = useRef<HTMLDivElement>(null);
	const bodyRef = useRef<HTMLDivElement>(null);
	const bodyInnerRef = useRef<HTMLDivElement>(null);
	const vScrollbarRef = useRef<HTMLDivElement>(null);
	const hScrollbarRef = useRef<HTMLDivElement>(null);
	const { setV_scrollbar, setH_scrollbar, setBodyWidth } = tableState;

	useLayoutEffect(() => {
		if (bodyRef.current && bodyInnerRef.current) {
			const body = bodyRef.current;
			const bodyInner = bodyInnerRef.current;

			// === ob body content resize ===
			const calcObserver = (entries?: ResizeObserverEntry[]) => {
				const hScrollbarHave = bodyInner.clientWidth > 0 && body.clientWidth > 0 && bodyInner.clientWidth > body.clientWidth;
				const vScrollbarHave = bodyInner.clientHeight > 0 && body.clientHeight > 0 && bodyInner.clientHeight > body.clientHeight;
				if (!entries) {
					const { calcDom, hScrollbarWidth, vScrollbarWidth } = calcBorderWidth(body);
					// 保存state
					setV_scrollbar((old) => {
						const next = { have: vScrollbarHave, width: vScrollbarWidth, innerSize: bodyInner.clientHeight };
						if (next.have !== old.have || next.width !== old.width || next.innerSize !== old.innerSize) {
							return next;
						}
						return old;
					});
					setH_scrollbar((old) => {
						const next = { have: hScrollbarHave, width: hScrollbarWidth, innerSize: bodyInner.clientWidth };
						if (next.have !== old.have || next.width !== old.width || next.innerSize !== old.innerSize) {
							return next;
						}
						return old;
					});
					setBodyWidth(body.clientWidth);
					// 从DOM中移除临时元素
					calcDom.parentNode?.removeChild(calcDom);
				} else {
					debounce(() => {
						startTransition(() => {
							setV_scrollbar((old) => {
								const next = { ...old, have: vScrollbarHave, innerSize: bodyInner.clientHeight };
								if (next.have !== old.have || next.width !== old.width || next.innerSize !== old.innerSize) {
									return next;
								}
								return old;
							});
							setH_scrollbar((old) => {
								const next = { ...old, have: hScrollbarHave, innerSize: bodyInner.clientWidth };
								if (next.have !== old.have || next.width !== old.width || next.innerSize !== old.innerSize) {
									return next;
								}
								return old;
							});
							setBodyWidth(body.clientWidth);
						});
					});
				}
			};

			// 直接执行一次
			calcObserver();
			const ob = new ResizeObserver(calcObserver);
			ob.observe(body, { box: 'border-box' });
			ob.observe(bodyInner, { box: 'border-box' });

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
