import { useContext2 } from '../../../Context2';
import { notEmpty } from '@pkg/utils/src/empty';
import styles from './index.module.less';
import classNames from 'classnames';
import { FC } from 'react';

const VirtualBody: FC = () => {
    const { virtual, newProps, innerProps } = useContext2();

    const { dataSource, rowKey, rowHeight } = newProps;
    const { ping, resized, selectedRowKeysObj } = innerProps;
    const { horizontalVirtualItems, horizontalTotalSize, horizontalDistance } = virtual;
    const { verticalVirtualItems, verticalTotalSize, verticalDistance, verticalMeasureElement } = virtual;
    const { handledColumns, hiddenFixedHandledLeftColumns, hiddenFixedHandledRightColumns, hiddenFixedTotalSize } = innerProps;
    const renderItems = [...hiddenFixedHandledLeftColumns, ...horizontalVirtualItems, ...hiddenFixedHandledRightColumns];

    return (
        <div className={styles['virtual-body']} style={{ height: verticalTotalSize, width: horizontalTotalSize }}>
            <div
                className={styles['virtual-body-inner']}
                style={{ transform: `translate3d(0, ${verticalDistance}px, 0)`, paddingLeft: `${horizontalDistance - hiddenFixedTotalSize}px` }}
            >
                {verticalVirtualItems.map((verticalItem) => {
                    const currentRowIndex = verticalItem.index;
                    const currentRowData = dataSource?.[currentRowIndex];
                    const currentRowKey = currentRowData[rowKey];

                    if (currentRowData) {
                        return (
                            <div
                                key={currentRowKey}
                                ref={verticalMeasureElement}
                                data-index={verticalItem.index}
                                style={{ height: rowHeight, lineHeight: `${rowHeight}px` }}
                                className={classNames(styles['body-row'], { [styles['selected']]: selectedRowKeysObj[currentRowKey] })}
                            >
                                {renderItems.map((item) => {
                                    const column = handledColumns[item.index];
                                    if (column) {
                                        const { key, render, widthStyle, align, fixed, fixedStyle, showShadow } = column;
                                        const cellValue = notEmpty(render ? render(currentRowData, currentRowIndex) : currentRowData[key]);
                                        const cellTitle = typeof cellValue === 'string' || typeof cellValue === 'number' ? `${cellValue}` : '';
                                        const pinged = ping[fixed as any];

                                        return (
                                            <div
                                                key={key}
                                                title={cellTitle}
                                                style={{ textAlign: align, ...widthStyle, ...(fixedStyle ?? {}) }}
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

                                {resized && <div className={styles['body-cell']} style={{ width: 0, flexGrow: 1 }} />}
                            </div>
                        );
                    }
                })}
            </div>
        </div>
    );
};

export default VirtualBody;
