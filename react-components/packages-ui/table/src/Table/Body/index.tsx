import { useTableContext } from '../../TableContext';
import styles from './index.module.less';
import VirtualBody from './VirtualBody';
import classNames from 'classnames';
import Measure from './Measure';
import Empty from './Empty';
import { FC } from 'react';

const Body: FC = () => {
    const tableContext = useTableContext();
    const { bodyRef, isEmpty, bodyOverflowX } = tableContext;

    return (
        <div ref={bodyRef} className={classNames(styles['body'], { [styles['empty']]: isEmpty })} style={{ overflowX: bodyOverflowX }}>
            <Measure />
            {isEmpty && <Empty />}
            {!isEmpty && <VirtualBody />}
        </div>
    );
};

export default Body;
