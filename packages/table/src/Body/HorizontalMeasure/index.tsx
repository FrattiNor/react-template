import { useContext2 } from '../../Context2';
import styles from './index.module.less';
import { FC } from 'react';

const HorizontalMeasure: FC = () => {
    const { virtual, resize, handledColumns } = useContext2();
    const { resizeActiveKey, resizeActiveWidth } = resize;
    const { horizontalMeasureElement } = virtual;

    return (
        <div className={styles['measure']}>
            {handledColumns.map(({ key, width, flexGrow, index }) => {
                const trueFlexGrow = resizeActiveKey === key ? 0 : flexGrow;
                const trueWidth = resizeActiveKey === key ? resizeActiveWidth : width;

                return (
                    <div
                        key={key}
                        data-index={index}
                        ref={horizontalMeasureElement}
                        className={styles['measure-item']}
                        style={{ width: trueWidth, flexGrow: trueFlexGrow }}
                    />
                );
            })}
        </div>
    );
};

export default HorizontalMeasure;
