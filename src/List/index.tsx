import { Fragment, useRef, type CSSProperties, type ReactNode } from 'react';
import useVirtualList from './useVirtualList';

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
	getItemSize: (item: T) => number; // 不接受动态变更
	gap?: number;
};

const List = <T,>(props: Props<T>) => {
	const ref = useRef<HTMLDivElement | null>(null);
	const { className, style, renderData } = props;
	const { data, getItemKey, getItemSize, overscan, gap } = props;
	const virtual = useVirtualList({ data, getItemKey, getItemSize, overscan, gap, containerRef: ref });
	const { virtualItems, paddingStart, totalSize, measureElement } = virtual;
	return (
		<div ref={ref} className={className} style={{ overflow: 'auto', ...style }}>
			<div style={{ boxSizing: 'border-box', height: totalSize, paddingTop: paddingStart, display: 'flex', flexDirection: 'column', gap }}>
				{virtualItems.map((item) => (
					<Fragment key={item.key}>{renderData(item.data, { ...item, measureElement })}</Fragment>
				))}
			</div>
		</div>
	);
};

export default List;
