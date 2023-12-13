import { useContext2 } from '../../../Context2';
import styles from './index.module.less';
import { FC } from 'react';

const Measure: FC = () => {
    const { virtual, innerProps } = useContext2();

    const { horizontalMeasureElement } = virtual;
    const { handledColumns } = innerProps;

    return (
        <div className={styles['measure']}>
            {handledColumns.map(({ key, measureStyle }, index) => {
                return <div key={key} data-index={index} ref={horizontalMeasureElement} className={styles['measure-item']} style={measureStyle} />;
            })}
        </div>
    );
};

export default Measure;
