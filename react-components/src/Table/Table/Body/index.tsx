import type { FC } from 'react';

import Empty from './Empty';
import styles from './index.module.less';
import Measure from './Measure';
import VirtualBody from './VirtualBody';
import { useTableContext } from '../../TableContext';

const Body: FC = () => {
    const tableContext = useTableContext();
    const { bodyRef, isEmpty, bodyOverflowX } = tableContext;

    return (
        <div ref={bodyRef} style={{ overflowX: bodyOverflowX }} className={styles['body']}>
            <Measure />
            {isEmpty && <Empty />}
            {!isEmpty && <VirtualBody />}
        </div>
    );
};

export default Body;
