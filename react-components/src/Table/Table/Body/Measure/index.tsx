import type { FC } from 'react';

import styles from './index.module.less';
import { useTableContext } from '../../../TableContext';

const Measure: FC = () => {
    const tableContext = useTableContext();
    const { getMeasureStyle } = tableContext;
    const { horizontalMeasureElement } = tableContext.virtual;
    const { handledColumns } = tableContext.handledColumnsObj;

    return (
        <div className={styles['measure']}>
            {handledColumns.map((column, index) => (
                <div
                    key={column.key}
                    data-index={index}
                    ref={horizontalMeasureElement}
                    style={getMeasureStyle(column)}
                    className={styles['measure-item']}
                />
            ))}
        </div>
    );
};

export default Measure;
