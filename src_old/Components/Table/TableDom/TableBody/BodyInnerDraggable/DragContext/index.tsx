import { memo, type PropsWithChildren } from 'react';

import { DndContext, type DragEndEvent, type DragStartEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

import DragOverlay from './DragOverlay';
import { customModifier } from './modifier';
import propsAreEqual, { getInstanceProps } from './propsAreEqual';

import type { TableDataItem, TableInstance } from '../../../../TableTypes/type';

export type Props<T extends TableDataItem> = PropsWithChildren<{
	instance: TableInstance<T>;
}>;

const DragContext = <T extends TableDataItem>(props: Props<T>) => {
	const { children } = props;
	const { dataKeys, haveDraggable, setDragActiveItem, onDragEnd: dragEndCallback, bodyRef } = getInstanceProps(props);
	if (!haveDraggable) return children;

	const onDragStart = ({ active }: DragStartEvent) => {
		const rowIndex = (active.data.current as any).rowIndex;
		if (active.id && typeof rowIndex === 'number') {
			setDragActiveItem({ rowIndex });
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
			modifiers={[customModifier({ bodyRef })]}
			autoScroll={{ enabled: true, threshold: { x: -1, y: 0.1 }, acceleration: 20 }}
		>
			<SortableContext items={dataKeys} strategy={verticalListSortingStrategy}>
				{children}
				<DragOverlay instance={props.instance} />
			</SortableContext>
		</DndContext>
	);
};

export default memo(DragContext, propsAreEqual) as typeof DragContext;
