import { useContext2 } from '../../../Context2';
import { notEmpty } from '@pkg/utils/src/empty';
import styles from './index.module.less';
import classNames from 'classnames';
import { FC } from 'react';

const VirtualBody: FC = () => {
    const { newProps, innerProps } = useContext2();
    const { rowKey, rowHeight } = newProps;
    const { resized, selectedRowKeysObj, showDataSource } = innerProps;
    const { handledColumns, hiddenFixedHandledLeftColumns, hiddenFixedHandledRightColumns } = innerProps;
    const { verticalVirtualItems, verticalTotalSize, verticalDistance, verticalMeasureElement } = innerProps;
    const { horizontalVirtualItems, horizontalTotalSize, horizontalPaddingLeft, horizontalPaddingRight } = innerProps;
    const renderItems = [...hiddenFixedHandledLeftColumns, ...horizontalVirtualItems, ...hiddenFixedHandledRightColumns];

    return (
        <div
            className={styles['virtual-body']}
            style={{
                height: verticalTotalSize,
                width: horizontalTotalSize,
                paddingTop: verticalDistance,
                transform: `translate3d(0, 0, 0)`,
                paddingLeft: horizontalPaddingLeft,
                paddingRight: horizontalPaddingRight,
            }}
        >
            {verticalVirtualItems.map((verticalItem) => {
                const currentRowIndex = verticalItem.index;
                const currentRowData = showDataSource?.[currentRowIndex];

                if (currentRowData) {
                    const currentRowKey = currentRowData[rowKey];

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
                                const lastColumn = handledColumns[item.index - 1];
                                const isAfterExpandable = lastColumn?.key === 'table-row-expandable';

                                if (column) {
                                    const { key, render, bodyStyle, fixed, pinged } = column;
                                    const cellValue = notEmpty(render ? render(currentRowData, currentRowIndex) : currentRowData[key]);
                                    const isStr = typeof cellValue === 'string' || typeof cellValue === 'number';
                                    const cellTitle = isStr ? `${cellValue}` : '';
                                    const cellInner = isStr ? <div className={styles['body-cell-str']}>{cellValue}</div> : cellValue;

                                    const xIndex = typeof currentRowData['xIndex'] === 'number' ? currentRowData['xIndex'] : 0;
                                    const paddingLeft = isAfterExpandable ? xIndex * 16 : 0;
                                    const cellInner2 =
                                        paddingLeft > 0 ? (
                                            <div className={styles['body-cell-expandable']}>
                                                <div className={styles['body-cell-expandable-inner']} style={{ paddingLeft }}>
                                                    {cellInner}
                                                </div>
                                            </div>
                                        ) : (
                                            cellInner
                                        );

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
                                            {cellInner2}
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
