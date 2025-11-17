import { memo, useRef, useState, useEffect, startTransition } from 'react';

import styles from './index.module.less';
import StickyObserverItem from './StickyObserverItem';
import { getLeafColumn } from '../../../TableUtils';

import type { TableInstance } from '../../../useTableInstance';

type Props<T> = Required<
	Pick<TableInstance<T>, 'fixedLeftObj' | 'fixedRightObj' | 'splitColumnsArr' | 'bodyRef' | 'setPingedObj' | 'gridTemplateColumns'>
>;

const StickyObserver = <T,>(props: Props<T>) => {
	const ref = useRef<HTMLDivElement | null>(null);
	const { splitColumnsArr, bodyRef, setPingedObj, gridTemplateColumns } = props;
	const [intersectionObserver, setIntersectionObserver] = useState<IntersectionObserver | null>(null);

	// IntersectionObserver，监测fixed
	useEffect(() => {
		if (bodyRef.current) {
			const _observer = new IntersectionObserver(
				(entries) => {
					startTransition(() => {
						setPingedObj((old) => {
							let changed = false;
							entries.forEach((entry) => {
								const fixed = entry.target.getAttribute('data-fixed');
								const _index = entry.target.getAttribute('data-index');
								if (_index !== null && fixed !== null) {
									const index = parseInt(_index);
									// 触发pinged
									if (entry.intersectionRatio < 0.99) {
										// 根据fixed判断是左边被遮蔽还是右侧
										if (
											(fixed === 'left' && entry.boundingClientRect.left < (entry.rootBounds?.left ?? 0)) ||
											(fixed === 'right' && entry.boundingClientRect.right > (entry.rootBounds?.right ?? 0))
										) {
											if (old[fixed as 'left' | 'right']?.[index] !== true) {
												old[fixed as 'left' | 'right'][index] = true;
												changed = true;
											}
										}
									}
									// 触发not pinged
									else if (old[fixed as 'left' | 'right']?.[index] === true) {
										delete old[fixed as 'left' | 'right'][index];
										changed = true;
									}
								}
							});
							if (changed) return { left: { ...old.left }, right: { ...old.right } };
							return old;
						});
					});
				},
				{
					root: bodyRef.current,
					threshold: [0.99], // 缩放会导致无法达到1
				},
			);
			setIntersectionObserver(_observer);

			return () => {
				_observer.disconnect();
				setIntersectionObserver(null);
			};
		}
	}, []);

	return (
		<div ref={ref} className={styles['sticky-observer']} style={{ gridTemplateColumns }}>
			{splitColumnsArr.map((splitColumns) => {
				const column = getLeafColumn(splitColumns);
				if (column.fixed) {
					return (
						<StickyObserverItem
							column={column}
							key={column.key}
							setPingedObj={props.setPingedObj}
							fixedLeftObj={props.fixedLeftObj}
							fixedRightObj={props.fixedRightObj}
							intersectionObserver={intersectionObserver}
						/>
					);
				}
			})}
		</div>
	);
};

export default memo(StickyObserver) as typeof StickyObserver;
