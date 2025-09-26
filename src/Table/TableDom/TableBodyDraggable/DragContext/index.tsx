import { memo, type PropsWithChildren } from 'react';

import { DndContext, type DragEndEvent, type DragStartEvent } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

import propsAreEqual, { getInstanceProps } from './propsAreEqual';

import type { TableDataItem } from '../../../TableTypes/type';
import type { TableInstance } from '../../../TableTypes/typeHooks';

export type Props<T extends TableDataItem> = PropsWithChildren<{
	instance: TableInstance<T>;
}>;

const DragContext = <T extends TableDataItem>(props: Props<T>) => {
	const { children } = props;
	const { dataKeys, haveDraggable, setDragActiveItem, onDragEnd: dragEndCallback } = getInstanceProps(props);
	if (!haveDraggable) return children;

	const onDragStart = ({ active }: DragStartEvent) => {
		const rowKey = (active.data.current as any).rowKey;
		const rowData = (active.data.current as any).rowData;
		const rowIndex = (active.data.current as any).rowIndex;
		if (active.id) {
			setDragActiveItem({ rowData, rowIndex, rowKey });
		} else {
			setDragActiveItem(null);
		}
	};

	const onDragEnd = (event: DragEndEvent) => {
		setDragActiveItem(null);
		const { active, over } = event;
		const overId = over?.id as string;
		const activeId = active.id as string;
		if (typeof dragEndCallback === 'function' && overId && activeId && overId !== activeId) {
			dragEndCallback({ activeId, overId, arrayMove });
		}
	};

	return (
		<DndContext
			onDragEnd={onDragEnd}
			onDragStart={onDragStart}
			modifiers={[restrictToVerticalAxis]}
			autoScroll={{ enabled: true, threshold: { x: 0, y: 0.1 }, acceleration: 20 }}
		>
			<SortableContext items={dataKeys} strategy={verticalListSortingStrategy}>
				{children}
			</SortableContext>
		</DndContext>
	);
};

export default memo(DragContext, propsAreEqual) as typeof DragContext;
