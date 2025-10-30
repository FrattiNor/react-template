import { memo } from 'react';

import classNames from 'classnames';

import HeadRow from './HeadRow';
import styles from './index.module.less';

import type { TableDataItem } from '../../TableTypes/type';
import type { TableInstance } from '../../useTableInstance';

type Props<T extends TableDataItem> = Required<
	Pick<TableInstance<T>, 'columns' | 'bordered' | 'logRender'> & Pick<TableInstance<T>, 'headRef' | 'gridTemplateColumns' | 'v_ScrollbarWidth'>
>;

const TableHead = <T extends TableDataItem>(props: Props<T>) => {
	if (props.logRender?.head) console.log('TableHead re-render');
	const { headRef, gridTemplateColumns, v_ScrollbarWidth } = props;
	return (
		<div ref={headRef} className={classNames(styles['head'])}>
			<div
				className={classNames(styles['head-inner'])}
				style={{ gridTemplateColumns: gridTemplateColumns + ` minmax(${v_ScrollbarWidth}px, 1fr)` }}
			>
				<HeadRow rowIndex={0} columns={props.columns} bordered={props.bordered} logRender={props.logRender} />
			</div>
		</div>
	);
};

export default memo(TableHead) as typeof TableHead;
