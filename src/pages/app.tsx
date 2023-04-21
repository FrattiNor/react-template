import { useEffect, useRef } from 'react';
import { fabric } from 'fabric';
import Editor from './editor';
import styles from './app.less';

const App = () => {
    const ref = useRef<Editor | null>(null);

    useEffect(() => {
        const editor = new Editor(document.getElementById('ccc') as HTMLCanvasElement);
        ref.current = editor;

        const rect0 = new fabric.Rect({
            width: 100,
            height: 100,
            left: 20,
            top: 20,
            fill: 'green',
        });

        const rect = new fabric.Rect({
            width: 100,
            height: 100,
            left: 100,
            top: 100,
            fill: 'pink',
        });

        const rect2 = new fabric.Rect({
            width: 200,
            height: 200,
            left: 200,
            top: 200,
            fill: 'red',
        });

        editor.canvas.add(rect0);
        editor.canvas.add(rect);
        editor.canvas.add(rect2);

        return () => {
            editor.destroy();
        };
    }, []);

    const addCircle = () => {
        const circle = new fabric.Circle({
            radius: 100,
            left: Math.random() * 1000,
            top: Math.random() * 1000,
            fill: 'red',
            perPixelTargetFind: true,
        });
        ref.current?.canvas.add(circle);
    };

    const onDragStart: React.DragEventHandler<HTMLDivElement> = (event) => {
        if (ref.current) {
            event.dataTransfer.setDragImage(event.target as Element, 0, 0);
            ref.current.drop.dropItem = new fabric.Rect({
                width: 100,
                height: 100,
                left: 0,
                top: 0,
                fill: 'red',
                perPixelTargetFind: true,
            });
        }
    };

    const onDragEnd = () => {
        if (ref.current) {
            ref.current.drop.dropItem = null;
        }
    };

    return (
        <div className={styles['wrapper']}>
            <div className={styles['top']}></div>
            <div className={styles['content']}>
                <div className={styles['left']}>
                    <div className={styles['box']}>
                        <div className={styles['title']}>
                            <span className={styles['inner']}>元素</span>
                        </div>
                        <div className={styles['content']}>
                            <div className={styles['item']} draggable="true">
                                {}
                            </div>
                            <div className={styles['item']} draggable="true">
                                {}
                            </div>
                            <div className={styles['item']} draggable="true" onDragStart={onDragStart} onDragEnd={onDragEnd} />
                            <div className={styles['item']} onClick={() => addCircle()} />
                        </div>
                    </div>
                </div>
                <div className={styles['center']} id="center">
                    <canvas id="ccc" className={styles['canvas']} />
                </div>
                <div className={styles['right']} />
            </div>
        </div>
    );
};

export default App;
