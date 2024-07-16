import classNames from 'classnames';

import { useTableContext } from '../../../../TableContext';
import styles from '../../index.module.less';
import BodyCell from '../BodyCell';

import type { AnyObj } from '../../../../type';

type Props<T> = {
    rowData: T;
    rowKey: string;
    rowIndex: number;
};

const BodyRow = <T extends AnyObj>(props: Props<T>) => {
    const tableContext = useTableContext<T>();
    const { rowData, rowIndex, rowKey } = props;

    const { clickedRow } = tableContext.rowClickStore;
    const { setClickedRow } = tableContext.rowClickStore;
    const { selectedRowKeysObj } = tableContext.rowSelection;
    const { handledColumns } = tableContext.handledColumnsObj;
    const { verticalMeasureElement, getNeedRenderByColumn } = tableContext.virtual;

    return (
        <div
            onClick={() => setClickedRow((old) => (old === rowKey ? null : rowKey))}
            className={classNames(styles['body-row'], {
                [styles['clicked-row']]: clickedRow === rowKey,
                [styles['selected-row']]: selectedRowKeysObj[rowKey],
            })}
        >
            <div
                data-index={rowIndex}
                ref={verticalMeasureElement}
                className={styles['body-row-measure']}
                style={{ gridRow: rowIndex + 1, gridColumn: `1/${handledColumns.length + 1}` }}
            />
            {handledColumns.map((column) => {
                if (getNeedRenderByColumn(column)) {
                    return <BodyCell column={column} key={column.key} rowKey={rowKey} rowData={rowData} rowIndex={rowIndex} />;
                }
            })}
            <div className={styles['body-cell-placeholder']} style={{ gridRow: rowIndex + 1, gridColumn: handledColumns.length + 1 }} />
        </div>
    );
};

export default BodyRow;
