import { notEmpty } from '@react/utils';
import classNames from 'classnames';

import EditCell from './EditCell';
import { useTableContext } from '../../../../TableContext';
import { tableExpandableKey } from '../../../../useTable/useExpandable';
import getCellTitle from '../../../../utils/getCellTitle';
import styles from '../../index.module.less';

import type { AnyObj, HandledColumn } from '../../../../type';

type Props<T> = {
    rowData: T;
    rowKey: string;
    column: HandledColumn<T>;
    rowIndex: number;
};

const BodyCell = <T extends AnyObj>(props: Props<T>) => {
    // 获取参数
    const tableContext = useTableContext<T>();

    const { column, rowData, rowIndex, rowKey } = props;
    const { key, render, align, edit, onCell, colIndex } = column;
    const { enable, saveEdit } = edit || {};

    const { pagination } = tableContext;
    const { rowHeight } = tableContext.handledProps;
    const { dataSourceLevelMap } = tableContext.dataSource;
    const { handledColumns } = tableContext.handledColumnsObj;
    const { resizeActiveKey, resizeReadyKey } = tableContext.resizeWidth;
    const { getStickyStyleClass } = tableContext.columnsGridSizeAndSticky;

    // 上一列
    const lastColumn = handledColumns[colIndex - 1];
    // 是否在展开列后方
    const isAfterExpandable = lastColumn?.key === tableExpandableKey;
    // 当前分页数据
    const cellPagination = pagination ? { total: pagination.total, current: pagination.current, pageSize: pagination.pageSize } : undefined;
    // 当前cell的值
    const cellValue = notEmpty(render ? render(rowData, rowIndex, cellPagination) : rowData[key]);
    // 当前cell的值是否是string
    const isStr = typeof cellValue === 'string' || typeof cellValue === 'number';
    // 当前cell的title信息
    const cellProps = typeof onCell === 'function' ? onCell(rowData, rowIndex) : {};
    const cellTitle = cellProps.title ?? getCellTitle(cellValue);
    // 当前cell的样式【宽度和align】
    const cellSticky = getStickyStyleClass(key, 'body');
    const cellStyle = { textAlign: align, gridRow: rowIndex + 1, gridColumn: colIndex + 1, ...cellSticky.style };
    // 当前cell的样式
    const cellClassName = classNames(styles['body-cell'], cellSticky.class, {
        [styles['resize-active']]: resizeReadyKey === key || resizeActiveKey === key,
    });
    // 是否可编辑
    const canEdit = isStr && (typeof enable === 'boolean' ? enable : typeof enable === 'function' ? enable(rowData, rowIndex) : false);

    return (
        <div title={cellTitle} style={cellStyle} className={cellClassName}>
            {canEdit && (
                <EditCell
                    cellKey={key}
                    text={cellValue}
                    rowKey={rowKey}
                    saveEdit={(v: string) => saveEdit && saveEdit(v, rowData, rowIndex)}
                    className={styles['body-cell-inner']}
                    style={{
                        minHeight: rowHeight,
                        paddingLeft: isAfterExpandable ? 8 + (dataSourceLevelMap[rowKey] ?? 0) * 24 : undefined,
                    }}
                />
            )}
            {!canEdit && (
                <div
                    className={styles['body-cell-inner']}
                    style={{
                        minHeight: rowHeight,
                        paddingLeft: isAfterExpandable ? 8 + (dataSourceLevelMap[rowKey] ?? 0) * 24 : undefined,
                    }}
                >
                    <div className={classNames(isStr ? styles['body-cell-str'] : styles['body-cell-block'])}>{cellValue}</div>
                </div>
            )}
        </div>
    );
};

export default BodyCell;
