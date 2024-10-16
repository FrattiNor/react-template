import { type FC } from 'react';

import { useResize } from '@react/hooks';
import classNames from 'classnames';

import LoadingDiv from '../LoadingDiv';
import styles from './index.module.less';
import { type ResizeWidthProps } from './type';

const ResizeWidth: FC<ResizeWidthProps> = ({
	minWidth = 0,
	maxWidth = Infinity,
	defaultWidth = 300,
	onResize,
	onResizeEnd,
	className,
	style,
	handleClassName,
	handlerStyle,
	loading,
	children,
}) => {
	const { onMouseDown, active, activeData, resultData } = useResize({
		beforeResize({ event }) {
			const parent = (event.currentTarget as HTMLDivElement)?.parentElement as HTMLDivElement;
			return { clientWidth: parent ? parent.clientWidth : 0 };
		},
		onResizing({ active, markData }) {
			const { moveX } = active;
			const { clientWidth } = markData;
			const width = Math.min(Math.max(clientWidth + moveX, minWidth), maxWidth);
			if (typeof onResize === 'function') onResize(width);
			return { width };
		},
		afterResize({ activeData }) {
			const { width } = activeData;
			if (typeof onResizeEnd === 'function') onResizeEnd(width);
			return { width };
		},
	});

	const width = (() => {
		const _width = activeData?.width ?? resultData?.width ?? defaultWidth ?? 0;
		const _widthNumber = !isNaN(Number(_width)) ? Number(_width) : 0;
		const minMaxWidth = Math.min(Math.max(_widthNumber, minWidth), maxWidth);
		return minMaxWidth;
	})();

	return (
		<LoadingDiv loading={loading} className={classNames(styles['wrapper'], className)} style={{ width, ...style }}>
			<div className={styles['content']}>{children}</div>

			<div
				style={handlerStyle}
				onMouseDown={onMouseDown}
				className={classNames(styles['resize-handle'], handleClassName, { [styles['active']]: !!active })}
			/>
		</LoadingDiv>
	);
};

export default ResizeWidth;
