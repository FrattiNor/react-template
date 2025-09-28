import { startTransition, useCallback, useEffect, useLayoutEffect, useRef } from 'react';

import type useTableDomRef from '../useTableDomRef';
import type useTableMeasureCol from '../useTableMeasureCol';
import type useTableSecondaryState from '../useTableSecondaryState';
import type useTableState from '../useTableState';

type Props = {
	tableState: ReturnType<typeof useTableState>;
	tableDomRef: ReturnType<typeof useTableDomRef>;
	tableMeasureCol: ReturnType<typeof useTableMeasureCol>;
	tableSecondaryState: ReturnType<typeof useTableSecondaryState>;
};

// 表格监测
// 监测滚动、resize
const useTableObserver = ({ tableDomRef, tableState, tableSecondaryState }: Props) => {
	const { bodyRef, headRef } = tableDomRef;
	const { fixedLeftObj, fixedRightObj } = tableSecondaryState;
	const {
		colMeasure,
		resizeFlag,
		setPingedLeftFirst,
		setPingedLeftLast,
		setPingedRightFirst,
		setPingedRightLast,
		setV_ScrollbarWidth,
		setH_ScrollbarWidth,
		setBodyClientWidth,
		setFilterOpenKey,
	} = tableState;

	// 计算固定的index
	const calcPingedIndex = useCallback(() => {
		const bodyScrollLeft = bodyRef.current?.scrollLeft;
		const bodyScrollWidth = bodyRef.current?.scrollWidth;
		const bodyClientWidth = bodyRef.current?.clientWidth;
		if (typeof bodyScrollLeft === 'number' && typeof bodyScrollWidth === 'number' && typeof bodyClientWidth === 'number') {
			const scrollLeft = bodyScrollLeft;
			const scrollRight = bodyScrollWidth - bodyClientWidth - bodyScrollLeft;
			// 计算固定的index
			let leftPingedFirst: number | undefined = undefined;
			let leftPingedLast: number | undefined = undefined;
			let rightPingedFirst: number | undefined = undefined;
			let rightPingedLast: number | undefined = undefined;

			Object.values(fixedLeftObj).forEach(({ pingedSize, index }) => {
				if (scrollLeft > pingedSize) {
					if (leftPingedFirst === undefined) leftPingedFirst = index;
					if (leftPingedLast === undefined || leftPingedLast < index) leftPingedLast = index;
				}
			});

			Object.values(fixedRightObj).forEach(({ pingedSize, index }) => {
				if (scrollRight > pingedSize) {
					if (rightPingedFirst === undefined) rightPingedFirst = index;
					if (rightPingedLast === undefined || rightPingedLast < index) rightPingedLast = index;
				}
			});

			startTransition(() => {
				setPingedLeftFirst(leftPingedFirst);
				setPingedLeftLast(leftPingedLast);
				setPingedRightFirst(rightPingedFirst);
				setPingedRightLast(rightPingedLast);
			});
		}
	}, [fixedLeftObj, fixedRightObj]);

	// 监测结束后执行一次计算offset
	// 拖拽结束后执行一次计算offset
	useEffect(() => {
		if (colMeasure.measure === false || resizeFlag === null) {
			calcPingedIndex();
		}
	}, [colMeasure.measure, resizeFlag]);

	// 提供ref版func，避免闭包问题
	const calcPingedIndexRef = useRef(calcPingedIndex);
	calcPingedIndexRef.current = calcPingedIndex;
	// body 滚动
	useEffect(() => {
		if (bodyRef.current && headRef.current) {
			// 同步滚动【body，head】
			const synchronizedScrolling = () => {
				const bodyScrollLeft = bodyRef.current?.scrollLeft;
				const headScrollLeft = headRef.current?.scrollLeft;
				if (typeof bodyScrollLeft === 'number' && typeof headScrollLeft === 'number' && bodyScrollLeft !== headScrollLeft) {
					if (headRef.current) {
						// eslint-disable-next-line react-compiler/react-compiler
						headRef.current.scrollLeft = bodyScrollLeft;
						startTransition(() => {
							setFilterOpenKey(undefined);
						});
					}
				}
			};

			const handleBodyScroll = () => {
				calcPingedIndexRef.current();
				synchronizedScrolling();
			};

			bodyRef.current.addEventListener('scroll', handleBodyScroll, { passive: true });

			return () => {
				bodyRef.current?.removeEventListener('scroll', handleBodyScroll);
			};
		}
	}, []);

	// body Resize
	useLayoutEffect(() => {
		if (bodyRef.current) {
			const calc = () => {
				setBodyClientWidth(bodyRef.current ? bodyRef.current.clientWidth : 0);
				setV_ScrollbarWidth(bodyRef.current ? bodyRef.current.offsetWidth - bodyRef.current.clientWidth : 0);
				setH_ScrollbarWidth(bodyRef.current ? bodyRef.current.offsetHeight - bodyRef.current.clientHeight : 0);
			};

			// 直接执行一次
			calc();

			const ob1 = new ResizeObserver(calc);
			const ob2 = new ResizeObserver(calc);

			// content
			ob1.observe(bodyRef.current);
			// border
			ob2.observe(bodyRef.current, { box: 'border-box' });

			return () => {
				ob1.disconnect();
				ob2.disconnect();
			};
		}
	}, []);

	return { calcPingedIndex };
};

export default useTableObserver;
