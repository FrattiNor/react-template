import { useContext2 } from '../Context2';
import styles from './index.module.less';
import { FC } from 'react';

const MeasureBody: FC = () => {
    const { virtual, resize, columns } = useContext2();

    const { handledColumns } = columns;
    const { horizontalMeasureElement } = virtual;
    const { resizeActiveKey, resizeActiveWidth, resized } = resize;

    return (
        <div className={styles['measure']}>
            {handledColumns.map(({ key, width, flexGrow, index }) => {
                const trueFlexGrow = resized.current ? 0 : flexGrow; // 手动调整过宽度后，flexGrow就不生效了
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

export default MeasureBody;
