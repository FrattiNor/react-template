import Title from '../../generalComponents/title';
import { useEditorContext } from '../../context';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './index.less';
import type { FC } from 'react';

const Layer: FC = () => {
    const { editor } = useEditorContext();
    const [layers, setLayers] = useState<fabric.Object[]>([]);
    const [activeIdMap, setActiveIdMap] = useState<Record<string, boolean>>({});

    useEffect(() => {
        if (editor) {
            editor.eEvent.on('layer:change', (nextLayers: fabric.Object[]) => {
                const _layers = [...nextLayers].filter(({ id }: any) => id !== editor.workspace.id);
                _layers.reverse();
                setLayers(_layers);
            });
            editor.eEvent.on('activeLayer:change', (nextLayers: fabric.Object[]) => {
                const _activeIdMap: Record<string, boolean> = {};
                nextLayers.forEach(({ id }: any) => (_activeIdMap[id] = true));
                setActiveIdMap(_activeIdMap);
            });
        }
    }, [editor]);

    const select = (item: fabric.Object) => {
        if (editor) {
            editor.canvas.setActiveObject(item);
            editor.canvas.renderAll();
        }
    };

    return (
        <div className={styles['wrapper']}>
            <Title>图层</Title>
            <div className={styles['content']}>
                {layers.map((item) => (
                    <div className={classNames(styles['item'], { [styles['active']]: activeIdMap[(item as any).id] })} key={(item as any).id} onClick={() => select(item)}>
                        {(item as any).customType}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Layer;
