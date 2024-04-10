import { forwardRef, useImperativeHandle } from 'react';

import classNames from 'classnames';

import styles from './index.module.less';
import Loading from '../../Loading';
import ListInner from '../ListInner';
import type { VirtualListComponent } from '../type';
import useList from '../useList';

const List: VirtualListComponent = forwardRef((props, ref) => {
    const list = useList(props);
    useImperativeHandle(ref, () => list);
    const { loading, wrapperClassName, wrapperStyle } = props;

    return (
        <div className={classNames(styles['wrapper'], wrapperClassName)} style={wrapperStyle}>
            <Loading loading={loading} />
            <ListInner {...props} instance={list} />
        </div>
    );
});

export default List;
