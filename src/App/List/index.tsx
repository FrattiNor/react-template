import { useCallback, useState } from 'react';
import styles from './index.module.less';
import classNames from 'classnames';
import { useVirtual } from '../../Components/Virtual';
import Slider from '../../Components/Slider';
import BoxResize from '../../Components/BoxResize';

const getItemKey = (index: number) => `${index}`;

const App = () => {
	const [itemGap, setItemGap] = useState(0);
	const [startGap, setStartGap] = useState(0);
	const [endGap, setEndGap] = useState(0);
	const [count, setCount] = useState(100);
	const [height, setHeight] = useState(40);
	const [enabled, setEnabled] = useState(true);
	const getItemSize = useCallback(() => 30, []);
	const { totalSize, virtualItems, containerRef, measureItemRef } = useVirtual({
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

			<BoxResize width={300} height={500}>
				<div ref={containerRef} className={styles['content']}>
					{totalSize !== null && (
						<div className={styles['virtual-content']} style={{ height: totalSize }}>
							{virtualItems.map(({ index, key, start }) => {
								return (
									<div
										key={key}
										data-key={key}
										style={{ top: start }}
										ref={(node) => measureItemRef(key, node)}
										className={classNames(styles['virtual-item'], { [styles['odd']]: index % 2 === 1 })}
									>
										<div
											style={{
												width: '100%',
												padding: '0 0 0 12px',
												boxSizing: 'border-box',
												lineHeight: `${height}px`,
												whiteSpace: 'normal',
												wordBreak: 'break-all',
											}}
										>
											{Array(30)
												.fill(`${index + 1}`)
												.join(';')}
										</div>
									</div>
								);
							})}
						</div>
					)}
				</div>
			</BoxResize>
		</div>
	);
};

export default App;
