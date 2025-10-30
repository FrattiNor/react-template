import { memo } from 'react';

import classNames from 'classnames';

import HeadCell from './HeadCell';
import HeadCellPlaceholder from './HeadCellPlaceholder';
import styles from './index.module.less';

import type { TableInstance } from '../../../useTableInstance';

type Props<T> = Required<Pick<TableInstance<T>, 'leafColumns' | 'bordered' | 'logRender'>> & {
	rowIndex: number;
};

const HeadRow = <T,>(props: Props<T>) => {
	if (props.logRender?.headRow) console.log(`HeadRow(${props.rowIndex}) re-render`);
	const { leafColumns, rowIndex } = props;
	return (
		<div data-row={rowIndex + 1} className={classNames(styles['head-row'])}>
			{leafColumns.map((item, colIndex) => (
				<HeadCell
					key={item.key}
					colIndex={colIndex}
					rowIndex={props.rowIndex}
					bordered={props.bordered}
					logRender={props.logRender}
					leafColumns={props.leafColumns}
				/>
			))}
			<HeadCellPlaceholder
				bordered={props.bordered}
				rowIndex={props.rowIndex}
				logRender={props.logRender}
				colIndex={props.leafColumns.length}
			/>
		</div>
	);
};

export default memo(HeadRow) as typeof HeadRow;
