import { memo } from 'react';

import propsAreEqual, { getInstanceProps, getProps } from './propsAreEqual';

import type { TableDataItem, TableInstance } from '../../../TableTypes/type';

export type Props<T extends TableDataItem> = {
	instance: TableInstance<T>;
	rowIndex: number;
};

const HeaderHeightRetainer = <T extends TableDataItem>(props: Props<T>) => {
	const { rowIndex } = getProps(props);
	const { colMaxIndex, rowHeight } = getInstanceProps(props);

	return (
		<div
			style={{
				zIndex: -1,
				opacity: 0,
				userSelect: 'none',
				pointerEvents: 'none',
				minHeight: rowHeight,
				gridRow: `${rowIndex + 1}/${rowIndex + 2}`,
				gridColumn: `1/${colMaxIndex + 2}`,
			}}
		/>
	);
};

export default memo(HeaderHeightRetainer, propsAreEqual) as typeof HeaderHeightRetainer;
