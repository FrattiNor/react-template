import { notEmpty } from '@pkg/utils/src/empty';
import { useContext2 } from '../Context2';
import styles from './index.module.less';
import classNames from 'classnames';
import { FC } from 'react';

const Head: FC = () => {
    const { virtual, ping, resize, headRef, headPaddingRight, handledColumns } = useContext2();
    const { renderResizeTitle } = resize;
    const { horizontalVirtualItems, horizontalTotalSize, horizontalDistance } = virtual;

    return (
        <div className={styles['head']} ref={headRef}>
            <div className={styles['head-inner']} style={{ width: horizontalTotalSize + headPaddingRight }}>
                <div className={styles['head-row']}>
                    <div className={styles['head-row-inner']} style={{ transform: `translate3d(${horizontalDistance}px, 0, 0)` }}>
                        {horizontalVirtualItems.map((horizontalItem) => {
                            const column = handledColumns[horizontalItem.index];
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

                        {headPaddingRight > 0 && (
                            <div style={{ width: headPaddingRight }} className={classNames(styles['head-cell'], styles['fixed-right'])} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Head;
