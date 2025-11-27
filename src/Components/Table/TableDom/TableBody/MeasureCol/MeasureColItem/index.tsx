import { memo, useEffect, useRef } from 'react';

import { minColWidth, maxColWidth } from '../../../../TableUtils/configValues';

import type { InnerColumn } from '../../../../TableTypes/typeColumn';
import type { TableInstance } from '../../../../useTableInstance';

type Props<T> = Required<Pick<TableInstance<T>, 'setSizeCacheMap' | 'sizeCacheMap' | 'resized'>> & {
	column: InnerColumn<T>;
	resizeObserver: ResizeObserver | null;
};

const MeasureColItem = <T,>(props: Props<T>) => {
	const ref = useRef<HTMLDivElement | null>(null);
	const { column, resizeObserver, resized, sizeCacheMap } = props;
	const resizedAndHaveSizeCache = resized && typeof sizeCacheMap.get(column.key) === 'number';

	useEffect(() => {
		if (resizeObserver && ref.current) {
			const item = ref.current;
			resizeObserver.observe(item);
			return () => {
				resizeObserver.unobserve(item);
				// startTransition(() => {
				// 	setSizeCacheMap((old) => {
				// 		const key = column.key;
				// 		if (typeof old.get(key) === 'number') {
				// 			old.delete(key);
				// 			return new Map(old);
				// 		}
				// 		return old;
				// 	});
				// });
			};
		}
	}, [resizeObserver]);

	return (
		<div
			ref={ref}
			data-key={column.key}
			style={{
				flexShrink: 0,
				height: '100%',
				minWidth: minColWidth,
				maxWidth: maxColWidth,
				flexGrow: resizedAndHaveSizeCache ? 0 : (column.flexGrow ?? 1),
				width: resizedAndHaveSizeCache ? (sizeCacheMap.get(column.key) ?? 0) : column.width,
			}}
		/>
	);
};

export default memo(MeasureColItem) as typeof MeasureColItem;
