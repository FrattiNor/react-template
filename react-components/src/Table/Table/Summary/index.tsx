import type { FC } from 'react';

import styles from './index.module.less';
import SummaryRow from './SummaryRow';
import { useTableContext } from '../../TableContext';

const Summary: FC = () => {
    const tableContext = useTableContext();
    const { summaryCount } = tableContext.handledColumnsObj;
    if (!(summaryCount > 0)) return null;

    const { summaryRef } = tableContext;
    const { headGridTemplateColumns, headHorizontalTotalSize } = tableContext.columnsGridSizeAndSticky;

    return (
        <div className={styles['summary']} ref={summaryRef}>
            <div className={styles['virtual-summary']} style={{ width: headHorizontalTotalSize, gridTemplateColumns: headGridTemplateColumns }}>
                {Array(summaryCount)
                    .fill('')
                    .map((_, index) => (
                        <SummaryRow key={index} rowIndex={index} />
                    ))}
            </div>
        </div>
    );
};

export default Summary;
