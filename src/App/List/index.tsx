import { useCallback, useMemo, useState } from 'react';
import styles from './index.module.less';
import classNames from 'classnames';
import { useVirtual } from '../../Components/Virtual';
import Slider from '../../Components/Slider';
import BoxResize from '../../Components/BoxResize';
import getData from './data';

const App = () => {
	const [endGap, setEndGap] = useState(0);
	const [count, setCount] = useState(100);
	const [itemGap, setItemGap] = useState(0);
	const [startGap, setStartGap] = useState(0);
	const [enabled, setEnabled] = useState(true);
	const [lineHeight, setLineHeight] = useState(30);
	const [confHeight, setConfHeight] = useState(40);

	const data = useMemo(() => getData(count), [count]);
	const getItemSize = useCallback(() => confHeight, [confHeight]);
	const getItemKey = useCallback((index: number) => data[index].userId, [data]);
	const { totalSize, renderVirtualItems, containerRef, measureItemRef } = useVirtual({
		count,
		enabled,
		getItemKey,
		getItemSize,
		gap: { itemGap, startGap, endGap },
	});

	return (
		<div className={styles['wrapper']}>
			<div className={styles['config']}>
				<label style={{ display: 'flex', alignItems: 'flex-end', gap: 4, userSelect: 'none' }}>
					<input type="checkbox" checked={enabled} onChange={(e) => setEnabled(e.target.checked)} style={{ outline: 'none' }} />
					<span style={{ display: 'inline-block', lineHeight: '19px' }}>{'Enabled'}</span>
				</label>

				<Slider label="itemGap" min={0} max={16} width={200} value={itemGap} onChange={setItemGap} />

				<Slider label="startGap" min={0} max={16} width={200} value={startGap} onChange={setStartGap} />

				<Slider label="endGap" min={0} max={16} width={200} value={endGap} onChange={setEndGap} />

				<Slider label="count" min={0} max={100} width={200} value={count} onChange={setCount} />

				<Slider label="confHeight" min={20} max={100} width={200} value={confHeight} onChange={setConfHeight} />

				<Slider label="lineHeight" min={20} max={100} width={200} value={lineHeight} onChange={setLineHeight} />
			</div>

			<div className={styles['content']}>
				<BoxResize width={300} height={500}>
					<div ref={containerRef} className={styles['container']}>
						{totalSize !== null && (
							<div className={styles['virtual-content']} style={{ height: totalSize }}>
								{renderVirtualItems(({ index, key, start }) => {
									const itemData = data[index];
									return (
										<div
											key={key}
											data-index={index}
											style={{ top: start }}
											ref={(node) => measureItemRef(index, node)}
											className={classNames(styles['virtual-item'], { [styles['odd']]: index % 2 === 1 })}
										>
											<div className={styles['item']} style={{ lineHeight: `${lineHeight}px` }}>
												<span>{itemData.userId}</span>
												<span>
													{Array(30)
														.fill(`${index + 1}`)
														.join(';')}
												</span>
											</div>
										</div>
									);
								})}
							</div>
						)}
					</div>
				</BoxResize>
			</div>
		</div>
	);
};

export default App;
