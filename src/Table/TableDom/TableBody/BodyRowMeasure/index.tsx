import { memo } from 'react';
import type { TableInstance } from '../../../TableHooks/type';
import type { TableDataItem } from '../../../TableTypes/type';
import propsAreEqual, { getInstanceProps, getProps } from './propsAreEqual';

export type Props<T extends TableDataItem> = {
	instance: TableInstance<T>;
	rowIndex: number;
};

const BodyRowMeasure = <T extends TableDataItem>(props: Props<T>) => {
	const { rowIndex } = getProps(props);
	const { VV_measureElement, columnsFlat } = getInstanceProps(props);
	const colMaxIndex = columnsFlat.length - 1;

	return (
		<div
			data-index={rowIndex}
			ref={VV_measureElement}
			style={{
				zIndex: -1,
				opacity: 0,
				userSelect: 'none',
				pointerEvents: 'none',
				gridRow: `${rowIndex + 1}/${rowIndex + 2}`,
				gridColumn: `1/${colMaxIndex + 2}`,
			}}
		/>
	);
};

export default memo(BodyRowMeasure, propsAreEqual) as typeof BodyRowMeasure;
