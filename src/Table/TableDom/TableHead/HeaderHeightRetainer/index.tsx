import { Fragment, memo } from 'react';

import propsAreEqual, { getInstanceProps } from './propsAreEqual';

import type { TableDataItem } from '../../../TableTypes/type';
import type { TableInstance } from '../../../TableTypes/typeHooks';

export type Props<T extends TableDataItem> = {
	instance: TableInstance<T>;
};

const HeaderHeightRetainer = <T extends TableDataItem>(props: Props<T>) => {
	const { columnGroups, columnsFlat, rowHeight } = getInstanceProps(props);
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

// export default HeaderHeightRetainer;
export default memo(HeaderHeightRetainer, propsAreEqual) as typeof HeaderHeightRetainer;
