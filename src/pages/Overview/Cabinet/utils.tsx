import { CardDetail } from '@/services/cabinet';
import classNames from 'classnames';
import { useRef, useState, useLayoutEffect, useCallback, CSSProperties, useMemo, useEffect } from 'react';
import styles from './index.module.less';

export const useCabinetStyle = () => {
    const cabinetRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);

    useLayoutEffect(() => {
        if (cabinetRef.current) setWidth(cabinetRef.current.clientHeight / 2.285);
    }, []);

    const cabinetStyle = { width };

    return { cabinetRef, cabinetStyle };
};

export const useControlStyle = () => {
    const controlRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);

    useLayoutEffect(() => {
        if (controlRef.current) setWidth(controlRef.current.clientHeight / 2);
    }, []);

    const controlStyle = { width };

    return { controlRef, controlStyle };
};

export const useConnectStyle = () => {
    const connectRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);

    useLayoutEffect(() => {
        if (connectRef.current) setWidth(connectRef.current.clientHeight / 2);
    }, []);

    const connectStyle = { width };

    return { connectRef, connectStyle };
};

export const useIoStyle = () => {
    const ioRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);

    useLayoutEffect(() => {
        if (ioRef.current) setWidth(ioRef.current.clientHeight / 2);
    }, []);

    const ioStyle = { width };

    return { ioRef, ioStyle };
};

export const usePowerStyle = () => {
    const powerRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);

    useLayoutEffect(() => {
        if (powerRef.current) setWidth(powerRef.current.clientHeight / 2);
    }, []);

    const powerStyle = { width };

    return { powerRef, powerStyle };
};

export const useStyle = () => {
    const { cabinetRef, cabinetStyle } = useCabinetStyle();
    const { controlRef, controlStyle } = useControlStyle();
    const { connectRef, connectStyle } = useConnectStyle();
    const { powerRef, powerStyle } = usePowerStyle();
    const { ioRef, ioStyle } = useIoStyle();

    const cabinetDemo = (
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
    );

    return { cabinetDemo, cabinetStyle, controlStyle, connectStyle, powerStyle, ioStyle };
};

const getIoCardsMap = (ioCards?: (CardDetail | null)[]) => {
    const ioCardsObj: Record<string, CardDetail> = {};

    ioCards?.forEach((item) => {
        if (item) ioCardsObj[`${item.rackAddr}-${item.cardAddr}`] = item;
    });

    return ioCardsObj;
};

export const useIoCards = (
    ioCards: undefined | (CardDetail | null)[],
    ioStyle: CSSProperties,
    activeId: string,
    clickItem: (v: CardDetail) => void,
) => {
    const ioCardsMap = useMemo(() => getIoCardsMap(ioCards), [ioCards]);

    const renderIoCard = useCallback(
        (rackAddr: number) =>
            [0, 1, 2, 3, 4, 5, 6, 7].map((currentAddr) => {
                const left = ioCardsMap[`${rackAddr}-${currentAddr * 2}`];
                const right = ioCardsMap[`${rackAddr}-${currentAddr * 2 + 1}`];
                const circle = left?.redun === 1 && right?.redun === 1;

                return (
                    <div key={currentAddr} className={classNames(styles['line'], { [styles['circle']]: circle })}>
                        {[left, right].map((item, i) =>
                            item ? (
                                <div
                                    key={i}
                                    style={ioStyle}
                                    onClick={() => clickItem(item)}
                                    className={classNames(styles['io'], {
                                        [styles['error']]: item.status !== 0,
                                        [styles['active']]: activeId === item.cardId,
                                    })}
                                />
                            ) : (
                                <div key={i} style={ioStyle} className={styles['empty-io']} />
                            ),
                        )}
                    </div>
                );
            }),
        [ioCardsMap, activeId],
    );

    return { renderIoCard };
};

export const useControlCards = (
    controlCards: undefined | CardDetail[],
    controlStyle: CSSProperties,
    activeId: string,
    clickItem: (v: CardDetail) => void,
) => {
    const renderControlCard = useCallback(
        (currentPos: number) => {
            return controlCards?.map((item, index) => {
                const { pos, status, cardId } = item;
                if (pos === currentPos) {
                    return (
                        <div
                            key={index}
                            style={controlStyle}
                            onClick={() => clickItem(item)}
                            className={classNames(styles['control'], {
                                [styles['error']]: status !== 0,
                                [styles['active']]: activeId === cardId,
                            })}
                        />
                    );
                }
            });
        },
        [activeId, controlCards],
    );

    return { renderControlCard };
};

export const useConnectCards = (
    connectCards: undefined | CardDetail[],
    connectStyle: CSSProperties,
    activeId: string,
    clickItem: (v: CardDetail) => void,
) => {
    const renderConnectCard = useCallback(
        (currentPos: number) => {
            return connectCards?.map((item, index) => {
                const { pos, status, cardId } = item;
                if (pos === currentPos) {
                    return (
                        <div
                            key={index}
                            style={connectStyle}
                            onClick={() => clickItem(item)}
                            className={classNames(styles['connect'], {
                                [styles['error']]: status !== 0,
                                [styles['active']]: activeId === cardId,
                            })}
                        />
                    );
                }
            });
        },
        [activeId, connectCards],
    );

    return { renderConnectCard };
};

export const useDefaultItem = (ioCards: undefined | (CardDetail | null)[], clickItem: (v: CardDetail) => void) => {
    useEffect(() => {
        const io = ioCards;
        if (Array.isArray(io) && io.length > 0) {
            io.some((item) => {
                if (item) {
                    clickItem(item);
                    return true;
                }
                return false;
            });
        }
    }, [ioCards]);
};
