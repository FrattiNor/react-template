import { memo, useLayoutEffect, useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import styles from './index.module.less';
import { FixedTwo, getLeafColumn } from '../../../TableUtils';

import type { TableInstance } from '../../../useTableInstance';

type Props<T> = Required<Pick<TableInstance<T>, 'splitColumnsArr_01' | 'setSizeCacheMap'>>;

const MeasureRow = <T,>(props: Props<T>) => {
	const ref = useRef<HTMLDivElement | null>(null);

	const { splitColumnsArr_01, setSizeCacheMap } = props;

	const sizeCacheChangeBatch = <B,>(items: Array<B>, getKey: (item: B) => string | null, getSize: (item: B) => number) => {
		setSizeCacheMap((old) => {
			let changed = false;
			items.forEach((item) => {
				const key = getKey(item);
				if (typeof key === 'string') {
					const size = FixedTwo(getSize(item));
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

	const [observer] = useState(() => {
		return new ResizeObserver((entries) => {
			sizeCacheChangeBatch(
				entries,
				(entry) => entry.target.getAttribute('data-key'),
				(entry) => entry.contentRect.width,
			);
		});
	});

	useLayoutEffect(() => {
		if (ref.current) {
			const element = ref.current;
			sizeCacheChangeBatch(
				Array.from(element.children),
				(node) => node.getAttribute('data-key'),
				(node) => node.getBoundingClientRect().width,
			);
		}
	}, []);

	useEffect(() => {
		return () => {
			observer.disconnect();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div ref={ref} className={styles['measure-row']}>
			{splitColumnsArr_01.map((splitColumns) => {
				const column = getLeafColumn(splitColumns);
				return (
					<div
						key={column.key}
						data-key={column.key}
						style={{ width: column.width, flexGrow: column.flexGrow ?? 1, flexShrink: 0 }}
						ref={(node) => {
							if (node) {
								observer.observe(node);
								return () => observer.unobserve(node);
							}
						}}
					/>
				);
			})}
		</div>
	);
};

export default memo(MeasureRow) as typeof MeasureRow;
