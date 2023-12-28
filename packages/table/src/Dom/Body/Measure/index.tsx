import { useTableContext } from '../../../TableContext';
import styles from './index.module.less';
import { FC } from 'react';

const Measure: FC = () => {
    const { innerProps } = useTableContext();
    const { handledColumns, horizontalMeasureElement } = innerProps;

    return (
        <div className={styles['measure']}>
            {handledColumns.map(({ key, measureStyle }, index) => {
                return <div key={key} data-index={index} ref={horizontalMeasureElement} className={styles['measure-item']} style={measureStyle} />;
            })}
        </div>
    );
};

export default Measure;
