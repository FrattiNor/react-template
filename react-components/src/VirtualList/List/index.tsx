import { forwardRef, useImperativeHandle } from 'react';

import classNames from 'classnames';

import styles from './index.module.less';
import LoadingDiv from '../../LoadingDiv';
import ListInner from '../ListInner';
import useList from '../useList';

import type { VirtualListComponent } from '../type';

const List: VirtualListComponent = forwardRef((props, ref) => {
    const list = useList(props);
    useImperativeHandle(ref, () => list);
    const { loading, wrapperClassName, wrapperStyle } = props;

    return (
        <LoadingDiv loading={loading} className={classNames(styles['wrapper'], wrapperClassName)} style={wrapperStyle}>
            <ListInner {...props} instance={list} />
        </LoadingDiv>
    );
});

export default List;
