import { memo } from 'react';

import classNames from 'classnames';

import HeadCellPlaceholder from './HeadCellPlaceholder';
import HeadRow from './HeadRow';
import styles from './index.module.less';

import type { TableInstance } from '../../useTableInstance';

type Props<T> = Required<
	Pick<
		TableInstance<T>,
		| 'deepLevel'
		| 'splitColumnsArr'
		| 'bordered'
		| 'headRef'
		| 'gridTemplateColumns'
		| 'v_scrollbar'
		| 'rowHeight'
		| 'getStickyStyle'
		| 'pingedRightStart'
	>
>;

const TableHead = <T,>(props: Props<T>) => {
	const { headRef, gridTemplateColumns, v_scrollbar, deepLevel } = props;
	const headGridTemplateColumns = v_scrollbar.have ? gridTemplateColumns + ` minmax(${v_scrollbar.width}px, 1fr)` : gridTemplateColumns;

	return (
		<div ref={headRef} className={classNames(styles['head'])}>
			<div className={classNames(styles['head-inner'])} style={{ gridTemplateColumns: headGridTemplateColumns }}>
				{Array(deepLevel + 1)
					.fill(undefined)
					.map((_, rowIndex) => (
						<HeadRow
							key={rowIndex}
							rowIndex={rowIndex}
							bordered={props.bordered}
							rowHeight={props.rowHeight}
							deepLevel={props.deepLevel}
							getStickyStyle={props.getStickyStyle}
							splitColumnsArr={props.splitColumnsArr}
						/>
					))}

				<HeadCellPlaceholder
					rowIndexStart={0}
					rowIndexEnd={deepLevel}
					bordered={props.bordered}
					rowHeight={props.rowHeight}
					splitColumnsArr={props.splitColumnsArr}
					pingedRightStart={props.pingedRightStart}
				/>
			</div>
		</div>
	);
};

export default memo(TableHead) as typeof TableHead;
