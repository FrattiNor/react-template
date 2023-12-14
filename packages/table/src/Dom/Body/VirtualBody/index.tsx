import { useContext2 } from '../../../Context2';
import { notEmpty } from '@pkg/utils/src/empty';
import styles from './index.module.less';
import classNames from 'classnames';
import { FC } from 'react';

const VirtualBody: FC = () => {
    const { newProps, innerProps } = useContext2();

    const { dataSource, rowKey, rowHeight } = newProps;
    const { resized, selectedRowKeysObj } = innerProps;
    const { horizontalVirtualItems, horizontalTotalSize } = innerProps;
    const { verticalVirtualItems, verticalTotalSize, verticalDistance, verticalMeasureElement } = innerProps;
    const { handledColumns, hiddenFixedHandledLeftColumns, hiddenFixedHandledRightColumns, paddingLeft, paddingRight } = innerProps;
    const renderItems = [...hiddenFixedHandledLeftColumns, ...horizontalVirtualItems, ...hiddenFixedHandledRightColumns];

    return (
        <div
            className={styles['virtual-body']}
            style={{
                paddingLeft: paddingLeft,
                height: verticalTotalSize,
                width: horizontalTotalSize,
                paddingRight: paddingRight,
                paddingTop: verticalDistance,
                transform: `translate3d(0, 0, 0)`,
            }}
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
                            style={{ height: rowHeight }}
                            data-index={verticalItem.index}
                            className={classNames(styles['body-row'], { [styles['selected']]: selectedRowKeysObj[currentRowKey] })}
                        >
                            {renderItems.map((item) => {
                                const column = handledColumns[item.index];
                                if (column) {
                                    const { key, render, bodyStyle, fixed, pinged } = column;
                                    const cellValue = notEmpty(render ? render(currentRowData, currentRowIndex) : currentRowData[key]);
                                    const isStr = typeof cellValue === 'string' || typeof cellValue === 'number';
                                    const cellTitle = isStr ? `${cellValue}` : '';
                                    const cellInner = isStr ? <div className={styles['body-cell-str']}>{cellValue}</div> : cellValue;

                                    return (
                                        <div
                                            key={key}
                                            title={cellTitle}
                                            style={bodyStyle}
                                            className={classNames(styles['body-cell'], {
                                                [styles[`fixed-${fixed}`]]: !!fixed,
                                                [styles[`pinged`]]: pinged,
                                                [styles[`shadow`]]: true,
                                            })}
                                        >
                                            {cellInner}
                                        </div>
                                    );
                                }
                            })}

                            {resized && <div className={styles['body-cell-other']} style={{ width: 0, flexGrow: 1 }} />}
                        </div>
                    );
                }
            })}
        </div>
    );
};

export default VirtualBody;
