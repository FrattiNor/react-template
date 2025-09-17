import { startTransition, useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import type useTableDomRef from '../useTableDomRef';
import type useTableState from '../useTableState';
import type useTableMeasureCol from '../useTableMeasureCol';
import type useTableSecondaryState from '../useTableSecondaryState';

type Props = {
	tableState: ReturnType<typeof useTableState>;
	tableDomRef: ReturnType<typeof useTableDomRef>;
	tableMeasureCol: ReturnType<typeof useTableMeasureCol>;
	tableSecondaryState: ReturnType<typeof useTableSecondaryState>;
};

const useTableLogic = ({ tableDomRef, tableState, tableSecondaryState }: Props) => {
	const { bodyRef, headRef } = tableDomRef;
	const { fixedLeftObj, fixedRightObj } = tableSecondaryState;
	const { colMeasure, resizeFlag, setLeftPingedIndex, setRightPingedIndex, setV_ScrollbarWidth, setH_ScrollbarWidth, setBodyClientWidth } =
		tableState;

	// 计算固定的index
	const calcPingedIndex = useCallback(() => {
		const bodyScrollLeft = bodyRef.current?.scrollLeft;
		const bodyScrollWidth = bodyRef.current?.scrollWidth;
		const bodyClientWidth = bodyRef.current?.clientWidth;
		if (typeof bodyScrollLeft === 'number' && typeof bodyScrollWidth === 'number' && typeof bodyClientWidth === 'number') {
			const scrollLeft = bodyScrollLeft;
			const scrollRight = bodyScrollWidth - bodyClientWidth - bodyScrollLeft;
			let leftPingedIndex: undefined | number = undefined;
			let rightPingedIndex: undefined | number = undefined;
			Object.values(fixedLeftObj).forEach(({ pingedSize, index }) => {
				const pinged = scrollLeft > pingedSize;
				if (pinged && index > (leftPingedIndex ?? -1)) leftPingedIndex = index;
			});
			Object.values(fixedRightObj).forEach(({ pingedSize, index }) => {
				const pinged = scrollRight > pingedSize;
				if (pinged && index < (rightPingedIndex ?? Infinity)) rightPingedIndex = index;
			});
			startTransition(() => {
				setLeftPingedIndex(leftPingedIndex);
				setRightPingedIndex(rightPingedIndex);
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
						headRef.current.scrollLeft = bodyScrollLeft;
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
			// 计算垂直滚动条宽度
			const getV_ScrollbarWidth = () => {
				if (bodyRef.current) {
					return bodyRef.current.offsetWidth - bodyRef.current.clientWidth;
				}
				return 0;
			};
			// 计算水平滚动条宽度
			const getH_ScrollbarWidth = () => {
				if (bodyRef.current) {
					return bodyRef.current.offsetHeight - bodyRef.current.clientHeight;
				}
				return 0;
			};
			// 计算body宽度
			const getBodyClientWidth = () => {
				if (bodyRef.current) {
					return bodyRef.current.clientWidth;
				}
				return 0;
			};
			// 直接执行一次
			setV_ScrollbarWidth(getV_ScrollbarWidth());
			setH_ScrollbarWidth(getH_ScrollbarWidth());
			setBodyClientWidth(getBodyClientWidth());

			const ob = new ResizeObserver(() => {
				setV_ScrollbarWidth(getV_ScrollbarWidth());
				setH_ScrollbarWidth(getH_ScrollbarWidth());
				setBodyClientWidth(getBodyClientWidth());
			});

			ob.observe(bodyRef.current, { box: 'border-box' });

			return () => {
				ob.disconnect();
			};
		}
	}, []);

	return { calcPingedIndex };
};

export default useTableLogic;
