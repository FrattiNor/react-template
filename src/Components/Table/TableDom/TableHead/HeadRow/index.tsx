import { memo } from 'react';

import classNames from 'classnames';

import HeadCell from './HeadCell';
import styles from './index.module.less';
import { getNotLeafColumnByIndex, getGroupColumnMergeKey, getLeafColumn } from '../../../TableUtils';

import type { TableInstance } from '../../../useTableInstance';

type Props<T> = Required<
	Pick<
		TableInstance<T>,
		| 'splitColumnsArr'
		| 'deepLevel'
		| 'bordered'
		| 'rowHeight'
		| 'getHeadStickyStyle'
		| 'startResize'
		| 'resizeFlag'
		| 'getHeadCellBg'
		| 'columnsKeyIndexMap'
	>
> & {
	rowIndex: number;
};

const HeadRow = <T,>(props: Props<T>) => {
	const { rowIndex, splitColumnsArr, deepLevel, columnsKeyIndexMap } = props;

	// 是否是叶子节点
	const isLeaf = rowIndex === deepLevel;

	const renderRow = () => {
		let colSameCount = 0;
		return splitColumnsArr.map((splitColumns) => {
			const leafColumn = getLeafColumn(splitColumns);
			const colIndex = columnsKeyIndexMap.get(leafColumn.key) ?? Infinity;
			if (isLeaf) {
				// 不存在column
				if (!leafColumn) return null;
				// 开始渲染
				const colIndexStart = colIndex;
				const colIndexEnd = colIndex;
				const rowIndexStart = splitColumns.length - 1;
				const rowIndexEnd = rowIndex;

				return (
					<HeadCell
						column={leafColumn}
						key={leafColumn.key}
						colIndexEnd={colIndexEnd}
						rowIndexEnd={rowIndexEnd}
						bordered={props.bordered}
						rowHeight={props.rowHeight}
						resizeFlag={props.resizeFlag}
						colIndexStart={colIndexStart}
						rowIndexStart={rowIndexStart}
						startResize={props.startResize}
						splitColumnsArr={splitColumnsArr}
						getHeadCellBg={props.getHeadCellBg}
						getHeadStickyStyle={props.getHeadStickyStyle}
					/>
				);
			} else {
				// 当前column
				const column = getNotLeafColumnByIndex(splitColumns, rowIndex);
				// 不存在column
				if (!column) return null;
				// 存在下一列
				if (splitColumnsArr[colIndex + 1] !== undefined) {
					// 同行下一列column
					const nextColumn = getNotLeafColumnByIndex(splitColumnsArr[colIndex + 1], rowIndex);
					// 同行下一列叶子节点
					const nextLeafColumn = getLeafColumn(splitColumnsArr[colIndex + 1]);
					// 同行下一列和当前列相同【key和fixed都相同】，跳过当前渲染
					if (column.key === nextColumn?.key && leafColumn.fixed === nextLeafColumn?.fixed) {
						colSameCount++;
						return null;
					}
				}
				// 开始渲染
				const colIndexStart = colIndex - colSameCount;
				const colIndexEnd = colIndex;
				const rowIndexStart = rowIndex;
				const rowIndexEnd = rowIndex;
				const key = getGroupColumnMergeKey(splitColumnsArr, rowIndex, deepLevel, colIndexStart, colIndexEnd);
				colSameCount = 0;

				return (
					<HeadCell
						key={key}
						column={column}
						colIndexEnd={colIndexEnd}
						rowIndexEnd={rowIndexEnd}
						bordered={props.bordered}
						rowHeight={props.rowHeight}
						resizeFlag={props.resizeFlag}
						colIndexStart={colIndexStart}
						rowIndexStart={rowIndexStart}
						startResize={props.startResize}
						splitColumnsArr={splitColumnsArr}
						getHeadCellBg={props.getHeadCellBg}
						getHeadStickyStyle={props.getHeadStickyStyle}
					/>
				);
			}
		});
	};

	return (
		<div data-row={rowIndex + 1} className={classNames(styles['head-row'])}>
			{renderRow()}
		</div>
	);
};

export default memo(HeadRow) as typeof HeadRow;
