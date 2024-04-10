import { notEmpty } from '@react/utils';
import classNames from 'classnames';

import EditCell from './EditCell';
import { useTableContext } from '../../../../TableContext';
import type { AnyObj, HandledColumn } from '../../../../type';
import { tableExpandableKey } from '../../../../useTable/useExpandable';
import getCellTitle from '../../../../utils/getCellTitle';
import styles from '../index.module.less';

type Props<T> = {
    currentRowData: T;
    currentRowKey: string;
    column: HandledColumn<T>;
    currentRowIndex: number;
};

const BodyCell = <T extends AnyObj>(props: Props<T>) => {
    const tableContext = useTableContext<T>();
    const { column, currentRowData, currentRowIndex, currentRowKey } = props;
    const { dataSourceLevelMap, resizeActiveKey, resizeReadyKey, handledColumns, clickedRow, pagination } = tableContext;
    //
    const lastColumn = handledColumns[column.index - 1];
    const isAfterExpandable = lastColumn?.key === tableExpandableKey;
    const innerStyle = isAfterExpandable ? { paddingLeft: 8 + (dataSourceLevelMap[currentRowKey] ?? 0) * 24 } : undefined;
    const { key, render, width, align, edit, saveEdit, renderAs, renderCellTitle } = column;
    const resizeActive = resizeReadyKey === key || resizeActiveKey === key;
    const cellPagination = pagination ? { total: pagination.total, current: pagination.current, pageSize: pagination.pageSize } : undefined;
    const cellValue = notEmpty(render ? render(currentRowData, currentRowIndex, cellPagination) : currentRowData[key]);
    const isStr = typeof cellValue === 'string' || typeof cellValue === 'number';
    const cellTitle = typeof renderCellTitle === 'function' ? renderCellTitle(currentRowData, currentRowIndex) : getCellTitle(cellValue);
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

    const renderAsStr = renderAs ? renderAs === 'str' : isStr;

    return (
        <div title={cellTitle} style={cellStyle} className={cellClassName}>
            <div style={innerStyle} className={classNames(renderAsStr ? styles['body-cell-str'] : styles['body-cell-block'])}>
                {cellValue}
            </div>
        </div>
    );
};

export default BodyCell;
