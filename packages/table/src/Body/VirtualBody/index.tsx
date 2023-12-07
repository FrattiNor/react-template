import { notEmpty } from '@pkg/utils/src/empty';
import { useContext2 } from '../../Context2';
import styles from './index.module.less';
import classNames from 'classnames';
import { FC } from 'react';

const VirtualBody: FC = () => {
    const { virtual, ping, props, handledColumns } = useContext2();
    const { dataSource, rowKey } = props;
    const { verticalVirtualItems, verticalTotalSize, verticalDistance, verticalMeasureElement } = virtual;
    const { horizontalVirtualItems, horizontalTotalSize, horizontalDistance } = virtual;

    return (
        <div className={styles['virtual-body']} style={{ height: verticalTotalSize, width: horizontalTotalSize }}>
            <div className={styles['virtual-body-inner']} style={{ transform: `translate3d(0, ${verticalDistance}px, 0)` }}>
                {verticalVirtualItems.map((verticalItem) => {
                    const rowData = dataSource?.[verticalItem.index];

                    if (rowData) {
                        return (
                            <div key={rowData[rowKey]} ref={verticalMeasureElement} className={styles['body-row']} data-index={verticalItem.index}>
                                <div className={styles['body-row-inner']} style={{ transform: `translate3d(${horizontalDistance}px, 0, 0)` }}>
                                    {horizontalVirtualItems.map((horizontalItem) => {
                                        const column = handledColumns[horizontalItem.index];
                                        if (column) {
                                            const { key, render, width, align, fixed, fixedStyle, showShadow } = column;
                                            const cellValue = notEmpty(render ? render(rowData) : rowData[key]);
                                            const cellTitle = typeof cellValue === 'string' || typeof cellValue === 'number' ? `${cellValue}` : '';
                                            const pinged = ping[fixed as any];

                                            return (
                                                <div
                                                    key={key}
                                                    title={cellTitle}
                                                    style={{ width: width, textAlign: align, ...(fixedStyle ?? {}) }}
                                                    className={classNames(styles['body-cell'], {
                                                        [styles[`fixed-${fixed}`]]: !!fixed,
                                                        [styles[`shadow`]]: showShadow,
                                                        [styles[`pinged`]]: pinged,
                                                    })}
                                                >
                                                    <div className={styles['body-cell-inner']}>{cellValue}</div>
                                                </div>
                                            );
                                        }
                                    })}
                                </div>
                            </div>
                        );
                    }
                })}
            </div>
        </div>
    );
};

export default VirtualBody;
