import { useCallback, useMemo, useState } from 'react';

import classNames from 'classnames';

import getData from './data';
import styles from './index.module.less';
import BoxResize from '../../Components/BoxResize';
import Slider from '../../Components/Slider';
import { useVirtual } from '../../Components/Virtual';

const ListDemo = () => {
	const [enabled, setEnabled] = useState(true);
	const [vertical, setVertical] = useState(true);
	const [syncUpdate, setSyncUpdate] = useState(true);

	const [count, setCount] = useState(100);
	const [endGap, setEndGap] = useState(0);
	const [itemGap, setItemGap] = useState(0);
	const [startGap, setStartGap] = useState(0);
	const [lineHeight, setLineHeight] = useState(30);
	const [confHeight, setConfHeight] = useState(40);
	const [overscanEnd, setOverscanEnd] = useState(0);
	const [overscanStart, setOverscanStart] = useState(0);
	const [datasouce, setDatasouce] = useState(() => getData(100000));

	const getItemSize = useCallback(() => confHeight, [confHeight]);
	const data = useMemo(() => datasouce.slice(0, count), [datasouce, count]);
	const getItemKey = useCallback((index: number) => data[index].userId, [data]);
	const { totalSize, renderVirtualItems, containerRef, measureItemRef } = useVirtual({
		count,
		enabled,
		syncUpdate,
		getItemKey,
		getItemSize,
		horizontal: !vertical,
		gap: { itemGap, startGap, endGap },
		overscan: [overscanStart, overscanEnd],
	});

	return (
		<div className={styles['wrapper']}>
			<div className={styles['config']}>
				<button onClick={() => setDatasouce(getData(100000))}>{'Refresh Data'}</button>

				<label style={{ display: 'flex', alignItems: 'flex-end', gap: 4, userSelect: 'none' }}>
					<input type="checkbox" checked={enabled} onChange={(e) => setEnabled(e.target.checked)} style={{ outline: 'none' }} />
					<span style={{ display: 'inline-block', lineHeight: '19px' }}>{'Enabled'}</span>
				</label>

				<label style={{ display: 'flex', alignItems: 'flex-end', gap: 4, userSelect: 'none' }}>
					<input type="checkbox" checked={vertical} onChange={(e) => setVertical(e.target.checked)} style={{ outline: 'none' }} />
					<span style={{ display: 'inline-block', lineHeight: '19px' }}>{'Vertical'}</span>
				</label>

				<label style={{ display: 'flex', alignItems: 'flex-end', gap: 4, userSelect: 'none' }}>
					<input type="checkbox" checked={syncUpdate} onChange={(e) => setSyncUpdate(e.target.checked)} style={{ outline: 'none' }} />
					<span style={{ display: 'inline-block', lineHeight: '19px' }}>{'SyncUpdate'}</span>
				</label>

				<label style={{ display: 'flex', alignItems: 'flex-end', gap: 4, userSelect: 'none' }}>
					<span style={{ display: 'inline-block', lineHeight: '19px' }}>{'count：'}</span>
					<select value={String(count)} onChange={(e) => setCount(parseInt(e.target.value))}>
						<option value="0">0</option>
						<option value="100">100</option>
						<option value="500">500</option>
						<option value="1000">1000</option>
						<option value="5000">5000</option>
						<option value="10000">10000</option>
						<option value="50000">50000</option>
						<option value="100000">100000</option>
					</select>
				</label>

				<Slider label="overscanStart" min={0} max={10} width={200} value={overscanStart} onChange={setOverscanStart} />

				<Slider label="overscanEnd" min={0} max={10} width={200} value={overscanEnd} onChange={setOverscanEnd} />

				<Slider label="itemGap" min={0} max={16} width={200} value={itemGap} onChange={setItemGap} />

				<Slider label="startGap" min={0} max={16} width={200} value={startGap} onChange={setStartGap} />

				<Slider label="endGap" min={0} max={16} width={200} value={endGap} onChange={setEndGap} />

				<Slider label="confHeight" min={20} max={100} width={200} value={confHeight} onChange={setConfHeight} />

				<Slider label="lineHeight" min={20} max={100} width={200} value={lineHeight} onChange={setLineHeight} />
			</div>

			<div className={styles['content']}>
				<BoxResize width={300} height={500}>
					<div ref={containerRef} className={styles['container']}>
						{totalSize !== null && vertical === true && (
							<div className={styles['virtual-content']} style={{ height: totalSize }}>
								{renderVirtualItems(({ index, key, start }) => {
									const itemData = data[index];
									return (
										<div
											key={key}
											data-index={index}
											style={{ top: start }}
											ref={(node) => measureItemRef(index, node)}
											className={classNames(styles['virtual-item-v'], { [styles['odd']]: index % 2 === 1 })}
										>
											<div className={styles['item']} style={{ lineHeight: `${lineHeight}px` }}>
												<span>{`${itemData.userId}；`}</span>
												<span>
													{Array(9)
														.fill(`${index + 1}`)
														.join('；')}
												</span>
											</div>
										</div>
									);
								})}
							</div>
						)}
						{totalSize !== null && vertical === false && (
							<div className={styles['virtual-content']} style={{ width: totalSize }}>
								{renderVirtualItems(({ index, key, start }) => {
									const itemData = data[index];
									return (
										<div
											key={key}
											data-index={index}
											style={{ left: start }}
											ref={(node) => measureItemRef(index, node)}
											className={classNames(styles['virtual-item-h'], { [styles['odd']]: index % 2 === 1 })}
										>
											<div className={styles['item']} style={{ lineHeight: `${lineHeight}px` }}>
												<span>{`${itemData.userId};`}</span>
												<span>
													{Array(9)
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

export default ListDemo;
