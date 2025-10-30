import { memo } from 'react';

import classNames from 'classnames';

import HeadCell from './HeadCell';
import HeadCellPlaceholder from './HeadCellPlaceholder';
import styles from './index.module.less';

import type { TableDataItem } from '../../../TableTypes/type';
import type { TableInstance } from '../../../useTableInstance';

type Props<T extends TableDataItem> = Required<Pick<TableInstance<T>, 'flatColumns' | 'bordered' | 'logRender'>> & {
	rowIndex: number;
};

const HeadRow = <T extends TableDataItem>(props: Props<T>) => {
	if (props.logRender?.headRow) console.log(`HeadRow(${props.rowIndex}) re-render`);
	const { flatColumns, rowIndex } = props;
	return (
		<div data-row={rowIndex + 1} className={classNames(styles['head-row'])}>
			{flatColumns.map((item, colIndex) => (
				<HeadCell
					key={item.key}
					colIndex={colIndex}
					rowIndex={props.rowIndex}
					bordered={props.bordered}
					logRender={props.logRender}
					flatColumns={props.flatColumns}
				/>
			))}
			<HeadCellPlaceholder
				bordered={props.bordered}
				rowIndex={props.rowIndex}
				logRender={props.logRender}
				colIndex={props.flatColumns.length}
			/>
		</div>
	);
};

export default memo(HeadRow) as typeof HeadRow;
