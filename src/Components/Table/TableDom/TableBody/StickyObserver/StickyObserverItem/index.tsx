import { memo, startTransition, useEffect, useRef } from 'react';

import type { TableColumn } from '../../../../TableTypes/typeColumn';
import type { TableInstance } from '../../../../useTableInstance';

type Props<T> = Required<Pick<TableInstance<T>, 'setPingedMap' | 'fixedLeftMap' | 'fixedRightMap' | 'bodyRef'>> & {
	colIndex: number;
	leafColumn: TableColumn<T>;
	intersectionObserver: IntersectionObserver | null;
};

const StickyObserverItem = <T,>(props: Props<T>) => {
	const ref = useRef<HTMLDivElement | null>(null);
	const { leafColumn, intersectionObserver, setPingedMap, fixedLeftMap, fixedRightMap, colIndex } = props;

	const stickySize = (() => {
		if (leafColumn.fixed === 'left') {
			const stickySize = fixedLeftMap.get(leafColumn.key)?.stickySize;
			if (typeof stickySize === 'number') return stickySize;
		}
		if (leafColumn.fixed === 'right') {
			const stickySize = fixedRightMap.get(leafColumn.key)?.stickySize;
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
					setPingedMap((old) => {
						const key = leafColumn.key;
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
				gridColumn: `${colIndex + 1}/${colIndex + 2}`,
			}}
		>
			<div
				ref={ref}
				data-index={colIndex}
				data-key={leafColumn.key}
				data-fixed={leafColumn.fixed}
				style={{
					top: -5,
					height: 10,
					position: 'absolute',
					width: `calc(100% + ${stickySize}px)`,
					left: leafColumn.fixed === 'left' ? undefined : 0,
					right: leafColumn.fixed === 'right' ? undefined : 0,
				}}
			/>
		</div>
	);
};

export default memo(StickyObserverItem) as typeof StickyObserverItem;
