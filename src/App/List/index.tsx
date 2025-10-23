import { useCallback, useState } from 'react';
import styles from './index.module.less';
import classNames from 'classnames';
import { useVirtual } from '../../Components/Virtual';
import Slider from '../../Components/Slider';

const getItemKey = (index: number) => `${index}`;

const App = () => {
	const [itemGap, setItemGap] = useState(0);
	const [startGap, setStartGap] = useState(0);
	const [endGap, setEndGap] = useState(0);
	const [count, setCount] = useState(100);
	const [height, setHeight] = useState(40);
	const [enabled, setEnabled] = useState(true);
	const getItemSize = useCallback(() => height, [height]);
	const { totalSize, virtualItems, containerRef } = useVirtual({
		count,
		enabled,
		getItemKey,
		getItemSize,
		gap: { itemGap, startGap, endGap },
	});

	return (
		<div className={styles['wrapper']}>
			<label style={{ display: 'flex', alignItems: 'flex-end', gap: 4, userSelect: 'none' }}>
				<input type="checkbox" checked={enabled} onChange={(e) => setEnabled(e.target.checked)} style={{ outline: 'none' }} />
				<span style={{ display: 'inline-block', lineHeight: '19px' }}>{'Enabled'}</span>
			</label>

			<Slider label="itemGap" min={0} max={16} width={200} value={itemGap} onChange={setItemGap} />

			<Slider label="startGap" min={0} max={16} width={200} value={startGap} onChange={setStartGap} />

			<Slider label="endGap" min={0} max={16} width={200} value={endGap} onChange={setEndGap} />

			<Slider label="count" min={0} max={100} width={200} value={count} onChange={setCount} />

			<Slider label="height" min={20} max={100} width={200} value={height} onChange={setHeight} />

			<div ref={containerRef} className={styles['content']}>
				{totalSize !== null && (
					<div className={styles['virtual-content']} style={{ height: totalSize }}>
						{virtualItems.map(({ index, key, start, end }) => {
							return (
								<div
									key={key}
									style={{ top: start, height: end - start, lineHeight: `${end - start}px` }}
									className={classNames(styles['virtual-item'], { [styles['odd']]: index % 2 === 1 })}
								>
									{index + 1}
								</div>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
};

export default App;
