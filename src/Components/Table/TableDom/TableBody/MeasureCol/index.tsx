import { memo, useEffect, useLayoutEffect, useRef, useState } from 'react';

import styles from './index.module.less';
import MeasureColItem from './MeasureColItem';
import { FixedTwo, getLeafColumn } from '../../../TableUtils';
import { maxColWidth, minColWidth } from '../../../TableUtils/configValues';

import type { TableInstance } from '../../../useTableInstance';

type Props<T> = Required<Pick<TableInstance<T>, 'splitColumnsArr_01' | 'setSizeCacheMap' | 'resizeFlag' | 'sizeCacheMap' | 'resized'>>;

const MeasureCol = <T,>(props: Props<T>) => {
	const ref = useRef<HTMLDivElement | null>(null);
	const { splitColumnsArr_01, setSizeCacheMap, resizeFlag } = props;
	const [resizeObserver, setResizeObserver] = useState<ResizeObserver | null>(null);

	const sizeCacheChangeBatch = <B,>(items: Array<B>, getKey: (item: B) => string | null, getSize: (item: B) => number) => {
		setSizeCacheMap((old) => {
			let changed = false;
			items.forEach((item) => {
				const key = getKey(item);
				if (typeof key === 'string') {
					const size = Math.min(Math.max(FixedTwo(getSize(item)), minColWidth), maxColWidth);
					if (old.get(key) !== size) {
						old.set(key, size);
						changed = true;
					}
				}
			});
			if (changed) return new Map(old);
			return old;
		});
	};

	// first calc
	useLayoutEffect(() => {
		if (ref.current) {
			const element = ref.current;
			// 直接执行一次
			sizeCacheChangeBatch(
				Array.from(element.children),
				(node) => node.getAttribute('data-key'),
				(node) => node.getBoundingClientRect().width,
			);
		}
	}, []);

	// ResizeObserver
	useEffect(() => {
		if (!resizeFlag && ref.current) {
			const _observer = new ResizeObserver((entries) => {
				sizeCacheChangeBatch(
					entries,
					(entry) => entry.target.getAttribute('data-key'),
					(entry) => entry.contentRect.width,
				);
			});

			setResizeObserver(_observer);

			return () => {
				_observer.disconnect();
				setResizeObserver(null);
			};
		}
	}, [resizeFlag]);

	return (
		<div ref={ref} className={styles['measure-col']}>
			{splitColumnsArr_01.map((splitColumns) => {
				const leafColumn = getLeafColumn(splitColumns);
				return (
					<MeasureColItem
						key={leafColumn.key}
						leafColumn={leafColumn}
						resized={props.resized}
						resizeObserver={resizeObserver}
						sizeCacheMap={props.sizeCacheMap}
					/>
				);
			})}
		</div>
	);
};

export default memo(MeasureCol) as typeof MeasureCol;
