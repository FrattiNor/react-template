import { memo } from 'react';

import classNames from 'classnames';

import BodyCell from './BodyCell';
import BodyCellPlaceholder from './BodyCellPlaceholder';
import styles from './index.module.less';
import { getLeafColumn } from '../../../../TableUtils';

import type { TableInstance } from '../../../../useTableInstance';

type Props<T> = Required<Pick<TableInstance<T>, 'splitColumnsArr' | 'bordered' | 'rowHeight' | 'getStickyStyle' | 'getBodyCellBg'>> & {
	rowIndex: number;
	dataItem: T;
};

const BodyRow = <T,>(props: Props<T>) => {
	const { splitColumnsArr, rowIndex, dataItem } = props;
	return (
		<div data-row={rowIndex + 1} className={classNames(styles['body-row'])}>
			{splitColumnsArr.map((splitColumns, colIndex) => {
				const column = getLeafColumn(splitColumns);
				return (
					<BodyCell
						key={column.key}
						column={column}
						dataItem={dataItem}
						colIndex={colIndex}
						rowIndex={props.rowIndex}
						bordered={props.bordered}
						rowHeight={props.rowHeight}
						getBodyCellBg={props.getBodyCellBg}
						getStickyStyle={props.getStickyStyle}
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
