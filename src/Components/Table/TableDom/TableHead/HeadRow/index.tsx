import { memo } from 'react';

import classNames from 'classnames';

import HeadCell from './HeadCell';
import HeadCellPlaceholder from './HeadCellPlaceholder';
import styles from './index.module.less';

import type { TableInstance } from '../../../useTableInstance';

type Props<T> = Required<Pick<TableInstance<T>, 'splitColumnsArr' | 'deepLevel' | 'bordered' | 'logRender'>> & {
	rowIndex: number;
};

const HeadRow = <T,>(props: Props<T>) => {
	if (props.logRender?.headRow) console.log(`HeadRow(${props.rowIndex}) re-render`);
	const { rowIndex, splitColumnsArr, deepLevel } = props;

	const renderRow = () => {
		// splitColumnsArr.map((splitColumns) => {
		// 	const column = splitColumns[deepLevel - rowIndex - splitColumns.length + 1];
		// 	console.log(rowIndex, column);
		// });

		return splitColumnsArr.map((splitColumns, index) => {
			const column = splitColumns[deepLevel - rowIndex];
			if (!column) return null;
			return (
				<HeadCell
					key={index}
					colIndex={index}
					rowIndex={props.rowIndex}
					bordered={props.bordered}
					deepLevel={props.deepLevel}
					logRender={props.logRender}
					splitColumnsArr={props.splitColumnsArr}
				/>
			);
		});
	};

	renderRow();

	return (
		<div data-row={rowIndex + 1} className={classNames(styles['head-row'])}>
			{renderRow()}
			<HeadCellPlaceholder
				bordered={props.bordered}
				rowIndex={props.rowIndex}
				logRender={props.logRender}
				colIndex={props.splitColumnsArr.length}
			/>
		</div>
	);
};

export default memo(HeadRow) as typeof HeadRow;
