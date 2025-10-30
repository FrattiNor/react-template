import { memo } from 'react';

import classNames from 'classnames';

import BodyCell from './BodyCell';
import BodyCellPlaceholder from './BodyCellPlaceholder';
import styles from './index.module.less';

import type { TableInstance } from '../../../useTableInstance';

type Props<T> = Required<Pick<TableInstance<T>, 'leafColumns' | 'bordered' | 'logRender' | 'data'>> & {
	rowIndex: number;
};

const BodyRow = <T,>(props: Props<T>) => {
	if (props.logRender?.bodyRow) console.log(`BodyRow(${props.rowIndex}) re-render`);
	const { leafColumns, rowIndex } = props;
	return (
		<div data-row={rowIndex + 1} className={classNames(styles['body-row'])}>
			{leafColumns.map((item, colIndex) => (
				<BodyCell
					key={item.key}
					data={props.data}
					colIndex={colIndex}
					rowIndex={props.rowIndex}
					bordered={props.bordered}
					logRender={props.logRender}
					leafColumns={props.leafColumns}
				/>
			))}
			<BodyCellPlaceholder rowIndex={props.rowIndex} colIndex={leafColumns.length} logRender={props.logRender} bordered={props.bordered} />
		</div>
	);
};

export default memo(BodyRow) as typeof BodyRow;
