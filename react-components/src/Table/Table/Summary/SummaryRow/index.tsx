import { useTableContext } from '../../../TableContext';
import styles from '../index.module.less';
import SummaryCell from '../SummaryCell';

type Props = {
    rowIndex: number;
};

const SummaryRow = (props: Props) => {
    const tableContext = useTableContext();

    const { rowIndex } = props;
    const { getNeedRenderByColumn } = tableContext.virtual;
    const { handledColumns } = tableContext.handledColumnsObj;

    return (
        <div className={styles['summary-row']}>
            {handledColumns.map((column) => {
                if (getNeedRenderByColumn(column)) {
                    return <SummaryCell key={column.key} column={column} rowIndex={rowIndex} />;
                }
            })}
            <div
                className={styles['summary-cell-placeholder']}
                style={{ gridRow: rowIndex + 1, gridColumn: `${handledColumns.length + 1}/span 2` }}
            />
        </div>
    );
};

export default SummaryRow;
