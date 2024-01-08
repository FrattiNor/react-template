import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import SortableItem from './Item';
import { useState } from 'react';

type Props<T> = {
    items: T[];
    setItems: (v: T[] | ((v: T[]) => T[])) => void;
    onDragEnd?: (e: DragEndEvent, nextItems: T[]) => void;
    renderItem: (v: T, opt: { index: number; sortProps: Record<string, any> }) => JSX.Element;
};

function Sortable<T extends { id: string }>(props: Props<T>) {
    const sensors = useSensors(
        // 增加距离延迟，来可以触发onClick事件
        useSensor(MouseSensor),
        useSensor(TouchSensor),
    );

    const [activeItem, setActiveItem] = useState<T | null>(null);

    const { items, setItems, renderItem, onDragEnd: handleDragEnd } = props;

    const onDragStart = ({ active }: DragStartEvent) => {
        if (active.id) {
            const findItem = items?.find((item) => item.id === active.id);
            if (findItem) {
                setActiveItem(findItem);
                return;
            }
        }
        setActiveItem(null);
    };

    const onDragEnd = (event: DragEndEvent) => {
        setActiveItem(null);
        const { active, over } = event;

        if (over?.id && active.id !== over.id) {
            setItems((_items) => {
                let oldIndex = -1;
                let newIndex = -1;

                for (let i = 0; i < _items.length; i++) {
                    const _item = _items[i];
                    const itemId = _item.id;

                    if (itemId === active.id) {
                        oldIndex = i;
                    }

                    if (itemId === over.id) {
                        newIndex = i;
                    }

                    if (oldIndex >= 0 && newIndex >= 0) {
                        break;
                    }
                }

                let nextItems = [..._items];

                if (oldIndex >= 0 && newIndex >= 0) {
                    nextItems = arrayMove(_items, oldIndex, newIndex);
                }

                if (typeof handleDragEnd === 'function') {
                    handleDragEnd(event, nextItems);
                }

                return nextItems;
            });
        }
    };

    return (
        <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd}>
            <SortableContext items={items} strategy={verticalListSortingStrategy}>
                {items.map((item, index) => (
                    <SortableItem key={item.id} id={item.id} renderItem={(sortProps) => renderItem(item, { index, sortProps })} />
                ))}
            </SortableContext>

            <DragOverlay zIndex={99999}>
                {activeItem && <SortableItem id={activeItem.id} renderItem={(sortProps) => renderItem(activeItem, { index: -1, sortProps })} />}
            </DragOverlay>
        </DndContext>
    );
}

export default Sortable;
