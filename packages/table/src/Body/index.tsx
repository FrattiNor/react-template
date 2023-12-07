import HorizontalMeasure from './HorizontalMeasure';
import { useContext2 } from '../Context2';
import styles from './index.module.less';
import VirtualBody from './VirtualBody';
import Empty from './Empty';
import { FC } from 'react';

const Body: FC = () => {
    const { scroll, bodyRef, isEmpty } = useContext2();
    const { onBodyScroll } = scroll;

    return (
        <div className={styles['body']} ref={bodyRef} onScroll={onBodyScroll}>
            <HorizontalMeasure />

            {isEmpty && <Empty />}

            {!isEmpty && <VirtualBody />}
        </div>
    );
};

export default Body;
