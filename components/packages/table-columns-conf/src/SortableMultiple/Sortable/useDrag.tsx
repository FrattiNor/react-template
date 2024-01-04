import { useSensors, useSensor, MouseSensor, TouchSensor, DragStartEvent, DragEndEvent, DragOverEvent } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import SortableContainer from '../SortableContainer';
import { Props, RenderOpt } from './index';
import SortableItem from '../SortableItem';
import { useState } from 'react';

type RenderSortableItemProps<T> = { item: T; opt: RenderOpt; isDragOverlay?: boolean };

type RenderSortableContainerProps<T> = { containerId: string; items: T[]; title?: string; isDragOverlay?: boolean };

const useDrag = <T extends { id: string }>(props: Props<T>) => {
    // 增加距离延迟，来可以触发onClick事件
    const sensors = useSensors(
        useSensor(MouseSensor, { activationConstraint: { distance: 1 } }),
        useSensor(TouchSensor, { activationConstraint: { distance: 1 } }),
    );

    const { data, setData, renderItem, containerBodyClassName, containerClassName, containerTitleClassName, itemClassName } = props;

    const [activeItem, setActiveItem] = useState<T | null>(null);

    const [activeContainer, setActiveContainer] = useState<string | null>(null);

    const onDragStart = ({ active }: DragStartEvent) => {
        const isContainer = active?.data?.current?.type === 'container';

        if (isContainer) {
            const containerId = active?.id;
            if (containerId) {
                setActiveItem(null);
                setActiveContainer(containerId as string);
                return;
            }
        } else {
            const id = active?.id;
            const containerId = active?.data?.current?.sortable?.containerId;
            if (id && containerId) {
                const findItem = data[containerId]?.find((item) => item.id === id);
                if (findItem) {
                    setActiveItem(findItem);
                    setActiveContainer(null);
                    return;
                }
            }
        }

        setActiveItem(null);
        setActiveContainer(null);
    };

    const onDragEnd = (event: DragEndEvent) => {
        setActiveItem(null);
        setActiveContainer(null);
        const { over, active } = event;
        const overId = over?.id;
        const activeId = active?.id;
        const overIsContainer = over?.data?.current?.type === 'container';
        const activeIsContainer = active?.data?.current?.type === 'container';

        if (overId && overId !== activeId) {
            if (overIsContainer && activeIsContainer) {
                setData((oldData) => {
                    const containers = Object.keys(oldData);
                    const overIndex = containers.indexOf(overId as string);
                    const activeIndex = containers.indexOf(activeId as string);
                    const newContainers = arrayMove(containers, activeIndex, overIndex);
                    const newData: Record<string, T[]> = {};
                    newContainers.forEach((containerId) => {
                        newData[containerId] = oldData[containerId];
                    });
                    return { ...newData };
                });
            }
            if (!overIsContainer && !activeIsContainer) {
                const overContainerId = overIsContainer ? overId : over?.data?.current?.sortable?.containerId;
                const activeContainerId = activeIsContainer ? activeId : active?.data?.current?.sortable?.containerId;
                if (overContainerId === activeContainerId) {
                    setData((oldData) => {
                        const items = oldData[activeContainerId];

                        let oldIndex = -1;
                        let newIndex = -1;

                        for (let i = 0; i < items.length; i++) {
                            const item = items[i];
                            const itemId = item.id;

                            if (itemId === activeId) {
                                oldIndex = i;
                            }

                            if (itemId === overId) {
                                newIndex = i;
                            }

                            if (oldIndex >= 0 && newIndex >= 0) {
                                break;
                            }
                        }

                        let nextItems = [...items];

                        if (oldIndex >= 0 && newIndex >= 0) {
                            nextItems = arrayMove(items, oldIndex, newIndex);
                        }

                        return { ...oldData, [activeContainerId]: nextItems };
                    });
                }
            }
        }
    };

    const onDragOver = (event: DragOverEvent) => {
        const { over, active } = event;
        const overId = over?.id;
        const activeId = active?.id;
        const overIsContainer = over?.data?.current?.type === 'container';
        const activeIsContainer = active?.data?.current?.type === 'container';

        // 无覆盖
        if (overId === null) {
            return;
        }

        // 容器活动
        if (activeIsContainer) {
            return;
        }

        const overContainerId = overIsContainer ? overId : over?.data?.current?.sortable?.containerId;
        const activeContainerId = activeIsContainer ? activeId : active?.data?.current?.sortable?.containerId;

        if (!overContainerId || !activeContainerId) {
            return;
        }

        if (overContainerId !== activeContainerId) {
            setData((oldData) => {
                const overItems = oldData[overContainerId];
                const activeItems = oldData[activeContainerId];
                const overIndex = overItems.findIndex((item) => item.id === overId);
                const activeIndex = activeItems.findIndex((item) => item.id === activeId);
                let newIndex: number;
                if (overIsContainer) {
                    newIndex = overItems.length + 1;
                } else {
                    const isBelowOverItem =
                        over && active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.height;
                    const modifier = isBelowOverItem ? 1 : 0;
                    newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
                }
                return {
                    ...oldData,
                    [activeContainerId]: oldData[activeContainerId].filter((item) => item.id !== activeId),
                    [overContainerId]: [
                        ...oldData[overContainerId].slice(0, newIndex),
                        oldData[activeContainerId][activeIndex],
                        ...oldData[overContainerId].slice(newIndex, oldData[overContainerId].length),
                    ],
                };
            });
        }
    };

    const renderSortableItem = ({ item, opt, isDragOverlay }: RenderSortableItemProps<T>) => {
        return (
            <SortableItem key={item.id} id={item.id} isDragOverlay={isDragOverlay} itemClassName={itemClassName}>
                {renderItem(item, opt)}
            </SortableItem>
        );
    };

    const renderSortableContainer = ({ containerId, items, title, isDragOverlay }: RenderSortableContainerProps<T>) => {
        return (
            <SortableContainer
                title={title}
                id={containerId}
                key={containerId}
                isDragOverlay={isDragOverlay}
                containerClassName={containerClassName}
                containerBodyClassName={containerBodyClassName}
                containerTitleClassName={containerTitleClassName}
            >
                <SortableContext items={items} id={containerId} strategy={verticalListSortingStrategy}>
                    {items.map((item, index) => renderSortableItem({ item, opt: { containerId, index } }))}
                </SortableContext>
            </SortableContainer>
        );
    };

    const containers = Object.keys(data);

    return { renderSortableItem, renderSortableContainer, containers, onDragOver, onDragEnd, onDragStart, activeItem, activeContainer, sensors };
};

export default useDrag;
