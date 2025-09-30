import { useState } from 'react';

import Checkbox from 'antd/es/checkbox/Checkbox';
import classNames from 'classnames';

import styles from './index.module.less';
import { closeIcon, getLocationKey, menu, menuKeys, openIcon, setLocationKey, type MenuKey } from './utils';

const App = () => {
	const [mask, setMask] = useState(true);
	const [menuHidden, setMenuHidden] = useState(true);
	const [activeKey, setActiveKey] = useState<MenuKey>(() => getLocationKey() ?? menuKeys[0]);
	const Component = menu[activeKey];

	return (
		<div className={styles['wrapper']}>
			<div className={classNames(styles['menu'], { [styles['hidden']]: menuHidden })}>
				<div className={styles['menu-mask-btn']}>
					<Checkbox checked={mask} onChange={(e) => setMask(e.target.checked)}>
						{'启用Mask'}
					</Checkbox>
				</div>
				<div className={styles['menu-inner']}>
					{menuKeys.map((key) => (
						<div
							key={key}
							className={classNames(styles['menu-item'], { [styles['active']]: key === activeKey })}
							onClick={() => {
								setLocationKey(key);
								setActiveKey(key as MenuKey);
							}}
						>
							{key}
						</div>
					))}
				</div>
				<div className={styles['menu-handle']} onClick={() => setMenuHidden((old) => !old)}>
					{menuHidden ? openIcon : closeIcon}
				</div>
			</div>
			<div className={styles['content']}>
				{Component && <Component />}
				{mask === true && menuHidden !== true && <div className={styles['mask']} onClick={() => setMenuHidden(true)} />}
			</div>
		</div>
	);
};

export default App;
