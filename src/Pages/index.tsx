import { useState } from 'react';

import AppList from './AppList';
import AppReactWindow from './AppReactWindow';
import AppTable from './AppTable';
import styles from './index.module.less';

const menu = {
	List: AppList,
	Table: AppTable,
	ReactWindow: AppReactWindow,
} as const;

type MenuKey = keyof typeof menu;

const App = () => {
	const [key, setKey] = useState<MenuKey>(() => Object.keys(menu)[0] as MenuKey);
	const Component = menu[key];

	return (
		<div className={styles['wrapper']}>
			<div className={styles['menu']}>
				{Object.keys(menu).map((key) => (
					<div key={key} className={styles['menu-item']} onClick={() => setKey(key as MenuKey)}>
						{key}
					</div>
				))}
			</div>
			<div className={styles['content']}>
				<Component />
			</div>
		</div>
	);
};

export default App;
