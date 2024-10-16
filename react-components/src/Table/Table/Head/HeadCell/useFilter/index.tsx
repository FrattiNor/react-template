import { useState } from 'react';

import { FilterFilled } from '@ant-design/icons';
import { Dropdown } from 'antd';
import classNames from 'classnames';

import styles from './index.module.less';
import { type TableColumnFilter } from '../../../../type';

const useFilter = (filter?: TableColumnFilter) => {
	const [visible, setVisible] = useState(false);

	if (filter) {
		return (
			<Dropdown
				open={visible}
				destroyPopupOnHide
				trigger={['click']}
				placement="bottomRight"
				onOpenChange={setVisible}
				dropdownRender={() => filter.dropdown({ setVisible })}
			>
				<div className={classNames(styles['filter'], { [styles['active']]: filter.filtered, [styles['visible']]: visible })}>
					{filter.icon ?? <FilterFilled />}
				</div>
			</Dropdown>
		);
	}

	return null;
};

export default useFilter;
