import classNames from 'classnames';
import styles from './index.module.less';
import BodyCell from './BodyCell';
import type { TableDataItem } from '../../../TableTypes/type';
import type { TableInstance } from '../../../useTableInstance';
import { memo } from 'react';

type Props = {
	rowIndex: number;
};

const BodyRow = <T extends TableDataItem>(props: TableInstance<T> & Props) => {
	const { columns, rowIndex } = props;
	if (props.logRender?.bodyRow) console.log(`BodyRow(${rowIndex}) re-render`);
	return (
		<div data-row={rowIndex + 1} className={classNames(styles['body-row'])}>
			{columns.map((item, colIndex) => (
				<BodyCell key={item.key} colIndex={colIndex} {...props} />
			))}
		</div>
	);
};

export default memo(BodyRow) as typeof BodyRow;
