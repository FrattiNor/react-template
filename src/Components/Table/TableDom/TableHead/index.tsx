import { memo } from 'react';

import classNames from 'classnames';

import HeadRow from './HeadRow';
import styles from './index.module.less';

import type { TableInstance } from '../../useTableInstance';

type Props<T> = Required<
	Pick<TableInstance<T>, 'deepLevel' | 'splitColumnsArr' | 'bordered' | 'headRef' | 'gridTemplateColumns' | 'v_ScrollbarWidth' | 'rowHeight'>
>;

const TableHead = <T,>(props: Props<T>) => {
	//  console.log('TableHead re-render');
	const { headRef, gridTemplateColumns, v_ScrollbarWidth, deepLevel } = props;

	return (
		<div ref={headRef} className={classNames(styles['head'])}>
			<div
				className={classNames(styles['head-inner'])}
				style={{ gridTemplateColumns: gridTemplateColumns + ` minmax(${v_ScrollbarWidth}px, 1fr)` }}
			>
				{Array(deepLevel + 1)
					.fill(undefined)
					.map((_, rowIndex) => (
						<HeadRow
							key={rowIndex}
							rowIndex={rowIndex}
							bordered={props.bordered}
							rowHeight={props.rowHeight}
							deepLevel={props.deepLevel}
							splitColumnsArr={props.splitColumnsArr}
						/>
					))}
			</div>
		</div>
	);
};

export default memo(TableHead) as typeof TableHead;
