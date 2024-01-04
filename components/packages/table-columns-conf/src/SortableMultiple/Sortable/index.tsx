import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { Dispatch, SetStateAction } from 'react';
import styles from './index.module.less';
import classNames from 'classnames';
import useDrag from './useDrag';

export type RenderOpt = { containerId: string; index: number };

export type Props<T> = {
    itemClassName?: string;
    wrapperClassName?: string;
    containerClassName?: string;
    containerBodyClassName?: string;
    containerTitleClassName?: string;

    data: Record<string, T[]>;
    titleMap?: Record<string, string>;
    setData: Dispatch<SetStateAction<Record<string, T[]>>>;
    renderItem: (v: T, opt: RenderOpt) => JSX.Element;
};

const Sortable = <T extends { id: string }>(props: Props<T>) => {
    const { data, titleMap, wrapperClassName } = props;
    const { renderSortableItem, renderSortableContainer, containers, onDragOver, onDragEnd, onDragStart, activeItem, activeContainer, sensors } =
        useDrag(props);

    return (
        <DndContext sensors={sensors} onDragStart={onDragStart} onDragOver={onDragOver} onDragEnd={onDragEnd}>
            <div
                className={classNames(styles['wrapper'], wrapperClassName)}
                style={{ gridTemplateColumns: `repeat(${containers.length}, minmax(10px, 1fr))` }}
            >
                <SortableContext items={containers} strategy={horizontalListSortingStrategy}>
                    {Object.entries(data).map(([containerId, items]) =>
                        renderSortableContainer({
                            items,
                            containerId,
                            title: titleMap?.[containerId],
                        }),
                    )}
                </SortableContext>
            </div>

            <DragOverlay zIndex={99999}>
                {activeContainer &&
                    renderSortableContainer({
                        isDragOverlay: true,
                        items: data[activeContainer],
                        containerId: activeContainer,
                        title: titleMap?.[activeContainer],
                    })}

                {activeItem &&
                    renderSortableItem({
                        opt: {} as any,
                        item: activeItem,
                        isDragOverlay: true,
                    })}
            </DragOverlay>
        </DndContext>
    );
};

export default Sortable;
