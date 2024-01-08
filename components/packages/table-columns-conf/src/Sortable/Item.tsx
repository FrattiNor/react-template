import { useSortable } from '@dnd-kit/sortable';
import { CSSProperties, Fragment } from 'react';
import { CSS } from '@dnd-kit/utilities';

type Props = {
    id: number | string;
    renderItem: (sortProps: Record<string, any>, wrapperProps: Record<string, any>, newIndex: number) => JSX.Element;
};

const SortableItem = ({ id, renderItem }: Props) => {
    const data = useSortable({ id });
    const { attributes, listeners, transform, transition, setNodeRef, isDragging, newIndex } = data;

    const style: CSSProperties = {
        transform: CSS.Transform.toString(transform),
        opacity: isDragging ? 0.5 : 1,
        transition,
    };

    return <Fragment>{renderItem({ ...attributes, ...listeners }, { ref: setNodeRef, style }, newIndex)}</Fragment>;
};

export default SortableItem;
