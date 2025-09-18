import { useEffect, useMemo, useRef, type FC } from 'react';

import classNames from 'classnames';

import styles from './index.module.less';
import { getScrollBarWidth } from './utils';

type Props = {
	width?: number;
	height?: number;
	className?: string;
	scrollContentRef: React.RefObject<HTMLDivElement | null>;
};

const VirtualScrollBar: FC<Props> = ({ width, height, className, scrollContentRef }) => {
	const vRef = useRef<HTMLDivElement | null>(null);
	const hRef = useRef<HTMLDivElement | null>(null);
	const { width: scrollBarWidth, height: scrollBarHeight } = useMemo(() => getScrollBarWidth(), []);

	useEffect(() => {
		if (scrollContentRef.current && vRef.current) {
			const scrollHandle1 = () => {
				if (typeof scrollContentRef.current?.scrollTop === 'number' && typeof vRef.current?.scrollTop === 'number') {
					if (scrollContentRef.current.scrollTop !== vRef.current.scrollTop) {
						vRef.current.scrollTop = scrollContentRef.current.scrollTop;
					}
				}
			};
			scrollContentRef.current.addEventListener('scroll', scrollHandle1, { passive: true });
			const scrollHandle2 = () => {
				if (typeof scrollContentRef.current?.scrollTop === 'number' && typeof vRef.current?.scrollTop === 'number') {
					if (scrollContentRef.current.scrollTop !== vRef.current.scrollTop) {
						// eslint-disable-next-line react-compiler/react-compiler
						scrollContentRef.current.scrollTop = vRef.current.scrollTop;
					}
				}
			};
			vRef.current.addEventListener('scroll', scrollHandle2, { passive: true });

			return () => {
				vRef.current?.removeEventListener('scroll', scrollHandle2);
				scrollContentRef.current?.removeEventListener('scroll', scrollHandle1);
			};
		}
	}, []);

	useEffect(() => {
		if (scrollContentRef.current && hRef.current) {
			const scrollHandle1 = () => {
				if (typeof scrollContentRef.current?.scrollLeft === 'number' && typeof hRef.current?.scrollLeft === 'number') {
					if (scrollContentRef.current.scrollLeft !== hRef.current.scrollLeft) {
						hRef.current.scrollLeft = scrollContentRef.current.scrollLeft;
					}
				}
			};
			scrollContentRef.current.addEventListener('scroll', scrollHandle1, { passive: true });
			const scrollHandle2 = () => {
				if (typeof scrollContentRef.current?.scrollLeft === 'number' && typeof hRef.current?.scrollLeft === 'number') {
					if (scrollContentRef.current.scrollLeft !== hRef.current.scrollLeft) {
						scrollContentRef.current.scrollLeft = hRef.current.scrollLeft;
					}
				}
			};
			hRef.current.addEventListener('scroll', scrollHandle2, { passive: true });

			return () => {
				hRef.current?.removeEventListener('scroll', scrollHandle2);
				scrollContentRef.current?.removeEventListener('scroll', scrollHandle1);
			};
		}
	}, []);

	if (typeof width !== 'number' && typeof height !== 'number') return null;

	return (
		<div className={classNames(className, styles['virtual-scroll-bar'])}>
			{typeof height === 'number' && (
				<div
					ref={vRef}
					style={{
						width: scrollBarWidth,
						overflowX: 'hidden',
						overflowY: 'auto',
						height: '100%',
						pointerEvents: 'auto',
						position: 'absolute',
						top: 0,
						right: 0,
					}}
				>
					<div style={{ width: scrollBarWidth, height }} />
				</div>
			)}
			{typeof width === 'number' && (
				<div
					ref={hRef}
					style={{
						height: scrollBarHeight,
						overflowX: 'auto',
						overflowY: 'hidden',
						width: '100%',
						pointerEvents: 'auto',
						position: 'absolute',
						bottom: 0,
						left: 0,
					}}
				>
					<div style={{ width, height: scrollBarHeight }} />
				</div>
			)}
		</div>
	);
};

export default VirtualScrollBar;
