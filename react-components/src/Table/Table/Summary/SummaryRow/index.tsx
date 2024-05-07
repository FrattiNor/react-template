import classNames from 'classnames';

import { useTableContext } from '../../../../Table/TableContext';
import styles from '../index.module.less';
import SummaryCell from '../SummaryCell';

type Props = {
    summaryIndex: number;
};

const SummaryRow = (props: Props) => {
    const tableContext = useTableContext();

    const { ping, midLeftPadding, midRightPadding, vScrollBarWidth, handledProps } = tableContext;
    const { handledFixedLeftColumns, handledFixedRightColumns, handledMidColumns } = tableContext;

    const { rowHeight } = handledProps;
    const midColumns = handledMidColumns;
    const midStyle = { paddingLeft: midLeftPadding, paddingRight: midRightPadding };

    return (
        <div className={styles['summary-row']} style={{ minHeight: rowHeight }}>
            {handledFixedLeftColumns.length > 0 && (
                <div className={classNames(styles['summary-fixed-left'], { [styles['pinged']]: ping['left'] })}>
                    {handledFixedLeftColumns.map((column) => (
                        <SummaryCell key={column.key} column={column} summaryIndex={props.summaryIndex} />
                    ))}
                </div>
            )}

            {midColumns.length > 0 && (
                <div className={styles['summary-mid']} style={midStyle}>
                    {midColumns.map((column) => (
                        <SummaryCell key={column.key} column={column} summaryIndex={props.summaryIndex} />
                    ))}
                </div>
            )}

            {handledFixedRightColumns.length > 0 && (
                <div className={classNames(styles['summary-fixed-right'], { [styles['pinged']]: ping['right'] })}>
                    {handledFixedRightColumns.map((column) => (
                        <SummaryCell key={column.key} column={column} summaryIndex={props.summaryIndex} />
                    ))}
                    {vScrollBarWidth > 0 && <div className={classNames(styles['summary-v-scroll-bar'])} style={{ width: vScrollBarWidth }} />}
                </div>
            )}

            <div className={styles['summary-seize-a-seat']} />
        </div>
    );
};

export default SummaryRow;
