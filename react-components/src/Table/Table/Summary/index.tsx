import type { FC } from 'react';

import styles from './index.module.less';
import SummaryRow from './SummaryRow';
import { useTableContext } from '../../../Table/TableContext';

const Summary: FC = () => {
    const tableContext = useTableContext();
    const { summaryCount } = tableContext;
    if (summaryCount === 0) return null;

    const { summaryRef, vScrollBarWidth, horizontalTotalSize } = tableContext;

    return (
        <div className={styles['summary']} ref={summaryRef}>
            <div className={styles['virtual-summary']} style={{ width: horizontalTotalSize + vScrollBarWidth }}>
                {Array(summaryCount)
                    .fill('')
                    .map((_, index) => (
                        <SummaryRow key={index} summaryIndex={index} />
                    ))}
            </div>
        </div>
    );
};

export default Summary;
