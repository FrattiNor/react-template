import { notEmpty } from '@pkg/utils/src/empty';
import { useContext2 } from '../../Context2';
import styles from './index.module.less';
import classNames from 'classnames';
import { FC } from 'react';

const VirtualBody: FC = () => {
    const { virtual, hiddenFixed, scroll, props, handledColumns } = useContext2();
    const { ping } = scroll;
    const { dataSource, rowKey } = props;
    const { horizontalVirtualItems, horizontalTotalSize, horizontalDistance } = virtual;
    const { verticalVirtualItems, verticalTotalSize, verticalDistance, verticalMeasureElement } = virtual;
    const { hiddenFixedHandledLeftColumns, hiddenFixedHandledRightColumns, hiddenFixedTotalSize } = hiddenFixed;
    const renderItems = [...hiddenFixedHandledLeftColumns, ...horizontalVirtualItems, ...hiddenFixedHandledRightColumns];

    return (
        <div className={styles['virtual-body']} style={{ height: verticalTotalSize, width: horizontalTotalSize }}>
            <div className={styles['virtual-body-inner']} style={{ transform: `translate3d(0, ${verticalDistance}px, 0)` }}>
                {verticalVirtualItems.map((verticalItem) => {
                    const rowData = dataSource?.[verticalItem.index];

                    if (rowData) {
                        return (
                            <div key={rowData[rowKey]} ref={verticalMeasureElement} className={styles['body-row']} data-index={verticalItem.index}>
                                <div
                                    className={styles['body-row-inner']}
                                    style={{ transform: `translate3d(0, 0, 0)`, paddingLeft: `${horizontalDistance - hiddenFixedTotalSize}px` }}
                                >
                                    {renderItems.map((item) => {
                                        const column = handledColumns[item.index];
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
