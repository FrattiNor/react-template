import { useEffect, useRef } from 'react';
import Editor from './editor';
import styles from './app.less';

const App = () => {
    const ref = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (ref.current) {
            const editor = new Editor(ref.current);

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
                    <div className={styles['title']}>元素</div>
                    <div className={styles['content']}>
                        <div className={styles['item']}>{}</div>
                        <div className={styles['item']}>{}</div>
                        <div className={styles['item']} />
                        <div className={styles['item']} />
                    </div>
                </div>
            </div>
            <div className={styles['center']}>
                <canvas id="c" className={styles['canvas']} ref={ref} />
            </div>
            <div className={styles['right']} />
        </div>
    );
};

export default App;
