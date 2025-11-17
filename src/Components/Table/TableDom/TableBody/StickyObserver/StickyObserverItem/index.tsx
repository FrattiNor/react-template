import { memo, useEffect, useRef } from 'react';

import type { InnerColumn } from '../../../../TableTypes/typeColumn';
import type { TableInstance } from '../../../../useTableInstance';

type Props<T> = Required<Pick<TableInstance<T>, 'setPingedObj' | 'fixedLeftObj' | 'fixedRightObj'>> & {
	column: InnerColumn<T>;
	intersectionObserver: IntersectionObserver | null;
};

const StickyObserverItem = <T,>(props: Props<T>) => {
	const ref = useRef<HTMLDivElement | null>(null);
	const { column, intersectionObserver, setPingedObj, fixedLeftObj, fixedRightObj } = props;

	useEffect(() => {
		const fixed = column.fixed;
		if (fixed && intersectionObserver && ref.current) {
			const item = ref.current;
			intersectionObserver.observe(item);
			return () => {
				intersectionObserver.unobserve(item);
				setPingedObj((old) => {
					if (old[fixed]?.[column.index] === true) {
						delete old[fixed][column.index];
						return { left: { ...old.left }, right: { ...old.right } };
					}
					return old;
				});
			};
		}
	}, [column.fixed, intersectionObserver]);

	const stickySize = (() => {
		if (column.fixed === 'left') {
			const stickySize = fixedLeftObj[column.index]?.stickySize;
			if (typeof stickySize === 'number') return stickySize;
		}
		if (column.fixed === 'right') {
			const stickySize = fixedRightObj[column.index]?.stickySize;
			if (typeof stickySize === 'number') return stickySize;
		}
		return 0;
	})();

	return (
		<div
			style={{
				position: 'relative',
				gridRow: `${1}/${2}`,
				gridColumn: `${column.index + 1}/${column.index + 2}`,
			}}
		>
			<div
				ref={ref}
				data-index={column.index}
				data-fixed={column.fixed}
				style={{
					top: -5,
					height: 10,
					position: 'absolute',
					width: `calc(100% + ${stickySize}px)`,
					left: column.fixed === 'left' ? undefined : 0,
					right: column.fixed === 'right' ? undefined : 0,
				}}
			/>
		</div>
	);
};

export default memo(StickyObserverItem) as typeof StickyObserverItem;
