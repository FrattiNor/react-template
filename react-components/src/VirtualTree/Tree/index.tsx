import { forwardRef, useImperativeHandle } from 'react';

import classNames from 'classnames';

import styles from './index.module.less';
import LoadingDiv from '../../LoadingDiv';
import TreeInner from '../TreeInner';
import useTree from '../useTree';

import type { VirtualTreeComponent } from '../type';

const TreeWrapper: VirtualTreeComponent = forwardRef((props, ref) => {
    const tree = useTree(props);
    useImperativeHandle(ref, () => tree);
    const { loading, wrapperClassName, wrapperStyle } = props;

    return (
        <LoadingDiv loading={loading} className={classNames(styles['wrapper'], wrapperClassName)} style={wrapperStyle}>
            <TreeInner {...props} instance={tree} />
        </LoadingDiv>
    );
});

export default TreeWrapper;
