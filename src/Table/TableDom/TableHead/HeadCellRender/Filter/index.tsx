import type { FC } from 'react';
import styles from './index.module.less';
import Dropdown from 'antd/es/dropdown';
import Button from 'antd/es/button';
import { filterIcon } from './icon';

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
		<Dropdown placement="bottomRight" trigger={['click']} popupRender={popupRender} getPopupContainer={() => tableRef.current ?? document.body} destroyOnHidden>
			<div className={styles['filter']}>{filterIcon}</div>
		</Dropdown>
	);
};

export default Filter;
