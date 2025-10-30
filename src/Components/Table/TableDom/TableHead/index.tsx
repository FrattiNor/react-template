import { memo } from 'react';

import classNames from 'classnames';

import HeadRow from './HeadRow';
import styles from './index.module.less';

import type { TableInstance } from '../../useTableInstance';

type Props<T> = Required<
	Pick<TableInstance<T>, 'deepLevel' | 'splitColumnsArr' | 'bordered' | 'logRender' | 'headRef' | 'gridTemplateColumns' | 'v_ScrollbarWidth'>
>;

const TableHead = <T,>(props: Props<T>) => {
	if (props.logRender?.head) console.log('TableHead re-render');
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
							deepLevel={props.deepLevel}
							logRender={props.logRender}
							splitColumnsArr={props.splitColumnsArr}
						/>
					))}
			</div>
		</div>
	);
};

export default memo(TableHead) as typeof TableHead;
