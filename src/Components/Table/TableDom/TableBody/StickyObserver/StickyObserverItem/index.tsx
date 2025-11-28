import { memo, startTransition, useEffect, useRef } from 'react';

import type { InnerColumn } from '../../../../TableTypes/typeColumn';
import type { TableInstance } from '../../../../useTableInstance';

type Props<T> = Required<Pick<TableInstance<T>, 'setPingedObj' | 'fixedLeftObj' | 'fixedRightObj' | 'bodyRef'>> & {
	column: InnerColumn<T>;
	intersectionObserver: IntersectionObserver | null;
};

const StickyObserverItem = <T,>(props: Props<T>) => {
	const ref = useRef<HTMLDivElement | null>(null);
	const { column, intersectionObserver, setPingedObj, fixedLeftObj, fixedRightObj } = props;

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

	useEffect(() => {
		// observer
		if (intersectionObserver && ref.current) {
			const item = ref.current;
			intersectionObserver.observe(item);
			return () => {
				intersectionObserver.unobserve(item);
				startTransition(() => {
					setPingedObj((old) => {
						const key = column.key;
						if (old.has(key)) {
							old.delete(key);
							return new Map(old);
						}
						return old;
					});
				});
			};
		}
	}, [intersectionObserver]);

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
				data-key={column.key}
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
