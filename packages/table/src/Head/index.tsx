import { notEmpty } from '@pkg/utils/src/empty';
import { useContext2 } from '../Context2';
import styles from './index.module.less';
import classNames from 'classnames';
import { FC } from 'react';

const Head: FC = () => {
    const { virtual, ping, renderResizeTitle, props, headRef, headPaddingRight } = useContext2();
    const { columns } = props;
    const { horizontalVirtualItems, horizontalTotalSize, horizontalDistance, horizontalMeasureElement } = virtual;

    return (
        <div className={styles['head']} ref={headRef}>
            <div className={styles['head-inner']} style={{ width: horizontalTotalSize + headPaddingRight }}>
                <div className={styles['head-row']}>
                    <div className={styles['head-row-inner']} style={{ transform: `translate3d(${horizontalDistance}px, 0, 0)` }}>
                        {horizontalVirtualItems.map((horizontalItem) => {
                            const column = columns[horizontalItem.index];
                            if (column) {
                                const { title, key, width, align, fixed, headFixedStyle, showShadow } = column;
                                const cellValue = notEmpty(title);
                                const cellTitle = typeof cellValue === 'string' || typeof cellValue === 'number' ? `${cellValue}` : '';
                                const pinged = ping[fixed as any];

                                return (
                                    <div
                                        key={key}
                                        title={cellTitle}
                                        ref={horizontalMeasureElement}
                                        data-index={horizontalItem.index}
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
