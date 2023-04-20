import { useEffect, useRef } from 'react';
import { fabric } from 'fabric';
import Editor from './editor';
import styles from './app.less';

const App = () => {
    const ref = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (ref.current) {
            const editor = new Editor(ref.current);

            const rect0 = new fabric.Rect({
                width: 100,
                height: 100,
                left: 0,
                top: 0,
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

            editor.canvas.add(rect0, rect, rect2);

            return () => {
                editor.destroy();
            };
        }

        return () => {};
    }, []);

    return (
        <div className={styles['wrapper']}>
            <div className={styles['left']}>
                <div className={styles['box']}>
                    <div className={styles['title']}>
                        <span className={styles['inner']}>元素</span>
                    </div>
                    <div className={styles['content']}>
                        <div className={styles['item']}>{}</div>
                        <div className={styles['item']}>{}</div>
                        <div className={styles['item']} />
                        <div className={styles['item']} />
                    </div>
                </div>
            </div>
            <div className={styles['center']} id="center">
                <canvas id="c" className={styles['canvas']} ref={ref} />
            </div>
            <div className={styles['right']} />
        </div>
    );
};

export default App;
