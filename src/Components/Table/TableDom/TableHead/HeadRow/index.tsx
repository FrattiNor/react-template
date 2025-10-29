import classNames from 'classnames';
import styles from './index.module.less';
import HeadCell from './HeadCell';
import type { TableDataItem } from '../../../TableTypes/type';
import type { TableInstance } from '../../../useTableInstance';
import { memo } from 'react';

type Props = {
	rowIndex: number;
};

const HeadRow = <T extends TableDataItem>(props: TableInstance<T> & Props) => {
	const { columns, rowIndex } = props;
	if (props.logRender?.headRow) console.log(`HeadRow(${rowIndex}) re-render`);
	return (
		<div data-row={rowIndex + 1} className={classNames(styles['head-row'])}>
			{columns.map((item, colIndex) => (
				<HeadCell key={item.key} colIndex={colIndex} {...props} />
			))}
			<div />
		</div>
	);
};

export default memo(HeadRow) as typeof HeadRow;
