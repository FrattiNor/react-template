import { useTableContext } from '../../../../TableContext';
import getCellTitle from '../../../../utils/getCellTitle';
import { AnyObj, HandledColumn } from '../../../../type';
import { notEmpty } from '../../../../utils/empty';
import styles from '../index.module.less';
import classNames from 'classnames';
import EditCell from './EditCell';

type Props<T> = {
    currentRowData: T;
    currentRowKey: string;
    column: HandledColumn<T>;
    currentRowIndex: number;
};

const BodyCell = <T extends AnyObj>(props: Props<T>) => {
    const tableContext = useTableContext<T>();
    const { column, currentRowData, currentRowIndex, currentRowKey } = props;
    const { dataSourceLevelMap, resizeActiveKey, resizeReadyKey, handledColumns, clickedRow } = tableContext;
    //
    const lastColumn = handledColumns[column.index - 1];
    const isAfterExpandable = lastColumn?.key === 'table-row-expandable';
    const innerStyle = isAfterExpandable ? { paddingLeft: 8 + (dataSourceLevelMap[currentRowKey] ?? 0) * 16 } : undefined;
    const { key, render, width, align, edit, saveEdit } = column;
    const resizeActive = resizeReadyKey === key || resizeActiveKey === key;
    const cellValue = notEmpty(render ? render(currentRowData, currentRowIndex) : currentRowData[key]);
    const isStr = typeof cellValue === 'string' || typeof cellValue === 'number';
    const cellTitle = getCellTitle(cellValue);
    const cellStyle = { width, textAlign: align };
    const cellClassName = classNames(styles['body-cell'], {
        [styles['resize-active']]: resizeActive,
        [styles['clicked-row']]: clickedRow === currentRowKey,
    });

    const canEdit = typeof edit === 'function' ? edit(currentRowData, currentRowIndex) : edit;
    if (canEdit === true && isStr) {
        return (
            <EditCell
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
        <div title={cellTitle} style={cellStyle} className={cellClassName}>
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

export default BodyCell;
