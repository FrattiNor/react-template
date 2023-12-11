import HorizontalMeasure from './HorizontalMeasure';
import { useContext2 } from '../Context2';
import styles from './index.module.less';
import VirtualBody from './VirtualBody';
import Empty from './Empty';
import { FC } from 'react';

const Body: FC = () => {
    const { bodyRef, newProps } = useContext2();
    const { isEmpty } = newProps;

    return (
        <div className={styles['body']} ref={bodyRef}>
            <HorizontalMeasure />

            {isEmpty && <Empty />}

            {!isEmpty && <VirtualBody />}
        </div>
    );
};

export default Body;
