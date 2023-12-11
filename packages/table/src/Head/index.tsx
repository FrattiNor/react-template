import { notEmpty } from '@pkg/utils/src/empty';
import { useContext2 } from '../Context2';
import styles from './index.module.less';
import classNames from 'classnames';
import { FC } from 'react';

const Head: FC = () => {
    const { virtual, columns, resize, headRef, bodyScrollObserver } = useContext2();

    const { renderResizeTitle } = resize;
    const { ping, vScrollBarWidth } = bodyScrollObserver;
    const { horizontalVirtualItems, horizontalTotalSize, horizontalDistance } = virtual;
    const { handledColumns, hiddenFixedHandledLeftColumns, hiddenFixedHandledRightColumns, hiddenFixedTotalSize } = columns;
    const renderItems = [...hiddenFixedHandledLeftColumns, ...horizontalVirtualItems, ...hiddenFixedHandledRightColumns];

    return (
        <div className={styles['head']} ref={headRef}>
            <div className={styles['virtual-head']} style={{ width: horizontalTotalSize + vScrollBarWidth }}>
                <div
                    className={styles['virtual-head-inner']}
                    style={{ transform: `translate3d(0, 0, 0)`, paddingLeft: `${horizontalDistance - hiddenFixedTotalSize}px` }}
                >
                    <div className={styles['head-row']}>
                        {renderItems.map((item) => {
                            const column = handledColumns[item.index];
                            if (column) {
                                const { title, key, width, align, fixed, headFixedStyle, showShadow } = column;
                                const cellValue = notEmpty(title);
                                const cellTitle = typeof cellValue === 'string' || typeof cellValue === 'number' ? `${cellValue}` : '';
                                const pinged = ping[fixed as any];

                                return (
                                    <div
                                        key={key}
                                        title={cellTitle}
                                        style={{ width: width, textAlign: align, ...(headFixedStyle ?? {}) }}
                                        className={classNames(styles['head-cell'], {
                                            [styles[`fixed-${fixed}`]]: !!fixed,
                                            [styles[`shadow`]]: showShadow,
                                            [styles[`pinged`]]: pinged,
                                        })}
                                    >
                                        {renderResizeTitle(key, <div className={styles['head-cell-inner']}>{cellValue}</div>)}
                                    </div>
                                );
                            }
                        })}

                        <div className={styles['head-cell']} style={{ width: 0, flexGrow: 1 }} />

                        {vScrollBarWidth > 0 && (
                            <div style={{ width: vScrollBarWidth }} className={classNames(styles['head-cell'], styles['fixed-right'])} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Head;
