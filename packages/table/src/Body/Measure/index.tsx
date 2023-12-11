import { useContext2 } from '../../Context2';
import styles from './index.module.less';
import { FC } from 'react';

const Measure: FC = () => {
    const { virtual, resize, columns } = useContext2();

    const { handledColumns } = columns;
    const { horizontalMeasureElement } = virtual;
    const { resizeActiveKey, resizeActiveWidth, resized } = resize;

    return (
        <div className={styles['measure']}>
            {handledColumns.map(({ key, width, originWidth, flexGrow, index }) => {
                const trueFlexGrow = resized.current ? 0 : flexGrow; // 手动调整过宽度后，flexGrow就不生效了
                const trueWidth = resizeActiveKey === key ? resizeActiveWidth : resized.current ? width : originWidth; // 手动调整过宽度后，使用flexGrow后的宽度，不然就使用原生宽度

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

export default Measure;
