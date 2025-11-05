import { memo } from 'react';

import classNames from 'classnames';

import styles from './index.module.less';

import type { TableInstance } from '../../../useTableInstance';

type Props<T> = Required<Pick<TableInstance<T>, 'bordered' | 'rowHeight' | 'pingedRightEnd'>> & {
	rowIndexStart: number;
	rowIndexEnd: number;
	colIndex: number;
};

const HeadCellPlaceholder = <T,>(props: Props<T>) => {
	// console.log(`HeadCellPlaceholder(${props.rowIndex}-${props.colIndex}) re-render`);
	const { bordered, rowIndexStart, rowIndexEnd, colIndex, rowHeight, pingedRightEnd } = props;

	return (
		<div
			data-col={colIndex + 1}
			style={{
				minHeight: (rowIndexEnd - rowIndexStart + 1) * rowHeight,
				gridColumn: `${colIndex + 1}/${colIndex + 2}`,
				gridRow: `${rowIndexStart + 1}/${rowIndexEnd + 2}`,
			}}
			className={classNames(styles['head-cell-placeholder'], {
				[styles['bordered']]: bordered,
				[styles['first-col']]: colIndex === 0,
				[styles['sticky']]: typeof pingedRightEnd === 'number',
			})}
		/>
	);
};

export default memo(HeadCellPlaceholder) as typeof HeadCellPlaceholder;
