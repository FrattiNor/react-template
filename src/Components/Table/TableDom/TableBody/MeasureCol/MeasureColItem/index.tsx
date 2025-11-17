import { memo, useEffect, useRef } from 'react';

import type { InnerColumn } from '../../../../TableTypes/typeColumn';

type Props<T> = {
	column: InnerColumn<T>;
	resizeObserver: ResizeObserver | null;
};

const MeasureColItem = <T,>(props: Props<T>) => {
	const ref = useRef<HTMLDivElement | null>(null);
	const { column, resizeObserver } = props;

	useEffect(() => {
		if (resizeObserver && ref.current) {
			const item = ref.current;
			resizeObserver.observe(item);
			return () => {
				resizeObserver.unobserve(item);
			};
		}
	}, [resizeObserver]);

	return <div ref={ref} data-key={column.key} style={{ height: '100%', width: column.width, flexGrow: column.flexGrow ?? 1, flexShrink: 0 }} />;
};

export default memo(MeasureColItem) as typeof MeasureColItem;
