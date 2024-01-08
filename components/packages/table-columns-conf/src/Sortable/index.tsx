import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Fragment, useState } from 'react';
import SortableItem from './Item';

type Props<T> = {
    items: T[];
    setItems: (v: T[] | ((v: T[]) => T[])) => void;
    onDragEnd?: (e: DragEndEvent, nextItems: T[]) => void;
    renderItem: (
        v: T,
        opt: { overlay?: boolean; index?: number; newIndex?: number; sortProps?: Record<string, any>; wrapperProps?: Record<string, any> },
    ) => JSX.Element;
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
                    <SortableItem
                        id={item.id}
                        key={item.id}
                        renderItem={(sortProps, wrapperProps, newIndex) => renderItem(item, { index, newIndex, sortProps, wrapperProps })}
                    />
                ))}
            </SortableContext>

            <DragOverlay zIndex={99999}>{activeItem && <Fragment>{renderItem(activeItem, { overlay: true })}</Fragment>}</DragOverlay>
        </DndContext>
    );
}

export default Sortable;
