import { useState } from 'react';

import Checkbox from 'antd/es/checkbox/Checkbox';
import classNames from 'classnames';

import AppList from './AppList';
import AppReactWindow from './AppReactWindow';
import AppTable from './AppTable';
import styles from './index.module.less';

const menu = {
	ReactWindow: AppReactWindow,
	List: AppList,
	Table: AppTable,
} as const;

type MenuKey = keyof typeof menu;

const menuKeys = Object.keys(menu) as Array<MenuKey>;

const openIcon = (
	<svg viewBox="64 64 896 896" focusable="false" data-icon="menu-unfold" width="1em" height="1em" fill="currentColor" aria-hidden="true">
		<path d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 000-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0014.4 7z"></path>
	</svg>
);

const closeIcon = (
	<svg viewBox="64 64 896 896" focusable="false" data-icon="menu-fold" width="1em" height="1em" fill="currentColor" aria-hidden="true">
		<path d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM115.4 518.9L271.7 642c5.8 4.6 14.4.5 14.4-6.9V388.9c0-7.4-8.5-11.5-14.4-6.9L115.4 505.1a8.74 8.74 0 000 13.8z"></path>
	</svg>
);

const getLocationKey = () => {
	const url = new URL(window.location.href);
	const activeKey = url.searchParams.getAll('activeKey')?.[0];
	if (typeof activeKey === 'string' && menu[activeKey as MenuKey] !== undefined) {
		return activeKey as MenuKey;
	}
	return undefined;
};

const setLocationKey = (key: string) => {
	const url = new URL(window.location.href);
	url.searchParams.set('activeKey', key);
	window.history.replaceState(null, '', url.toString());
};

const App = () => {
	const [mask, setMask] = useState(false);
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
