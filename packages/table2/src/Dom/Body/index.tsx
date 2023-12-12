import { useContext2 } from '../../Context2';
import styles from './index.module.less';
import VirtualBody from './VirtualBody';
import Measure from './Measure';
import Empty from './Empty';
import { FC } from 'react';

const Body: FC = () => {
    const { bodyRef, newProps } = useContext2();
    const { isEmpty } = newProps;

    return (
        <div className={styles['body']} ref={bodyRef}>
            <Measure />
            {isEmpty && <Empty />}
            {!isEmpty && <VirtualBody />}
        </div>
    );
};

export default Body;