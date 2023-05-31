import {
    useCabinetStyle,
    useConnectCards,
    useConnectStyle,
    useControlCards,
    useControlStyle,
    useDefaultItem,
    useIoCards,
    useIoStyle,
    usePowerStyle,
} from './utils';
import { useECS700Detail } from '@/services/cabinet';
import { FC, useCallback, useState } from 'react';
import styles from './index.module.less';
import classNames from 'classnames';

type Props = {
    id: string;
    system: string;
};

const Cabinet: FC<Props> = ({ id, system }) => {
    const { cabinetRef, cabinetStyle } = useCabinetStyle();
    const { controlRef, controlStyle } = useControlStyle();
    const { connectRef, connectStyle } = useConnectStyle();
    const { powerRef, powerStyle } = usePowerStyle();
    const { ioRef, ioStyle } = useIoStyle();

    const { data } = useECS700Detail(id);
    const [_title, setTitle] = useState('');
    const [activeId, setActiveId] = useState('');

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
            <div ref={cabinetRef} className={classNames(styles['cabinet'], styles['hidden'])}>
                <div className={styles['top']}>
                    <div ref={controlRef} className={styles['control']} />
                    <div ref={connectRef} className={styles['connect']} />
                </div>
                <div className={styles['middle-left']}>
                    <div className={styles['line']}>
                        <div ref={ioRef} className={styles['io']} />
                    </div>
                </div>
                <div className={styles['bottom']}>
                    <div ref={powerRef} className={styles['power']} />
                </div>
            </div>

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
        </div>
    );
};

export default Cabinet;
