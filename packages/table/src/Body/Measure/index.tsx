import { useContext2 } from '../../Context2';
import styles from './index.module.less';
import { FC } from 'react';

const Measure: FC = () => {
    const { virtual, resize, handledColumns } = useContext2();
    const { resizeActiveKey, resizeActiveWidth } = resize;
    const { horizontalMeasureElement } = virtual;

    return (
        <div className={styles['measure']}>
            {handledColumns.map(({ key, width, flex, index }) => {
                const trueFlex = resizeActiveKey === key ? 0 : flex;
                const trueWidth = resizeActiveKey === key ? resizeActiveWidth : width;

                return (
                    <div
                        key={key}
                        data-index={index}
                        ref={horizontalMeasureElement}
                        className={styles['measure-item']}
                        style={{ width: trueWidth, flexGrow: trueFlex }}
                    />
                );
            })}
        </div>
    );
};

export default Measure;
