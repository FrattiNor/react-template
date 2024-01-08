import { CSSProperties, FC, PropsWithChildren } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type Props = PropsWithChildren<{ id: number | string }>;

const SortableItem: FC<Props> = ({ id, children }) => {
    const { attributes, listeners, transform, transition, setNodeRef, isDragging } = useSortable({ id });

    const style: CSSProperties = {
        transform: CSS.Transform.toString(transform),
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 2 : 1,
        position: 'relative',
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            {children}
        </div>
    );
};

export default SortableItem;
