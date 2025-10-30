import { memo, useEffect, useRef, useState, type FC, type PropsWithChildren } from 'react';

import classNames from 'classnames';

import styles from './index.module.less';

// 避免触发一些事件导致mouse无法触发
function pauseEvent(e: Event) {
	if (e.stopPropagation) e.stopPropagation();
	if (e.preventDefault) e.preventDefault();
	e.cancelBubble = true;
	e.returnValue = false;
	return false;
}

type Props = PropsWithChildren<{
	width?: number;
	height?: number;
	logRender?: boolean;
}>;

const BoxResize: FC<Props> = (props) => {
	if (props.logRender) console.log('BoxResize re-render');
	const ref = useRef<HTMLDivElement | null>(null);
	const [width, setWidth] = useState(() => props.width ?? 500);
	const [height, setHeight] = useState(() => props.height ?? 500);

	const [hStart, setHStart] = useState<{ pageX: number; value: number } | null>(null);
	const [vStart, setVStart] = useState<{ pageY: number; value: number } | null>(null);

	useEffect(() => {
		if (hStart) {
			const mouseUp = () => {
				setHStart(null);
			};
			const mouseMove = (e: MouseEvent) => {
				pauseEvent(e);
				const moveX = e.pageX - hStart.pageX;
				setWidth(Math.max(50, Math.min(1500, hStart.value + moveX)));
			};

			document.addEventListener('mouseup', mouseUp);
			document.addEventListener('mousemove', mouseMove);

			return () => {
				document.removeEventListener('mouseup', mouseUp);
				document.removeEventListener('mousemove', mouseMove);
			};
		}
	}, [hStart]);

	useEffect(() => {
		if (vStart) {
			const mouseUp = () => {
				setVStart(null);
			};
			const mouseMove = (e: MouseEvent) => {
				pauseEvent(e);
				const moveY = e.pageY - vStart.pageY;
				setHeight(Math.max(50, Math.min(1000, vStart.value + moveY)));
			};

			document.addEventListener('mouseup', mouseUp);
			document.addEventListener('mousemove', mouseMove);

			return () => {
				document.removeEventListener('mouseup', mouseUp);
				document.removeEventListener('mousemove', mouseMove);
			};
		}
	}, [vStart]);

	return (
		<div ref={ref} style={{ width, height }} className={styles['wrapper']}>
			{props.children}
			<div
				className={classNames(styles['h'], { [styles['active']]: hStart })}
				onMouseDown={(e) => setHStart({ pageX: e.pageX, value: ref.current?.clientWidth ?? 0 })}
			/>
			<div
				className={classNames(styles['v'], { [styles['active']]: vStart })}
				onMouseDown={(e) => setVStart({ pageY: e.pageY, value: ref.current?.clientHeight ?? 0 })}
			/>
		</div>
	);
};

export default memo(BoxResize);
