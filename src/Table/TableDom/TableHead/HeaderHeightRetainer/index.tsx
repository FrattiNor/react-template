import { Fragment, memo } from 'react';
import type { TableInstance } from '../../../TableHooks/type';
import type { TableDataItem } from '../../../TableTypes/type';

type Props<T extends TableDataItem> = {
	instance: TableInstance<T>;
};

const HeaderHeightRetainer = <T extends TableDataItem>({ instance }: Props<T>) => {
	const { columnGroups, columnsFlat, rowHeight } = instance.tableProps;
	const rowCount = columnGroups.length + 1;
	const colCount = columnsFlat.length;

	return (
		<Fragment>
			{Array(rowCount)
				.fill('')
				.map((_, index) => (
					<div key={index} style={{ gridRow: `${index + 1}/${index + 2}`, gridColumn: `1/${colCount + 1}`, minHeight: rowHeight }} />
				))}
		</Fragment>
	);
};

export default memo(HeaderHeightRetainer) as typeof HeaderHeightRetainer;
