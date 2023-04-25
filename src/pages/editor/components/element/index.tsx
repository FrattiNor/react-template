import { Circle, Rect, Triangle, Ellipse, Polygon } from './svgs';
import Title from '../../generalComponents/title';
import { useEditorContext } from '../../context';
import styles from './index.less';
import type { FC } from 'react';
import { fabric } from 'fabric';

const Element: FC = () => {
    const { editor } = useEditorContext();

    const onDragStart: React.DragEventHandler<HTMLDivElement> = (event) => {
        if (editor) {
            const target = (event.target as HTMLDivElement).children[0];
            if (target) {
                event.dataTransfer.setDragImage(target, 0, 0);
                editor.drop.setDropItem(
                    new fabric.Rect({
                        // @ts-ignore
                        id: editor.id(),
                        customType: 'Rect',
                        width: 100,
                        height: 100,
                        left: 0,
                        top: 0,
                        fill: 'red',
                        perPixelTargetFind: true,
                    }),
                );
            }
        }
    };

    const onDragEnd = () => {
        if (editor) {
            editor.drop.setDropItem(null);
        }
    };

    return (
        <div className={styles['wrapper']}>
            <Title>元素</Title>
            <div className={styles['content']}>
                <div className={styles['item']} draggable="true" onDragStart={onDragStart} onDragEnd={onDragEnd}>
                    <div className={styles['inner']}>
                        <Rect />
                    </div>
                </div>
                <div className={styles['item']} draggable="true" onDragStart={onDragStart} onDragEnd={onDragEnd}>
                    <div className={styles['inner']}>
                        <Circle />
                    </div>
                </div>
                <div className={styles['item']} draggable="true" onDragStart={onDragStart} onDragEnd={onDragEnd}>
                    <div className={styles['inner']}>
                        <Ellipse />
                    </div>
                </div>
                <div className={styles['item']} draggable="true" onDragStart={onDragStart} onDragEnd={onDragEnd}>
                    <div className={styles['inner']}>
                        <Triangle />
                    </div>
                </div>
                <div className={styles['item']} draggable="true" onDragStart={onDragStart} onDragEnd={onDragEnd}>
                    <div className={styles['inner']}>
                        <Polygon />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Element;
