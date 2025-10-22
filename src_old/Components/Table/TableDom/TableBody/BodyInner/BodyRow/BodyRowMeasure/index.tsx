import { memo } from 'react';

export type Props = {
	rowIndex: number;
	VV_measureElement: (node: Element | null | undefined) => void;
	colMaxIndex: number;
	rowHeight: number;
};

const BodyRowMeasure = ({ rowHeight, rowIndex, VV_measureElement, colMaxIndex }: Props) => {
	return (
		<div
			data-index={rowIndex}
			ref={VV_measureElement}
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

export default memo(BodyRowMeasure);
