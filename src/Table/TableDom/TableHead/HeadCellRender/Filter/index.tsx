import type { FC } from 'react';

import Button from 'antd/es/button';
import Dropdown from 'antd/es/dropdown';

import { filterIcon } from './icon';
import styles from './index.module.less';

type Props = {
	tableRef: React.RefObject<HTMLDivElement | null>;
};

const Filter: FC<Props> = ({ tableRef }) => {
	const popupRender = () => {
		return (
			<div className={styles['filter-dropdown']}>
				<div className={styles['filter-content']}>
					<div style={{ height: 300, width: 300 }}>{'overlay'}</div>
				</div>
				<div className={styles['btn-wrapper']}>
					<Button size="small">{'重置'}</Button>
					<Button size="small" type="primary">
						{'确认'}
					</Button>
				</div>
			</div>
		);
	};

	return (
		<Dropdown
			destroyOnHidden
			trigger={['click']}
			placement="bottomRight"
			popupRender={popupRender}
			getPopupContainer={() => tableRef.current ?? document.body}
		>
			<div className={styles['filter']}>{filterIcon}</div>
		</Dropdown>
	);
};

export default Filter;
