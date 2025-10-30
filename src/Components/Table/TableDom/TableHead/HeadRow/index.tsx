import classNames from 'classnames';
import styles from './index.module.less';
import HeadCell from './HeadCell';
import type { TableDataItem } from '../../../TableTypes/type';
import type { TableInstance } from '../../../useTableInstance';
import { memo } from 'react';

type Props<T extends TableDataItem> = Required<Pick<TableInstance<T>, 'columns' | 'bordered' | 'logRender'>> & {
	rowIndex: number;
};

const HeadRow = <T extends TableDataItem>(props: Props<T>) => {
	if (props.logRender?.headRow) console.log(`HeadRow(${props.rowIndex}) re-render`);
	const { columns, rowIndex } = props;
	return (
		<div data-row={rowIndex + 1} className={classNames(styles['head-row'])}>
			{columns.map((item, colIndex) => (
				<HeadCell
					key={item.key}
					colIndex={colIndex}
					columns={props.columns}
					rowIndex={props.rowIndex}
					bordered={props.bordered}
					logRender={props.logRender}
				/>
			))}
			<div />
		</div>
	);
};

export default memo(HeadRow) as typeof HeadRow;
