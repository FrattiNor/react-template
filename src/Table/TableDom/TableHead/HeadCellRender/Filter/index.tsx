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
	const colKey = column.key;
	const open = filterOpenKey === colKey;
	const columnFilter = column.filter ? column.filter(colKey) : undefined;
	const filtered = columnFilter?.filtered;
	const close = () => setFilterOpenKey(undefined);
	const renderFilter = columnFilter?.renderFilter;

	return (
		<Dropdown
			open={open}
			destroyOnHidden
			trigger={['click']}
			placement="bottomRight"
			getPopupContainer={() => tableRef.current ?? document.body}
			popupRender={() => renderFilter && renderFilter({ close })}
			onOpenChange={(o) => setFilterOpenKey(o === true ? column.key : undefined)}
		>
			<div className={classNames(styles['filter'], { [styles['open']]: open === true, [styles['filtered']]: filtered === true })}>
				{filterIcon}
			</div>
		</Dropdown>
	);
};

export default Filter;
