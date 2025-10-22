import { Fragment, useRef, type CSSProperties, type ReactNode } from 'react';

import classNames from 'classnames';

import styles from './index.module.less';
import useVirtualList from './useVirtualList';
import VirtualScrollBar from './VirtualScrollBar';

type RenderProps<T> = {
	index: number;
	start: number;
	end: number;
	key: string;
	measureElement: (element: HTMLDivElement | null, item: T) => void;
};

type Props<T> = {
	className?: string;
	style?: CSSProperties;
	renderData: (item: T, props: RenderProps<T>) => ReactNode;
	//
	data: T[];
	overscan?: [number, number];
	getItemKey: (item: T) => string; // 不接受动态变更
	getItemSize: (key: string) => number; // 不接受动态变更
	gap?: number;
	direction: 'h' | 'v';
};

const List = <T,>(props: Props<T>) => {
	const ref = useRef<HTMLDivElement | null>(null);
	const { className, style, renderData } = props;
	const { data, getItemKey, getItemSize, overscan, gap, direction } = props;
	const virtual = useVirtualList({ data, getItemKey, getItemSize, overscan, gap, containerRef: ref, direction });
	const { virtualItems, paddingStart, totalSize, measureElement } = virtual;

	return (
		<div style={style} className={classNames(styles['virtual-list'], className)}>
			<div ref={ref} className={styles['virtual-holder']}>
				<div
					style={{
						gap,
						display: 'flex',
						overflow: 'hidden',
						flexDirection: direction === 'h' ? 'row' : 'column',
						boxSizing: 'border-box',
						height: direction === 'h' ? '100%' : totalSize,
						width: direction === 'h' ? totalSize : '100%',
						paddingTop: direction === 'h' ? 0 : paddingStart,
						paddingLeft: direction === 'h' ? paddingStart : 0,
					}}
				>
					{virtualItems.map((item) => (
						<Fragment key={item.key}>{renderData(item.data, { ...item, measureElement })}</Fragment>
					))}
				</div>
			</div>
			<VirtualScrollBar
				scrollContentRef={ref}
				className={styles['virtual-scroll-bar']}
				width={direction === 'h' ? totalSize : undefined}
				height={direction === 'h' ? undefined : totalSize}
			/>
		</div>
	);
};

export default List;
