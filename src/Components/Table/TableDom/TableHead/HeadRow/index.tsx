import { Fragment, memo } from 'react';

import classNames from 'classnames';

import HeadCell from './HeadCell';
import HeadCellPlaceholder from './HeadCellPlaceholder';
import styles from './index.module.less';
import { getGroupColumnMergeKey } from '../../../TableUtils';

import type { InnerColumn } from '../../../TableTypes/typeColumn';
import type { TableInstance } from '../../../useTableInstance';

type Props<T> = Required<Pick<TableInstance<T>, 'splitColumnsArr' | 'deepLevel' | 'bordered' | 'rowHeight'>> & {
	rowIndex: number;
};

const HeadRow = <T,>(props: Props<T>) => {
	//  console.log(`HeadRow(${props.rowIndex}) re-render`);
	const { rowIndex, splitColumnsArr, deepLevel } = props;

	const renderRow = () => {
		let colSameCount = 0;
		return splitColumnsArr.map((splitColumns, colIndex) => {
			// 当前column
			const column = splitColumns[rowIndex];
			// 不存在column
			if (!column) return null;
			// 同行下一列column
			const nextColumn = splitColumnsArr[colIndex + 1]?.[rowIndex];
			// 同行下一列和当前列相同，跳过当前渲染
			if (column.key === nextColumn?.key) {
				colSameCount++;
				return null;
			}
			// 是否是叶子节点
			const isLeaf = rowIndex === splitColumns.length - 1;
			// index
			const colIndexStart = colIndex - colSameCount;
			const colIndexEnd = colIndex;
			const rowIndexStart = isLeaf ? (column as InnerColumn<T>).level : rowIndex;
			const rowIndexEnd = rowIndex;
			// 获取key
			const key = isLeaf ? column.key : getGroupColumnMergeKey(splitColumnsArr, rowIndex, deepLevel, colIndexStart, colIndexEnd);
			// 重置colSameCount
			colSameCount = 0;

			return (
				<Fragment key={key}>
					<HeadCell
						column={column}
						colIndexEnd={colIndexEnd}
						rowIndexEnd={rowIndexEnd}
						colIndexStart={colIndexStart}
						rowIndexStart={rowIndexStart}
						bordered={props.bordered}
						rowHeight={props.rowHeight}
					/>
					{/* 是否是当前行最后一列 */}
					{colIndex === splitColumnsArr.length - 1 && (
						<HeadCellPlaceholder
							rowIndexEnd={rowIndexEnd}
							rowIndexStart={rowIndexStart}
							colIndex={splitColumnsArr.length}
							bordered={props.bordered}
							rowHeight={props.rowHeight}
						/>
					)}
				</Fragment>
			);
		});
	};

	return (
		<div data-row={rowIndex + 1} className={classNames(styles['head-row'])}>
			{renderRow()}
		</div>
	);
};

export default memo(HeadRow) as typeof HeadRow;
