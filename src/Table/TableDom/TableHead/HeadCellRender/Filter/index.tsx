import { type FC } from 'react';

import Dropdown from 'antd/es/dropdown';
import classNames from 'classnames';

import { filterIcon } from './icon';
import styles from './index.module.less';
import { getProps } from './propsAreEqual';

import type { InnerColumn } from '../../../../TableTypes/typeColumn';

export type Props = {
	column: InnerColumn<any>;
	tableRef: React.RefObject<HTMLDivElement | null>;
	filterOpenKey: string | undefined;
	setFilterOpenKey: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const Filter: FC<Props> = (props) => {
	const { tableRef, column, filterOpenKey, setFilterOpenKey } = getProps(props);
	const filtered = column.filter?.filtered;
	const open = filterOpenKey === column.key;
	const FilterComponent = column.filter?.FilterComponent;

	return (
		<Dropdown
			open={open}
			destroyOnHidden
			trigger={['click']}
			placement="bottomRight"
			getPopupContainer={() => tableRef.current ?? document.body}
			onOpenChange={(o) => setFilterOpenKey(o === true ? column.key : undefined)}
			popupRender={() => (FilterComponent ? <FilterComponent close={() => setFilterOpenKey(undefined)} /> : <div />)}
		>
			<div className={classNames(styles['filter'], { [styles['filtered']]: filtered === true })}>{filterIcon}</div>
		</Dropdown>
	);
};

export default Filter;
