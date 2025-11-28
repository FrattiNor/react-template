import { memo } from 'react';

import classNames from 'classnames';

import BodyCell from './BodyCell';
import BodyCellPlaceholder from './BodyCellPlaceholder';
import styles from './index.module.less';
import { getLeafColumn } from '../../../../TableUtils';

import type { TableInstance } from '../../../../useTableInstance';

type Props<T> = Required<
	Pick<
		TableInstance<T>,
		| 'splitColumnsArr'
		| 'bordered'
		| 'rowHeight'
		| 'getBodyStickyStyle'
		| 'getBodyCellBg'
		| 'columnsKeyIndexMap'
		| 'bodyRowClick'
		| 'bodyRowMouseEnter'
		| 'bodyRowMouseLeave'
		| 'rowKey'
		| 'data'
	>
> & {
	rowIndex: number;
	dataItem: T;
};

const BodyRow = <T,>(props: Props<T>) => {
	const { splitColumnsArr, rowIndex, dataItem, columnsKeyIndexMap } = props;
	return (
		<div data-row={rowIndex + 1} className={classNames(styles['body-row'])}>
			{splitColumnsArr.map((splitColumns) => {
				const leafColumn = getLeafColumn(splitColumns);
				const { rowSpan = 1, colSpan = 1 } = leafColumn.onCellSpan ? leafColumn.onCellSpan(dataItem, rowIndex) : {};
				if (rowSpan <= 0 || colSpan <= 0) return null;
				const colIndex = columnsKeyIndexMap.get(leafColumn.key) ?? Infinity;
				const rowIndexStart = rowIndex;
				const rowIndexEnd = rowIndex + rowSpan - 1;
				const colIndexStart = colIndex;
				const colIndexEnd = colIndex + colSpan - 1;
				return (
					<BodyCell
						data={props.data}
						dataItem={dataItem}
						key={leafColumn.key}
						rowKey={props.rowKey}
						leafColumn={leafColumn}
						colIndexEnd={colIndexEnd}
						rowIndexEnd={rowIndexEnd}
						bordered={props.bordered}
						rowHeight={props.rowHeight}
						rowIndexStart={rowIndexStart}
						colIndexStart={colIndexStart}
						bodyRowClick={props.bodyRowClick}
						splitColumnsArr={splitColumnsArr}
						getBodyCellBg={props.getBodyCellBg}
						bodyRowMouseEnter={props.bodyRowMouseEnter}
						bodyRowMouseLeave={props.bodyRowMouseLeave}
						getBodyStickyStyle={props.getBodyStickyStyle}
					/>
				);
			})}
			<BodyCellPlaceholder
				rowIndex={props.rowIndex}
				bordered={props.bordered}
				rowHeight={props.rowHeight}
				colIndex={props.splitColumnsArr.length}
			/>
		</div>
	);
};

export default memo(BodyRow) as typeof BodyRow;
