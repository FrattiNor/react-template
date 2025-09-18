import styles from './index.module.less';
import HeadGroupCell from '../HeadGroupCell';
import type { TableInstance } from '../../../TableTypes/typeHooks';
import type { TableDataItem } from '../../../TableTypes/type';
import { memo } from 'react';
import propsAreEqual, { getInstanceProps, getProps } from './propsAreEqual';

export type Props<T extends TableDataItem> = {
	instance: TableInstance<T>;
	rowIndex: number;
};

const HeadGroupRow = <T extends TableDataItem>(props: Props<T>) => {
	const { rowIndex } = getProps(props);
	const { columnGroups } = getInstanceProps(props);
	const headerColumnGroup = columnGroups[rowIndex];

	return (
		<div className={styles['head-row']}>
			{headerColumnGroup.map((column, colIndex) => (
				<HeadGroupCell key={column.key} rowIndex={rowIndex} colIndex={colIndex} instance={props.instance} />
			))}
		</div>
	);
};

export default memo(HeadGroupRow, propsAreEqual) as typeof HeadGroupRow;
