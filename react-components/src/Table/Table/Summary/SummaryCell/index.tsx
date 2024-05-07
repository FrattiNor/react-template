import { notEmpty } from '@react/utils';
import classNames from 'classnames';

import getCellTitle from '../../../../Table/utils/getCellTitle';
import { useTableContext } from '../../../TableContext';
import styles from '../index.module.less';

import type { HandledColumn } from '../../../type';
import type { AnyObj } from '../../../type';

type Props<T> = {
    column: HandledColumn<T>;
    summaryIndex: number;
};

const SummaryCell = <T extends AnyObj>(props: Props<T>) => {
    const { column } = props;
    const { key, width, align, summary: _summary } = column;
    const summary = Array.isArray(_summary) ? _summary : [_summary];
    const summaryRender = summary?.[props.summaryIndex];
    const cellValue = notEmpty(summaryRender ? summaryRender() : undefined);
    const cellTitle = getCellTitle(cellValue);
    const iStr = typeof cellValue === 'string' || typeof cellValue === 'number';

    const tableContext = useTableContext<T>();
    const { resizeActiveKey, resizeReadyKey } = tableContext;
    const resizeActive = resizeReadyKey === key || resizeActiveKey === key;

    return (
        <div
            title={cellTitle}
            style={{ width, textAlign: align }}
            className={classNames(styles['summary-cell'], { [styles['resize-active']]: resizeActive })}
        >
            {<div className={iStr ? styles['summary-cell-str'] : styles['summary-cell-block']}>{cellValue}</div>}
        </div>
    );
};

export default SummaryCell;
