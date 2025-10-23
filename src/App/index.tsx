import { useState } from 'react';
import styles from './index.module.less';
import classNames from 'classnames';
import useVirtual from '../Virtual2/useVirtual';

const data = Array(100000)
	.fill('')
	.map((_, index) => ({ index }));

const getItemKey = (index: number) => `${index}`;

const getItemSize = () => 40;

const App = () => {
	const [enabled, setEnabled] = useState(true);
	const { totalSize, virtualItems, containerRef } = useVirtual({
		enabled,
		getItemKey,
		getItemSize,
		count: data.length,
	});

	return (
		<div className={styles['wrapper']}>
			<label style={{ display: 'flex', alignItems: 'flex-end', gap: 4, userSelect: 'none' }}>
				<input type="checkbox" checked={enabled} onChange={(e) => setEnabled(e.target.checked)} />
				<span style={{ display: 'inline-block', lineHeight: '19px' }}>{'Enabled'}</span>
			</label>

			<div ref={containerRef} className={styles['content']}>
				{totalSize !== null && (
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
				)}
			</div>
		</div>
	);
};

export default App;
