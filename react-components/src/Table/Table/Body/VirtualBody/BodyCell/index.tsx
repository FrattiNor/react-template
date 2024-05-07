import { notEmpty } from '@react/utils';
import classNames from 'classnames';

import EditCell from './EditCell';
import { useTableContext } from '../../../../TableContext';
import { tableExpandableKey } from '../../../../useTable/useExpandable';
import getCellTitle from '../../../../utils/getCellTitle';
import styles from '../index.module.less';

import type { AnyObj, HandledColumn } from '../../../../type';

type Props<T> = {
    currentRowData: T;
    currentRowKey: string;
    column: HandledColumn<T>;
    currentRowIndex: number;
};

const BodyCell = <T extends AnyObj>(props: Props<T>) => {
    // 获取参数
    const tableContext = useTableContext<T>();
    const { column, currentRowData, currentRowIndex, currentRowKey } = props;
    const { key, render, width, align, edit, saveEdit, renderAs, renderCellTitle } = column;
    const { dataSourceLevelMap, resizeActiveKey, resizeReadyKey, handledColumns, clickedRow, pagination } = tableContext;
    // 上一列
    const lastColumn = handledColumns[column.index - 1];
    // 是否在展开列后方
    const isAfterExpandable = lastColumn?.key === tableExpandableKey;
    // 根据是否在展开列后方，赋予左边距
    const innerStyle = isAfterExpandable ? { paddingLeft: 8 + (dataSourceLevelMap[currentRowKey] ?? 0) * 24 } : undefined;
    // 是否在resize
    const resizeActive = resizeReadyKey === key || resizeActiveKey === key;
    // 当前分页数据
    const cellPagination = pagination ? { total: pagination.total, current: pagination.current, pageSize: pagination.pageSize } : undefined;
    // 当前cell的值
    const cellValue = notEmpty(render ? render(currentRowData, currentRowIndex, cellPagination) : currentRowData[key]);
    // 当前cell的值是否是string
    const isStr = typeof cellValue === 'string' || typeof cellValue === 'number';
    // 当前cell的title信息
    const cellTitle = typeof renderCellTitle === 'function' ? renderCellTitle(currentRowData, currentRowIndex) : getCellTitle(cellValue);
    // 当前cell的样式【宽度和align】
    const cellStyle = { width, textAlign: align };
    // 当前cell的样式
    const cellClassName = classNames(styles['body-cell'], {
        [styles['resize-active']]: resizeActive,
        [styles['clicked-row']]: clickedRow === currentRowKey,
    });
    // 是否可编辑
    const canEdit = isStr && typeof edit === 'function' ? edit(currentRowData, currentRowIndex) : edit;
    // 可编辑渲染为EditCell
    if (canEdit === true) {
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
    // 判断是否是string【renderAs为外部强制渲染方式】
    // 不同为className不同【block会将fontSize置为0】
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
