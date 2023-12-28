import { useTableContext } from '../../TableContext';
import styles from './index.module.less';
import VirtualBody from './VirtualBody';
import Measure from './Measure';
import Empty from './Empty';
import { FC } from 'react';

const Body: FC = () => {
    const { bodyRef, innerProps } = useTableContext();
    const { isEmpty, bodyOverflowX } = innerProps;

    return (
        <div className={styles['body']} ref={bodyRef} style={{ overflowX: bodyOverflowX }}>
            <Measure />
            {isEmpty && <Empty />}
            {!isEmpty && <VirtualBody />}
        </div>
    );
};

export default Body;
