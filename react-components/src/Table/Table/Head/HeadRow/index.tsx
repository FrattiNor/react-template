import { type FC } from 'react';

import { useTableContext } from '../../../TableContext';
import HeadCell from '../HeadCell';
import styles from '../index.module.less';

type Props = {
    rowIndex: number;
};

const HeadRow: FC<Props> = ({ rowIndex }) => {
    const tableContext = useTableContext();
    const { getNeedRenderByColumn } = tableContext.virtual;
    const { handledColumns } = tableContext.handledColumnsObj;

    return (
        <div className={styles['head-row']}>
            {handledColumns.map((column) => {
                const otherNeedRender = rowIndex !== 0 && column.underRowSpan === rowIndex;
                if (getNeedRenderByColumn(column) || otherNeedRender) {
                    return <HeadCell key={column.key} rowIndex={rowIndex} column={column} />;
                }
            })}
            <div
                className={styles['head-cell-placeholder']}
                style={{ gridRow: `1/${rowIndex + 2}`, gridColumn: `${handledColumns.length + 1}/span 2` }}
            />
        </div>
    );
};

export default HeadRow;
