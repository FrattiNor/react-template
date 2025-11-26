import { memo, useEffect, useLayoutEffect, useRef } from 'react';

import type { InnerColumn } from '../../../../TableTypes/typeColumn';
import type { TableInstance } from '../../../../useTableInstance';

type Props<T> = Required<Pick<TableInstance<T>, 'setPingedObj' | 'fixedLeftObj' | 'fixedRightObj' | 'bodyRef'>> & {
	column: InnerColumn<T>;
	intersectionObserver: IntersectionObserver | null;
};

const StickyObserverItem = <T,>(props: Props<T>) => {
	const ref = useRef<HTMLDivElement | null>(null);
	const { column, intersectionObserver, setPingedObj, fixedLeftObj, fixedRightObj, bodyRef } = props;

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

	const pingedSize = (() => {
		if (column.fixed === 'left') {
			const pingedSize = fixedLeftObj[column.index]?.pingedSize;
			if (typeof pingedSize === 'number') return pingedSize;
		}
		if (column.fixed === 'right') {
			const pingedSize = fixedRightObj[column.index]?.pingedSize;
			if (typeof pingedSize === 'number') return pingedSize;
		}
		return 0;
	})();

	useLayoutEffect(() => {
		if (bodyRef.current) {
			const key = column.key;
			const fixed = column.fixed;
			const bodyScrollLeft = bodyRef.current?.scrollLeft;
			const bodyScrollWidth = bodyRef.current?.scrollWidth;
			const bodyClientWidth = bodyRef.current?.clientWidth;
			if (typeof bodyScrollLeft === 'number' && typeof bodyScrollWidth === 'number' && typeof bodyClientWidth === 'number') {
				const scrollLeft = bodyScrollLeft;
				const scrollRight = bodyScrollWidth - bodyClientWidth - bodyScrollLeft;

				setPingedObj((old) => {
					if (
						(fixed === 'left' && scrollLeft > 0 && scrollLeft > pingedSize) ||
						(fixed === 'right' && scrollRight > 0 && scrollRight > pingedSize)
					) {
						if (!old[key] || old[key].fixed !== fixed || old[key].index !== column.index) {
							old[key] = { fixed, index: column.index };
							return { ...old };
						}
					} else if (old[key]) {
						delete old[key];
						return { ...old };
					}
					return old;
				});

				return () => {
					setPingedObj((old) => {
						if (old[key]) {
							delete old[key];
							return { ...old };
						}
						return old;
					});
				};
			}
		}
	}, []);

	useEffect(() => {
		// observer
		if (intersectionObserver && ref.current) {
			const item = ref.current;
			intersectionObserver.observe(item);
			return () => {
				intersectionObserver.unobserve(item);
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
