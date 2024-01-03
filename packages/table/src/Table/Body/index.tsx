import { useTableContext } from '../../TableContext';
import styles from './index.module.less';
import VirtualBody from './VirtualBody';
import classNames from 'classnames';
import Measure from './Measure';
import Empty from './Empty';
import { FC, Fragment } from 'react';

const Body: FC = () => {
    const { bodyRef, innerProps } = useTableContext();
    const { isEmpty, bodyOverflowX } = innerProps;

    return (
        <Fragment>
            <div ref={bodyRef} className={classNames(styles['body'], { [styles['empty']]: isEmpty })} style={{ overflowX: bodyOverflowX }}>
                <Measure />
                {!isEmpty && <VirtualBody />}
            </div>
            {isEmpty && <Empty />}
        </Fragment>
    );
};

export default Body;
