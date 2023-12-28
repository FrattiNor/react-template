import { useContext2 } from '../../../Context2';
import { notEmpty } from '../../../utils/empty';
import { HandledColumn } from '../../../type';
import styles from './index.module.less';
import classNames from 'classnames';
import { FC } from 'react';

const VirtualBody: FC = () => {
    const { outerProps, innerProps } = useContext2();
    const { rowKey, rowHeight } = outerProps;

    const { horizontalTotalSize, midLeftPadding, midRightPadding } = innerProps;
    const { resized, ping, showDataSource, selectedRowKeysObj, dataSourceLevelMap } = innerProps;
    const { verticalVirtualItems, verticalTotalSize, verticalDistance, verticalMeasureElement } = innerProps;
    const { handledColumns, handledFixedLeftColumns, handledFixedRightColumns, handledMidColumns } = innerProps;

    const renderItem = <T extends Record<string, any>>(
        column: HandledColumn<T>,
        currentRowData: T,
        currentRowIndex: number,
        currentRowKey: string,
    ) => {
        const lastColumn = handledColumns[column.index - 1];
        const isAfterExpandable = lastColumn?.key === 'table-row-expandable';

        const { key, render, width, align } = column;
        const cellValue = notEmpty(render ? render(currentRowData, currentRowIndex) : currentRowData[key]);
        const isStr = typeof cellValue === 'string' || typeof cellValue === 'number';
        const cellTitle = isStr ? `${cellValue}` : '';
        const paddingLeft = isAfterExpandable ? (dataSourceLevelMap[currentRowKey] ?? 0) * 16 : 0;

        return (
            <div key={key} title={cellTitle} className={classNames(styles['body-cell'])} style={{ width, textAlign: align }}>
                {isStr ? (
                    <div className={styles['body-cell-str']} style={{ paddingLeft }}>
                        {cellValue}
                    </div>
                ) : (
                    <div className={styles['body-cell-block']} style={{ paddingLeft }}>
                        {cellValue}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className={styles['virtual-body']} style={{ height: verticalTotalSize, width: horizontalTotalSize, paddingTop: verticalDistance }}>
            {verticalVirtualItems.map((verticalItem) => {
                const currentRowIndex = verticalItem.index;
                const currentRowData = showDataSource?.[currentRowIndex];
                if (currentRowData) {
                    const currentRowKey = currentRowData[rowKey];

                    return (
                        <div
                            key={currentRowKey}
                            ref={verticalMeasureElement}
                            data-index={verticalItem.index}
                            style={{ minHeight: rowHeight }}
                            className={classNames(styles['body-row'], { [styles['selected']]: selectedRowKeysObj[currentRowKey] })}
                        >
                            {handledFixedLeftColumns.length > 0 && (
                                <div className={classNames(styles['body-fixed-left'], { [styles['pinged']]: ping['left'] })}>
                                    {handledFixedLeftColumns.map((column) => {
                                        return renderItem(column, currentRowData, currentRowIndex, currentRowKey);
                                    })}
                                </div>
                            )}
                            {handledMidColumns.length > 0 && (
                                <div className={styles['body-mid']} style={{ paddingLeft: midLeftPadding, paddingRight: midRightPadding }}>
                                    {handledMidColumns.map((column) => {
                                        return renderItem(column, currentRowData, currentRowIndex, currentRowKey);
                                    })}
                                </div>
                            )}
                            {handledFixedRightColumns.length > 0 && (
                                <div className={classNames(styles['body-fixed-right'], { [styles['pinged']]: ping['right'] })}>
                                    {handledFixedRightColumns.map((column) => {
                                        return renderItem(column, currentRowData, currentRowIndex, currentRowKey);
                                    })}
                                </div>
                            )}
                            {resized && <div className={styles['body-seize-a-seat']} />}
                        </div>
                    );
                }
            })}
        </div>
    );
};

export default VirtualBody;
