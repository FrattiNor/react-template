import type { TableInstance } from '../../../TableHooks/type';
import type { TableDataItem } from '../../../TableTypes/type';

type Props<T extends TableDataItem> = {
	instance: TableInstance<T>;
	rowIndex: number;
};

const BodyRowMeasure = <T extends TableDataItem>({ instance, rowIndex }: Props<T>) => {
	const { VV } = instance.tableVirtual;
	const { columnsFlat } = instance.tableProps;
	const colMaxIndex = columnsFlat.length - 1;

	return (
		<div
			data-index={rowIndex}
			ref={VV.measureElement}
			style={{ pointerEvents: 'none', userSelect: 'none', zIndex: -1, opacity: 0, gridRow: `${rowIndex + 1}/${rowIndex + 2}`, gridColumn: `1/${colMaxIndex + 2}` }}
		/>
	);
};

export default BodyRowMeasure;
