import { CSSProperties, FC, PropsWithChildren } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import styles from './index.module.less';
import { CSS } from '@dnd-kit/utilities';
import classNames from 'classnames';

type Props = PropsWithChildren<{ id: string; isDragOverlay?: boolean; itemClassName?: string }>;

const SortableItem: FC<Props> = ({ id, children, isDragOverlay, itemClassName }) => {
    const { attributes, listeners, transform, transition, setNodeRef, isDragging } = useSortable({ id });

    const style: CSSProperties = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    return (
        <div
            style={style}
            {...listeners}
            {...attributes}
            ref={setNodeRef}
            className={classNames(styles['item'], itemClassName, { [styles['dragging']]: isDragging, [styles['overlay']]: isDragOverlay })}
        >
            {children}
        </div>
    );
};

export default SortableItem;
