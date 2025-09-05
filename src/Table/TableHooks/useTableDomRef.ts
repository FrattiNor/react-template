import { startTransition, useEffect, useLayoutEffect, useRef } from 'react';
import type useTableState from './useTableState';

type Props = {
	tableState: ReturnType<typeof useTableState>;
};

// 表格dom的ref
const useTableDomRef = ({ tableState }: Props) => {
	const bodyRef = useRef<HTMLDivElement | null>(null);
	const headRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (bodyRef.current && headRef.current) {
			const handleBodyScroll = () => {
				const bodyScrollLeft = bodyRef.current?.scrollLeft;
				const bodyScrollWidth = bodyRef.current?.scrollWidth;
				const bodyClientWidth = bodyRef.current?.clientWidth;
				const headScrollLeft = headRef.current?.scrollLeft;
				if (typeof bodyScrollLeft === 'number' && typeof bodyScrollWidth === 'number' && typeof bodyClientWidth === 'number') {
					const pingedLeft = bodyScrollLeft;
					const pingedRight = bodyScrollWidth - bodyClientWidth - bodyScrollLeft;
					startTransition(() => {
						tableState.setPingedLeft(pingedLeft);
						tableState.setPingedRight(pingedRight);
					});
				}
				if (typeof bodyScrollLeft === 'number' && typeof headScrollLeft === 'number' && bodyScrollLeft !== headScrollLeft) {
					if (headRef.current) {
						headRef.current.scrollLeft = bodyScrollLeft;
					}
				}
			};

			bodyRef.current.addEventListener('scroll', handleBodyScroll, { passive: true });

			return () => {
				bodyRef.current?.removeEventListener('scroll', handleBodyScroll);
			};
		}
	}, []);

	useLayoutEffect(() => {
		if (bodyRef.current) {
			const getRightScrollBarWidth = () => {
				if (bodyRef.current) {
					return bodyRef.current.offsetWidth - bodyRef.current.clientWidth;
				}
				return 0;
			};
			tableState.setRightScrollBarWidth(getRightScrollBarWidth());

			const ob = new ResizeObserver(() => {
				tableState.setRightScrollBarWidth(getRightScrollBarWidth());
			});
			ob.observe(bodyRef.current);

			return () => {
				ob.disconnect();
			};
		}
	}, []);

	return { bodyRef, headRef };
};

export default useTableDomRef;
