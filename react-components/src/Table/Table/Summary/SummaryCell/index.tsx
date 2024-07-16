import { notEmpty } from '@react/utils';
import classNames from 'classnames';

import { useTableContext } from '../../../TableContext';
import getCellTitle from '../../../utils/getCellTitle';
import styles from '../index.module.less';

import type { HandledColumn } from '../../../type';
import type { AnyObj } from '../../../type';

type Props<T> = {
    column: HandledColumn<T>;
    rowIndex: number;
};

const SummaryCell = <T extends AnyObj>(props: Props<T>) => {
    const { column, rowIndex } = props;
    const tableContext = useTableContext<T>();
    const { rowHeight } = tableContext.handledProps;
    const { resizeActiveKey, resizeReadyKey } = tableContext.resizeWidth;
    const { getStickyStyleClass } = tableContext.columnsGridSizeAndSticky;

    const { key, align, summary: _summary, colIndex } = column;
    const summary = Array.isArray(_summary) ? _summary : [_summary];
    const summaryRender = summary?.[rowIndex];
    const cellValue = notEmpty(summaryRender ? summaryRender() : undefined);
    const iStr = typeof cellValue === 'string' || typeof cellValue === 'number';
    const cellTitle = getCellTitle(cellValue);
    const cellSticky = getStickyStyleClass(key, 'summary');
    const cellStyle = { textAlign: align, gridRow: rowIndex + 1, gridColumn: colIndex + 1, ...cellSticky.style };

    return (
        <div
            title={cellTitle}
            style={cellStyle}
            className={classNames(styles['summary-cell'], cellSticky.class, {
                [styles['resize-active']]: resizeReadyKey === key || resizeActiveKey === key,
            })}
        >
            <div className={styles['summary-cell-inner']} style={{ minHeight: rowHeight }}>
                {<div className={iStr ? styles['summary-cell-str'] : styles['summary-cell-block']}>{cellValue}</div>}
            </div>
        </div>
    );
};

export default SummaryCell;
