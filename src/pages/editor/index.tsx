import { EditorContextProvider } from './context';
import { useEffect, useState } from 'react';
import Element from './components/element';
import Layer from './components/layer';
import styles from './index.less';
import { fabric } from 'fabric';
import Editor from './core';

const App = () => {
    const [editor, setEditor] = useState<Editor | null>(null);

    useEffect(() => {
        const canvas = document.getElementById('ccc') as HTMLCanvasElement;
        const _editor = new Editor(canvas);
        setEditor(_editor);

        return () => {
            _editor.destroy();
            setEditor(null);
        };
    }, []);

    useEffect(() => {
        if (editor) {
            const rect0 = new fabric.Rect({
                // @ts-ignore
                id: editor.id(),
                customType: 'Rect1',
                height: 100,
                width: 100,
                left: 20,
                top: 20,
                fill: 'green',
            });

            const rect = new fabric.Rect({
                // @ts-ignore
                id: editor.id(),
                customType: 'Rect2',
                width: 100,
                height: 100,
                left: 100,
                top: 100,
                fill: 'pink',
            });

            const rect2 = new fabric.Rect({
                // @ts-ignore
                id: editor.id(),
                customType: 'Rect3',
                width: 200,
                height: 200,
                left: 200,
                top: 200,
                fill: 'red',
            });

            editor.canvas.add(rect);
            editor.canvas.add(rect0);
            editor.canvas.add(rect2);
        }
    }, [editor]);

    return (
        <EditorContextProvider editor={editor}>
            <div className={styles['wrapper']}>
                <div className={styles['top']} />
                <div className={styles['content']}>
                    <div className={styles['left']}>
                        <Element />
                    </div>
                    <div className={styles['center']} id="center">
                        <canvas id="ccc" className={styles['canvas']} />
                    </div>
                    <div className={styles['right']}>
                        <Layer />
                    </div>
                </div>
            </div>
        </EditorContextProvider>
    );
};

export default App;
