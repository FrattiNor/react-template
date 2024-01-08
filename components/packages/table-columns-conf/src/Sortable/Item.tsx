import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { CSSProperties } from 'react';

type Props = {
    id: number | string;
    renderItem: (sortProps: Record<string, any>) => JSX.Element;
};

const SortableItem = ({ id, renderItem }: Props) => {
    const { attributes, listeners, transform, transition, setNodeRef, isDragging } = useSortable({ id });

    const style: CSSProperties = {
        transform: CSS.Transform.toString(transform),
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 2 : 1,
        position: 'relative',
        transition,
    };

    return (
        <div ref={setNodeRef} style={style}>
            {renderItem({ ...attributes, ...listeners })}
        </div>
    );
};

export default SortableItem;
