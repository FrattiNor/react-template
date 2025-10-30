import { memo } from 'react';

import classNames from 'classnames';

import BodyCell from './BodyCell';
import BodyCellPlaceholder from './BodyCellPlaceholder';
import styles from './index.module.less';

import type { TableDataItem } from '../../../TableTypes/type';
import type { TableInstance } from '../../../useTableInstance';


type Props<T extends TableDataItem> = Required<Pick<TableInstance<T>, 'columns' | 'bordered' | 'logRender' | 'data'>> & {
	rowIndex: number;
};

const BodyRow = <T extends TableDataItem>(props: Props<T>) => {
	if (props.logRender?.bodyRow) console.log(`BodyRow(${props.rowIndex}) re-render`);
	const { columns, rowIndex } = props;
	return (
		<div data-row={rowIndex + 1} className={classNames(styles['body-row'])}>
			{columns.map((item, colIndex) => (
				<BodyCell
					key={item.key}
					data={props.data}
					colIndex={colIndex}
					columns={props.columns}
					rowIndex={props.rowIndex}
					bordered={props.bordered}
					logRender={props.logRender}
				/>
			))}
			<BodyCellPlaceholder rowIndex={props.rowIndex} colIndex={columns.length} logRender={props.logRender} bordered={props.bordered} />
		</div>
	);
};

export default memo(BodyRow) as typeof BodyRow;
