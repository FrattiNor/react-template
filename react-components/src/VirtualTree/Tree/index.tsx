import { forwardRef, useImperativeHandle } from 'react';

import classNames from 'classnames';

import styles from './index.module.less';
import Loading from '../../Loading';
import TreeInner from '../TreeInner';
import type { VirtualTreeComponent } from '../type';
import useTree from '../useTree';

const TreeWrapper: VirtualTreeComponent = forwardRef((props, ref) => {
    const tree = useTree(props);
    useImperativeHandle(ref, () => tree);
    const { loading, wrapperClassName, wrapperStyle } = props;

    return (
        <div className={classNames(styles['wrapper'], wrapperClassName)} style={wrapperStyle}>
            <Loading loading={loading} />
            <TreeInner {...props} instance={tree} />
        </div>
    );
});

export default TreeWrapper;
