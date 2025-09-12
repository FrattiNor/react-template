import type { FC } from 'react';
import { useTableContext } from '../../../TableContext';

type Props = {
	rowIndex: number;
};

const BodyRowMeasure: FC<Props> = ({ rowIndex }) => {
	const { tableVirtual, tableProps } = useTableContext();
	const colMaxIndex = tableProps.columnsFlat.length - 1;
	return (
		<div
			data-index={rowIndex}
			ref={tableVirtual.VV.measureElement}
			style={{ pointerEvents: 'none', userSelect: 'none', zIndex: -1, opacity: 0, gridRow: `${rowIndex + 1}/${rowIndex + 2}`, gridColumn: `1/${colMaxIndex + 2}` }}
		/>
	);
};

export default BodyRowMeasure;
