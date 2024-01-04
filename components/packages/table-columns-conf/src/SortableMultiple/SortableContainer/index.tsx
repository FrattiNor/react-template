import { useSortable } from '@dnd-kit/sortable';
import { FC, PropsWithChildren } from 'react';
import styles from './index.module.less';
import { CSS } from '@dnd-kit/utilities';
import classNames from 'classnames';

type Props = PropsWithChildren<{
    id: string;
    title?: string;
    isDragOverlay?: boolean;
    containerClassName?: string;
    containerBodyClassName?: string;
    containerTitleClassName?: string;
}>;

const SortableContainer: FC<Props> = (props) => {
    const { children, id, title, isDragOverlay, containerClassName, containerBodyClassName, containerTitleClassName } = props;

    const { attributes, isDragging, listeners, setNodeRef, transition, transform } = useSortable({
        id,
        disabled: true,
        data: { type: 'container' },
    });

    const style = {
        transition,
        transform: CSS.Translate.toString(transform),
    };

    return (
        <div
            style={style}
            ref={setNodeRef}
            className={classNames(styles['container'], containerClassName, { [styles['dragging']]: isDragging, [styles['overlay']]: isDragOverlay })}
        >
            <div className={classNames(styles['title'], containerTitleClassName)} {...listeners} {...attributes}>
                {title || id}
            </div>

            <div className={classNames(styles['body'], containerBodyClassName)}>{children}</div>
        </div>
    );
};

export default SortableContainer;
