import classNames from 'classnames';
import styles from './index.module.less';
import HeadRow from './HeadRow';

import type { TableDataItem } from '../../TableTypes/type';
import type { TableInstance } from '../../useTableInstance';
import { memo } from 'react';

const TableHead = <T extends TableDataItem>(props: TableInstance<T>) => {
	if (props.logRender?.head) console.log('TableHead re-render');
	const { headRef, gridTemplateColumns, v_ScrollbarWidth } = props;
	return (
		<div ref={headRef} className={classNames(styles['head'])}>
			<div
				className={classNames(styles['head-inner'])}
				style={{ gridTemplateColumns: gridTemplateColumns + ` minmax(${v_ScrollbarWidth}px, 1fr)` }}
			>
				<HeadRow rowIndex={0} {...props} />
			</div>
		</div>
	);
};

export default memo(TableHead) as typeof TableHead;
