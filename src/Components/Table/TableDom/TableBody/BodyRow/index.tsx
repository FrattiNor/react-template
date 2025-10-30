import { memo } from 'react';

import classNames from 'classnames';

import BodyCell from './BodyCell';
import BodyCellPlaceholder from './BodyCellPlaceholder';
import styles from './index.module.less';

import type { TableDataItem } from '../../../TableTypes/type';
import type { TableInstance } from '../../../useTableInstance';

type Props<T extends TableDataItem> = Required<Pick<TableInstance<T>, 'flatColumns' | 'bordered' | 'logRender' | 'data'>> & {
	rowIndex: number;
};

const BodyRow = <T extends TableDataItem>(props: Props<T>) => {
	if (props.logRender?.bodyRow) console.log(`BodyRow(${props.rowIndex}) re-render`);
	const { flatColumns, rowIndex } = props;
	return (
		<div data-row={rowIndex + 1} className={classNames(styles['body-row'])}>
			{flatColumns.map((item, colIndex) => (
				<BodyCell
					key={item.key}
					data={props.data}
					colIndex={colIndex}
					rowIndex={props.rowIndex}
					bordered={props.bordered}
					logRender={props.logRender}
					flatColumns={props.flatColumns}
				/>
			))}
			<BodyCellPlaceholder rowIndex={props.rowIndex} colIndex={flatColumns.length} logRender={props.logRender} bordered={props.bordered} />
		</div>
	);
};

export default memo(BodyRow) as typeof BodyRow;
