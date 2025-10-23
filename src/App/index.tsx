/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useRef, useState } from 'react';
import Virtual from '../Virtual';
import styles from './index.module.less';
import classNames from 'classnames';
import { flushSync } from 'react-dom';

const data = Array(100)
	.fill('')
	.map((_, index) => ({ index }));

type Item = (typeof data)[0];

const getItemKey = (item: Item) => `${item.index}`;

const getItemSize = () => 40;

const App = () => {
	const ref = useRef<HTMLDivElement | null>(null);
	const [enabled, setEnabled] = useState(true);
	const [totalSize, setTotalSize] = useState<number>(0);
	const [range, setRange] = useState<{ start: number; end: number }>({ start: 0, end: 0 });
	const [containerRect, setContainerRect] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
	const [virtual] = useState(
		() =>
			new Virtual({
				data,
				getItemKey,
				getItemSize,
				getContainer: () => null,
				containerSize: 0,
			}),
	);

	useEffect(() => {
		if (ref.current) {
			const updateRect = () => setContainerRect({ width: ref.current?.clientWidth ?? 0, height: ref.current?.clientHeight ?? 0 });
			const ob = new ResizeObserver(updateRect);
			ob.observe(ref.current);
			return () => ob.disconnect();
		}
	}, []);

	useEffect(() => {
		virtual.updateProps({
			data,
			enabled,
			getItemKey,
			getItemSize,
			onRangeChange: (v) => {
				console.log('v', v);
				flushSync(() => {
					setRange(v);
				});
			},
			onTotalSizeChange: setTotalSize,
			getContainer: () => ref.current,
			containerSize: containerRect.height,
		});
	}, [containerRect.height, enabled]);

	const virtualItems = useMemo(() => {
		const items: Array<{ index: number; start: number; end: number; key: string }> = [];
		for (let i = range.start; i <= range.end; i++) {
			const item = (virtual.state.sizeList as any)?.[i];
			if (item) items.push(item);
		}
		return items;
	}, [range]);

	return (
		<div className={styles['wrapper']}>
			<label style={{ display: 'flex', alignItems: 'flex-end', gap: 4, userSelect: 'none' }}>
				<input type="checkbox" checked={enabled} onChange={(e) => setEnabled(e.target.checked)} />
				<span style={{ display: 'inline-block', lineHeight: '19px' }}>{'Enabled'}</span>
			</label>

			<div ref={ref} className={styles['content']}>
				<div className={styles['virtual-content']} style={{ height: totalSize }}>
					{virtualItems.map(({ index, key, start, end }) => {
						const item = data[index];
						return (
							<div
								key={key}
								style={{ top: start, height: end - start }}
								className={classNames(styles['virtual-item'], { [styles['odd']]: index % 2 === 1 })}
							>
								{item.index}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default App;
