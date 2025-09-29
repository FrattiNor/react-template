import { memo } from 'react';

import styles from './index.module.less';
import HeadGroupCell from '../HeadGroupCell';
import propsAreEqual, { getInstanceProps, getProps } from './propsAreEqual';
import HeaderHeightRetainer from '../HeaderHeightRetainer';

import type { TableDataItem, TableInstance } from '../../../TableTypes/type';

export type Props<T extends TableDataItem> = {
	instance: TableInstance<T>;
	rowIndex: number;
};

const HeadGroupRow = <T extends TableDataItem>(props: Props<T>) => {
	const { rowIndex } = getProps(props);
	const { columnGroups } = getInstanceProps(props);
	const headerColumnGroup = columnGroups[rowIndex];

	return (
		<div data-row-index={rowIndex} className={styles['head-row']}>
			{headerColumnGroup.map((column, colIndex) => (
				<HeadGroupCell key={column.key} rowIndex={rowIndex} colIndex={colIndex} instance={props.instance} />
			))}
			<HeaderHeightRetainer rowIndex={rowIndex} instance={props.instance} />
		</div>
	);
};

export default memo(HeadGroupRow, propsAreEqual) as typeof HeadGroupRow;
