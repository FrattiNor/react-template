import { memo } from 'react';

import classNames from 'classnames';

import styles from './index.module.less';

import type { TableDataItem } from '../../../../TableTypes/type';
import type { TableInstance } from '../../../../useTableInstance';

type Props<T extends TableDataItem> = Required<Pick<TableInstance<T>, 'bordered' | 'logRender'>> & {
	rowIndex: number;
	colIndex: number;
};

const BodyCellPlaceholder = <T extends TableDataItem>(props: Props<T>) => {
	if (props.logRender?.bodyCell) console.log(`BodyCellPlaceholder(${props.rowIndex}-${props.colIndex}) re-render`);
	const { bordered, rowIndex, colIndex } = props;

	return (
		<div
			data-col={colIndex + 1}
			className={classNames(styles['body-cell-placeholder'], {
				[styles['bordered']]: bordered,
				[styles['first-col']]: colIndex === 0,
				[styles['first-row']]: rowIndex === 0,
			})}
			style={{
				minHeight: 46,
				gridRow: `${rowIndex + 1}/${rowIndex + 2}`,
				gridColumn: `${colIndex + 1}/${colIndex + 2}`,
			}}
		/>
	);
};

export default memo(BodyCellPlaceholder) as typeof BodyCellPlaceholder;
