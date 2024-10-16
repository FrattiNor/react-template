import { type RefObject, useEffect, useState } from 'react';

type Props = {
	headRef: RefObject<HTMLDivElement | null>;
	bodyRef: RefObject<HTMLDivElement | null>;
	summaryRef: RefObject<HTMLDivElement | null>;
};

const useBodyObserver = ({ bodyRef, headRef, summaryRef }: Props) => {
	const [pingLeft, setPingLeft] = useState<number>(0);
	const [pingRight, setPingRight] = useState<number>(0);
	const [vScrollBarWidth, setVScrollBarWidth] = useState(0);

	// 计算纵向滚动条宽度
	const calcScrollBarWidth = () => {
		if (bodyRef.current) {
			const { clientWidth, offsetWidth } = bodyRef.current;
			setVScrollBarWidth(offsetWidth - clientWidth);
		}
	};

	// 计算ping情况
	const calcPing = () => {
		if (bodyRef.current) {
			const { scrollWidth, clientWidth, scrollLeft } = bodyRef.current;

			// 如果宽度是通过flexGrow扩展的，会设置overflowX：hidden
			if (bodyRef.current.style['overflowX'] === 'hidden' || scrollWidth <= clientWidth) {
				setPingLeft(0);
				setPingRight(0);
			} else {
				setPingLeft(scrollLeft);
				setPingRight(scrollWidth - clientWidth - scrollLeft);
			}
		}
	};

	useEffect(() => {
		if (bodyRef.current) {
			// resize
			const ob = new ResizeObserver(() => {
				calcScrollBarWidth();
				requestAnimationFrame(() => {
					calcPing();
				});
			});

			ob.observe(bodyRef.current, { box: 'border-box' });

			// scroll
			const onScroll = (e: Event) => {
				const target = e.target as HTMLDivElement;
				if (headRef.current) headRef.current.scrollTo({ left: target.scrollLeft });
				if (summaryRef.current) summaryRef.current.scrollTo({ left: target.scrollLeft });
				calcScrollBarWidth();
				calcPing();
			};

			bodyRef.current.addEventListener('scroll', onScroll, { passive: true });

			return () => {
				ob.disconnect();
				bodyRef.current?.removeEventListener('scroll', onScroll);
			};
		}
	}, []);

	return { pingLeft, pingRight, vScrollBarWidth, calcPing };
};

export default useBodyObserver;
