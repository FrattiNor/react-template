import { useTableContext } from '../../../TableContext';
import { AnyObj, HandledColumn } from '../../../type';
import { notEmpty } from '../../../utils/empty';
import styles from './index.module.less';
import classNames from 'classnames';
import EditCell from './EditCell';
import { FC } from 'react';

const VirtualBody: FC = <T extends AnyObj>() => {
    const tableContext = useTableContext<T>();
    const { rowKey, rowHeight, virtual = 'both' } = tableContext.props;
    const { horizontalTotalSize, midLeftPadding, midRightPadding, clickedRow, setClickedRow } = tableContext;
    const { verticalVirtualItems, verticalTotalSize, verticalDistance, verticalMeasureElement } = tableContext;
    const { ping, showDataSource, selectedRowKeysObj, dataSourceLevelMap, resizeActiveKey, resizeReadyKey } = tableContext;
    const { handledColumns, handledFixedLeftColumns, handledFixedRightColumns, handledMidColumns, handledTotalMidColumns } = tableContext;
    const midColumns = virtual === 'both' || virtual === 'horizontal' ? handledMidColumns : handledTotalMidColumns;
    const midStyle = virtual === 'both' || virtual === 'horizontal' ? { paddingLeft: midLeftPadding, paddingRight: midRightPadding } : {};

    const renderCell = (column: HandledColumn<T>, currentRowData: T, currentRowIndex: number, currentRowKey: string) => {
        const lastColumn = handledColumns[column.index - 1];
        const isAfterExpandable = lastColumn?.key === 'table-row-expandable';
        const innerStyle = isAfterExpandable ? { paddingLeft: 8 + (dataSourceLevelMap[currentRowKey] ?? 0) * 16 } : undefined;
        const { key, render, width, align, edit, saveEdit } = column;
        const resizeActive = resizeReadyKey === key || resizeActiveKey === key;
        const cellValue = notEmpty(render ? render(currentRowData, currentRowIndex) : currentRowData[key]);
        const isStr = typeof cellValue === 'string' || typeof cellValue === 'number';
        const cellTitle = isStr ? `${cellValue}` : '';
        const cellStyle = { width, textAlign: align };

        const cellClassName = classNames(styles['body-cell'], {
            [styles['resize-active']]: resizeActive,
            [styles['clicked-row']]: clickedRow === currentRowKey,
        });

        const canEdit = typeof edit === 'function' ? edit(currentRowData, currentRowIndex) : edit;
        if (canEdit === true && isStr) {
            return (
                <EditCell
                    key={key}
                    cellKey={key}
                    text={cellValue}
                    style={cellStyle}
                    rowKey={currentRowKey}
                    textStyle={innerStyle}
                    className={cellClassName}
                    saveEdit={(v: string) => saveEdit && saveEdit(v, currentRowData, currentRowIndex)}
                />
            );
        }

        return (
            <div key={key} title={cellTitle} style={cellStyle} className={cellClassName}>
                {isStr ? (
                    <div className={styles['body-cell-str']} style={innerStyle}>
                        {cellValue}
                    </div>
                ) : (
                    <div className={styles['body-cell-block']} style={innerStyle}>
                        {cellValue}
                    </div>
                )}
            </div>
        );
    };

    const renderRow = (currentRowData: T, currentRowIndex: number, opt?: { measure: boolean }) => {
        const { measure } = opt || {};
        const isFirst = currentRowIndex === 0;
        const currentRowKey = typeof rowKey === 'function' ? rowKey(currentRowData) : currentRowData[rowKey];
        const rowClick = () => setClickedRow((v) => (v !== currentRowKey ? currentRowKey : null));
        const measureProps = measure ? { ['data-index']: currentRowIndex, ref: verticalMeasureElement } : {};

        return (
            <div
                {...measureProps}
                onClick={rowClick}
                key={currentRowKey}
                style={{ minHeight: isFirst ? rowHeight - 1 : rowHeight }}
                className={classNames(styles['body-row'], {
                    [styles['first']]: isFirst,
                    [styles['selected']]: selectedRowKeysObj[currentRowKey],
                })}
            >
                {handledFixedLeftColumns.length > 0 && (
                    <div className={classNames(styles['body-fixed-left'], { [styles['pinged']]: ping['left'] })}>
                        {handledFixedLeftColumns.map((column) => {
                            return renderCell(column, currentRowData, currentRowIndex, currentRowKey);
                        })}
                    </div>
                )}

                {midColumns.length > 0 && (
                    <div className={styles['body-mid']} style={midStyle}>
                        {midColumns.map((column) => {
                            return renderCell(column, currentRowData, currentRowIndex, currentRowKey);
                        })}
                    </div>
                )}

                {handledFixedRightColumns.length > 0 && (
                    <div className={classNames(styles['body-fixed-right'], { [styles['pinged']]: ping['right'] })}>
                        {handledFixedRightColumns.map((column) => {
                            return renderCell(column, currentRowData, currentRowIndex, currentRowKey);
                        })}
                    </div>
                )}

                <div className={styles['body-seize-a-seat']} />
            </div>
        );
    };

    return (
        <div className={styles['virtual-body']} style={{ height: verticalTotalSize, width: horizontalTotalSize, paddingTop: verticalDistance }}>
            {virtual === 'both' || virtual === 'vertical'
                ? verticalVirtualItems.map((verticalItem) => {
                      const currentRowIndex = verticalItem.index;
                      const currentRowData = showDataSource?.[currentRowIndex];
                      if (currentRowData) return renderRow(currentRowData, currentRowIndex, { measure: true });
                      return null;
                  })
                : showDataSource.map((currentRowData, currentRowIndex) => {
                      return renderRow(currentRowData, currentRowIndex);
                  })}
        </div>
    );
};

export default VirtualBody;
