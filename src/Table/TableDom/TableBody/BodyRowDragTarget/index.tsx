import { memo } from 'react';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import type { TableDataItem } from '../../../TableTypes/type';

export type Props<T extends TableDataItem> = {
	rowKey: string;
	rowIndex: number;
	rowData: T;
	rowHeight: number;
	colMaxIndex: number;
};

const BodyRowDragTarget = <T extends TableDataItem>({ rowKey, rowData, rowIndex, rowHeight, colMaxIndex }: Props<T>) => {
	const { attributes, setNodeRef, transform, transition, isDragging } = useSortable({ id: rowKey, data: { rowKey, rowData, rowIndex } });

	const _style: React.CSSProperties = {
		transition,
		opacity: isDragging ? 0 : undefined,
		transform: CSS.Translate.toString(transform),
	};

	return (
		<div
			ref={setNodeRef}
			style={{
				zIndex: -1,
				opacity: 0,
				userSelect: 'none',
				pointerEvents: 'none',
				minHeight: rowHeight,
				gridRow: `${rowIndex + 1}/${rowIndex + 2}`,
				gridColumn: `1/${colMaxIndex + 2}`,
				..._style,
			}}
			{...attributes}
		/>
	);
};

export default memo(BodyRowDragTarget);
