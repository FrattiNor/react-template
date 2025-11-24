import { memo, useRef, useState, useEffect } from 'react';

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

	// IntersectionObserver
	useEffect(() => {
		if (bodyRef.current) {
			const _observer = new IntersectionObserver(
				(entries) => {
					setPingedObj((old) => {
						let changed = false;
						entries.forEach((entry) => {
							const key = entry.target.getAttribute('data-key');
							const _fixed = entry.target.getAttribute('data-fixed');
							const _index = entry.target.getAttribute('data-index');
							if (key !== null && _index !== null && _fixed !== null) {
								const index = parseInt(_index);
								const fixed = _fixed as 'left' | 'right';
								// 触发pinged
								// 缩放可能导致无法达到1
								// 确保left是左侧遮挡，right是右侧遮挡
								if (
									entry.intersectionRatio < 0.99 &&
									((fixed === 'left' && entry.boundingClientRect.left < (entry.rootBounds?.left ?? 0)) ||
										(fixed === 'right' && entry.boundingClientRect.right > (entry.rootBounds?.right ?? 0)))
								) {
									if (!old[key] || old[key].fixed !== fixed || old[key].index !== index) {
										old[key] = { fixed, index };
										changed = true;
									}
								}
								// 未触发pinged
								else if (old[key]) {
									delete old[key];
									changed = true;
								}
							}
						});
						if (changed) return { ...old };
						return old;
					});
				},
				{
					// 缩放可能导致无法达到1
					threshold: [0.99],
					root: bodyRef.current,
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
							bodyRef={props.bodyRef}
							setPingedObj={props.setPingedObj}
							fixedLeftObj={props.fixedLeftObj}
							fixedRightObj={props.fixedRightObj}
							key={`${column.key}-${column.index}`}
							intersectionObserver={intersectionObserver}
						/>
					);
				}
			})}
		</div>
	);
};

export default memo(StickyObserver) as typeof StickyObserver;
