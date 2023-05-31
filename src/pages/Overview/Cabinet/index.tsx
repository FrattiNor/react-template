import { useConnectCards, useControlCards, useDefaultItem, useIoCards, useStyle } from './utils';
import { useECS700Detail } from '@/services/cabinet';
import { FC, useCallback, useState } from 'react';
import styles from './index.module.less';
import Info from './Info';

type Props = {
    id: string;
    system: string;
};

const Cabinet: FC<Props> = ({ id, system }) => {
    const { data } = useECS700Detail(id);
    const [title, setTitle] = useState('');
    const [activeId, setActiveId] = useState('');
    const { cabinetDemo, cabinetStyle, controlStyle, connectStyle, powerStyle, ioStyle } = useStyle();

    const clickItem = useCallback(({ cardId, address, model }: { cardId: string; address: string; model: string }) => {
        setActiveId(cardId);
        setTitle(`${model}（${address}）`);
    }, []);

    useDefaultItem(data?.ioCards, clickItem);
    const { renderIoCard } = useIoCards(data?.ioCards, ioStyle, activeId, clickItem);
    const { renderControlCard } = useControlCards(data?.controlCards, controlStyle, activeId, clickItem);
    const { renderConnectCard } = useConnectCards(data?.ioConnectCards, connectStyle, activeId, clickItem);

    if (system !== 'ECS-700') return null;

    return (
        <div className={styles['wrapper']}>
            {[1, 2].map((currentPos) => (
                <div key={currentPos} className={styles['cabinet']} style={cabinetStyle}>
                    <div className={styles['top']}>
                        {renderControlCard(currentPos)}
                        {renderConnectCard(currentPos)}
                    </div>

                    <div className={styles['middle-left']}>{renderIoCard((currentPos - 1) * 2)}</div>

                    <div className={styles['middle-right']}>{renderIoCard((currentPos - 1) * 2 + 1)}</div>

                    <div className={styles['bottom']}>
                        {data?.powerCards.map((item, index) => {
                            const { pos } = item;
                            if (pos === currentPos) {
                                return <div key={index} onClick={() => clickItem(item)} style={powerStyle} className={styles['power']} />;
                            }
                        })}
                    </div>
                </div>
            ))}

            {cabinetDemo}

            <Info activeId={activeId} title={title} />
        </div>
    );
};

export default Cabinet;
