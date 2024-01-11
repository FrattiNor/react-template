import { useTableContext } from '../../../TableContext';
import styles from './index.module.less';
import { FC } from 'react';

const Measure: FC = () => {
    const tableContext = useTableContext();
    const { handledColumns, horizontalMeasureElement } = tableContext;

    return (
        <div className={styles['measure']}>
            {handledColumns.map(({ key, measureStyle }, index) => {
                return <div key={key} data-index={index} style={measureStyle} ref={horizontalMeasureElement} className={styles['measure-item']} />;
            })}
        </div>
    );
};

export default Measure;
