import styles from './index.module.less';
import HeadGroupCell from '../HeadGroupCell';
import type { TableInstance } from '../../../TableHooks/type';
import type { TableDataItem } from '../../../TableTypes/type';
import { memo } from 'react';
import propsAreEqual from './propsAreEqual';

export type Props<T extends TableDataItem> = {
	instance: TableInstance<T>;
	rowIndex: number;
};

const HeadGroupRow = <T extends TableDataItem>({ instance, rowIndex }: Props<T>) => {
	const headerColumnGroup = instance.tableProps.columnGroups[rowIndex];

	return (
		<div className={styles['head-row']}>
			{headerColumnGroup.map((column, colIndex) => (
				<HeadGroupCell key={column.key} rowIndex={rowIndex} colIndex={colIndex} instance={instance} />
			))}
		</div>
	);
};

export default memo(HeadGroupRow, propsAreEqual) as typeof HeadGroupRow;
