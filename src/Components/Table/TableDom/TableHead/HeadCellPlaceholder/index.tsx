import { memo } from 'react';

import classNames from 'classnames';

import styles from './index.module.less';

import type { TableInstance } from '../../../useTableInstance';

type Props<T> = Required<Pick<TableInstance<T>, 'bordered' | 'rowHeight' | 'splitColumnsArr'>> & {
	rowIndexStart: number;
	rowIndexEnd: number;
};

const HeadCellPlaceholder = <T,>(props: Props<T>) => {
	const { bordered, rowIndexStart, rowIndexEnd, splitColumnsArr, rowHeight } = props;
	const colIndex = splitColumnsArr.length;

	return (
		<div
			data-col={colIndex + 1}
			style={{
				gridColumn: `${colIndex + 1}/${colIndex + 2}`,
				gridRow: `${rowIndexStart + 1}/${rowIndexEnd + 2}`,
				minHeight: (rowIndexEnd - rowIndexStart + 1) * rowHeight,
			}}
			className={classNames(styles['head-cell-placeholder'], {
				[styles['bordered']]: bordered,
				[styles['first-col']]: colIndex === 0,
			})}
		/>
	);
};

export default memo(HeadCellPlaceholder) as typeof HeadCellPlaceholder;
